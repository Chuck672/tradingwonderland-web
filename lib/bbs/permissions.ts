import { db } from "../db";
import { bbsUserProfiles } from "../schema/bbs";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";

export type BBSRole = "guest" | "member" | "vip" | "moderator" | "admin";

export interface BBSPermissions {
  canViewPosts: boolean;
  canCreatePost: boolean;
  canReply: boolean;
  canUploadImage: boolean;
  canCheckin: boolean;
  canLike: boolean;
  canBookmark: boolean;
  canDeleteOwnPost: boolean;
  canDeleteAnyPost: boolean;
  canPinPost: boolean;
  canAccessVipCategory: boolean;
}

const ROLE_PERMISSIONS: Record<BBSRole, BBSPermissions> = {
  guest: {
    canViewPosts: true,
    canCreatePost: false,
    canReply: false,
    canUploadImage: false,
    canCheckin: false,
    canLike: false,
    canBookmark: false,
    canDeleteOwnPost: false,
    canDeleteAnyPost: false,
    canPinPost: false,
    canAccessVipCategory: false,
  },
  member: {
    canViewPosts: true,
    canCreatePost: false,
    canReply: true,
    canUploadImage: false,
    canCheckin: true,
    canLike: true,
    canBookmark: true,
    canDeleteOwnPost: true,
    canDeleteAnyPost: false,
    canPinPost: false,
    canAccessVipCategory: false,
  },
  vip: {
    canViewPosts: true,
    canCreatePost: true,
    canReply: true,
    canUploadImage: true,
    canCheckin: true,
    canLike: true,
    canBookmark: true,
    canDeleteOwnPost: true,
    canDeleteAnyPost: false,
    canPinPost: false,
    canAccessVipCategory: true,
  },
  moderator: {
    canViewPosts: true,
    canCreatePost: true,
    canReply: true,
    canUploadImage: true,
    canCheckin: true,
    canLike: true,
    canBookmark: true,
    canDeleteOwnPost: true,
    canDeleteAnyPost: true,
    canPinPost: true,
    canAccessVipCategory: true,
  },
  admin: {
    canViewPosts: true,
    canCreatePost: true,
    canReply: true,
    canUploadImage: true,
    canCheckin: true,
    canLike: true,
    canBookmark: true,
    canDeleteOwnPost: true,
    canDeleteAnyPost: true,
    canPinPost: true,
    canAccessVipCategory: true,
  },
};

export function getPermissions(role: BBSRole): BBSPermissions {
  return ROLE_PERMISSIONS[role];
}

export async function getUserBBSRole(session: Session | null): Promise<BBSRole> {
  if (!session?.user?.id) return "guest";

  // Check custom BBS profile role first (for moderator/admin overrides)
  const profile = await db.query.bbsUserProfiles.findFirst({
    where: eq(bbsUserProfiles.userId, session.user.id),
  });

  if (profile && (profile.bbsRole === "admin" || profile.bbsRole === "moderator")) {
    return profile.bbsRole as BBSRole;
  }

  // Fallback to subscription status
  // user.membershipLevel > 0 AND vipUntil is valid
  const level = session.user.membershipLevel || 0;
  const isVipValid = session.user.vipUntil ? new Date(session.user.vipUntil) > new Date() : false;

  if (level > 0 && isVipValid) {
    return "vip";
  }

  return "member";
}

export async function ensureBBSProfile(userId: string, defaultName?: string | null) {
  let profile = await db.query.bbsUserProfiles.findFirst({
    where: eq(bbsUserProfiles.userId, userId),
  });

  if (!profile) {
    // Determine initial role based on DB directly or session if needed
    // We'll default to 'member' in the DB schema
    await db.insert(bbsUserProfiles).values({
      userId,
      nickname: defaultName || null,
      bbsRole: "member",
    });
    
    profile = await db.query.bbsUserProfiles.findFirst({
      where: eq(bbsUserProfiles.userId, userId),
    });
  }

  return profile;
}
