import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsUserProfiles } from "@/lib/schema/bbs";
import { users } from "@/lib/schema";
import { getUserBBSRole, getPermissions } from "@/lib/bbs/permissions";
import { errorResponse, successResponse } from "@/lib/bbs/utils";
import { eq, like, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = await getUserBBSRole(session);
    
    // Only admins can view user roles for management
    if (role !== "admin") {
      return errorResponse("Forbidden", "Admin access required", 403);
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    let dbQuery = db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      membershipLevel: users.membershipLevel,
      bbsRole: bbsUserProfiles.bbsRole,
    })
    .from(users)
    .leftJoin(bbsUserProfiles, eq(users.id, bbsUserProfiles.userId));

    if (query.trim().length > 0) {
      dbQuery = dbQuery.where(
        or(
          like(users.name, `%${query}%`),
          like(users.email, `%${query}%`),
          like(bbsUserProfiles.nickname, `%${query}%`)
        )
      ) as any;
    }

    const results = await dbQuery.limit(50);

    return NextResponse.json(successResponse(results));
  } catch (error) {
    console.error("[ADMIN_USERS_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch users", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = await getUserBBSRole(session);
    
    // Only admins can change user roles
    if (role !== "admin") {
      return errorResponse("Forbidden", "Admin access required", 403);
    }

    const body = await req.json();
    const { userId, bbsRole } = body;

    if (!userId || !bbsRole) {
      return errorResponse("Bad Request", "Missing userId or bbsRole", 400);
    }

    if (!["member", "moderator", "admin"].includes(bbsRole)) {
      return errorResponse("Bad Request", "Invalid role specified", 400);
    }

    // Check if profile exists
    const profile = await db.query.bbsUserProfiles.findFirst({
      where: eq(bbsUserProfiles.userId, userId),
    });

    if (profile) {
      await db.update(bbsUserProfiles)
        .set({ bbsRole, updatedAt: new Date() })
        .where(eq(bbsUserProfiles.userId, userId));
    } else {
      // Create profile if it doesn't exist yet
      await db.insert(bbsUserProfiles).values({
        userId,
        bbsRole,
      });
    }

    return NextResponse.json(successResponse(null, "User role updated successfully"));
  } catch (error) {
    console.error("[ADMIN_USERS_PUT]", error);
    return errorResponse("Internal Error", "Failed to update user role", 500);
  }
}
