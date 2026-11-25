import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";

export type CredentialUser = {
  id: string;
  email: string | null;
  name: string | null;
  membershipLevel: number | null;
  vipUntil: Date | null;
};

export type CredentialFailure = "missing" | "unknown" | "password_not_set" | "invalid";

let timingPad: Promise<string> | null = null;

function padHash() {
  timingPad ??= bcrypt.hash("desktop-login-timing-pad", 10);
  return timingPad;
}

/**
 * Same lookup and bcrypt check as the website Credentials provider.
 * `unknown` and `invalid` stay distinct so the website can keep its existing
 * messages. Desktop login collapses those two into one public error.
 * An account with no password hash is Google-only (or otherwise unset).
 */
export async function verifyEmailPassword(
  email: string,
  password: string,
): Promise<{ ok: true; user: CredentialUser } | { ok: false; reason: CredentialFailure }> {
  if (!email || !password) return { ok: false, reason: "missing" };

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    await bcrypt.compare(password, await padHash());
    return { ok: false, reason: "unknown" };
  }

  if (!user.password) {
    return { ok: false, reason: "password_not_set" };
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return { ok: false, reason: "invalid" };

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      membershipLevel: user.membershipLevel,
      vipUntil: user.vipUntil,
    },
  };
}
