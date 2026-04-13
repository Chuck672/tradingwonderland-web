import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsPosts, bbsReplies } from "@/lib/schema/bbs";
import { getUserBBSRole, getPermissions } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, and, inArray } from "drizzle-orm";

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

    const [post] = await db.select().from(bbsPosts).where(and(eq(bbsPosts.id, postId), eq(bbsPosts.isDeleted, false))).limit(1);

    if (!post) {
      return errorResponse("Not Found", "Post not found", 404);
    }

    const { bbsCategories, bbsUserProfiles, bbsLikes, bbsBookmarks } = await import("@/lib/schema/bbs");
    const { users: schemaUsers } = await import("@/lib/schema");

    const [author] = await db.select().from(schemaUsers).where(eq(schemaUsers.id, post.userId)).limit(1);
    const [profile] = await db.select().from(bbsUserProfiles).where(eq(bbsUserProfiles.userId, post.userId)).limit(1);
    const [category] = await db.select().from(bbsCategories).where(eq(bbsCategories.id, post.categoryId)).limit(1);
    const postReplies = await db.select({ id: bbsReplies.id }).from(bbsReplies).where(and(eq(bbsReplies.postId, postId), eq(bbsReplies.isDeleted, false)));
    const postLikes = await db.select({ userId: bbsLikes.userId }).from(bbsLikes).where(eq(bbsLikes.postId, postId));
    const postBookmarks = await db.select({ userId: bbsBookmarks.userId }).from(bbsBookmarks).where(eq(bbsBookmarks.postId, postId));

    const likeCount = postLikes.length;
    const isLiked = currentUserId ? postLikes.some(like => like.userId === currentUserId) : false;
    const isBookmarked = currentUserId ? postBookmarks.some(bm => bm.userId === currentUserId) : false;

    const formattedPost = {
      ...post,
      replyCount: postReplies.length,
      likeCount,
      isLiked,
      isBookmarked,
      author: {
        id: author?.id || post.userId,
        name: profile?.nickname || author?.name || "Unknown",
        image: author?.image || null,
        role: profile?.bbsRole || "member",
      },
      category: category || null
    };

    // Note: We don't increment view count here because Next.js App Router GET requests 
    // are often cached. View counting should be done via a separate POST/PUT request
    // or handled on the client side to avoid cache invalidation issues.

    return NextResponse.json(successResponse(formattedPost));
  } catch (error) {
    console.error("[BBS_POST_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch post", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in", 401);
    }

    const postId = parseInt(id);
    if (isNaN(postId)) {
      return errorResponse("Invalid ID", "Post ID must be a number", 400);
    }

    const post = await db.query.bbsPosts.findFirst({
      where: and(eq(bbsPosts.id, postId), eq(bbsPosts.isDeleted, false)),
    });

    if (!post) {
      return errorResponse("Not Found", "Post not found", 404);
    }

    // Only author can edit content/title, but moderators/admins can edit isPinned status
    const body = await req.json();
    const { title, content, categoryId, images, isPinned } = body;

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    // If trying to edit content/title/category, must be author
    if ((title !== undefined || content !== undefined || categoryId !== undefined || images !== undefined) && post.userId !== session.user.id) {
      return errorResponse("Forbidden", "You can only edit your own posts", 403);
    }

    // If trying to pin/unpin, must have permission
    if (isPinned !== undefined && !permissions.canPinPost) {
      return errorResponse("Forbidden", "You do not have permission to pin posts", 403);
    }

    // Validate if provided
    if (title !== undefined && (title.trim().length === 0 || title.length > 100)) {
      return errorResponse("Invalid Title", "Title must be between 1 and 100 characters", 400);
    }

    if (content !== undefined && (content.trim().length === 0 || content.length > 5000)) {
      return errorResponse("Invalid Content", "Content must be between 1 and 5000 characters", 400);
    }

    await db.update(bbsPosts)
      .set({
        ...(title && { title: title.trim() }),
        ...(content && { content: content.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;") }),
        ...(categoryId && { categoryId: parseInt(categoryId) }),
        ...(images !== undefined && { images: Array.isArray(images) ? images.slice(0, 9) : null }),
        ...(isPinned !== undefined && { isPinned }),
        updatedAt: new Date(),
      })
      .where(eq(bbsPosts.id, postId));

    return NextResponse.json(successResponse(null, "Post updated successfully"));
  } catch (error) {
    console.error("[BBS_POST_PUT]", error);
    return errorResponse("Internal Error", "Failed to update post", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in", 401);
    }

    const postId = parseInt(id);
    if (isNaN(postId)) {
      return errorResponse("Invalid ID", "Post ID must be a number", 400);
    }

    const post = await db.query.bbsPosts.findFirst({
      where: and(eq(bbsPosts.id, postId), eq(bbsPosts.isDeleted, false)),
    });

    if (!post) {
      return errorResponse("Not Found", "Post not found", 404);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    // Can delete if it's their own post AND they have delete own post permission
    // OR if they have delete ANY post permission (moderator/admin)
    const canDelete = (post.userId === session.user.id && permissions.canDeleteOwnPost) || permissions.canDeleteAnyPost;

    if (!canDelete) {
      return errorResponse("Forbidden", "You do not have permission to delete this post", 403);
    }

    // Soft delete
    await db.update(bbsPosts)
      .set({ 
        isDeleted: true,
        updatedAt: new Date()
      })
      .where(eq(bbsPosts.id, postId));

    return NextResponse.json(successResponse(null, "Post deleted successfully"));
  } catch (error) {
    console.error("[BBS_POST_DELETE]", error);
    return errorResponse("Internal Error", "Failed to delete post", 500);
  }
}
