import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbsPosts, bbsLikes } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { desc, eq, and, sql, gte } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Get first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Drizzle doesn't support complex aggregation over joins cleanly out of the box yet
    // We will fetch posts created this month, include likes, and sort in memory
    // For small/medium apps this is fine. For scale, raw SQL with GROUP BY is better.
    
    const posts = await db.query.bbsPosts.findMany({
      where: and(
        eq(bbsPosts.isDeleted, false),
        gte(bbsPosts.createdAt, firstDayOfMonth)
      ),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
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
        likes: {
          columns: {
            id: true,
          }
        }
      }
    });

    const formattedPosts = posts.map(post => {
      // @ts-ignore
      const profile = post.author?.bbsUserProfile?.[0] || post.author?.bbsUserProfile;
      // @ts-ignore
      const likeCount = post.likes?.length || 0;

      return {
        id: post.id,
        title: post.title,
        likeCount,
        authorName: profile?.nickname || post.author?.name || "Unknown",
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
