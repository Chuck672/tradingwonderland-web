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
import { openGithubReleaseAsset, resolveRemoteDownload } from "@/lib/download-target";

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
      const opened = await openGithubReleaseAsset(remote.assetUrl, remote.token);
      if (!opened.ok) {
        if (opened.reason === "rejected-host") {
          console.error("[DOWNLOAD_AGENT] signed url host rejected");
        } else {
          console.error("[DOWNLOAD_AGENT] github asset", opened.status);
        }
        return redirectTo("/dashboard?download=unconfigured");
      }
      if (opened.mode === "redirect") {
        return NextResponse.redirect(opened.location);
      }
      return new NextResponse(opened.body, { headers: attachment(remote.filename) });
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
