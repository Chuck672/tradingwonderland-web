import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  datetime,
  boolean,
  date,
  json,
  mysqlEnum,
  unique,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { users } from "../schema"; // Import the existing users table

// 1. bbs_categories - 版块分类表
export const bbsCategories = mysqlTable("bbs_categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  description: text("description"),
  sortOrder: int("sortOrder").default(0),
  isVipOnly: boolean("isVipOnly").default(false),
  requiredRole: mysqlEnum("requiredRole", ["member", "vip", "moderator", "admin"]).default("member"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// 2. bbs_user_profiles - 社区用户档案表
export const bbsUserProfiles = mysqlTable("bbs_user_profiles", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  nickname: varchar("nickname", { length: 50 }),
  signature: varchar("signature", { length: 200 }),
  bbsRole: mysqlEnum("bbsRole", ["member", "vip", "moderator", "admin"]).default("member"),
  postCount: int("postCount").default(0),
  replyCount: int("replyCount").default(0),
  totalCheckins: int("totalCheckins").default(0),
  maxStreak: int("maxStreak").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// 3. bbs_posts - 帖子表
export const bbsPosts = mysqlTable("bbs_posts", {
  id: int("id").primaryKey().autoincrement(),
  categoryId: int("categoryId")
    .notNull()
    .references(() => bbsCategories.id, { onDelete: "cascade" }),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  images: json("images"),
  viewCount: int("viewCount").default(0),
  isPinned: boolean("isPinned").default(false),
  isDeleted: boolean("isDeleted").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// 4. bbs_replies - 回复表
export const bbsReplies = mysqlTable("bbs_replies", {
  id: int("id").primaryKey().autoincrement(),
  postId: int("postId")
    .notNull()
    .references(() => bbsPosts.id, { onDelete: "cascade" }),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isDeleted: boolean("isDeleted").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

// 5. bbs_checkins - 打卡签到表
export const bbsCheckins = mysqlTable(
  "bbs_checkins",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    checkinDate: date("checkinDate", { mode: "string" }).notNull(), // Store as string 'YYYY-MM-DD'
    note: text("note"),
    streakDays: int("streakDays").default(1),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      userIdDateUnique: uniqueIndex("user_date_idx").on(table.userId, table.checkinDate),
    };
  }
);

// --- Phase 2 Tables ---

// 6. bbs_likes - 点赞表
export const bbsLikes = mysqlTable(
  "bbs_likes",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: int("postId").references(() => bbsPosts.id, { onDelete: "cascade" }),
    replyId: int("replyId").references(() => bbsReplies.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      userPostUnique: uniqueIndex("user_post_like_idx").on(table.userId, table.postId),
      userReplyUnique: uniqueIndex("user_reply_like_idx").on(table.userId, table.replyId),
    };
  }
);

// 7. bbs_bookmarks - 收藏表
export const bbsBookmarks = mysqlTable(
  "bbs_bookmarks",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: int("postId")
      .notNull()
      .references(() => bbsPosts.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      userPostUnique: uniqueIndex("user_post_bookmark_idx").on(table.userId, table.postId),
    };
  }
);

// --- Relations ---

export const bbsCategoriesRelations = relations(bbsCategories, ({ many }) => ({
  posts: many(bbsPosts),
}));

export const bbsUserProfilesRelations = relations(bbsUserProfiles, ({ one }) => ({
  user: one(users, {
    fields: [bbsUserProfiles.userId],
    references: [users.id],
  }),
}));

export const bbsPostsRelations = relations(bbsPosts, ({ one, many }) => ({
  category: one(bbsCategories, {
    fields: [bbsPosts.categoryId],
    references: [bbsCategories.id],
  }),
  author: one(users, {
    fields: [bbsPosts.userId],
    references: [users.id],
  }),
  replies: many(bbsReplies),
  likes: many(bbsLikes),
  bookmarks: many(bbsBookmarks),
}));

export const bbsRepliesRelations = relations(bbsReplies, ({ one, many }) => ({
  post: one(bbsPosts, {
    fields: [bbsReplies.postId],
    references: [bbsPosts.id],
  }),
  author: one(users, {
    fields: [bbsReplies.userId],
    references: [users.id],
  }),
  likes: many(bbsLikes),
}));

export const bbsLikesRelations = relations(bbsLikes, ({ one }) => ({
  user: one(users, {
    fields: [bbsLikes.userId],
    references: [users.id],
  }),
  post: one(bbsPosts, {
    fields: [bbsLikes.postId],
    references: [bbsPosts.id],
  }),
  reply: one(bbsReplies, {
    fields: [bbsLikes.replyId],
    references: [bbsReplies.id],
  }),
}));

export const bbsBookmarksRelations = relations(bbsBookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bbsBookmarks.userId],
    references: [users.id],
  }),
  post: one(bbsPosts, {
    fields: [bbsBookmarks.postId],
    references: [bbsPosts.id],
  }),
}));

export const bbsCheckinsRelations = relations(bbsCheckins, ({ one }) => ({
  user: one(users, {
    fields: [bbsCheckins.userId],
    references: [users.id],
  }),
}));
