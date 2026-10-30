import "server-only";
import { and, desc, eq, isNull, or, sql } from "drizzle-orm";
import { db } from "./db";
import { activationCodes, users } from "./schema";
import {
  STRIPE_LICENSE_DAYS,
  grantUntil,
  isLicenseCode,
  nextMembershipLevel,
  nextVipUntil,
  planIdFromCheckout,
  planMembershipLevel,
} from "./license";
import { generateLicenseCode } from "./license-code";
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
};

export type FulfillResult = {
  status: "applied" | "duplicate" | "pending_user";
  code: string;
  planId: PlanId;
  userId: string | null;
  email: string | null;
  membershipLevel: number;
};

type Ignored = { status: "ignored"; reason: string };

const MIGRATION_HINT = "run drizzle/0003_activation_order.sql on the Hostinger MySQL database";

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

type Buyer = {
  id: string;
  membershipLevel: number | null;
  vipUntil: Date | null;
  email: string | null;
};

async function findBuyer(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  userId: string | null,
  email: string | null
): Promise<Buyer | undefined> {
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

async function grant(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  userId: string,
  planLevel: number,
  anchor: Date,
  durationDays: number
) {
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

function resultFromRow(
  row: {
    code: string;
    planId: string | null;
    ownerUserId: string | null;
    usedByEmail: string | null;
    membershipLevel: number;
    isUsed: boolean | null;
  },
  fallbackPlan: PlanId,
  status: FulfillResult["status"]
): FulfillResult {
  return {
    status,
    code: row.code,
    planId: isPlanId(row.planId) ? row.planId : fallbackPlan,
    userId: row.ownerUserId,
    email: row.usedByEmail,
    membershipLevel: row.membershipLevel,
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

  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(activationCodes)
      .where(eq(activationCodes.stripeSessionId, input.stripeSessionId))
      .limit(1)
      .for("update");

    const buyer = await findBuyer(tx, existing?.ownerUserId || requestedUserId, email || existing?.usedByEmail);

    if (existing) {
      if (existing.isUsed && existing.ownerUserId) {
        return resultFromRow(existing, planId, "duplicate");
      }
      if (!buyer) return resultFromRow(existing, planId, "pending_user");
      const anchor = existing.createdAt ? new Date(existing.createdAt) : new Date();
      const membershipLevel = await grant(tx, buyer.id, existing.membershipLevel || planLevel, anchor, existing.durationDays);
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
        status: "applied" as const,
        code: existing.code,
        planId,
        userId: buyer.id,
        email: buyer.email || email,
        membershipLevel: membershipLevel ?? planLevel,
      };
    }

    const now = new Date();
    let code = "";
    for (let attempt = 0; attempt < 5; attempt += 1) {
      code = generateLicenseCode(planId);
      try {
        await tx.insert(activationCodes).values({
          code,
          durationDays: STRIPE_LICENSE_DAYS,
          membershipLevel: planLevel,
          isUsed: false,
          usedByEmail: buyer?.email || email,
          usedById: null,
          usedAt: null,
          ownerUserId: null,
          stripeSessionId: input.stripeSessionId,
          planId,
          createdAt: now,
        });
        break;
      } catch (error) {
        if (!isDuplicate(error) || attempt === 4) throw error;
        const [raced] = await tx
          .select()
          .from(activationCodes)
          .where(eq(activationCodes.stripeSessionId, input.stripeSessionId))
          .limit(1);
        if (!raced) continue;
        if (raced.isUsed && raced.ownerUserId) return resultFromRow(raced, planId, "duplicate");
        if (!buyer) return resultFromRow(raced, planId, "pending_user");
        const anchor = raced.createdAt ? new Date(raced.createdAt) : now;
        const membershipLevel = await grant(tx, buyer.id, raced.membershipLevel || planLevel, anchor, raced.durationDays);
        await tx
          .update(activationCodes)
          .set({
            isUsed: true,
            usedById: buyer.id,
            usedByEmail: buyer.email || email,
            usedAt: now,
            ownerUserId: buyer.id,
          })
          .where(eq(activationCodes.id, raced.id));
        return {
          status: "applied" as const,
          code: raced.code,
          planId,
          userId: buyer.id,
          email: buyer.email || email,
          membershipLevel: membershipLevel ?? planLevel,
        };
      }
    }

    if (!isLicenseCode(code)) throw new Error("license_code");

    if (!buyer) {
      return {
        status: "pending_user",
        code,
        planId,
        userId: null,
        email,
        membershipLevel: planLevel,
      };
    }

    const membershipLevel = await grant(tx, buyer.id, planLevel, now, STRIPE_LICENSE_DAYS);
    await tx
      .update(activationCodes)
      .set({
        isUsed: true,
        usedById: buyer.id,
        usedByEmail: buyer.email || email,
        usedAt: now,
        ownerUserId: buyer.id,
      })
      .where(eq(activationCodes.stripeSessionId, input.stripeSessionId));

    return {
      status: "applied",
      code,
      planId,
      userId: buyer.id,
      email: buyer.email || email,
      membershipLevel: membershipLevel ?? planLevel,
    };
  });
}

/** Bind a code that was stored before the account existed (same email). */
export async function claimPendingLicenses(userId: string, email: string) {
  const normalized = normalizeEmail(email);
  if (!normalized) return;

  await db.transaction(async (tx) => {
    const pending = await tx
      .select()
      .from(activationCodes)
      .where(
        and(
          eq(activationCodes.isUsed, false),
          isNull(activationCodes.ownerUserId),
          sql`lower(${activationCodes.usedByEmail}) = ${normalized}`
        )
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

export async function listUserLicenses(userId: string) {
  return db
    .select({
      code: activationCodes.code,
      planId: activationCodes.planId,
      membershipLevel: activationCodes.membershipLevel,
      createdAt: activationCodes.createdAt,
    })
    .from(activationCodes)
    .where(or(eq(activationCodes.ownerUserId, userId), eq(activationCodes.usedById, userId)))
    .orderBy(desc(activationCodes.createdAt));
}
