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
  "SVP5_pro": { filename: "SVP5_pro.ex5", level: 1 },
  "inRangeVP": { filename: "inRangeVP.ex5", level: 1 },
  "scalpTradingPanel": { filename: "scalpTradingPanel.ex5", level: 1 },
  "strengthBubble_pro": { filename: "strengthBubble_pro.ex5", level: 1 },
  "Trend_Panel9_pro": { filename: "Trend_Panel9_pro.ex5", level: 1 },
  "microOrderFlow": { filename: "microOrderFlow.ex5", level: 1 },
};

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

    // 4. 权限校验 (双重防御)
    const userLevel = currentUser.membershipLevel || 0;
    const isExpired = currentUser.vipUntil ? new Date(currentUser.vipUntil) < new Date() : true;

    if (userLevel < toolConfig.level || isExpired) {
      return NextResponse.json({ success: false, code: "forbidden", message: "forbidden" }, { status: 403 });
    }

    // 5. 读取私有文件
    // process.cwd() 在某些部署环境可能发生偏移，改用 __dirname 向上追溯，或者直接用 process.env.PWD 结合兜底
    const basePath = process.env.PWD || process.cwd();
    const filePath = path.join(basePath, "private-tools", toolConfig.filename);

    if (!existsSync(filePath)) {
      // Fallback 1: Try alternative path mapping just in case of Next.js server standalone output structure
      const altPath = path.join(process.cwd(), ".next", "standalone", "private-tools", toolConfig.filename);
      if (existsSync(altPath)) {
        const altFileBuffer = await readFile(altPath);
        return new NextResponse(altFileBuffer, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${toolConfig.filename}"`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Content-Length": altFileBuffer.length.toString(),
          },
        });
      }

      // Fallback 2: Check if process.cwd() is inside public_html or nodejs and search relative to it
      // Hostinger often puts files one directory up or in specific web roots
      const fallbackPath3 = path.join(process.cwd(), "..", "private-tools", toolConfig.filename);
      if (existsSync(fallbackPath3)) {
        const fallbackBuffer3 = await readFile(fallbackPath3);
        return new NextResponse(fallbackBuffer3, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${toolConfig.filename}"`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Content-Length": fallbackBuffer3.length.toString(),
          },
        });
      }

      return NextResponse.json({ success: false, code: "file", message: "file" }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

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
    return NextResponse.json({ success: false, code: "server", message: "server" }, { status: 500 });
  }
}
