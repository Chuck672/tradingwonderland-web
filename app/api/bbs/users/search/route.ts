import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { bbsUserProfiles } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { eq, like, or, ilike } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    
    // Join users and bbsUserProfiles to search by name or nickname
    let dbQuery = db.select({
      id: users.id,
      name: users.name,
      image: users.image,
      nickname: bbsUserProfiles.nickname,
      role: bbsUserProfiles.bbsRole
    })
    .from(users)
    .leftJoin(bbsUserProfiles, eq(users.id, bbsUserProfiles.userId));

    // If query is empty, return top 10 active users
    if (query.trim().length > 0) {
      // NOTE: MySQL uses 'like' (which is case-insensitive by default in MySQL for most collations)
      // PostgreSQL uses 'ilike' for case-insensitive.
      // Since the user is using MySQL, we must use 'like' here.
      dbQuery = dbQuery.where(
        or(
          like(users.name, `%${query}%`),
          like(bbsUserProfiles.nickname, `%${query}%`)
        )
      ) as any;
    }

    const matchingUsers = await dbQuery.limit(10);

    const formattedData = matchingUsers.map(u => ({
      id: u.id,
      name: u.nickname || u.name || "Unknown",
      image: u.image,
      role: u.role || "member"
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("[BBS_USERS_SEARCH]", error);
    return errorResponse("Internal Error", "Failed to search users", 500);
  }
}