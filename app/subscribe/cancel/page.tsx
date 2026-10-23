import type { Metadata } from "next";
import { CancelView } from "./cancel-view";

export const metadata: Metadata = {
  title: "Payment cancelled",
  description: "Stripe checkout was cancelled. No charge was made for PiTradingAgent.",
};

export default function SubscribeCancelPage() {
  return <CancelView />;
}
