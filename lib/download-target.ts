const GITHUB_ASSET = /^https:\/\/api\.github\.com\/repos\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/releases\/assets\/\d+$/;

export type RemoteDownload =
  | { kind: "github"; assetUrl: string; token: string; filename: string }
  | { kind: "redirect"; url: string; filename: string };

export function safeDownloadFilename(value: string | undefined): string {
  const raw = (value || "PiTradingAgent-Setup.zip").trim();
  const base = raw.split(/[/\\]/).pop() || "PiTradingAgent-Setup.zip";
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "");
  if (!cleaned || cleaned === "." || cleaned === "..") return "PiTradingAgent-Setup.zip";
  return cleaned.slice(0, 80);
}

/** Browser-facing object URL. GitHub website pages are rejected so the buyer never lands on the repo UI. */
export function isBrowserDownloadUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return false;
    const host = url.hostname.toLowerCase();
    if (host === "github.com" || host === "www.github.com") return false;
    if (host === "gitlab.com" || host === "www.gitlab.com") return false;
    if (host === "api.github.com") return false;
    return true;
  } catch {
    return false;
  }
}

/** Hosts GitHub uses for the short-lived file URL after the API asset request. */
export function isSignedReleaseHost(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return host === "release-assets.githubusercontent.com" || host.endsWith(".githubusercontent.com");
  } catch {
    return false;
  }
}

/**
 * Remote installer source.
 * GitHub API asset + token wins. Otherwise an https object-storage URL.
 * A missing result means the route should try private-tools/PiTradingAgent-Setup.zip.
 */
export function resolveRemoteDownload(env: NodeJS.ProcessEnv = process.env): RemoteDownload | null {
  const filename = safeDownloadFilename(env.PITRADINGAGENT_DOWNLOAD_FILENAME);
  const token = env.GITHUB_TOKEN?.trim() ?? "";
  const asset = env.GITHUB_RELEASE_ASSET_URL?.trim() ?? "";
  if (token && GITHUB_ASSET.test(asset)) {
    return { kind: "github", assetUrl: asset, token, filename };
  }
  const direct = env.PITRADINGAGENT_DOWNLOAD_URL?.trim() ?? "";
  if (direct && isBrowserDownloadUrl(direct)) {
    return { kind: "redirect", url: direct, filename };
  }
  return null;
}

export function withPaymentLinkIdentity(paymentLinkUrl: string, userId: string, email: string): string | null {
  try {
    const url = new URL(paymentLinkUrl);
    if (url.protocol !== "https:") return null;
    url.searchParams.set("client_reference_id", userId);
    url.searchParams.set("prefilled_email", email);
    return url.toString();
  } catch {
    return null;
  }
}
