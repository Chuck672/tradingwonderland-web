import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// MT5 WebRequest Verification Endpoint
// Expected GET request: /api/mt5/verify?email=user@example.com&account=12345678&tool=sessionVolumeProfile-pro
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const accountId = searchParams.get("account");
    const toolId = searchParams.get("tool");

    if (!email || !accountId || !toolId) {
      return NextResponse.json(
        { status: "error", message: "Missing required parameters" },
        { status: 400 }
      );
    }

    // 1. Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        mt5Accounts: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // 2. Check if user is Premium and not expired
    const isPremium = (user.membershipLevel || 0) > 0;
    const isNotExpired = !user.vipUntil || new Date(user.vipUntil) > new Date();

    if (!isPremium || !isNotExpired) {
      return NextResponse.json(
        { status: "error", message: "Premium membership required or expired" },
        { status: 403 }
      );
    }

    // 3. Check if the MT5 account belongs to the user
    const hasAccount = user.mt5Accounts.some(
      (acc) => acc.accountId === accountId
    );

    if (!hasAccount) {
      return NextResponse.json(
        { status: "error", message: "MT5 account not authorized for this user" },
        { status: 403 }
      );
    }

    // All checks passed!
    return NextResponse.json({
      status: "ok",
      message: "Authorization successful",
      user: {
        name: user.name,
        vipUntil: user.vipUntil,
      },
      tool: toolId,
      account: accountId,
    });

  } catch (error) {
    console.error("MT5 Verification Error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
