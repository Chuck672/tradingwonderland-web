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
4. Unit tests: `node --experimental-strip-types --test lib/*.test.ts`

## Overseas Stripe checkout (PiTradingAgent)

The buy page (`/subscribe`) has two one-time USD tiers. **$149** is the full MT5 indicators & EA collection. **$349** (recommended) is the full PiTradingAgent desktop tool. The desktop app signs in with the QuantLogicLab email and password. License codes are no longer issued.

Stripe is for buyers outside mainland China. The page keeps a small footnote for mainland buyers and does not use that as the buy button.

Checkout prefers a Stripe Checkout Session. A Payment Link is used only when that tier has no Price ID. If neither is configured, the price still shows and the button explains that checkout is not configured.

### Create the two prices in Stripe Dashboard

1. Open [Stripe Dashboard → Product catalog](https://dashboard.stripe.com/products) (test mode first, then live).
2. Add a product named `PiTradingAgent Setup 8.0.0`. Description suggestion: `MT5 chart-companion desktop app. Delivery: installer. Sign in with the QuantLogicLab account.`
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

The license lasts one year from the Stripe Checkout Session `created` time (`vipUntil`). A higher existing level is kept. A later existing expiry is kept. The same Checkout Session cannot extend the year twice, because the grant anchor is that original timestamp and a `checkout_fulfillments` row records the session.

Paid checkout upgrades `membershipLevel` and `vipUntil` only. It does not call a license-code generator and it does not insert new `activation_codes` rows. Buyer and admin email do not include a code. The dashboard does not list codes or offer a redeem box. `POST /api/user/activate` still checks `isAllowedOrigin` and then returns `410 retired`. The `activation_codes` table stays for history. A checkout that already has a historical row is finished from that row and is not copied into a second code.

Run `drizzle/0004_checkout_fulfillments.sql` once on the Hostinger MySQL database before this webhook is deployed. Until `checkout_fulfillments` exists, a new paid session returns 500 so Stripe retries. `drizzle/0003_activation_order.sql` is still required for older rows that already have a Checkout Session id. Do not drop `activation_codes`.

The installer is not in this repo. `Download PiTradingAgent` calls `GET /api/download/pitradingagent`, which checks the signed-in ULTRA account and then:

1. `GITHUB_TOKEN` + `GITHUB_RELEASE_ASSET_URL` (GitHub API asset URL). The server asks GitHub for a short-lived file URL and redirects the browser there. The buyer does not see the repository page. The token stays on the server.
2. Otherwise `PITRADINGAGENT_DOWNLOAD_URL`, an `https://` object-storage URL. `github.com` pages are rejected.
3. Otherwise a file named `private-tools/PiTradingAgent-Setup.zip` on the server.

Optional `PITRADINGAGENT_DOWNLOAD_FILENAME` sets the downloaded filename (default `PiTradingAgent-Setup.zip`).

Dashboard tool downloads call `GET /api/tools/download?toolId=...`. A blank `vipUntil` does not expire the membership; only a past date does. When `GITHUB_TOKEN` and `GITHUB_TOOLS_RELEASE_TAG` are both set, the server reads that GitHub release and downloads the asset whose name matches the tool file. `GITHUB_TOOLS_REPO` is optional and defaults to `Chuck672/PiTradingAgentV8`. Publish the tag you put in `GITHUB_TOOLS_RELEASE_TAG` (for example `mt5-ex5`) with these exact asset names:

- `SVP5_pro.ex5`
- `inRangeVP.ex5`
- `scalpTradingPanel.ex5`
- `strengthBubble_pro.ex5`
- `Trend_Panel9_pro.ex5`
- `microOrderFlow.ex5`

The six MT5 `.ex5` tools are not committed in this repository. They are the release assets on [PiTradingAgentV8 tag `mt5-ex5`](https://github.com/Chuck672/PiTradingAgentV8/releases/tag/mt5-ex5). If the tag is unset, the asset is missing, or GitHub errors, the route looks for `private-tools/<filename>.ex5` on the server and serves that file only when it is present. The token stays on the server.

The site does not store card numbers.

### Hostinger environment variables for the installer

Add these next to the Stripe keys, then redeploy. Do not commit the values.

- `GITHUB_TOKEN` — token that can read the private release asset (`contents: read` is enough). The MT5 tools reuse this same token.
- `GITHUB_RELEASE_ASSET_URL` — `https://api.github.com/repos/OWNER/REPO/releases/assets/ASSET_ID`
- `PITRADINGAGENT_DOWNLOAD_URL` — used only when the GitHub pair above is unset
- `PITRADINGAGENT_DOWNLOAD_FILENAME` — optional download name
- `GITHUB_TOOLS_RELEASE_TAG` — release tag that holds the `.ex5` assets (for example `mt5-ex5`). Required for the remote tool path.
- `GITHUB_TOOLS_REPO` — optional `owner/repo`. Defaults to `Chuck672/PiTradingAgentV8`.

Database (already required for login): `DATABASE_URL`. Apply `drizzle/0004_checkout_fulfillments.sql` in phpMyAdmin before deploying the checkout change. Leave `activation_codes` in place.

## Desktop member login (PiTradingAgent)

PiTradingAgent's Electron main process signs in with the website email and password. This is not a browser session and it does not call `/api/auth/[...nextauth]`.

A paid member is `isMembershipActive(membershipLevel, vipUntil, 1)`: PRO or ULTRA, and the expiry is still in the future. **A null, missing, or blank `vipUntil` is non-expiring**, which is the same rule the download and dashboard helpers already use. The JSON field is `null` in that case. A level below 1 is `unpaid`. A past `vipUntil` is `membership_expired`. An account with no password hash (Google-only until a password is set) is `password_not_set`. A wrong email or password is `invalid_credentials`. Too many attempts is `429 rate_limited`. Login, session, and refresh all use that membership rule.

One paid membership can be registered on **2 computers**. The desktop app sends a stable `deviceId` (1–128 visible ASCII characters, no spaces). The same `deviceId` updates `lastSeenAt` and does not take a second slot. A third distinct `deviceId` is `device_limit` and receives the computers already registered. Signing in again with `revokeDeviceId` removes one of those computers and registers the new one in the same request. The account still ends with at most 2 computers.

Apply `drizzle/0005_desktop_device.sql` in phpMyAdmin on database `u904162120_QuantLogicLab` before deploying these routes. The script creates `desktop_device` only when that table is missing. It contains no password or secret.

### `POST /api/desktop/login`

Password check matches the website Credentials provider. The body is JSON. `deviceName` and `revokeDeviceId` may be omitted. A blank `deviceName` leaves the stored name unchanged. `revokeDeviceId` is how the new computer removes an old one before it has a token.

```json
{
  "email": "member@example.com",
  "password": "secret",
  "deviceId": "9f2c1c0e-7b3a-4d1e-9a55-0c1b2a3d4e5f",
  "deviceName": "Office PC",
  "revokeDeviceId": "older-device-id"
}
```

Success `200`:

```json
{
  "token": "<access jwt>",
  "refreshToken": "<refresh jwt>",
  "tokenType": "Bearer",
  "expiresAt": "2026-11-25T18:00:00.000Z",
  "refreshExpiresAt": "2027-01-24T17:00:00.000Z",
  "deviceId": "9f2c1c0e-7b3a-4d1e-9a55-0c1b2a3d4e5f",
  "email": "member@example.com",
  "membershipLevel": 1,
  "vipUntil": null
}
```

`token` is the access token (1 hour, `expiresAt`). `refreshToken` expires 60 days after this password login (`refreshExpiresAt`). A later refresh keeps that same `refreshExpiresAt`. Another password login starts a new 60-day window.

`device_limit` is `403`. `devices` is the existing computers, newest `lastSeenAt` first, so the app can show them and send one `id` back as `revokeDeviceId`:

```json
{
  "error": "device_limit",
  "message": "This membership is already signed in on 2 computers.",
  "devices": [
    { "id": "device-b", "name": "Home PC", "lastSeenAt": "2026-11-25T17:00:00.000Z" },
    { "id": "device-a", "name": "Office PC", "lastSeenAt": "2026-11-20T17:00:00.000Z" }
  ]
}
```

`device_not_found` is `400` when `revokeDeviceId` is not one of those computers. The body includes the same `devices` array and does not register the new computer.

Other login errors: `invalid_request` `400`, `invalid_credentials` `401`, `password_not_set` `403`, `unpaid` `403`, `membership_expired` `403`, `rate_limited` `429` with `Retry-After`, `browser_origin` `403`, `unconfigured` `503`, `server` `500`.

### `GET /api/desktop/session`

`Authorization: Bearer <access token>`. The route checks the signature, loads the user, checks the membership, and checks that this token's `deviceId` is still registered. It does not return a new token.

Success `200`: `{ "email", "membershipLevel", "vipUntil", "expiresAt" }`.

`token_expired` `401` means the one-hour access token lapsed; call refresh. `device_revoked` `401` means this computer was removed; call login with the password. `invalid_token` `401`, `unpaid` `403`, and `membership_expired` `403` are unchanged.

### `POST /api/desktop/refresh`

Silent renewal. The body is JSON. There is no password and no `Authorization` header. The `deviceId` must be the one inside the refresh token, and that computer must already be registered. This route does not insert a computer, so a third computer cannot refresh its way in.

```json
{
  "refreshToken": "<refresh jwt>",
  "deviceId": "9f2c1c0e-7b3a-4d1e-9a55-0c1b2a3d4e5f"
}
```

Success `200` uses the same shape as login. `expiresAt` is one hour from this call. `refreshExpiresAt` is the original 60-day deadline, not a new one. Replace the stored access token. The returned `refreshToken` is a replacement with that same deadline; older refresh tokens for this computer also keep working until that deadline or until the computer is removed.

`token_expired` `401` means the 60 days are over; ask for the password. `device_revoked` `401` means this computer is not registered; ask for the password. `invalid_token` `401` covers a bad token, an access token presented here, or a `deviceId` that does not match the token. `unpaid` and `membership_expired` are `403`. A removed computer cannot mint another access token.

### Tokens

Both tokens are HS256 and are signed with `DESKTOP_JWT_SECRET`. They are not signed with `NEXTAUTH_SECRET`. Access tokens use `aud` `pitradingagent` and claim `use` `access`. Refresh tokens use `aud` `pitradingagent-refresh` and claim `use` `refresh`. Both include `sub`, `email`, `deviceId`, `iss` `quantlogiclab-desktop`, `iat`, and `exp`. An access token is rejected by the refresh route, and a refresh token is rejected by session.

The routes do not read or write NextAuth cookies. Requests that send an `Origin` header or browser `Sec-Fetch-*` headers are rejected, and the response does not set `Access-Control-Allow-Origin`. Use Node `fetch` in the Electron main process so those headers are absent. Chromium `net.fetch` often sends an `Origin` and is rejected on purpose.

Sign-in attempts are limited per process: 8 per 15 minutes for an IP plus email, and 40 per 15 minutes for that IP. A restart clears the counters. Refresh does not consume that counter.

### Hostinger environment variable

Set this on the quantlogiclab.com Node site (hPanel → Websites → Environment variables) after merge, then redeploy when you choose to ship. This change does not deploy production.

- `DESKTOP_JWT_SECRET` — required for `/api/desktop/login`, `/api/desktop/session`, and `/api/desktop/refresh`. A random string of at least 32 characters. It must be different from `NEXTAUTH_SECRET`. If it is missing, too short, or equal to `NEXTAUTH_SECRET`, those routes return `503` and the website login is unchanged. Do not commit a value. Refresh uses this same secret. Do not add another one.

No other new secret is required. `DATABASE_URL` and `NEXTAUTH_SECRET` stay as they are. Apply `drizzle/0004_checkout_fulfillments.sql` in phpMyAdmin before the fulfillment code is deployed, and `drizzle/0005_desktop_device.sql` before the device routes are deployed.

## www.quantlogiclab.com

`www` was redirected with the Node listen port still attached (`https://quantlogiclab.com:3000/`), which times out. The redirect now targets `https://quantlogiclab.com` with no port. After deploy, `curl -sI https://www.quantlogiclab.com` should show `308` and `location: https://quantlogiclab.com/` (no `:3000`). Browsers cache 308 responses, so check in a private window.

If the Location still contains `:3000`, the proxy is redirecting before this app. In hPanel:

1. Websites → Manage the **same** Node.js website for both `quantlogiclab.com` and `www.quantlogiclab.com`. Hostinger can run them as separate processes; the www site must not point at a public URL that includes port 3000.
2. Domains → Redirects. Delete any redirect whose destination contains `:3000`. If you add one, source `www.quantlogiclab.com`, destination `https://quantlogiclab.com`, type 301. Do not type a port.
3. DNS: `www` should be the Hostinger website CNAME (or the same records as the apex), not a host that publishes port 3000.
4. SSL/TLS: certificate covers both apex and `www`.
5. Node.js app port stays **3000 internally**. The public proxy forwards 443 to that port and must not copy it into Location.
6. Purge the CDN cache, then restart the Node.js app.
