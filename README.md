<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d20ead71-3ace-4086-bf9a-6b6b5db2c610

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values you need. Do not commit that file.
3. Run the app: `npm run dev`

## Overseas Stripe checkout (PiTradingAgent)

The buy page (`/subscribe`) has two one-time USD tiers. **$149** is the full MT5 indicators & EA collection. **$349** (recommended) is the full PiTradingAgent desktop tool. The desktop tier is delivered as the setup zip and a PTA1 license.

Stripe is for buyers outside mainland China. The page keeps a small footnote for mainland buyers and does not use that as the buy button.

Checkout prefers a Stripe Checkout Session. A Payment Link is used only when that tier has no Price ID. If neither is configured, the price still shows and the button explains that checkout is not configured.

### Create the two prices in Stripe Dashboard

1. Open [Stripe Dashboard → Product catalog](https://dashboard.stripe.com/products) (test mode first, then live).
2. Add a product named `PiTradingAgent Setup 8.0.0`. Description suggestion: `MT5 chart-companion desktop app. Delivery: setup zip and PTA1 license.`
3. Add a one-time price of **USD 149**. Copy the Price ID (`price_...`) into `STRIPE_PRICE_149`.
4. On the same product, add another one-time price of **USD 349**. Copy it into `STRIPE_PRICE_349`.
5. Developers → API keys: put the secret key in `STRIPE_SECRET_KEY`. The publishable key is optional for this hosted Checkout flow.
6. Developers → Webhooks → add endpoint `https://quantlogiclab.com/api/stripe/webhook`, event `checkout.session.completed`. Put the signing secret in `STRIPE_WEBHOOK_SECRET`.

Payment Link alternative: on each price, create a Payment Link and set `STRIPE_PAYMENT_LINK_149` / `STRIPE_PAYMENT_LINK_349` to the `https://buy.stripe.com/...` URL. If a Price ID and a link are both set, Checkout Session wins.

### Hostinger environment variables

hPanel → Websites → the quantlogiclab.com site → **Environment variables**. Add the keys from `.env.example`, save, and redeploy. Hostinger injects them into the build and the running app. Keys must be uppercase letters, numbers, and underscores. Do not commit the values.

Required for card checkout:

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_149`
- `STRIPE_PRICE_349`
- `STRIPE_WEBHOOK_SECRET`

Optional:

- `STRIPE_PAYMENT_LINK_149`, `STRIPE_PAYMENT_LINK_349`
- `STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ORDER_NOTIFY_EMAIL` plus the existing `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (order email). Without SMTP, a paid webhook is logged as `[STRIPE_FULFILLMENT_PENDING]` and still acknowledged.
- `NEXT_PUBLIC_SITE_URL` (`https://quantlogiclab.com`, no port)

Buying requires a signed-in account (email or Google). Guests are sent to `/login?callbackUrl=/subscribe?plan=149` or `plan=349`, and after login the site opens Stripe Checkout. The Checkout Session stores `metadata.userId`, `metadata.planId`, and `client_reference_id`.

`checkout.session.completed` on `/api/stripe/webhook` writes the plan before any email:

| planId | `user.membershipLevel` | Dashboard label | What they can download |
| --- | --- | --- | --- |
| 149 | 1 | PRO | MT5 indicators and EAs already listed on the dashboard |
| 349 | 2 | ULTRA | Those tools, plus the PiTradingAgent installer |

The license lasts one year from the order (`vipUntil`). A higher existing level is kept. A later existing expiry is kept. The same Checkout Session cannot extend the year twice.

The webhook also inserts an `activation_codes` row (`PRO-…` or `ULTRA-…`), binds it to the user and the Checkout Session, and shows it on the dashboard and the success page. The buyer does not redeem that code again. Hand-issued codes still use `/api/user/activate`.

Run `drizzle/0003_activation_order.sql` once on the Hostinger MySQL database before the new webhook is deployed. Until those columns exist, the webhook returns 500 so Stripe retries.

The installer is not in this repo. `Download PiTradingAgent` calls `GET /api/download/pitradingagent`, which checks the signed-in ULTRA account and then:

1. `GITHUB_TOKEN` + `GITHUB_RELEASE_ASSET_URL` (GitHub API asset URL). The server asks GitHub for a short-lived file URL and redirects the browser there. The buyer does not see the repository page. The token stays on the server.
2. Otherwise `PITRADINGAGENT_DOWNLOAD_URL`, an `https://` object-storage URL. `github.com` pages are rejected.
3. Otherwise a file named `private-tools/PiTradingAgent-Setup.zip` on the server (same private folder as the `.ex5` tools).

Optional `PITRADINGAGENT_DOWNLOAD_FILENAME` sets the downloaded filename (default `PiTradingAgent-Setup.zip`).

The site does not store card numbers.

### Hostinger environment variables for the installer

Add these next to the Stripe keys, then redeploy. Do not commit the values.

- `GITHUB_TOKEN` — token that can read the private release asset (`contents: read` is enough)
- `GITHUB_RELEASE_ASSET_URL` — `https://api.github.com/repos/OWNER/REPO/releases/assets/ASSET_ID`
- `PITRADINGAGENT_DOWNLOAD_URL` — used only when the GitHub pair above is unset
- `PITRADINGAGENT_DOWNLOAD_FILENAME` — optional download name

Database (already required for login): `DATABASE_URL`. Apply `drizzle/0003_activation_order.sql` in phpMyAdmin.

## www.quantlogiclab.com

`www` was redirected with the Node listen port still attached (`https://quantlogiclab.com:3000/`), which times out. The redirect now targets `https://quantlogiclab.com` with no port. After deploy, `curl -sI https://www.quantlogiclab.com` should show `308` and `location: https://quantlogiclab.com/` (no `:3000`). Browsers cache 308 responses, so check in a private window.

If the Location still contains `:3000`, the proxy is redirecting before this app. In hPanel:

1. Websites → Manage the **same** Node.js website for both `quantlogiclab.com` and `www.quantlogiclab.com`. Hostinger can run them as separate processes; the www site must not point at a public URL that includes port 3000.
2. Domains → Redirects. Delete any redirect whose destination contains `:3000`. If you add one, source `www.quantlogiclab.com`, destination `https://quantlogiclab.com`, type 301. Do not type a port.
3. DNS: `www` should be the Hostinger website CNAME (or the same records as the apex), not a host that publishes port 3000.
4. SSL/TLS: certificate covers both apex and `www`.
5. Node.js app port stays **3000 internally**. The public proxy forwards 443 to that port and must not copy it into Location.
6. Purge the CDN cache, then restart the Node.js app.
