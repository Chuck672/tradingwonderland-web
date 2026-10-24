import { NextRequest, NextResponse } from "next/server";
import { canonicalRedirectTarget } from "@/lib/canonical-host";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/stripe/webhook") {
    return NextResponse.next();
  }

  const forwardedHost = req.headers.get("x-forwarded-host");
  const hostHeader = forwardedHost?.split(",")[0]?.trim() || req.headers.get("host") || "";
  const target = canonicalRedirectTarget({
    hostHeader,
    requestProtocol: req.nextUrl.protocol,
    pathname: req.nextUrl.pathname,
    search: req.nextUrl.search,
  });

  if (!target) return NextResponse.next();
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
