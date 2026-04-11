import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbsUserProfiles } from "@/lib/schema/bbs";
import { errorResponse } from "@/lib/bbs/utils";
import { desc, isNotNull, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "streak"; // 'streak' or 'total'
    const limit = 20;

    let orderByClause;
    
    if (type === "streak") {
      orderByClause = [desc(bbsUserProfiles.maxStreak)];
    } else if (type === "total") {
      orderByClause = [desc(bbsUserProfiles.totalCheckins)];
    } else {
      return errorResponse("Invalid Type", "Ranking type must be 'streak' or 'total'", 400);
    }

    const ranking = await db.query.bbsUserProfiles.findMany({
      where: isNotNull(bbsUserProfiles.userId),
      limit,
      orderBy: orderByClause,
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    });

    const formattedRanking = ranking.map((profile, index) => ({
      rank: index + 1,
      userId: profile.userId,
      name: profile.nickname || profile.user?.name || "Unknown",
      image: profile.user?.image || null,
      role: profile.bbsRole,
      score: type === "streak" ? profile.maxStreak : profile.totalCheckins,
    }));

    // Filter out users with 0 score
    const validRanking = formattedRanking.filter(item => (item.score || 0) > 0);

    return NextResponse.json({
      success: true,
      data: validRanking,
      type
    });
  } catch (error) {
    console.error("[BBS_RANKING_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch ranking", 500);
  }
}
