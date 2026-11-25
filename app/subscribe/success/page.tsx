import type { Metadata } from "next";
import { getStripe } from "@/lib/stripe";
import { getAuthSession } from "@/lib/auth";
import { fulfillCheckoutRecord, logLicenseSchemaError } from "@/lib/fulfill-checkout";
import { formatCheckoutAmount, sendFulfillmentEmails } from "@/lib/fulfill-email";
import { isPlanId, type PlanId } from "@/lib/pricing";
import { SuccessView } from "./success-view";

const SESSION_ID = /^cs_[A-Za-z0-9_]+$/;

export const metadata: Metadata = {
  title: "Payment received",
  description: "Payment received. Sign in to PiTradingAgent with your QuantLogicLab account.",
};

export const dynamic = "force-dynamic";

export default async function SubscribeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id && SESSION_ID.test(params.session_id) ? params.session_id : null;
  let planId: PlanId | null = null;
  let showDownload = false;

  if (sessionId) {
    const stripe = getStripe();
    const auth = await getAuthSession().catch(() => null);
    if (stripe) {
      try {
        const checkout = await stripe.checkout.sessions.retrieve(sessionId);
        const result = await fulfillCheckoutRecord({
          stripeSessionId: checkout.id,
          paymentStatus: checkout.payment_status,
          metadataPlanId: checkout.metadata?.planId,
          amountSubtotal: checkout.amount_subtotal,
          amountTotal: checkout.amount_total,
          userId: checkout.metadata?.userId || checkout.client_reference_id,
          email: checkout.customer_details?.email || checkout.customer_email,
          currency: checkout.currency,
          purchasedAt: typeof checkout.created === "number" ? new Date(checkout.created * 1000) : null,
        });
        if (result.status !== "ignored" && isPlanId(result.planId)) {
          const sameUser = Boolean(auth?.user?.id && result.userId && auth.user.id === result.userId);
          const sameEmail = Boolean(
            auth?.user?.email && result.email && auth.user.email.toLowerCase() === result.email.toLowerCase()
          );
          if (sameUser || sameEmail) {
            planId = result.planId;
            showDownload = result.planId === "349" && (result.status === "applied" || result.status === "duplicate");
          }
          if (result.status === "applied" || result.status === "pending_user") {
            await sendFulfillmentEmails({
              result,
              amount: formatCheckoutAmount(checkout.amount_total, checkout.currency, result.planId),
              sessionId: checkout.id,
            });
          }
        }
      } catch (error) {
        logLicenseSchemaError(error, "STRIPE_SUCCESS");
      }
    }
  }

  return <SuccessView sessionId={sessionId} planId={planId} showDownload={showDownload} />;
}
