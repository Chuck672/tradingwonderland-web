import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, mt5Accounts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  // Use separate queries instead of db.query.users.findFirst to avoid LATERAL joins
  // which are not supported in older MySQL/MariaDB versions on Hostinger
  
  // 1. Fetch user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch MT5 accounts
  const userMt5Accounts = await db
    .select()
    .from(mt5Accounts)
    .where(eq(mt5Accounts.userId, user.id));

  // Combine data
  const safeUser = {
    ...user,
    membershipLevel: user.membershipLevel ?? 0,
    createdAt: user.createdAt ?? new Date(),
    updatedAt: user.updatedAt ?? new Date(),
    mt5Accounts: userMt5Accounts.map(acc => ({
      ...acc,
      createdAt: acc.createdAt ?? new Date()
    }))
  };

  return <DashboardClient user={safeUser} />;
}
