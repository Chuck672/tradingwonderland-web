import type { Metadata } from "next";
import { PurchasePlans } from "./purchase-plans";
import { resolvePublicPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Buy PiTradingAgent",
  description: "PiTradingAgent Setup 8.0.0 is an MT5 chart-companion desktop app. Overseas buyers can purchase it once through Stripe. Delivery is the setup zip and a PTA1 license.",
};

export const dynamic = "force-dynamic";

export default function SubscribePage() {
  const plans = resolvePublicPlans();
  return <PurchasePlans plans={plans} />;
}
