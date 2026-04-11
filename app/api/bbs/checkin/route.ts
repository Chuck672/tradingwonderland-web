import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsCheckins, bbsUserProfiles } from "@/lib/schema/bbs";
import { getUserBBSRole, getPermissions, ensureBBSProfile } from "@/lib/bbs/permissions";
import { successResponse, errorResponse } from "@/lib/bbs/utils";
import { eq, and, desc, sql } from "drizzle-orm";

// Helper to get local date string YYYY-MM-DD
const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in", 401);
    }

    const today = getLocalDateString(new Date());

    // Check if user checked in today
    const todayCheckin = await db.query.bbsCheckins.findFirst({
      where: and(
        eq(bbsCheckins.userId, session.user.id),
        eq(bbsCheckins.checkinDate, today)
      ),
    });

    // Get profile for total checkins and max streak
    const profile = await ensureBBSProfile(session.user.id, session.user.name);

    // Get recent checkins (last 30 days)
    const recentCheckins = await db.query.bbsCheckins.findMany({
      where: eq(bbsCheckins.userId, session.user.id),
      orderBy: [desc(bbsCheckins.checkinDate)],
      limit: 30,
    });

    // Get current streak (either from today or yesterday)
    let currentStreak = 0;
    if (todayCheckin) {
      currentStreak = todayCheckin.streakDays || 1;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getLocalDateString(yesterday);
      
      const yesterdayCheckin = await db.query.bbsCheckins.findFirst({
        where: and(
          eq(bbsCheckins.userId, session.user.id),
          eq(bbsCheckins.checkinDate, yesterdayStr)
        ),
      });
      
      if (yesterdayCheckin) {
        currentStreak = yesterdayCheckin.streakDays || 1;
      }
    }

    return NextResponse.json(successResponse({
      hasCheckedInToday: !!todayCheckin,
      currentStreak,
      totalCheckins: profile?.totalCheckins || 0,
      maxStreak: profile?.maxStreak || 0,
      recentCheckins: recentCheckins.map(c => ({
        date: c.checkinDate,
        note: c.note,
        streakDays: c.streakDays,
      })),
    }));
  } catch (error) {
    console.error("[BBS_CHECKIN_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch checkin status", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "You must be logged in to check in", 401);
    }

    const role = await getUserBBSRole(session);
    const permissions = getPermissions(role);

    if (!permissions.canCheckin) {
      return errorResponse("Forbidden", "You do not have permission to check in", 403);
    }

    const body = await req.json();
    const note = body.note ? body.note.trim().substring(0, 500).replace(/</g, "&lt;").replace(/>/g, "&gt;") : null;

    const today = getLocalDateString(new Date());

    // 1. Check if already checked in today
    const existingCheckin = await db.query.bbsCheckins.findFirst({
      where: and(
        eq(bbsCheckins.userId, session.user.id),
        eq(bbsCheckins.checkinDate, today)
      ),
    });

    if (existingCheckin) {
      return errorResponse("Conflict", "You have already checked in today", 409);
    }

    // 2. Calculate streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    const yesterdayCheckin = await db.query.bbsCheckins.findFirst({
      where: and(
        eq(bbsCheckins.userId, session.user.id),
        eq(bbsCheckins.checkinDate, yesterdayStr)
      ),
    });

    const newStreak = yesterdayCheckin ? (yesterdayCheckin.streakDays || 0) + 1 : 1;

    // 3. Ensure profile exists
    const profile = await ensureBBSProfile(session.user.id, session.user.name);
    const newMaxStreak = Math.max(profile?.maxStreak || 0, newStreak);

    // 4. Perform checkin and update profile
    await db.insert(bbsCheckins).values({
      userId: session.user.id,
      checkinDate: today,
      note: note || null,
      streakDays: newStreak,
    });

    await db.update(bbsUserProfiles)
      .set({
        totalCheckins: sql`${bbsUserProfiles.totalCheckins} + 1`,
        maxStreak: newMaxStreak,
        updatedAt: new Date(),
      })
      .where(eq(bbsUserProfiles.userId, session.user.id));

    return NextResponse.json(successResponse({
      streakDays: newStreak,
      totalCheckins: (profile?.totalCheckins || 0) + 1,
      maxStreak: newMaxStreak,
    }, "Check-in successful"), { status: 201 });

  } catch (error: any) {
    console.error("[BBS_CHECKIN_POST]", error);
    return errorResponse("Internal Error", error?.message || "Failed to check in", 500);
  }
}
