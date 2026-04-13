import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsBookmarks, bbsPosts, bbsReplies } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { eq, desc, inArray, and } from "drizzle-orm";

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
    const bookmarks = await db.select().from(bbsBookmarks).where(eq(bbsBookmarks.userId, session.user.id)).orderBy(desc(bbsBookmarks.createdAt)).limit(limit).offset(offset);

    const postIds = bookmarks.map(bm => bm.postId);
    const rawPosts = postIds.length > 0 ? await db.select().from(bbsPosts).where(and(inArray(bbsPosts.id, postIds), eq(bbsPosts.isDeleted, false))) : [];

    const authorIds = [...new Set(rawPosts.map(p => p.userId))];
    const categoryIds = [...new Set(rawPosts.map(p => p.categoryId))];

    const { bbsCategories, bbsUserProfiles, bbsLikes } = await import("@/lib/schema/bbs");
    const { users: schemaUsers } = await import("@/lib/schema");

    const authorsData = authorIds.length > 0 ? await db.select().from(schemaUsers).where(inArray(schemaUsers.id, authorIds)) : [];
    const profilesData = authorIds.length > 0 ? await db.select().from(bbsUserProfiles).where(inArray(bbsUserProfiles.userId, authorIds)) : [];
    const categoriesData = categoryIds.length > 0 ? await db.select().from(bbsCategories).where(inArray(bbsCategories.id, categoryIds)) : [];
    const repliesData = postIds.length > 0 ? await db.select({ postId: bbsReplies.postId }).from(bbsReplies).where(and(inArray(bbsReplies.postId, postIds), eq(bbsReplies.isDeleted, false))) : [];
    const likesData = postIds.length > 0 ? await db.select({ userId: bbsLikes.userId, postId: bbsLikes.postId }).from(bbsLikes).where(inArray(bbsLikes.postId, postIds)) : [];

    const currentUserId = session.user.id;
    const formattedPosts = bookmarks
      .map(bm => {
        const post = rawPosts.find(p => p.id === bm.postId);
        if (!post) return null;

        const author = authorsData.find(a => a.id === post.userId);
        const profile = profilesData.find(p => p.userId === post.userId);
        const category = categoriesData.find(c => c.id === post.categoryId);
        const postReplies = repliesData.filter(r => r.postId === post.id);
        const postLikes = likesData.filter(l => l.postId === post.id);

        const replyCount = postReplies.length;
        const likeCount = postLikes.length;
        const isLiked = postLikes.some(like => like.userId === currentUserId);

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
          category: category || null,
          author: {
            id: author?.id || post.userId,
            name: profile?.nickname || author?.name || "Unknown",
            image: author?.image || null,
            role: profile?.bbsRole || "member"
          }
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: formattedPosts,
    });
  } catch (error: any) {
    console.error("[BBS_BOOKMARKS_GET]", error);
    return errorResponse("Internal Error", error?.message || "Failed to fetch bookmarks", 500);
  }
}
