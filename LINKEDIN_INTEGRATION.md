# NYERAS LinkedIn Company-Post Feed

Shows posts from the NYERAS LinkedIn company page on the homepage, using LinkedIn's official
Posts API. Until a page admin connects LinkedIn and an authenticated API request succeeds, the
feed stays in a **pending** state and shows no posts.

---

## 1. Architecture

Everything runs inside the Next.js site (works on Vercel; no separate server). The access token
and the cached posts live in MySQL, table `linkedin_state` (created automatically).

```
Browser
  LinkedInFeed component ── polls GET /api/linkedin/posts every 60 s
  /lms admin → "LinkedIn Feed" tab ── Connect LinkedIn / Sync now

Next.js routes (src/app/api/linkedin)
  GET  /posts      cached posts + status (public, secret-free); if the cache is older than
                   LINKEDIN_SYNC_INTERVAL_MS it refreshes from LinkedIn *after* responding
  GET  /status     diagnostic status (public, secret-free)
  GET  /auth       admin only: starts OAuth (signed state + httpOnly cookie, 10 min)
  GET  /callback   exchanges code, verifies org access, stores token, first sync
  POST /sync       admin only, 30 s cooldown
        └─► LinkedIn REST API: GET /rest/posts?author={org URN}&q=author
                               GET /rest/images/{urn}, /rest/videos/{urn}
```

Refreshes are claimed through an atomic MySQL update, so across all serverless instances
LinkedIn is called at most once per interval, however many visitors load the page.

Request headers sent to LinkedIn: `Authorization: Bearer …`, `Linkedin-Version: 202609`,
`X-Restli-Protocol-Version: 2.0.0`, and `X-RestLi-Method: FINDER` for the author finder.

Status fields: `configured` (credentials present), `authenticated` (a usable token exists),
`live` (an authenticated LinkedIn API request has **succeeded** with the current token).
The feed only shows "Live" when `live` is true.

---

## 2. LinkedIn prerequisites (must be done by NYERAS)

1. **Developer app**: created at <https://www.linkedin.com/developers/> and associated with the
   NYERAS EduTech Innovations company page (a page admin must verify the association).
2. **Community Management API**: requested under the app's *Products* tab and approved by LinkedIn.
   ("Share on LinkedIn" is **not** sufficient – it cannot read organization posts.)
3. **Scope**: `r_organization_social`. Optional: `w_organization_social` – LinkedIn's Images API
   requires a write-level scope even for GET, so without it image posts show a
   "View image on LinkedIn" link instead of a preview.
4. **Authorizing member**: must hold an *Administrator* or *Content Admin* role on the NYERAS page.
   The callback rejects tokens that cannot read the organization's posts.
5. **Redirect URLs**: add every origin the site runs on under *Auth → Authorized redirect URLs*:
   - `http://localhost:3001/api/linkedin/callback` (local dev; use the port `npm run dev` prints)
   - `https://www.nyeras.com/api/linkedin/callback` (production)

   The exact URL for the current site is shown in the admin portal's LinkedIn tab.
6. **Organization ID**: the numeric ID from the page admin URL (`linkedin.com/company/<ID>/admin/`).

---

## 3. Configuration

Set these locally in `.env` (git-ignored) and on Vercel under *Project Settings → Environment
Variables*. All are documented in `.env.example`.

| Variable | Required |
|---|---|
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | yes |
| `LINKEDIN_ORG_ID` | yes |
| `LINKEDIN_REDIRECT_URI` | no – defaults to `<origin>/api/linkedin/callback` |
| `LINKEDIN_SYNC_INTERVAL_MS`, `LINKEDIN_API_VERSION`, `LINKEDIN_SCOPES` | no |
| `LINKEDIN_ADMIN_KEY` | no – only for scripted `/auth` and `/sync` calls |
| `LINKEDIN_ACCESS_TOKEN` | no – alternative to the Connect flow |

The MySQL connection comes from the existing `src/app/api/dbConfig.ts`.

---

## 4. Connecting

1. Sign in to the admin portal at `/lms` and open the **LinkedIn Feed** tab.
2. Click **Connect LinkedIn**. In the popup, a NYERAS page admin signs in and clicks **Allow**.
3. The popup reports success only if the token could read the NYERAS posts; the first sync runs
   immediately and posts appear on the homepage.

Scripted alternative (with `LINKEDIN_ADMIN_KEY` set):

```bash
curl http://localhost:3001/api/linkedin/status
curl -X POST -H "X-LinkedIn-Admin-Key: $LINKEDIN_ADMIN_KEY" http://localhost:3001/api/linkedin/sync
```

---

## 5. Operational notes

- **Token lifetime**: LinkedIn access tokens last ~60 days. If LinkedIn issued a refresh token, it is
  used automatically; otherwise an admin clicks **Reconnect LinkedIn** before expiry. When the token
  expires the feed keeps showing the last synced posts and the status returns to pending.
- **API version**: LinkedIn sunsets each monthly version ~12 months after release. A sunset version
  produces a clear "no longer supported" sync error; update `LINKEDIN_API_VERSION`.
- **Feed content**: only `PUBLISHED`, `PUBLIC`, main-feed posts are shown (sponsored "dark" posts
  are excluded). Posts deleted on LinkedIn are removed on the next sync. Duplicates are prevented
  by post URN.

---

## 6. Security

- Client secret and access token stay server-side (env vars and MySQL). `/status` and `/posts`
  never include them; only a SHA-256 fingerprint of the verified token is kept with the feed.
- OAuth `state`: HMAC-signed, 10-minute expiry, and bound to the initiating browser by an httpOnly cookie.
- `/auth` and `/sync` require the `/lms` admin session or `LINKEDIN_ADMIN_KEY`.
- The callback page HTML-escapes all LinkedIn-supplied text; `postMessage` targets the site's own origin.
- A 401 from LinkedIn drops the stored token; 403/426/429 are reported in status.

---

## 7. Tests

```bash
npm test
```

Covers config defaults and callback URL resolution, OAuth URL and state signing/expiry, token
exchange/refresh requests, Posts API request format and headers, post filtering and normalization,
media resolution, duplicate prevention and deletion handling. LinkedIn responses are mocked;
tests never touch real credentials or the database.
