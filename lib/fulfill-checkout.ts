import "server-only";
import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "./db";
import { activationCodes, checkoutFulfillments, users } from "./schema";
import {
  STRIPE_LICENSE_DAYS,
  grantUntil,
  nextMembershipLevel,
  nextVipUntil,
  planIdFromCheckout,
  planMembershipLevel,
} from "./license";
import { isPlanId, type PlanId } from "./pricing";

export type FulfillInput = {
  stripeSessionId: string;
  paymentStatus: string | null;
  metadataPlanId?: string | null;
  amountSubtotal?: number | null;
  amountTotal?: number | null;
  userId?: string | null;
  email?: string | null;
  currency?: string | null;
  /**
   * Stripe Checkout Session `created`. Webhook retries must pass the same instant
   * so `nextVipUntil` does not stack another year. New checkouts are stored on
   * `checkout_fulfillments`, not as a license code.
   */
  purchasedAt?: Date | null;
};

export type FulfillResult = {
  status: "applied" | "duplicate" | "pending_user";
  planId: PlanId;
  userId: string | null;
  email: string | null;
  membershipLevel: number;
};

type Ignored = { status: "ignored"; reason: string };

const MIGRATION_HINT =
  "run drizzle/0003_activation_order.sql and drizzle/0004_checkout_fulfillments.sql on the Hostinger MySQL database";

export function logLicenseSchemaError(error: unknown, tag: string) {
  const code = error && typeof error === "object" && "code" in error ? String((error as { code?: unknown }).code) : "";
  if (code === "ER_BAD_FIELD_ERROR" || code === "ER_NO_SUCH_TABLE") {
    console.error(`[${tag}] ${MIGRATION_HINT}`);
    return;
  }
  console.error(`[${tag}]`, error instanceof Error ? error.message : "unknown");
}

function isDuplicate(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? (error as { code?: unknown }).code : undefined;
  return code === "ER_DUP_ENTRY" || code === 1062 || code === "1062";
}

function normalizeEmail(value: string | null | undefined): string | null {
  const email = value?.trim().toLowerCase() ?? "";
  return email || null;
}

function anchorDate(value: Date | string | null | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

type Buyer = {
  id: string;
  membershipLevel: number | null;
  vipUntil: Date | null;
  email: string | null;
};

async function findBuyer(tx: Tx, userId: string | null, email: string | null): Promise<Buyer | undefined> {
  const columns = {
    id: users.id,
    membershipLevel: users.membershipLevel,
    vipUntil: users.vipUntil,
    email: users.email,
  };
  if (userId) {
    const [byId] = await tx.select(columns).from(users).where(eq(users.id, userId)).limit(1);
    if (byId) return byId;
  }
  if (!email) return undefined;
  const [byEmail] = await tx
    .select(columns)
    .from(users)
    .where(sql`lower(${users.email}) = ${email}`)
    .limit(1);
  return byEmail;
}

async function grant(tx: Tx, userId: string, planLevel: number, anchor: Date, durationDays: number) {
  const [user] = await tx
    .select({
      id: users.id,
      membershipLevel: users.membershipLevel,
      vipUntil: users.vipUntil,
    })
    .from(users)
    .where(eq(users.id, userId))
    .for("update");
  if (!user) return null;
  const now = new Date();
  const membershipLevel = nextMembershipLevel(user.membershipLevel || 0, planLevel);
  const vipUntil = nextVipUntil(user.vipUntil ? new Date(user.vipUntil) : null, grantUntil(anchor, durationDays));
  await tx
    .update(users)
    .set({ membershipLevel, vipUntil, updatedAt: now })
    .where(eq(users.id, userId));
  return membershipLevel;
}

type LegacyRow = typeof activationCodes.$inferSelect;

/** Finish a checkout that already has a historical activation_codes row. Does not insert another row. */
async function applyLegacy(
  tx: Tx,
  existing: LegacyRow,
  planId: PlanId,
  planLevel: number,
  requestedUserId: string | null,
  email: string | null,
): Promise<FulfillResult> {
  const buyer = await findBuyer(tx, existing.ownerUserId || requestedUserId, email || existing.usedByEmail);
  const resolvedPlan = isPlanId(existing.planId) ? existing.planId : planId;
  if (existing.isUsed && existing.ownerUserId) {
    return {
      status: "duplicate",
      planId: resolvedPlan,
      userId: existing.ownerUserId,
      email: existing.usedByEmail,
      membershipLevel: existing.membershipLevel,
    };
  }
  if (!buyer) {
    return {
      status: "pending_user",
      planId: resolvedPlan,
      userId: null,
      email: existing.usedByEmail || email,
      membershipLevel: existing.membershipLevel,
    };
  }
  const anchor = existing.createdAt ? new Date(existing.createdAt) : new Date();
  const membershipLevel = await grant(
    tx,
    buyer.id,
    existing.membershipLevel || planLevel,
    anchor,
    existing.durationDays,
  );
  await tx
    .update(activationCodes)
    .set({
      isUsed: true,
      usedById: buyer.id,
      usedByEmail: buyer.email || email,
      usedAt: new Date(),
      ownerUserId: buyer.id,
    })
    .where(eq(activationCodes.id, existing.id));
  return {
    status: "applied",
    planId,
    userId: buyer.id,
    email: buyer.email || email,
    membershipLevel: membershipLevel ?? planLevel,
  };
}

type FulfillmentRow = typeof checkoutFulfillments.$inferSelect;

async function applyFulfillment(
  tx: Tx,
  row: FulfillmentRow,
  planId: PlanId,
  planLevel: number,
  requestedUserId: string | null,
  email: string | null,
  purchasedAt: Date,
): Promise<FulfillResult> {
  if (row.appliedAt) {
    return {
      status: "duplicate",
      planId: isPlanId(row.planId) ? row.planId : planId,
      userId: row.userId,
      email: row.email,
      membershipLevel: row.membershipLevel,
    };
  }
  const buyer = await findBuyer(tx, row.userId || requestedUserId, email || row.email);
  if (!buyer) {
    return {
      status: "pending_user",
      planId,
      userId: null,
      email: email || row.email,
      membershipLevel: row.membershipLevel,
    };
  }
  const anchor = anchorDate(row.purchasedAt, purchasedAt);
  const membershipLevel = await grant(tx, buyer.id, row.membershipLevel || planLevel, anchor, row.durationDays);
  await tx
    .update(checkoutFulfillments)
    .set({
      appliedAt: new Date(),
      userId: buyer.id,
      email: buyer.email || email || row.email,
    })
    .where(eq(checkoutFulfillments.id, row.id));
  return {
    status: "applied",
    planId,
    userId: buyer.id,
    email: buyer.email || email,
    membershipLevel: membershipLevel ?? planLevel,
  };
}

export async function fulfillCheckoutRecord(input: FulfillInput): Promise<FulfillResult | Ignored> {
  if (input.paymentStatus !== "paid") return { status: "ignored", reason: "unpaid" };
  const planId = planIdFromCheckout({
    metadataPlanId: input.metadataPlanId,
    amountSubtotal: input.amountSubtotal,
    amountTotal: input.amountTotal,
  });
  if (!planId) return { status: "ignored", reason: "unknown_plan" };
  if (!input.stripeSessionId.startsWith("cs_")) return { status: "ignored", reason: "session" };

  const email = normalizeEmail(input.email);
  const requestedUserId = input.userId?.trim() || null;
  const planLevel = planMembershipLevel(planId);
  const purchasedAt = anchorDate(input.purchasedAt, new Date());

  return db.transaction(async (tx) => {
    const [legacy] = await tx
      .select()
      .from(activationCodes)
      .where(eq(activationCodes.stripeSessionId, input.stripeSessionId))
      .limit(1)
      .for("update");
    if (legacy) return applyLegacy(tx, legacy, planId, planLevel, requestedUserId, email);

    const [existing] = await tx
      .select()
      .from(checkoutFulfillments)
      .where(eq(checkoutFulfillments.stripeSessionId, input.stripeSessionId))
      .limit(1)
      .for("update");
    if (existing) return applyFulfillment(tx, existing, planId, planLevel, requestedUserId, email, purchasedAt);

    const now = new Date();
    try {
      await tx.insert(checkoutFulfillments).values({
        stripeSessionId: input.stripeSessionId,
        planId,
        membershipLevel: planLevel,
        durationDays: STRIPE_LICENSE_DAYS,
        email,
        userId: null,
        purchasedAt,
        appliedAt: null,
        createdAt: now,
      });
    } catch (error) {
      if (!isDuplicate(error)) throw error;
    }

    const [row] = await tx
      .select()
      .from(checkoutFulfillments)
      .where(eq(checkoutFulfillments.stripeSessionId, input.stripeSessionId))
      .limit(1)
      .for("update");
    if (!row) throw new Error("fulfillment_row");
    return applyFulfillment(tx, row, planId, planLevel, requestedUserId, email, purchasedAt);
  });
}

async function claimLegacyCodes(userId: string, normalized: string) {
  await db.transaction(async (tx) => {
    const pending = await tx
      .select()
      .from(activationCodes)
      .where(
        and(
          eq(activationCodes.isUsed, false),
          isNull(activationCodes.ownerUserId),
          sql`lower(${activationCodes.usedByEmail}) = ${normalized}`,
        ),
      )
      .for("update");

    if (pending.length === 0) return;

    const [user] = await tx
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .for("update");
    if (!user) return;

    for (const row of pending) {
      const anchor = row.createdAt ? new Date(row.createdAt) : new Date();
      await grant(tx, user.id, row.membershipLevel, anchor, row.durationDays);
      await tx
        .update(activationCodes)
        .set({
          isUsed: true,
          usedById: user.id,
          usedByEmail: user.email || normalized,
          usedAt: new Date(),
          ownerUserId: user.id,
        })
        .where(eq(activationCodes.id, row.id));
    }
  });
}

async function claimStoredFulfillments(userId: string, normalized: string) {
  await db.transaction(async (tx) => {
    const pending = await tx
      .select()
      .from(checkoutFulfillments)
      .where(
        and(
          isNull(checkoutFulfillments.appliedAt),
          isNull(checkoutFulfillments.userId),
          sql`lower(${checkoutFulfillments.email}) = ${normalized}`,
        ),
      )
      .for("update");

    if (pending.length === 0) return;

    const [user] = await tx
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .for("update");
    if (!user) return;

    for (const row of pending) {
      const anchor = anchorDate(row.purchasedAt, row.createdAt ? new Date(row.createdAt) : new Date());
      await grant(tx, user.id, row.membershipLevel, anchor, row.durationDays);
      await tx
        .update(checkoutFulfillments)
        .set({
          appliedAt: new Date(),
          userId: user.id,
          email: user.email || normalized,
        })
        .where(eq(checkoutFulfillments.id, row.id));
    }
  });
}

/** Attach a paid checkout that arrived before this account existed. Historical codes and new fulfillment rows. */
export async function claimPendingLicenses(userId: string, email: string) {
  const normalized = normalizeEmail(email);
  if (!normalized) return;

  try {
    await claimLegacyCodes(userId, normalized);
  } catch (error) {
    logLicenseSchemaError(error, "LICENSE_CLAIM");
  }
  try {
    await claimStoredFulfillments(userId, normalized);
  } catch (error) {
    logLicenseSchemaError(error, "FULFILLMENT_CLAIM");
  }
}
