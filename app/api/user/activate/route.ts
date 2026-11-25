import { NextRequest, NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/security";

/**
 * Customer license-code redemption is retired.
 * The origin check stays as strict as before. This route does not read a code,
 * does not write activation_codes, and does not touch NextAuth session cookies.
 */
export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, code: "origin", message: "origin" }, { status: 403 });
  }

  return NextResponse.json(
    { success: false, code: "retired", message: "retired" },
    { status: 410 },
  );
}
