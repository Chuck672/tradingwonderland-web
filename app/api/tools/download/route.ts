import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

// 核心配置文件：工具 ID 对应的真实文件名和权限等级
const TOOLS_CONFIG: Record<string, { filename: string; level: number }> = {
  "SVP5_pro": { filename: "SessionVP_OldNewMoney_v4.ex5", level: 1 },
  "inRangeVP": { filename: "inRangeVP.ex5", level: 1 },
  "scalpTradingPanel": { filename: "scalpQuickPanelV11.ex5", level: 1 },
  "strengthBubble_pro": { filename: "DeltaVolumeBubbleV9.ex5", level: 1 },
  "Trend_Panel9_pro": { filename: "5of8_TrendPanel_v9.ex5", level: 1 },
  "microOrderFlow": { filename: "microOrderFlow_v11.ex5", level: 1 },
};

function resolveToolFilePath(filename: string) {
  const candidates: string[] = [];

  if (process.env.PRIVATE_TOOLS_DIR) {
    candidates.push(path.join(process.env.PRIVATE_TOOLS_DIR, filename));
  }

  if (process.env.PWD) {
    candidates.push(path.join(process.env.PWD, "private-tools", filename));
  }

  const cwd = process.cwd();
  candidates.push(path.join(cwd, "private-tools", filename));
  candidates.push(path.join(cwd, "..", "private-tools", filename));
  candidates.push(path.join(cwd, "..", "..", "private-tools", filename));

  candidates.push(path.join(cwd, ".next", "standalone", "private-tools", filename));
  candidates.push(path.join(cwd, "..", ".next", "standalone", "private-tools", filename));
  candidates.push(path.join(cwd, "..", "..", ".next", "standalone", "private-tools", filename));

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    // 1. 鉴权：获取当前登录用户的 Session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 });
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
      return NextResponse.json({ success: false, message: "用户信息异常" }, { status: 400 });
    }

    // 3. 验证参数
    const { searchParams } = new URL(req.url);
    const toolId = searchParams.get("toolId");

    if (!toolId || !TOOLS_CONFIG[toolId]) {
      return NextResponse.json({ success: false, message: "无效的工具请求" }, { status: 400 });
    }

    const toolConfig = TOOLS_CONFIG[toolId];

    // 4. 权限校验 (双重防御)
    const userLevel = currentUser.membershipLevel || 0;
    const isExpired = currentUser.vipUntil ? new Date(currentUser.vipUntil) < new Date() : true;

    if (userLevel < toolConfig.level || isExpired) {
      return NextResponse.json({ success: false, message: "您的会员等级不足或已过期，请续费后下载" }, { status: 403 });
    }

    const resolvedPath = resolveToolFilePath(toolConfig.filename);
    if (!resolvedPath) {
      return NextResponse.json(
        { success: false, message: "工具文件未部署到服务器，请等待部署完成后重试" },
        { status: 404 }
      );
    }

    const fileBuffer = await readFile(resolvedPath);

    // 6. 构造返回流，伪装成直接下载文件
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${toolConfig.filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Length": fileBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error("[API_DOWNLOAD] Error:", error);
    return NextResponse.json({ success: false, message: "服务器内部异常" }, { status: 500 });
  }
}
