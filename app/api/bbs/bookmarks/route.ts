import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsBookmarks, bbsPosts } from "@/lib/schema/bbs";
import { getUserBBSRole, getPermissions } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to bookmark", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canBookmark) {
      return errorResponse("Forbidden", "You do not have permission to bookmark", 403);
    }

    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return errorResponse("Invalid Request", "Must provide postId", 400);
    }

    const userId = session.user.id;
    const pId = parseInt(postId);
    
    if (isNaN(pId)) return errorResponse("Invalid ID", "Post ID must be a number", 400);

    // Verify post exists
    const post = await db.query.bbsPosts.findFirst({
      where: and(eq(bbsPosts.id, pId), eq(bbsPosts.isDeleted, false)),
    });
    
    if (!post) return errorResponse("Not Found", "Post not found", 404);

    // Toggle logic
    const existingBookmark = await db.query.bbsBookmarks.findFirst({
      where: and(eq(bbsBookmarks.userId, userId), eq(bbsBookmarks.postId, pId)),
    });

    if (existingBookmark) {
      // Unbookmark
      await db.delete(bbsBookmarks).where(eq(bbsBookmarks.id, existingBookmark.id));
      return NextResponse.json(successResponse({ action: "unbookmarked" }, "Post removed from bookmarks"));
    } else {
      // Bookmark
      await db.insert(bbsBookmarks).values({
        userId,
        postId: pId,
      });
      return NextResponse.json(successResponse({ action: "bookmarked" }, "Post bookmarked successfully"), { status: 201 });
    }
  } catch (error) {
    console.error("[BBS_BOOKMARKS_POST]", error);
    return errorResponse("Internal Error", "Failed to process bookmark", 500);
  }
}
