import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto");

  const isQuantLogicLab =
    host === "quantlogiclab.com" ||
    host === "www.quantlogiclab.com" ||
    host.endsWith(".quantlogiclab.com");

  if (!isQuantLogicLab) return NextResponse.next();

  const nextUrl = new URL(req.url);
  let changed = false;

  if (host === "www.quantlogiclab.com") {
    nextUrl.hostname = "quantlogiclab.com";
    changed = true;
  }

  if (proto === "http" || nextUrl.protocol === "http:") {
    nextUrl.protocol = "https:";
    changed = true;
  }

  if (!changed) return NextResponse.next();

  return NextResponse.redirect(nextUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
