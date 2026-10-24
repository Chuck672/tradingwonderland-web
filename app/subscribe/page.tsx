import type { Metadata } from "next";
import { PurchasePlans } from "./purchase-plans";
import { resolvePublicPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Buy PiTradingAgent",
  description: "$149 is the full MT5 indicators and EA collection. $349 is the full PiTradingAgent desktop tool. Overseas buyers pay once by card through Stripe.",
};

export const dynamic = "force-dynamic";

export default function SubscribePage() {
  const plans = resolvePublicPlans();
  return <PurchasePlans plans={plans} />;
}
