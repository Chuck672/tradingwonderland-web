"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { getAuthSession } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "empty" };
  }

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "email_taken" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Manually generate ID to ensure compatibility
    const newUserId = crypto.randomUUID();

    await db.insert(users).values({
      id: newUserId,
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    // Return detailed error message for debugging
    return { error: "register_fail" };
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "empty" };
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      // Return success anyway to prevent email enumeration, or return error if preferred.
      // The user requested "Email not registered" error message, so we return error.
      return { error: "not_found" };
    }

    // Generate a temporary 8-character password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update user password
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    // Send email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>QuantLogicLab — Temporary password</h2>
        <p>Hello,</p>
        <p>A temporary password was created for ${email}. Sign in with it, then change the password.</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${tempPassword}
        </div>
        <p>If you did not request a password reset, you can ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <h2>QuantLogicLab — 临时密码</h2>
        <p>您好，</p>
        <p>已为 ${email} 生成临时密码。请用它登录，然后尽快修改密码。</p>
        <p>如果这不是您本人的请求，可以忽略这封邮件。</p>
        <p>QuantLogicLab</p>
      </div>
    `;

    const emailResult = await sendEmail({
      to: email,
      subject: "QuantLogicLab temporary password / 临时密码",
      html,
    });

    if (emailResult.error) {
      return { error: "email_fail" };
    }

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "reset_fail" };
  }
}

export async function changePassword(formData: FormData) {
  const session = await getAuthSession();
  
  if (!session?.user?.email) {
    return { error: "unauthorized" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { error: "password_empty" };
  }

  if (newPassword.length < 6) {
    return { error: "password_short" };
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!user || !user.password) {
      return { error: "user_missing" };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return { error: "password_wrong" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, session.user.email));

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return { error: "password_fail" };
  }
}
