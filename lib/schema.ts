import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  datetime,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { type AdapterAccount } from "@auth/core/adapters";

export const users = mysqlTable("User", {
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
  "Account",
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

export const sessions = mysqlTable("Session", {
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
  "VerificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).unique().notNull(),
    expires: datetime("expires").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const mt5Accounts = mysqlTable(
  "Mt5Account",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: varchar("accountId", { length: 255 }).notNull(),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
  },
  (account) => ({
    userAccountIdx: uniqueIndex("userId_accountId_idx").on(account.userId, account.accountId),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  mt5Accounts: many(mt5Accounts),
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

export const mt5AccountsRelations = relations(mt5Accounts, ({ one }) => ({
  user: one(users, {
    fields: [mt5Accounts.userId],
    references: [users.id],
  }),
}));
