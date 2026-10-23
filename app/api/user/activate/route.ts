import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { activationCodes, users } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { isAllowedOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ success: false, code: "origin", message: "origin" }, { status: 403 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ success: false, code: "login", message: "login" }, { status: 401 });
    }

    const body = await req.json();
    let { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ success: false, code: "invalid", message: "invalid" }, { status: 400 });
    }

    // Format the code
    code = code.trim().toUpperCase();

    // Basic regex validation (allow PRO-, ULTRA-, or TWL- prefix)
    if (!/^(PRO|ULTRA|TWL)-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code)) {
      return NextResponse.json({ success: false, code: "format", message: "format" }, { status: 400 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Use transaction with pessimistic locking
    const result = await db.transaction(async (tx) => {
      // 1. SELECT ... FOR UPDATE (Pessimistic locking to prevent concurrent double-spend)
      const [activationCode] = await tx
        .select()
        .from(activationCodes)
        .where(eq(activationCodes.code, code))
        .for("update");

      if (!activationCode) {
        throw Object.assign(new Error("missing"), { code: "missing" });
      }

      if (activationCode.isUsed) {
        throw Object.assign(new Error("used"), { code: "used" });
      }

      // 2. Fetch current user data to determine new vipUntil
      const [currentUser] = await tx
        .select({
          membershipLevel: users.membershipLevel,
          vipUntil: users.vipUntil,
        })
        .from(users)
        .where(eq(users.id, userId))
        .for("update");

      if (!currentUser) {
        throw Object.assign(new Error("user"), { code: "user" });
      }

      // 3. Calculate new expiration date
      const now = new Date();
      let newVipUntil: Date;
      
      // 根据您的要求：方案A（直接覆盖逻辑），有效期统一从“当前时间（now）”开始重新计算
      newVipUntil = new Date(now.getTime() + activationCode.durationDays * 24 * 60 * 60 * 1000);

      // Calculate new level: MAX(current level, code level) or overwrite directly
      // In Scheme A, we overwrite directly to the code's level if it's higher, 
      // or we can just use MAX to be safe (so buying a PRO code doesn't downgrade an ULTRA user).
      const newLevel = Math.max(currentUser.membershipLevel || 0, activationCode.membershipLevel);

      // 4. Update the code to mark as used
      await tx
        .update(activationCodes)
        .set({
          isUsed: true,
          usedById: userId,
          usedByEmail: userEmail,
          usedAt: new Date(),
        })
        .where(eq(activationCodes.id, activationCode.id));

      // 5. Update user's membership info
      await tx
        .update(users)
        .set({
          membershipLevel: newLevel,
          vipUntil: newVipUntil,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      return {
        level: newLevel,
        vipUntil: newVipUntil.toISOString().split('T')[0], // Return YYYY-MM-DD
      };
    });

    // Transaction committed successfully
    return NextResponse.json({
      success: true,
      code: "ok",
      message: "ok",
      data: result,
    });

  } catch (error: unknown) {
    console.error("[API_ACTIVATE_CDKEY]", error);
    const code = error && typeof error === "object" && "code" in error && typeof error.code === "string" ? error.code : "server";
    const status = code === "missing" || code === "used" || code === "user" ? 400 : 500;
    return NextResponse.json({ success: false, code, message: code }, { status });
  }
}
