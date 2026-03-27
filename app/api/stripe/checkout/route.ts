import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { planId, amount, currency = "HKD" } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 }
      );
    }

    const priceIds: Record<string, Record<string, string>> = {
      basic: {
        HKD: "price_1TFd5ABNhc7JJK4wEQYsytJy",
        CNY: "price_1TFd5ABNhc7JJK4wBzpZdevy",
        USD: "price_1TFd5ABNhc7JJK4wbeaZUGW1",
      },
      advanced: {
        HKD: "price_1TFdDGBNhc7JJK4wqmITFRfy",
        CNY: "price_1TFdDGBNhc7JJK4wQeAyJcMU",
        USD: "price_1TFdDGBNhc7JJK4wagM9TyaQ",
      },
    };

    const planLevelMap: Record<string, number> = {
      basic: 1,
      advanced: 2,
    };

    // Special case: donation
    if (planId === "donation") {
      const amt = Number(amount);
      if (!amt || amt < 1000) {
        return NextResponse.json(
          { error: "Invalid donation amount" },
          { status: 400 }
        );
      }
      const donationSession = await stripe.checkout.sessions.create({
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
                name: "社区赞助（一次性）",
                description: "用于社区内容更新、工具维护、策略研究与成员答疑服务完善",
              },
              unit_amount: amt,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/cancel`,
        metadata: {
          userId: session.user.id,
          planId: "donation",
          level: "0",
        },
      });
      return NextResponse.json({ url: donationSession.url });
    }

    const priceId = priceIds[planId]?.[currency];
    const level = planLevelMap[planId];

    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid Plan ID or Currency" },
        { status: 400 }
      );
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
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment", // "payment" for one-time, "subscription" for recurring
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe/cancel`,
      metadata: {
        userId: session.user.id,
        planId: planId,
        level: level.toString(),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json(
      { error: error?.message || "Internal Error" },
      { status: 500 }
    );
  }
}
