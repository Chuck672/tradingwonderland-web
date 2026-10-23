import type { Metadata } from "next";
import { PurchasePlans } from "./purchase-plans";
import { resolvePublicPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "购买 PiTradingAgent",
  description: "PiTradingAgent Setup 8.0.0，MT5 图表伴侣桌面程序。海外买家可通过 Stripe 一次性购买，交付安装 zip 与 PTA1 授权。",
};

export const dynamic = "force-dynamic";

export default function SubscribePage() {
  const plans = resolvePublicPlans();
  return <PurchasePlans plans={plans} />;
}
