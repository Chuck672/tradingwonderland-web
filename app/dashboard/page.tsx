import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { claimPendingLicenses, listUserLicenses, logLicenseSchemaError } from "@/lib/fulfill-checkout";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ download?: string }>;
}) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fdashboard");
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  if (!user) {
    redirect("/login?callbackUrl=%2Fdashboard");
  }

  if (user.email) {
    try {
      await claimPendingLicenses(user.id, user.email);
    } catch (error) {
      logLicenseSchemaError(error, "LICENSE_CLAIM");
    }
  }

  const [fresh] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  const current = fresh ?? user;

  let licenses: { code: string; planId: string | null; membershipLevel: number }[] = [];
  try {
    licenses = await listUserLicenses(user.id);
  } catch (error) {
    logLicenseSchemaError(error, "LICENSE_LIST");
  }

  const params = await searchParams;
  const downloadNotice = params.download === "unconfigured" || params.download === "forbidden" ? params.download : null;

  const safeUser = {
    ...current,
    membershipLevel: current.membershipLevel ?? 0,
    createdAt: current.createdAt ?? new Date(),
    updatedAt: current.updatedAt ?? new Date(),
  };

  return <DashboardClient user={safeUser} licenses={licenses} downloadNotice={downloadNotice} />;
}
