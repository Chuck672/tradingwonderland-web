import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { planId } = body;

    if (!planId) {
      return new NextResponse("Plan ID is required", { status: 400 });
    }

    // You should ideally replace these with actual Stripe Price IDs from your dashboard
    // e.g. priceId: process.env.STRIPE_EDGE_PRICE_ID
    const planDetails: Record<string, { name: string; price: number; level: number }> = {
      edge: { name: "Edge Plan", price: 9900, level: 1 },      // $99.00
      hawkeye: { name: "HawkEye Plan", price: 19900, level: 2 }, // $199.00
      quantum: { name: "Quantum Plan", price: 29900, level: 3 }, // $299.00
    };

    const plan = planDetails[planId];
    if (!plan) {
      return new NextResponse("Invalid Plan ID", { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "alipay", "wechat_pay"],
      payment_method_options: {
        wechat_pay: {
          client: "web",
        },
      },
      customer_email: session.user.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "hkd",
            product_data: {
              name: plan.name,
              description: "Trading WonderLand Lifetime Access",
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment", // "payment" for one-time, "subscription" for recurring
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/cancel`,
      metadata: {
        userId: session.user.id,
        planId: planId,
        level: plan.level.toString(),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
