import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsLikes, bbsPosts, bbsReplies } from "@/lib/schema/bbs";
import { getUserBBSRole, getPermissions } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to like", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canLike) {
      return errorResponse("Forbidden", "You do not have permission to like", 403);
    }

    const body = await req.json();
    const { postId, replyId } = body;

    if (!postId && !replyId) {
      return errorResponse("Invalid Request", "Must provide either postId or replyId", 400);
    }
    if (postId && replyId) {
      return errorResponse("Invalid Request", "Cannot provide both postId and replyId", 400);
    }

    const userId = session.user.id;

    if (postId) {
      const pId = parseInt(postId);
      if (isNaN(pId)) return errorResponse("Invalid ID", "Post ID must be a number", 400);

      // Verify post exists
      const post = await db.query.bbsPosts.findFirst({
        where: and(eq(bbsPosts.id, pId), eq(bbsPosts.isDeleted, false)),
      });
      if (!post) return errorResponse("Not Found", "Post not found", 404);

      // Toggle logic
      const existingLike = await db.query.bbsLikes.findFirst({
        where: and(eq(bbsLikes.userId, userId), eq(bbsLikes.postId, pId)),
      });

      if (existingLike) {
        // Unlike
        await db.delete(bbsLikes).where(eq(bbsLikes.id, existingLike.id));
        return NextResponse.json(successResponse({ action: "unliked" }, "Post unliked successfully"));
      } else {
        // Like
        await db.insert(bbsLikes).values({
          userId,
          postId: pId,
        });
        return NextResponse.json(successResponse({ action: "liked" }, "Post liked successfully"), { status: 201 });
      }
    } else {
      const rId = parseInt(replyId);
      if (isNaN(rId)) return errorResponse("Invalid ID", "Reply ID must be a number", 400);

      // Verify reply exists
      const reply = await db.query.bbsReplies.findFirst({
        where: and(eq(bbsReplies.id, rId), eq(bbsReplies.isDeleted, false)),
      });
      if (!reply) return errorResponse("Not Found", "Reply not found", 404);

      // Toggle logic
      const existingLike = await db.query.bbsLikes.findFirst({
        where: and(eq(bbsLikes.userId, userId), eq(bbsLikes.replyId, rId)),
      });

      if (existingLike) {
        // Unlike
        await db.delete(bbsLikes).where(eq(bbsLikes.id, existingLike.id));
        return NextResponse.json(successResponse({ action: "unliked" }, "Reply unliked successfully"));
      } else {
        // Like
        await db.insert(bbsLikes).values({
          userId,
          replyId: rId,
        });
        return NextResponse.json(successResponse({ action: "liked" }, "Reply liked successfully"), { status: 201 });
      }
    }
  } catch (error) {
    console.error("[BBS_LIKES_POST]", error);
    return errorResponse("Internal Error", "Failed to process like", 500);
  }
}
