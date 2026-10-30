import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import { Readable } from "stream";
import path from "path";
import { existsSync } from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getPublicSiteUrl } from "@/lib/site-url";
import { canDownloadDesktop } from "@/lib/license";
import { isSignedReleaseHost, resolveRemoteDownload } from "@/lib/download-target";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INSTALLER_FILE = "PiTradingAgent-Setup.zip";

function redirectTo(pathname: string) {
  return NextResponse.redirect(new URL(pathname, getPublicSiteUrl()));
}

function attachment(filename: string) {
  const safe = filename.replace(/["\r\n]/g, "");
  return {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="${safe}"`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "X-Content-Type-Options": "nosniff",
  };
}

function localInstallerPath(): string | null {
  const bases = [
    path.join(process.env.PWD || process.cwd(), "private-tools", INSTALLER_FILE),
    path.join(process.cwd(), ".next", "standalone", "private-tools", INSTALLER_FILE),
    path.join(process.cwd(), "..", "private-tools", INSTALLER_FILE),
  ];
  return bases.find((candidate) => existsSync(candidate)) ?? null;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirectTo(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  const [currentUser] = await db
    .select({
      membershipLevel: users.membershipLevel,
      vipUntil: users.vipUntil,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!currentUser || !canDownloadDesktop(currentUser.membershipLevel || 0, currentUser.vipUntil)) {
    return redirectTo("/dashboard?download=forbidden");
  }

  const remote = resolveRemoteDownload();
  if (remote?.kind === "redirect") {
    return NextResponse.redirect(remote.url);
  }

  if (remote?.kind === "github") {
    try {
      const upstream = await fetch(remote.assetUrl, {
        redirect: "manual",
        headers: {
          Authorization: `Bearer ${remote.token}`,
          Accept: "application/octet-stream",
          "User-Agent": "quantlogiclab-web",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: AbortSignal.timeout(20000),
      });
      if (upstream.status >= 300 && upstream.status < 400) {
        const location = upstream.headers.get("location");
        if (location && isSignedReleaseHost(location)) {
          return NextResponse.redirect(location);
        }
        console.error("[DOWNLOAD_AGENT] signed url host rejected");
        return redirectTo("/dashboard?download=unconfigured");
      }
      if (!upstream.ok || !upstream.body) {
        console.error("[DOWNLOAD_AGENT] github asset", upstream.status);
        return redirectTo("/dashboard?download=unconfigured");
      }
      return new NextResponse(upstream.body, { headers: attachment(remote.filename) });
    } catch (error) {
      console.error("[DOWNLOAD_AGENT] github", error instanceof Error ? error.message : "unknown");
      return redirectTo("/dashboard?download=unconfigured");
    }
  }

  const filePath = localInstallerPath();
  if (!filePath) {
    return redirectTo("/dashboard?download=unconfigured");
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  return new NextResponse(stream, { headers: attachment(INSTALLER_FILE) });
}
