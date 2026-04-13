import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbsPosts, bbsLikes } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { desc, eq, and, sql, gte, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Get first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Drizzle doesn't support complex aggregation over joins cleanly out of the box yet
    // We will fetch posts created this month, include likes, and sort in memory
    // For small/medium apps this is fine. For scale, raw SQL with GROUP BY is better.
    
    const rawPosts = await db.select().from(bbsPosts).where(and(
      eq(bbsPosts.isDeleted, false),
      gte(bbsPosts.createdAt, firstDayOfMonth)
    ));

    const postIds = rawPosts.map(p => p.id);
    const authorIds = [...new Set(rawPosts.map(p => p.userId))];

    const { bbsUserProfiles } = await import("@/lib/schema/bbs");
    const { users: schemaUsers } = await import("@/lib/schema");

    const authorsData = authorIds.length > 0 ? await db.select().from(schemaUsers).where(inArray(schemaUsers.id, authorIds)) : [];
    const profilesData = authorIds.length > 0 ? await db.select().from(bbsUserProfiles).where(inArray(bbsUserProfiles.userId, authorIds)) : [];
    const likesData = postIds.length > 0 ? await db.select({ userId: bbsLikes.userId, postId: bbsLikes.postId }).from(bbsLikes).where(inArray(bbsLikes.postId, postIds)) : [];

    const formattedPosts = rawPosts.map(post => {
      const author = authorsData.find(a => a.id === post.userId);
      const profile = profilesData.find(p => p.userId === post.userId);
      const postLikes = likesData.filter(l => l.postId === post.id);

      const likeCount = postLikes.length;

      return {
        id: post.id,
        title: post.title,
        likeCount,
        authorName: profile?.nickname || author?.name || "Unknown",
      };
    });

    // Sort by likes descending and take top 10
    const topPosts = formattedPosts
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: topPosts,
    });
  } catch (error) {
    console.error("[BBS_TOP_POSTS_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch top posts", 500);
  }
}
