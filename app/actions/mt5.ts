"use server";

import { prisma } from "@/lib/prisma";
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
    const existingAccounts = await prisma.mt5Account.findMany({
      where: { userId: session.user.id },
    });

    if (existingAccounts.length > 0) {
      // Update the first one and delete any others just in case
      const [first, ...rest] = existingAccounts;
      
      await prisma.mt5Account.update({
        where: { id: first.id },
        data: { accountId: accountId.trim() }
      });

      if (rest.length > 0) {
        await prisma.mt5Account.deleteMany({
          where: { id: { in: rest.map(r => r.id) } }
        });
      }
    } else {
      // Create new
      await prisma.mt5Account.create({
        data: {
          userId: session.user.id,
          accountId: accountId.trim(),
        },
      });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Save MT5 account error:", error);
    return { error: "保存失败，请稍后重试" };
  }
}
