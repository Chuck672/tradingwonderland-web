import type { PlanId } from "./pricing";

function isPlanId(value: string | null): value is PlanId {
  return value === "149" || value === "349";
}

/** Relative path we will send a buyer to after login. Anything else becomes the dashboard. */
export function safeCallbackPath(value: string | null | undefined): string {
  if (!value) return "/dashboard";
  let decoded = value.trim();
  if (!decoded) return "/dashboard";
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return "/dashboard";
  }
  const pathOnly = decoded.split("?")[0] ?? decoded;
  if (!decoded.startsWith("/") || decoded.startsWith("//") || pathOnly.includes("\\") || pathOnly.includes("://")) {
    return "/dashboard";
  }
  let url: URL;
  try {
    url = new URL(decoded, "https://quantlogiclab.com");
  } catch {
    return "/dashboard";
  }
  if (url.origin !== "https://quantlogiclab.com" || url.username || url.password) return "/dashboard";
  if (url.pathname === "/dashboard") return "/dashboard";
  if (url.pathname === "/subscribe") {
    const plan = url.searchParams.get("plan");
    const keys = Array.from(url.searchParams.keys());
    if (isPlanId(plan) && keys.length === 1 && keys[0] === "plan") return `/subscribe?plan=${plan}`;
    return "/subscribe";
  }
  return "/dashboard";
}

export function loginPathForPlan(planId: PlanId): string {
  return `/login?callbackUrl=${encodeURIComponent(`/subscribe?plan=${planId}`)}`;
}
