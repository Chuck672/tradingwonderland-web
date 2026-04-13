import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsPosts, bbsReplies, bbsUserProfiles } from "@/lib/schema/bbs";
import { getUserBBSRole, getPermissions, ensureBBSProfile } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, and, desc, asc, sql, inArray } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return errorResponse("Invalid ID", "Post ID must be a number", 400);
    }

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const rawReplies = await db.select().from(bbsReplies).where(and(eq(bbsReplies.postId, postId), eq(bbsReplies.isDeleted, false))).orderBy(asc(bbsReplies.createdAt));
    
    const replyIds = rawReplies.map(r => r.id);
    const authorIds = [...new Set(rawReplies.map(r => r.userId))];

    const { bbsLikes } = await import("@/lib/schema/bbs");
    const { users: schemaUsers } = await import("@/lib/schema");

    const authorsData = authorIds.length > 0 ? await db.select().from(schemaUsers).where(inArray(schemaUsers.id, authorIds)) : [];
    const profilesData = authorIds.length > 0 ? await db.select().from(bbsUserProfiles).where(inArray(bbsUserProfiles.userId, authorIds)) : [];
    const likesData = replyIds.length > 0 ? await db.select({ userId: bbsLikes.userId, replyId: bbsLikes.replyId }).from(bbsLikes).where(inArray(bbsLikes.replyId, replyIds)) : [];

    const formattedReplies = rawReplies.map(reply => {
      const author = authorsData.find(a => a.id === reply.userId);
      const profile = profilesData.find(p => p.userId === reply.userId);
      const replyLikes = likesData.filter(l => l.replyId === reply.id);
      
      const likeCount = replyLikes.length;
      const isLiked = currentUserId ? replyLikes.some(like => like.userId === currentUserId) : false;
      
      return {
        id: reply.id,
        content: reply.content,
        createdAt: reply.createdAt,
        likeCount,
        isLiked,
        author: {
          id: author?.id || reply.userId,
          name: profile?.nickname || author?.name || "Unknown",
          image: author?.image || null,
          role: profile?.bbsRole || "member"
        }
      };
    });

    return NextResponse.json(successResponse(formattedReplies));
  } catch (error) {
    console.error("[BBS_REPLIES_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch replies", 500);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to reply", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canReply) {
      return errorResponse("Forbidden", "You do not have permission to reply", 403);
    }

    const postId = parseInt(id);
    if (isNaN(postId)) {
      return errorResponse("Invalid ID", "Post ID must be a number", 400);
    }

    // Check if post exists and is not deleted
    const post = await db.query.bbsPosts.findFirst({
      where: and(eq(bbsPosts.id, postId), eq(bbsPosts.isDeleted, false)),
    });

    if (!post) {
      return errorResponse("Not Found", "Post not found or has been deleted", 404);
    }

    const body = await req.json();
    const { content } = body;

    if (!content || content.trim().length === 0 || content.length > 2000) {
      return errorResponse("Invalid Content", "Reply content is required and must be under 2000 characters", 400);
    }

    // Ensure user profile exists
    await ensureBBSProfile(session.user.id, session.user.name);

    // Create reply
    const [result] = await db.insert(bbsReplies).values({
      postId,
      userId: session.user.id,
      // Basic XSS protection
      content: content.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    });

    // Update user reply count
    await db.update(bbsUserProfiles)
      .set({
        replyCount: sql`${bbsUserProfiles.replyCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(bbsUserProfiles.userId, session.user.id));

    return NextResponse.json(successResponse({ id: result.insertId }, "Reply posted successfully"), { status: 201 });
  } catch (error) {
    console.error("[BBS_REPLIES_POST]", error);
    return errorResponse("Internal Error", "Failed to post reply", 500);
  }
}
