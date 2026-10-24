import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { resolvePublicPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: {
    absolute: "PiTradingAgent — AI-Native Chart for MT5 | QuantLogicLab",
  },
  description:
    "PiTradingAgent Setup 8.0.0 is an AI-Native Chart for MT5. It is a Windows desktop companion with a multi-chart workspace, studies, alerts, and an AI agent that reads the open chart. It does not replace MT5, and it does not promise results.",
};

export default function Page() {
  const plans = resolvePublicPlans().map((plan) => ({
    amountUsd: plan.amountUsd,
    recommended: plan.recommended,
  }));
  return <HomePage plans={plans} />;
}
