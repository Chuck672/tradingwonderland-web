const APEX = "quantlogiclab.com";

export type CanonicalRedirectInput = {
  hostHeader: string;
  /** `URL.protocol` from the public request, e.g. "https:" or "http:". */
  requestProtocol: string;
  pathname: string;
  search: string;
};

function hostnameOnly(hostHeader: string): string {
  const host = hostHeader.trim().toLowerCase();
  if (!host) return "";
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end === -1 ? "" : host.slice(1, end);
  }
  return host.split(":")[0] ?? "";
}

function onQuantLogicLab(hostname: string): boolean {
  return hostname === APEX || hostname === `www.${APEX}` || hostname.endsWith(`.${APEX}`);
}

/**
 * Public redirect for quantlogiclab.com.
 * Returns null when the request should stay as-is.
 *
 * Hostinger's Node app listens on :3000. Building the Location from `req.url`
 * kept that port, so a www → apex rewrite became `https://quantlogiclab.com:3000/`.
 * The target is a fixed https origin and never copies the listen port.
 */
export function canonicalRedirectTarget(input: CanonicalRedirectInput): string | null {
  const hostname = hostnameOnly(input.hostHeader);
  if (!onQuantLogicLab(hostname)) return null;

  const pathname = input.pathname;
  if (!pathname.startsWith("/") || pathname.startsWith("//") || pathname.includes("\\") || pathname.includes("://")) {
    return null;
  }

  const isHttp = input.requestProtocol === "http:";
  const isWww = hostname === `www.${APEX}`;
  if (!isWww && !isHttp) return null;

  const targetHost = isWww ? APEX : hostname;
  const search = input.search.startsWith("?") && !/[\r\n\\]/.test(input.search) ? input.search : "";
  return `https://${targetHost}${pathname}${search}`;
}
