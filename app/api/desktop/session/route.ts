import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { handleDesktopSession } from "@/lib/desktop-login";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Re-checks the Bearer token and that the membership is still active. Does not touch NextAuth cookies. */
export async function GET(req: NextRequest) {
  try {
    return await handleDesktopSession(req, {
      loadUser: async (id) => {
        const [user] = await db
          .select({
            id: users.id,
            email: users.email,
            membershipLevel: users.membershipLevel,
            vipUntil: users.vipUntil,
          })
          .from(users)
          .where(eq(users.id, id))
          .limit(1);
        return user ?? null;
      },
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    console.error("[DESKTOP_SESSION]", code || (error instanceof Error ? error.name : "unknown"));
    return Response.json(
      { error: "server", message: "Desktop session check failed." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
