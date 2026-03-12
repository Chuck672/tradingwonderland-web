"use server";

import { db } from "@/lib/db";
import { mt5Accounts } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveMt5Account(formData: FormData) {
  const session = await getAuthSession();
  if (!session?.user) {
    return { error: "未登录" };
  }

  const accountId = formData.get("accountId") as string;

  if (!accountId || accountId.trim() === "") {
    return { error: "MT5账号不能为空" };
  }

  // Basic validation for MT5 account number (usually numeric)
  if (!/^\d+$/.test(accountId.trim())) {
    return { error: "MT5账号格式不正确，应为纯数字" };
  }

  try {
    // Check if user already has an account
    const existingAccounts = await db.select().from(mt5Accounts).where(eq(mt5Accounts.userId, session.user.id));

    if (existingAccounts.length > 0) {
      // Update the first one and delete any others just in case
      const [first, ...rest] = existingAccounts;
      
      await db.update(mt5Accounts)
        .set({ accountId: accountId.trim() })
        .where(eq(mt5Accounts.id, first.id));

      if (rest.length > 0) {
        await db.delete(mt5Accounts)
          .where(inArray(mt5Accounts.id, rest.map(r => r.id)));
      }
    } else {
      // Create new
      await db.insert(mt5Accounts).values({
        userId: session.user.id,
        accountId: accountId.trim(),
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Save MT5 account error:", error);
    return { error: "保存失败，请稍后重试" };
  }
}
