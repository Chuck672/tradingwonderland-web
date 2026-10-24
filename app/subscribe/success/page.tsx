import type { Metadata } from "next";
import { SuccessView } from "./success-view";

const SESSION_ID = /^cs_[A-Za-z0-9_]+$/;

export const metadata: Metadata = {
  title: "Payment received",
  description: "Payment received. What you bought is sent by email.",
};

export default async function SubscribeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id && SESSION_ID.test(params.session_id) ? params.session_id : null;
  return <SuccessView sessionId={sessionId} />;
}
