import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("请输入邮箱和密码");
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user || !user.password) {
          throw new Error("邮箱未注册或密码错误");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("密码错误");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          membershipLevel: user.membershipLevel ?? 0,
          vipUntil: user.vipUntil,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // 首次登录时
      if (user) {
        token.id = user.id;
        token.membershipLevel = user.membershipLevel || 0;
        token.vipUntil = user.vipUntil || null;
        token.lastChecked = Date.now();
      }
      
      // 只有在主动触发 update，或者距离上次查库超过 5 分钟 (300000ms) 时，才去数据库重新查询
      // 这能极大地减少每个页面/组件渲染时 /api/auth/session 发起的并发查库请求
      const now = Date.now();
      const shouldUpdate = trigger === "update" || !token.lastChecked || (now - (token.lastChecked as number)) > 300000;

      if (token.id && shouldUpdate) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
          columns: {
            membershipLevel: true,
            vipUntil: true,
          }
        });
        if (dbUser) {
          token.membershipLevel = dbUser.membershipLevel || 0;
          token.vipUntil = dbUser.vipUntil || null;
          token.lastChecked = now; // 更新检查时间
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.membershipLevel = token.membershipLevel as number;
        session.user.vipUntil = token.vipUntil as Date | null;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
