import { NextRequest } from "next/server";
import { verifyEmailPassword } from "@/lib/credentials";
import { handleDesktopLogin } from "@/lib/desktop-login";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PiTradingAgent main-process login. No NextAuth cookie is read or written. */
export async function POST(req: NextRequest) {
  try {
    return await handleDesktopLogin(req, {
      verify: async (email, password) => {
        const verified = await verifyEmailPassword(email, password);
        if (!verified.ok) return verified;
        return {
          ok: true,
          user: {
            id: verified.user.id,
            email: verified.user.email,
            membershipLevel: verified.user.membershipLevel,
            vipUntil: verified.user.vipUntil,
          },
        };
      },
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    console.error("[DESKTOP_LOGIN]", code || (error instanceof Error ? error.name : "unknown"));
    return Response.json(
      { error: "server", message: "Desktop sign-in failed." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
