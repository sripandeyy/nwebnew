# NYERAS LinkedIn Company-Post Feed

Shows posts from the NYERAS LinkedIn company page on the website (homepage and About page),
using LinkedIn's official Posts API. Until a page admin authorizes the app and an authenticated
API request succeeds, the feed stays in a **pending** state and shows no posts.

---

## 1. Architecture

```
Browser (Next.js site, :3000)
  LinkedInFeed component
    ├─ GET /api/linkedin/posts  ──► Next.js route (server-side proxy, no secrets) ─┐
    └─ Socket.IO (live updates) ───────────────────────────────────────────────────┤
                                                                                   ▼
Express backend (src/server, :5001)  ── owns OAuth, token, sync, cache
  GET  /api/linkedin/auth       admin-only: starts OAuth (CSRF state, 10 min, single use)
  GET  /api/linkedin/callback   exchanges code, verifies org access, stores token
  GET  /api/linkedin/posts      cached posts + status (public, secret-free)
  GET  /api/linkedin/status     diagnostic status (public, secret-free)
  POST /api/linkedin/sync       admin-only, 30 s cooldown
  Scheduled sync (interval or cron) ─► LinkedIn REST API
                                         GET /rest/posts?author={org URN}&q=author
                                         GET /rest/images/{urn}, /rest/videos/{urn}
```

Request headers sent to LinkedIn (per the official Posts API docs):
`Authorization: Bearer …`, `Linkedin-Version: 202609`, `X-Restli-Protocol-Version: 2.0.0`,
and `X-RestLi-Method: FINDER` for the author finder.

Status fields: `configured` (credentials present), `authenticated` (a token exists),
`live` (an authenticated LinkedIn API request has **succeeded** with the current token).
The UI only shows "Live" when `live` is true.

---

## 2. LinkedIn prerequisites (must be done by NYERAS)

1. **Developer app**: create one at <https://www.linkedin.com/developers/> and associate it with the
   NYERAS EduTech Innovations company page (a page admin must verify the association).
2. **Community Management API**: request it under the app's *Products* tab. It is a vetted product:
   LinkedIn reviews the legal organization, business email, website and privacy policy.
   Development tier is granted first (limited call volume); Standard tier requires a screencast review.
   ("Share on LinkedIn" is **not** sufficient – it cannot read organization posts.)
3. **Scope**: `r_organization_social`. Optional: `w_organization_social` – LinkedIn's Images API
   requires a write-level scope even for GET, so without it image posts show a
   "View image on LinkedIn" link instead of a preview.
4. **Authorizing member**: must hold an *Administrator* or *Content Admin* role on the NYERAS page.
   The callback rejects tokens that cannot read the organization's posts.
5. **Redirect URL**: add the backend callback under *Auth → Authorized redirect URLs*, e.g.
   `http://localhost:5001/api/linkedin/callback` (dev) and `https://<backend-domain>/api/linkedin/callback` (prod).
6. **Organization ID**: the numeric ID from the page admin URL
   (`linkedin.com/company/<ID>/admin/`).

---

## 3. Configuration

```bash
cp .env.example .env
```

Fill in `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_ORG_ID`, `LINKEDIN_REDIRECT_URI`,
and in production `LINKEDIN_ADMIN_KEY` (`openssl rand -hex 32`). All variables are documented
in `.env.example`. Secrets are read only by the Express backend; the Next.js app only needs
`LINKEDIN_BACKEND_URL` (server-side) and `NEXT_PUBLIC_SOCKET_URL` (public, no secret).

---

## 4. Running locally

```bash
npm run server   # Express + Socket.IO backend on :5001
npm run dev      # Next.js site
```

Authorize once (as a NYERAS page admin), in a browser on the same machine:

```
http://localhost:5001/api/linkedin/auth
```

With `LINKEDIN_ADMIN_KEY` set, append `?key=<admin key>`. After consent, the callback page reports
success only if the token could read the NYERAS posts; the first sync then runs immediately and
the homepage feed updates via Socket.IO.

Check state at any time:

```bash
curl http://localhost:5001/api/linkedin/status
```

Force a sync (admin):

```bash
curl -X POST -H "X-LinkedIn-Admin-Key: $LINKEDIN_ADMIN_KEY" http://localhost:5001/api/linkedin/sync
```

---

## 5. Operational notes

- **Token lifetime**: LinkedIn access tokens last ~60 days. Programmatic refresh is only available
  to approved partners, so an admin must re-run `/api/linkedin/auth` before expiry. When the token
  expires the feed keeps showing the last synced posts and the status returns to pending.
- **API version**: LinkedIn sunsets each monthly version ~12 months after release. A sunset version
  produces a clear "no longer supported" sync error; update `LINKEDIN_API_VERSION`.
- **Hosting**: the backend must be a long-running Node process with a writable `LINKEDIN_CACHE_DIR`
  (not a serverless function – Vercel functions cannot keep the token, cache or schedule).
  Set `FRONTEND_URL`/`CORS_ALLOWED_ORIGINS` to the site's origins and `LINKEDIN_BACKEND_URL` /
  `NEXT_PUBLIC_SOCKET_URL` on the Next.js deployment to the backend's public URL.
- **Feed content**: only `PUBLISHED`, `PUBLIC`, main-feed posts are shown (sponsored "dark" posts
  are excluded). Posts deleted on LinkedIn are removed on the next sync. Duplicates are prevented
  by post URN.

---

## 6. Security

- Client secret and access token stay on the backend (memory + `.cache/linkedin_token.json`, mode 600,
  git-ignored). `/status` and `/posts` never include them (covered by tests).
- OAuth `state`: 32 random bytes, 10-minute expiry, consumed once.
- `/auth` and `/sync` require `LINKEDIN_ADMIN_KEY` (or localhost when unset).
- Callback pages HTML-escape all LinkedIn/user-supplied text; `postMessage` targets `FRONTEND_URL` only.
- CORS and Socket.IO accept only the configured frontend origins; browsers cannot trigger syncs.
- 401 clears the stored token; 403/426/429 are reported in status without crashing the server.

---

## 7. Tests

```bash
npm test
```

43 tests covering config defaults, OAuth URL/state handling, Posts API request format and headers,
post filtering and normalization, media resolution, duplicate prevention and deletion handling,
token verification, admin protection, callback XSS escaping, CORS, and secret non-disclosure.
Tests use a temporary cache directory and mocked LinkedIn responses – they never touch real
credentials or the real `.cache/`.
