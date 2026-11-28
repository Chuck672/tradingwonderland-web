import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { desktopDeviceDirectory } from "@/lib/desktop-device-db";
import { handleDesktopRefresh } from "@/lib/desktop-login";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Renews the access token for a computer that is already registered. Does not read NextAuth cookies. */
export async function POST(req: NextRequest) {
  try {
    return await handleDesktopRefresh(req, {
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
      devices: desktopDeviceDirectory,
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
    console.error("[DESKTOP_REFRESH]", code || (error instanceof Error ? error.name : "unknown"));
    return Response.json(
      { error: "server", message: "Desktop token refresh failed." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
