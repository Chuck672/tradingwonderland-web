import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Payment was successful
    const userId = session.metadata?.userId;
    const levelStr = session.metadata?.level;

    if (userId && levelStr) {
      const newLevel = parseInt(levelStr, 10);
      if (!Number.isFinite(newLevel) || newLevel <= 0) {
        return new NextResponse("OK", { status: 200 });
      }
      try {
        await db
          .update(users)
          .set({ membershipLevel: newLevel })
          .where(eq(users.id, userId));
        console.log(`Successfully upgraded user ${userId} to level ${newLevel}`);
      } catch (dbError) {
        console.error("Database update failed after successful payment:", dbError);
        return new NextResponse("Database Error", { status: 500 });
      }
    }
  }

  return new NextResponse("OK", { status: 200 });
}
