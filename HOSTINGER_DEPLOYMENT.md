# Hostinger Deployment Guide for Nyeras

This document provides step-by-step instructions for deploying and running **Nyeras** on Hostinger (either **Hostinger Cloud/Web Hosting with Node.js** or **Hostinger VPS**).

---

## 1. Prerequisites & Hostinger Environment

- **Node.js Version**: **v18.18.0+** or **v20.x** (v20.x LTS is strongly recommended).
- **Package Manager**: `npm`
- **Application Startup File**: `server.js`

---

## 2. Option A: Hostinger Cloud / Shared Hosting (hPanel Node.js App)

If you are using Hostinger's built-in **Node.js** feature in hPanel:

### Step 1: Configure the Node.js Application in hPanel
1. Open **hPanel** -> **Websites** -> Manage `nyeras.com`.
2. Go to **Advanced** -> **Node.js**.
3. Set the configuration:
   - **Node.js version**: `20.x` (or `18.x`)
   - **Application mode**: `Production`
   - **Application root**: `public_html` (or your domain directory)
   - **Application URL**: `nyeras.com`
   - **Application startup file**: `server.js`
4. Click **Save** / **Create**.

### Step 2: Environment Variables (`.env`)
Create or edit `.env` in your application root with the following:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://nyeras.com

# Database (On Hostinger, localhost or the server IP)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=u477423730_nyeras_d_u
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=u477423730_mx_nyeras_d

# Admin Session (/admin)
ADMIN_USERNAME=muskanjal638@gmail.com
ADMIN_PASSWORD=admin@nyeras2026
ADMIN_SESSION_SECRET=your_random_secret_here

# Google Sheets Callback Form (Optional)
GOOGLE_SPREADSHEET_ID=1j29qQWzQchQA1pFu66A7WbSs8LnvHVn1Yr4aCzXyMaE
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

> **Note on MySQL Host**: If connecting from inside the same Hostinger account, `MYSQL_HOST=localhost` is standard. If using remote IP, ensure **Remote MySQL** is enabled in hPanel for that IP.

### Step 3: Install & Build
In the hPanel Node.js dashboard (or via SSH):
```bash
npm install
npm run build
```
*(The build step automatically compiles Next.js and synchronizes static assets).*

### Step 4: Restart the Application
Click **Restart** in the Node.js panel in hPanel.

### Step 5: Verify Deployment
Visit:
- **`https://nyeras.com/api/health`** (Should return `{"status":"ok", "database": {"status":"connected"}}`)
- **`https://nyeras.com/`** (Homepage)
- **`https://nyeras.com/domains`** (Domains & Courses)

---

## 3. Option B: Hostinger VPS (Ubuntu / Debian + PM2 + Nginx)

If deploying to a Hostinger VPS:

### Step 1: Install Dependencies & Build
```bash
cd /var/www/nyeras
git pull origin main
npm install
npm run build
```

### Step 2: Run with PM2
```bash
pm2 start server.js --name "nyeras" -i max
pm2 save
pm2 startup
```

### Step 3: Nginx Reverse Proxy Configuration
```nginx
server {
    server_name nyeras.com www.nyeras.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static assets caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

---

## 4. Why 504 Gateway Time-out Happened (and How it is Fixed)

1. **Root Cause**: The original `server.js` was trying to `require('./src/server/index.ts')`. Node.js threw `ERR_MODULE_NOT_FOUND` and crashed instantly because Node does not execute `.ts` files directly.
2. **Proxy Hang**: Because the Node process died immediately upon launch, Hostinger's Passenger/Nginx reverse proxy received no response and timed out after 60-120s with HTTP 504.
3. **Fix Implemented**: `server.js` was replaced with a production Next.js HTTP server that seamlessly supports both numeric ports and Hostinger Passenger Unix domain sockets, and automatically loads `.env`.
