import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsBookmarks, bbsPosts, bbsReplies } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to view bookmarks", 401);
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Get bookmarks with post data
    const bookmarks = await db.query.bbsBookmarks.findMany({
      where: eq(bbsBookmarks.userId, session.user.id),
      limit,
      offset,
      orderBy: [desc(bbsBookmarks.createdAt)],
      with: {
        post: {
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
          }
        }
      }
    });

    // Format response and filter out soft-deleted posts
    const currentUserId = session.user.id;
    const formattedPosts = bookmarks
      .filter(bm => bm.post && !bm.post.isDeleted)
      .map(bm => {
        const post = bm.post;
        // @ts-ignore
        const replyCount = post.replies?.length || 0;
        // @ts-ignore
        const profile = post.author?.bbsUserProfile?.[0] || post.author?.bbsUserProfile;
        // @ts-ignore
        const likeCount = post.likes?.length || 0;
        // @ts-ignore
        const isLiked = post.likes?.some(like => like.userId === currentUserId) || false;

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
          bookmarkedAt: bm.createdAt,
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

    return NextResponse.json({
      success: true,
      data: formattedPosts,
    });
  } catch (error: any) {
    console.error("[BBS_BOOKMARKS_GET]", error);
    return errorResponse("Internal Error", error?.message || "Failed to fetch bookmarks", 500);
  }
}
