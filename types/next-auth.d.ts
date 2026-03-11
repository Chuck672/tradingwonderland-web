import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      membershipLevel: number
      vipUntil: string | Date | null
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    membershipLevel: number
    vipUntil: string | Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    membershipLevel: number
    vipUntil: string | Date | null
  }
}
