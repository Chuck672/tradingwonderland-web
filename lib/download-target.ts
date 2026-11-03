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

const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_USER_AGENT = "quantlogiclab-web";
const GITHUB_REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

export const DEFAULT_TOOLS_REPO = "Chuck672/PiTradingAgentV8";
/** In-memory map of release tag → asset id. Six dashboard clicks share one lookup. */
export const TOOL_RELEASE_CACHE_MS = 60_000;

export type DownloadFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type ToolReleaseConfig = {
  token: string;
  owner: string;
  repo: string;
  tag: string;
};

export type GithubAssetResult =
  | { ok: true; mode: "redirect"; location: string }
  | { ok: true; mode: "body"; body: ReadableStream<Uint8Array>; contentLength: string | null }
  | { ok: false; reason: "rejected-host" | "upstream"; status: number | null };

type ReleaseCacheEntry = {
  fetchedAt: number;
  assets: Map<string, number>;
};

const releaseCache = new Map<string, ReleaseCacheEntry>();
const releaseInflight = new Map<string, Promise<Map<string, number> | null>>();

export function clearToolReleaseCache(): void {
  releaseCache.clear();
  releaseInflight.clear();
}

function githubApiHeaders(token: string, accept: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: accept,
    "User-Agent": GITHUB_USER_AGENT,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

async function discard(response: Response): Promise<void> {
  try {
    await response.body?.cancel();
  } catch {
    // The caller is taking another path. A failed cancel should not hide that result.
  }
}

function contentLengthOf(response: Response): string | null {
  const value = response.headers.get("content-length");
  return value && /^\d+$/.test(value) ? value : null;
}

/**
 * Download one GitHub release asset.
 * `followSigned: false` (desktop installer) returns the signed URL for the browser.
 * `followSigned: true` (dashboard fetch) reads that URL on the server and returns the bytes.
 * Redirects are followed only when the host is a signed GitHub release host.
 */
export async function openGithubReleaseAsset(
  assetUrl: string,
  token: string,
  options?: { fetchImpl?: DownloadFetch; followSigned?: boolean },
): Promise<GithubAssetResult> {
  if (!GITHUB_ASSET.test(assetUrl) || !token.trim()) {
    return { ok: false, reason: "upstream", status: null };
  }
  const fetchImpl = options?.fetchImpl ?? fetch;
  const response = await fetchImpl(assetUrl, {
    redirect: "manual",
    cache: "no-store",
    headers: githubApiHeaders(token, "application/octet-stream"),
    signal: AbortSignal.timeout(20000),
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    await discard(response);
    if (!location || !isSignedReleaseHost(location)) {
      return { ok: false, reason: "rejected-host", status: response.status };
    }
    if (!options?.followSigned) {
      return { ok: true, mode: "redirect", location };
    }
    return readSignedRelease(location, fetchImpl, 3);
  }

  if (!response.ok || !response.body) {
    await discard(response);
    return { ok: false, reason: "upstream", status: response.status };
  }
  return { ok: true, mode: "body", body: response.body, contentLength: contentLengthOf(response) };
}

async function readSignedRelease(
  location: string,
  fetchImpl: DownloadFetch,
  hopsLeft: number,
): Promise<GithubAssetResult> {
  if (!isSignedReleaseHost(location) || hopsLeft <= 0) {
    return { ok: false, reason: "rejected-host", status: null };
  }
  const response = await fetchImpl(location, {
    redirect: "manual",
    cache: "no-store",
    headers: { "User-Agent": GITHUB_USER_AGENT },
    signal: AbortSignal.timeout(20000),
  });
  if (response.status >= 300 && response.status < 400) {
    const next = response.headers.get("location");
    await discard(response);
    if (!next || !isSignedReleaseHost(next)) {
      return { ok: false, reason: "rejected-host", status: response.status };
    }
    return readSignedRelease(next, fetchImpl, hopsLeft - 1);
  }
  if (!response.ok || !response.body) {
    await discard(response);
    return { ok: false, reason: "upstream", status: response.status };
  }
  return { ok: true, mode: "body", body: response.body, contentLength: contentLengthOf(response) };
}

/**
 * Remote MT5 release. Null means `/api/tools/download` should use `private-tools`.
 * `GITHUB_TOOLS_RELEASE_TAG` is required. `GITHUB_TOOLS_REPO` defaults to PiTradingAgentV8.
 */
export function resolveToolReleaseConfig(env: NodeJS.ProcessEnv = process.env): ToolReleaseConfig | null {
  const token = env.GITHUB_TOKEN?.trim() ?? "";
  const tag = env.GITHUB_TOOLS_RELEASE_TAG?.trim() ?? "";
  if (!token || !tag) return null;
  const repoSpec = env.GITHUB_TOOLS_REPO?.trim() || DEFAULT_TOOLS_REPO;
  if (!GITHUB_REPO.test(repoSpec)) return null;
  const slash = repoSpec.indexOf("/");
  const owner = repoSpec.slice(0, slash);
  const repo = repoSpec.slice(slash + 1);
  if (!owner || !repo) return null;
  return { token, owner, repo, tag };
}

export function toolReleaseByTagUrl(config: Pick<ToolReleaseConfig, "owner" | "repo" | "tag">): string {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/releases/tags/${encodeURIComponent(config.tag)}`;
}

export function toolReleaseAssetUrl(config: Pick<ToolReleaseConfig, "owner" | "repo">, assetId: number): string {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/releases/assets/${assetId}`;
}

/** Exact asset `name` match. The first positive integer id wins. */
export function findReleaseAssetId(assets: unknown, filename: string): number | null {
  if (!Array.isArray(assets)) return null;
  for (const asset of assets) {
    if (!asset || typeof asset !== "object") continue;
    const record = asset as { name?: unknown; id?: unknown };
    if (record.name !== filename) continue;
    if (typeof record.id !== "number" || !Number.isInteger(record.id) || record.id <= 0) continue;
    return record.id;
  }
  return null;
}

function releaseAssetIds(payload: unknown): Map<string, number> {
  const map = new Map<string, number>();
  if (!payload || typeof payload !== "object") return map;
  const assets = (payload as { assets?: unknown }).assets;
  if (!Array.isArray(assets)) return map;
  for (const asset of assets) {
    if (!asset || typeof asset !== "object") continue;
    const name = (asset as { name?: unknown }).name;
    if (typeof name !== "string" || map.has(name)) continue;
    const id = findReleaseAssetId([asset], name);
    if (id) map.set(name, id);
  }
  return map;
}

function releaseCacheKey(config: ToolReleaseConfig): string {
  return `${config.owner}/${config.repo}\n${config.tag}`;
}

async function fetchReleaseAssets(config: ToolReleaseConfig, fetchImpl: DownloadFetch): Promise<Map<string, number> | null> {
  const response = await fetchImpl(toolReleaseByTagUrl(config), {
    cache: "no-store",
    headers: githubApiHeaders(config.token, "application/vnd.github+json"),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    await discard(response);
    return null;
  }
  try {
    return releaseAssetIds(await response.json());
  } catch {
    return null;
  }
}

async function loadReleaseAssets(
  config: ToolReleaseConfig,
  options?: { fetchImpl?: DownloadFetch; now?: number },
): Promise<Map<string, number> | null> {
  const now = options?.now ?? Date.now();
  const key = releaseCacheKey(config);
  const cached = releaseCache.get(key);
  if (cached && now >= cached.fetchedAt && now - cached.fetchedAt < TOOL_RELEASE_CACHE_MS) {
    return cached.assets;
  }

  const pending = releaseInflight.get(key);
  if (pending) return pending;

  const fetchedAt = now;
  const request = fetchReleaseAssets(config, options?.fetchImpl ?? fetch)
    .then((assets) => {
      if (assets) releaseCache.set(key, { fetchedAt, assets });
      return assets;
    })
    .finally(() => {
      if (releaseInflight.get(key) === request) releaseInflight.delete(key);
    });
  releaseInflight.set(key, request);
  return request;
}

/**
 * Asset API URL for one tool file, or null so the route can fall back to `private-tools`.
 * A missing token/tag does not call GitHub. A failed lookup is not cached.
 */
export async function resolveRemoteToolDownload(
  filename: string,
  env: NodeJS.ProcessEnv = process.env,
  options?: { fetchImpl?: DownloadFetch; now?: number },
): Promise<{ assetUrl: string; token: string } | null> {
  const config = resolveToolReleaseConfig(env);
  if (!config) return null;
  const assets = await loadReleaseAssets(config, options);
  if (!assets) return null;
  const assetId = assets.get(filename);
  if (!assetId) return null;
  const assetUrl = toolReleaseAssetUrl(config, assetId);
  if (!GITHUB_ASSET.test(assetUrl)) return null;
  return { assetUrl, token: config.token };
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
