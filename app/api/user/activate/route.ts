import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { activationCodes, users } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 });
    }

    const body = await req.json();
    let { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ success: false, message: "请输入有效的激活码" }, { status: 400 });
    }

    // Format the code
    code = code.trim().toUpperCase();

    // Basic regex validation
    if (!/^TWL-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code)) {
      return NextResponse.json({ success: false, message: "激活码格式不正确" }, { status: 400 });
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
        throw new Error("激活码不存在");
      }

      if (activationCode.isUsed) {
        throw new Error("该激活码已被使用");
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
        throw new Error("用户信息异常");
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
      message: `激活成功！您已成为 ${result.level === 2 ? 'ULTRA' : 'PRO'} 会员，有效期至 ${result.vipUntil}`,
      data: result,
    });

  } catch (error: any) {
    console.error("[API_ACTIVATE_CDKEY]", error);
    // Determine if it's our controlled error or a system crash
    const errMsg = error.message || "服务器异常，请稍后再试";
    const status = ["激活码不存在", "该激活码已被使用", "用户信息异常"].includes(errMsg) ? 400 : 500;
    
    return NextResponse.json({ success: false, message: errMsg }, { status });
  }
}