import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsPosts, bbsCategories, bbsUserProfiles, bbsReplies } from "@/lib/schema/bbs";
import { users } from "@/lib/schema";
import { getUserBBSRole, getPermissions, ensureBBSProfile } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, desc, and, sql, or, like } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const categoryId = searchParams.get("categoryId");
    const query = searchParams.get("q");
    const sortBy = searchParams.get("sortBy") || "latest"; // latest, likes, replies, views

    if (page < 1 || limit < 1 || limit > 50) {
      return errorResponse("Invalid parameters", "Page and limit must be valid", 400);
    }

    const offset = (page - 1) * limit;

    // Base conditions: not deleted
    let conditions = eq(bbsPosts.isDeleted, false);

    if (categoryId) {
      conditions = and(conditions, eq(bbsPosts.categoryId, parseInt(categoryId)))!;
    }
    
    if (query && query.trim().length > 0) {
      const searchTerm = `%${query.trim()}%`;
      conditions = and(
        conditions, 
        or(
          like(bbsPosts.title, searchTerm),
          like(bbsPosts.content, searchTerm)
        )
      )!;
    }

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // Get posts with author and category info
    let posts = await db.query.bbsPosts.findMany({
      where: conditions,
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
          with: {
            bbsUserProfile: {
              columns: {
                nickname: true,
                bbsRole: true,
              }
            }
          }
        },
        category: {
          columns: {
            id: true,
            name: true,
            slug: true,
          },
        },
        replies: {
          columns: {
            id: true,
          },
          where: eq(bbsReplies.isDeleted, false),
        },
        likes: {
          columns: {
            userId: true,
          }
        }
      },
    });

    // Get total count
    const total = posts.length;

    // Format response first because we need to calculate counts for sorting
    let formattedPosts = posts.map(post => {
      // @ts-ignore - type mismatch from raw query, safely handled
      const replyCount = post.replies?.length || 0;
      // @ts-ignore
      const profile = post.author?.bbsUserProfile?.[0] || post.author?.bbsUserProfile;
      
      // @ts-ignore
      const likeCount = post.likes?.length || 0;
      // @ts-ignore
      const isLiked = currentUserId ? post.likes?.some(like => like.userId === currentUserId) : false;
      
      // Since content is now HTML, we need to strip HTML tags for the excerpt
      const plainText = post.content.replace(/<[^>]*>?/gm, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      
      return {
        id: post.id,
        title: post.title,
        content: excerpt, // Excerpt without HTML
        viewCount: post.viewCount,
        isPinned: post.isPinned,
        createdAt: post.createdAt,
        replyCount,
        likeCount,
        isLiked,
        category: post.category,
        author: {
          id: post.author.id,
          name: profile?.nickname || post.author.name || "Unknown",
          image: post.author.image,
          role: profile?.bbsRole || "member"
        }
      };
    });

    // Apply Sorting logic
    formattedPosts.sort((a, b) => {
      // Pinned posts always come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      switch (sortBy) {
        case "likes":
          if (b.likeCount !== a.likeCount) return (b.likeCount || 0) - (a.likeCount || 0);
          break;
        case "replies":
          if (b.replyCount !== a.replyCount) return (b.replyCount || 0) - (a.replyCount || 0);
          break;
        case "views":
          if (b.viewCount !== a.viewCount) return (b.viewCount || 0) - (a.viewCount || 0);
          break;
        case "latest":
        default:
          // Fall through to date sorting
          break;
      }
      
      // Fallback: newest first
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

    // Apply Pagination
    formattedPosts = formattedPosts.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("[BBS_POSTS_GET]", error);
    return errorResponse("Internal Error", error?.message || "Failed to fetch posts", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to post", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canCreatePost) {
      return errorResponse("Forbidden", "You do not have permission to create a post. Please upgrade your membership.", 403);
    }

    const body = await req.json();
    const { title, content, categoryId, images } = body;

    if (!title || title.trim().length === 0 || title.length > 100) {
      return errorResponse("Invalid Title", "Title is required and must be under 100 characters", 400);
    }

    if (!content || content.trim().length === 0 || content.length > 5000) {
      return errorResponse("Invalid Content", "Content is required and must be under 5000 characters", 400);
    }

    if (!categoryId || isNaN(parseInt(categoryId))) {
      return errorResponse("Invalid Category", "Category is required", 400);
    }

    // Verify category exists and user has permission for it
    const category = await db.query.bbsCategories.findFirst({
      where: eq(bbsCategories.id, parseInt(categoryId)),
    });

    if (!category) {
      return errorResponse("Not Found", "Category not found", 404);
    }

    if (category.requiredRole === "vip" && role === "member") {
      return errorResponse("Forbidden", "This category is for VIP members only", 403);
    }

    // Ensure user profile exists
    await ensureBBSProfile(session.user.id, session.user.name);

    // RATE LIMITING: Check if the user has posted within the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentPost = await db.query.bbsPosts.findFirst({
      where: and(
        eq(bbsPosts.userId, session.user.id),
        sql`${bbsPosts.createdAt} > ${fiveMinutesAgo}`
      ),
    });

    // Admins and moderators are exempt from rate limiting
    if (recentPost && role !== "admin" && role !== "moderator") {
      return errorResponse("Too Many Requests", "发帖太频繁啦！请等待 5 分钟后再发布新帖。", 429);
    }

    // Create post
    const [result] = await db.insert(bbsPosts).values({
      userId: session.user.id,
      categoryId: parseInt(categoryId),
      title: title.trim(),
      // Since we now use a rich text editor (TipTap), we save raw HTML.
      // NOTE: In production, you MUST sanitize this HTML before rendering or saving using DOMPurify!
      content: content.trim(),
      images: images && Array.isArray(images) ? images.slice(0, 9) : null,
    });

    // Update user post count
    await db.update(bbsUserProfiles)
      .set({
        postCount: sql`${bbsUserProfiles.postCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(bbsUserProfiles.userId, session.user.id));

    return NextResponse.json(successResponse({ id: result.insertId }, "Post created successfully"), { status: 201 });
  } catch (error) {
    console.error("[BBS_POSTS_POST]", error);
    return errorResponse("Internal Error", "Failed to create post", 500);
  }
}
