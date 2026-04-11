import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbsPosts } from "@/lib/schema/bbs";
import { errorResponse, successResponse } from "@/lib/bbs/utils";
import { eq, sql } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return errorResponse("Invalid ID", "Post ID must be a number", 400);
    }

    // Increment viewCount safely using SQL operator
    await db.update(bbsPosts)
      .set({
        viewCount: sql`${bbsPosts.viewCount} + 1`
      })
      .where(eq(bbsPosts.id, postId));

    return NextResponse.json(successResponse(null, "View count incremented"));
  } catch (error) {
    console.error("[BBS_POST_VIEW]", error);
    return errorResponse("Internal Error", "Failed to increment view count", 500);
  }
}
