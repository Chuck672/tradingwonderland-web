import type { PlanId } from "./pricing";

function isPlanId(value: unknown): value is PlanId {
  return value === "149" || value === "349";
}

/** Stripe-issued licenses include one year of product updates, matching the product page. */
export const STRIPE_LICENSE_DAYS = 365;

export function planMembershipLevel(planId: PlanId): number {
  return planId === "349" ? 2 : 1;
}

export function nextMembershipLevel(current: number, planLevel: number): number {
  return Math.max(current || 0, planLevel);
}

/** Fixed end date from the order time, so a webhook retry does not stack another year. */
export function grantUntil(anchor: Date, durationDays: number): Date {
  return new Date(anchor.getTime() + durationDays * 24 * 60 * 60 * 1000);
}

/** Keep a later existing expiry. Never shorten a license the buyer already has. */
export function nextVipUntil(current: Date | null, grantEnd: Date): Date {
  if (current && current.getTime() > grantEnd.getTime()) return current;
  return grantEnd;
}

export function isLicenseCode(value: string): boolean {
  return /^(PRO|ULTRA|TWL)-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(value);
}

const PLAN_CENTS: Record<number, PlanId> = {
  14900: "149",
  34900: "349",
};

/** Metadata wins. Payment Links may omit it, so the one-time USD amounts are the fallback. */
export function planIdFromCheckout(input: {
  metadataPlanId?: string | null;
  amountSubtotal?: number | null;
  amountTotal?: number | null;
}): PlanId | null {
  if (isPlanId(input.metadataPlanId)) return input.metadataPlanId;
  for (const amount of [input.amountSubtotal, input.amountTotal]) {
    if (typeof amount === "number" && PLAN_CENTS[amount]) return PLAN_CENTS[amount];
  }
  return null;
}

export function canDownloadDesktop(level: number, vipUntil: Date | string | null, now = new Date()): boolean {
  if (level < 2) return false;
  if (!vipUntil) return true;
  const expiry = vipUntil instanceof Date ? vipUntil : new Date(vipUntil);
  return expiry.getTime() > now.getTime();
}
