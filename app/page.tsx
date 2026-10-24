import type { Metadata } from "next";
import { preload } from "react-dom";
import { HomePage } from "@/components/home-page";
import { resolvePublicPlans } from "@/lib/pricing";
import { productShotWidths } from "@/lib/product-shot-meta";

const HERO_SIZES =
  "(min-width: 72rem) 68rem, (min-width: 64rem) calc(100vw - 4rem), (min-width: 40rem) calc(100vw - 3rem), calc(100vw - 2rem)";

export const metadata: Metadata = {
  title: {
    absolute: "PiTradingAgent — AI-Native Chart for MT5 | QuantLogicLab",
  },
  description:
    "PiTradingAgent Setup 8.0.0 is an AI-Native Chart for MT5. It is a Windows desktop companion with a multi-chart workspace, studies, alerts, and an AI agent that reads the open chart. It does not replace MT5, and it does not promise results.",
};

export default function Page() {
  preload("/product/ai-2400.avif", {
    as: "image",
    fetchPriority: "high",
    type: "image/avif",
    imageSrcSet: productShotWidths.map((width) => `/product/ai-${width}.avif ${width}w`).join(", "),
    imageSizes: HERO_SIZES,
  });

  const plans = resolvePublicPlans().map((plan) => ({
    amountUsd: plan.amountUsd,
    recommended: plan.recommended,
  }));
  return <HomePage plans={plans} />;
}
