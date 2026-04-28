import { NextRequest } from "next/server";

function normalizeOrigin(origin: string) {
  try {
    return new URL(origin).origin;
  } catch {
    return null;
  }
}

export function isAllowedOrigin(req: NextRequest) {
  const originHeader = req.headers.get("origin");
  const refererHeader = req.headers.get("referer");

  const origin = originHeader
    ? normalizeOrigin(originHeader)
    : refererHeader
      ? normalizeOrigin(refererHeader)
      : null;

  if (!origin) return false;

  const envList = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((o) => normalizeOrigin(o))
    .filter((o): o is string => Boolean(o));

  const inferred = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXTAUTH_URL,
  ]
    .filter(Boolean)
    .map((o) => normalizeOrigin(o as string))
    .filter((o): o is string => Boolean(o));

  const allowed = [...new Set([...envList, ...inferred])];

  if (allowed.length === 0) {
    return origin === req.nextUrl.origin;
  }
  return allowed.includes(origin);
}
