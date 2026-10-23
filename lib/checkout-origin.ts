const APEX_ORIGINS = ["https://quantlogiclab.com", "https://www.quantlogiclab.com"];

function originOf(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isCheckoutOriginAllowed(input: {
  originHeader: string | null;
  hostHeader: string | null;
  forwardedProto: string | null;
  nextOrigin: string;
  env?: NodeJS.ProcessEnv;
}): boolean {
  const origin = originOf(input.originHeader);
  if (!origin) return false;

  const allowed = new Set<string>(APEX_ORIGINS);
  const nextOrigin = originOf(input.nextOrigin);
  if (nextOrigin) allowed.add(nextOrigin);

  const proto = (input.forwardedProto || "").split(",")[0]?.trim().toLowerCase();
  const host = (input.hostHeader || "").split(",")[0]?.trim();
  if (host && (proto === "http" || proto === "https")) {
    const forwarded = originOf(`${proto}://${host}`);
    if (forwarded) allowed.add(forwarded);
  }

  const env = input.env ?? process.env;
  const extras = [env.NEXT_PUBLIC_SITE_URL, env.NEXTAUTH_URL, ...(env.ALLOWED_ORIGINS || "").split(",")];
  for (const raw of extras) {
    const parsed = originOf(raw?.trim());
    if (parsed) allowed.add(parsed);
  }

  return allowed.has(origin);
}
