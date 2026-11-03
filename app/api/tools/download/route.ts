import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { isMembershipActive } from "@/lib/license";
import { openGithubReleaseAsset, resolveRemoteToolDownload } from "@/lib/download-target";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 核心配置文件：工具 ID 对应的真实文件名和权限等级
const TOOLS_CONFIG: Record<string, { filename: string; level: number }> = {
  "SVP5_pro": { filename: "SVP5_pro.ex5", level: 1 },
  "inRangeVP": { filename: "inRangeVP.ex5", level: 1 },
  "scalpTradingPanel": { filename: "scalpTradingPanel.ex5", level: 1 },
  "strengthBubble_pro": { filename: "strengthBubble_pro.ex5", level: 1 },
  "Trend_Panel9_pro": { filename: "Trend_Panel9_pro.ex5", level: 1 },
  "microOrderFlow": { filename: "microOrderFlow.ex5", level: 1 },
};

function attachmentHeaders(filename: string, contentLength?: number | string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="${filename.replace(/["\r\n]/g, "")}"`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
  };
  if (typeof contentLength === "number") headers["Content-Length"] = String(contentLength);
  else if (typeof contentLength === "string" && /^\d+$/.test(contentLength)) headers["Content-Length"] = contentLength;
  return headers;
}

/** GitHub release first. Any miss or error returns null so the caller can use private-tools. */
async function readRemoteTool(filename: string): Promise<NextResponse | null> {
  try {
    const remote = await resolveRemoteToolDownload(filename);
    if (!remote) return null;
    const opened = await openGithubReleaseAsset(remote.assetUrl, remote.token, { followSigned: true });
    if (opened.ok && opened.mode === "body") {
      return new NextResponse(opened.body, { headers: attachmentHeaders(filename, opened.contentLength) });
    }
    console.error("[API_DOWNLOAD] github asset fallback", opened.ok ? opened.mode : opened.reason, opened.ok ? "" : opened.status);
    return null;
  } catch (error) {
    console.error("[API_DOWNLOAD] github", error instanceof Error ? error.message : "unknown");
    return null;
  }
}

function bufferStream(buffer: Buffer): ReadableStream<Uint8Array> {
  const bytes = new Uint8Array(buffer.byteLength);
  bytes.set(buffer);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

/** Same private-tools locations the desktop installer uses, in the same order. */
async function readPrivateTool(filename: string): Promise<Buffer | null> {
  if (!/^[A-Za-z0-9._-]+$/.test(filename)) return null;
  const candidates = [
    path.join(process.env.PWD || process.cwd(), "private-tools", filename),
    path.join(process.cwd(), ".next", "standalone", "private-tools", filename),
    path.join(process.cwd(), "..", "private-tools", filename),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return readFile(candidate);
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    // 1. 鉴权：获取当前登录用户的 Session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, code: "login", message: "login" }, { status: 401 });
    }

    // 2. 查库：获取用户最新状态，防止通过篡改本地 Session 越权
    const [currentUser] = await db
      .select({
        membershipLevel: users.membershipLevel,
        vipUntil: users.vipUntil,
      })
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!currentUser) {
      return NextResponse.json({ success: false, code: "user", message: "user" }, { status: 400 });
    }

    // 3. 验证参数
    const { searchParams } = new URL(req.url);
    const toolId = searchParams.get("toolId");

    if (!toolId || !TOOLS_CONFIG[toolId]) {
      return NextResponse.json({ success: false, code: "invalid", message: "invalid" }, { status: 400 });
    }

    const toolConfig = TOOLS_CONFIG[toolId];

    // Null/empty vipUntil has no expiry. Only a concrete past date blocks the download.
    if (!isMembershipActive(currentUser.membershipLevel || 0, currentUser.vipUntil, toolConfig.level)) {
      return NextResponse.json({ success: false, code: "forbidden", message: "forbidden" }, { status: 403 });
    }

    const remoteFile = await readRemoteTool(toolConfig.filename);
    if (remoteFile) return remoteFile;

    const localFile = await readPrivateTool(toolConfig.filename);
    if (!localFile) {
      return NextResponse.json({ success: false, code: "file", message: "file" }, { status: 404 });
    }

    return new NextResponse(bufferStream(localFile), {
      headers: attachmentHeaders(toolConfig.filename, localFile.length),
    });

  } catch (error) {
    console.error("[API_DOWNLOAD] Error:", error);
    return NextResponse.json({ success: false, code: "server", message: "server" }, { status: 500 });
  }
}
