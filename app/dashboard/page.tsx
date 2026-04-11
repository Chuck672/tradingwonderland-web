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

  // 1. Fetch user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) {
    redirect("/login");
  }

  // Combine data
  const safeUser = {
    ...user,
    membershipLevel: user.membershipLevel ?? 0,
    createdAt: user.createdAt ?? new Date(),
    updatedAt: user.updatedAt ?? new Date(),
  };

  return <DashboardClient user={safeUser} />;
}
