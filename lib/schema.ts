import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  datetime,
  primaryKey,
  uniqueIndex,
  boolean,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { type AdapterAccount } from "@auth/core/adapters";
import { bbsUserProfiles, bbsCategories, bbsPosts, bbsReplies, bbsCheckins, bbsLikes, bbsBookmarks } from "./schema/bbs";
export { bbsUserProfiles, bbsCategories, bbsPosts, bbsReplies, bbsCheckins, bbsLikes, bbsBookmarks };

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: datetime("emailVerified"),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  membershipLevel: int("membershipLevel").default(0),
  vipUntil: datetime("vipUntil"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => new Date()),
});

export const accounts = mysqlTable(
  "account",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: uniqueIndex("provider_providerAccountId_idx").on(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sessionToken: varchar("sessionToken", { length: 255 }).unique().notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: datetime("expires").notNull(),
});

export const verificationTokens = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).unique().notNull(),
    expires: datetime("expires").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

/** Historical license codes. Stripe no longer inserts rows here. */
export const activationCodes = mysqlTable("activation_codes", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  code: varchar("code", { length: 50 }).unique().notNull(),
  durationDays: int("durationDays").default(1095).notNull(),
  membershipLevel: int("membershipLevel").default(1).notNull(),
  isUsed: boolean("isUsed").default(false),
  usedByEmail: varchar("usedByEmail", { length: 255 }),
  usedById: varchar("usedById", { length: 255 }).references(() => users.id, { onDelete: "set null" }),
  usedAt: datetime("usedAt"),
  /** Purchaser, set when an older Stripe fulfillment bound the code. */
  ownerUserId: varchar("ownerUserId", { length: 255 }).references(() => users.id, { onDelete: "set null" }),
  /** Checkout Session id. Unique so a webhook retry of an old code cannot extend membership again. */
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).unique(),
  /** "149" or "349" when the code was issued by Stripe. Null for hand-issued codes. */
  planId: varchar("planId", { length: 8 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

/** One row per new Stripe Checkout Session. No customer-facing license code. */
export const checkoutFulfillments = mysqlTable("checkout_fulfillments", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).unique().notNull(),
  planId: varchar("planId", { length: 8 }).notNull(),
  membershipLevel: int("membershipLevel").notNull(),
  durationDays: int("durationDays").notNull(),
  email: varchar("email", { length: 255 }),
  userId: varchar("userId", { length: 255 }).references(() => users.id, { onDelete: "set null" }),
  purchasedAt: datetime("purchasedAt").notNull(),
  appliedAt: datetime("appliedAt"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Computers signed in to PiTradingAgent.
 * One membership may hold two rows. The same userId + deviceId is one computer.
 */
export const desktopDevices = mysqlTable(
  "desktop_device",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    deviceId: varchar("deviceId", { length: 128 }).notNull(),
    deviceName: varchar("deviceName", { length: 120 }),
    createdAt: datetime("createdAt", { mode: "date" }).notNull(),
    lastSeenAt: datetime("lastSeenAt", { mode: "date" }).notNull(),
  },
  (table) => ({
    userDevice: uniqueIndex("desktop_device_userId_deviceId_unique").on(table.userId, table.deviceId),
  }),
);

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  desktopDevices: many(desktopDevices),
  bbsUserProfile: one(bbsUserProfiles, {
    fields: [users.id],
    references: [bbsUserProfiles.userId],
  }),
  bbsPosts: many(bbsPosts),
  bbsReplies: many(bbsReplies),
  bbsCheckins: many(bbsCheckins),
  bbsLikes: many(bbsLikes),
  bbsBookmarks: many(bbsBookmarks),
  usedActivationCodes: many(activationCodes, { relationName: "usedActivationCodes" }),
  ownedActivationCodes: many(activationCodes, { relationName: "ownedActivationCodes" }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const desktopDevicesRelations = relations(desktopDevices, ({ one }) => ({
  user: one(users, {
    fields: [desktopDevices.userId],
    references: [users.id],
  }),
}));

export const activationCodesRelations = relations(activationCodes, ({ one }) => ({
  usedBy: one(users, {
    fields: [activationCodes.usedById],
    references: [users.id],
    relationName: "usedActivationCodes",
  }),
  owner: one(users, {
    fields: [activationCodes.ownerUserId],
    references: [users.id],
    relationName: "ownedActivationCodes",
  }),
}));

export * from "./schema/bbs";
