const APEX = "https://quantlogiclab.com";

/** Origin used for Stripe success/cancel URLs. Never emits the Hostinger listen port. */
export function getPublicSiteUrl(env: NodeJS.ProcessEnv = process.env): string {
  const raw = (env.NEXT_PUBLIC_SITE_URL || env.NEXTAUTH_URL || APEX).trim();
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (host === "quantlogiclab.com" || host === "www.quantlogiclab.com" || host.endsWith(".quantlogiclab.com")) {
      return APEX;
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return APEX;
    }
    return url.origin;
  } catch {
    return APEX;
  }
}
