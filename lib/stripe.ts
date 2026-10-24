import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;
let clientKey: string | null = null;

/** Returns null when STRIPE_SECRET_KEY is unset so preview builds keep rendering. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!client || clientKey !== key) {
    client = new Stripe(key, { typescript: true });
    clientKey = key;
  }
  return client;
}
