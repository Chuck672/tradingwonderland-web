import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: {
      mt5Accounts: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Ensure types match what DashboardClient expects (handling nulls from Drizzle schema)
  const safeUser = {
    ...user,
    membershipLevel: user.membershipLevel ?? 0,
    createdAt: user.createdAt ?? new Date(),
    updatedAt: user.updatedAt ?? new Date(),
    // Ensure mt5Accounts createdAt is also non-null if needed, but DashboardClient only checks length/accountId usually
    mt5Accounts: user.mt5Accounts.map(acc => ({
      ...acc,
      createdAt: acc.createdAt ?? new Date()
    }))
  };

  return <DashboardClient user={safeUser} />;
}
