"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { getAuthSession } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "邮箱和密码不能为空" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "该邮箱已被注册" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "注册失败，请稍后重试" };
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "邮箱不能为空" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success anyway to prevent email enumeration, or return error if preferred.
      // The user requested "Email not registered" error message, so we return error.
      return { error: "该邮箱未注册" };
    }

    // Generate a temporary 8-character password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Send email
    const html = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Trading WonderLand - 密码重置 / Password Reset</h2>
        <p>您好 / Hello,</p>
        <p>您的账号 (${email}) 已生成临时密码。请使用以下密码登录，并在登录后尽快修改您的密码。</p>
        <p>A temporary password has been generated for your account. Please log in with the following password and change it immediately.</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
          ${tempPassword}
        </div>
        <p>如果您没有请求重置密码，请忽略此邮件。</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <br/>
        <p>Trading WonderLand Team</p>
      </div>
    `;

    const emailResult = await sendEmail({
      to: email,
      subject: "Trading WonderLand - 临时密码 / Temporary Password",
      html,
    });

    if (emailResult.error) {
      return { error: "邮件发送失败，请检查服务器配置" };
    }

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "重置密码失败，请稍后重试" };
  }
}

export async function changePassword(formData: FormData) {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return { error: "未登录" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { error: "密码不能为空" };
  }

  if (newPassword.length < 6) {
    return { error: "新密码长度不能少于6位" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return { error: "用户不存在或使用了第三方登录" };
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return { error: "当前密码不正确" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return { error: "修改密码失败，请稍后重试" };
  }
}
