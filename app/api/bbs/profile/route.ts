import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { bbsUserProfiles } from "@/lib/schema/bbs";
import { errorResponse, successResponse } from "@/lib/bbs/utils";
import { eq } from "drizzle-orm";
import { getUserBBSRole, ensureBBSProfile } from "@/lib/bbs/permissions";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "Please login to view profile", 401);
    }

    const userId = session.user.id;
    
    // Ensure profile exists and fetch it
    const profile = await ensureBBSProfile(userId, session.user.name);
    
    // Dynamically compute the real BBS role (taking membershipLevel and vipUntil into account)
    const realRole = await getUserBBSRole(session);

    return NextResponse.json({
      success: true,
      data: {
        ...profile,
        bbsRole: realRole, // Override the DB static role with the computed real role
        user: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }
      }
    });
  } catch (error) {
    console.error("[BBS_PROFILE_GET]", error);
    return errorResponse("Internal Error", "Failed to fetch profile", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return errorResponse("Unauthorized", "Please login to update profile", 401);
    }

    const body = await req.json();
    const { nickname, signature } = body;

    // Validate lengths
    if (nickname && nickname.length > 50) {
      return errorResponse("Invalid Input", "Nickname must be under 50 characters", 400);
    }
    if (signature && signature.length > 200) {
      return errorResponse("Invalid Input", "Signature must be under 200 characters", 400);
    }

    const updateData: any = { updatedAt: new Date() };
    if (nickname !== undefined) updateData.nickname = nickname;
    if (signature !== undefined) updateData.signature = signature;

    // Ensure profile exists before updating
    await ensureBBSProfile(session.user.id, session.user.name);

    await db.update(bbsUserProfiles)
      .set(updateData)
      .where(eq(bbsUserProfiles.userId, session.user.id));

    return NextResponse.json(successResponse(null, "Profile updated successfully"));
  } catch (error) {
    console.error("[BBS_PROFILE_PUT]", error);
    return errorResponse("Internal Error", "Failed to update profile", 500);
  }
}
