# Gym Lead Chatbot - Deployment Guide

Complete guide for deploying and embedding the Gym Lead Chatbot on your website.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Local Development](#2-local-development)
3. [Database Setup](#3-database-setup)
4. [Production Build](#4-production-build)
5. [Deploying to Replit](#5-deploying-to-replit)
6. [WordPress Embedding](#6-wordpress-embedding)
7. [Admin Dashboard Access](#7-admin-dashboard-access)
8. [Custom Domain (Optional)](#8-custom-domain-optional)
9. [Monitoring & Maintenance](#9-monitoring--maintenance)

---

## 1. Overview

The Gym Lead Chatbot is a full-stack application that can be deployed in multiple ways:

### Deployment Options

| Method | Best For | Complexity |
|--------|----------|------------|
| **Replit** | Quick deployment, hosting included | Easy |
| **VPS/Cloud** | Full control, custom infrastructure | Advanced |
| **Docker** | Containerized deployments | Intermediate |

### Development vs Production Modes

| Feature | Development | Production |
|---------|-------------|------------|
| Hot Reload | Yes | No |
| Source Maps | Yes | No |
| Optimized Bundle | No | Yes |
| Error Details | Verbose | Minimal |
| Command | `npm run dev` | `npm start` |

---

## 2. Local Development

### Prerequisites

Before starting, ensure you have:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** database (local or cloud)

Check your versions:

```bash
node --version  # Should output v18.x.x or higher
npm --version   # Should output 9.x.x or higher
```

### Step 1: Clone/Fork the Repository

```bash
git clone https://github.com/your-repo/gym-lead-chatbot.git
cd gym-lead-chatbot
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Copy the sample environment file:

```bash
cp .env.sample .env
```

Edit `.env` with your configuration (see [Database Setup](#3-database-setup) for database details).

### Step 4: Run Database Migrations

```bash
npm run db:push
```

### Step 5: Start Development Server

```bash
npm run dev
```

### Step 6: Access the Application

Open your browser and navigate to:

- **Main App**: http://localhost:5000
- **Widget Preview**: http://localhost:5000/?widget=true
- **Admin Panel**: http://localhost:5000/admin

### Testing the Chatbot Locally

1. Open http://localhost:5000 in your browser
2. Click the floating chat button in the bottom-right corner
3. Complete the conversation flow to test lead capture
4. Check the admin panel at /admin to verify lead was saved

---

## 3. Database Setup

The chatbot requires a PostgreSQL database to store leads and conversation data.

### Option A: Neon (Recommended for Replit)

Neon offers a free tier perfect for getting started.

#### Step 1: Create Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub or email
3. Create a new project (e.g., "gym-chatbot")

#### Step 2: Get Connection String

1. In your Neon dashboard, click on your project
2. Go to **Connection Details**
3. Copy the connection string (starts with `postgresql://`)

It will look like:
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### Step 3: Add to Environment

**For local development**, add to your `.env` file:

```bash
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**For Replit**, add as a Secret (see [Deploying to Replit](#5-deploying-to-replit)).

### Option B: Other PostgreSQL Providers

#### Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to **Settings > Database**
3. Copy the **Connection string** (URI format)
4. Replace `[YOUR-PASSWORD]` with your database password

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

#### Railway

1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Copy the `DATABASE_URL` from Variables tab

#### Amazon RDS

```
postgresql://username:password@your-instance.region.rds.amazonaws.com:5432/database_name
```

#### Local PostgreSQL

```
postgresql://postgres:password@localhost:5432/gym_chatbot
```

### Schema Migration

After configuring your database, run migrations to create the required tables:

```bash
npm run db:push
```

This command:
- Connects to your database using `DATABASE_URL`
- Creates the `leads` table and any other required tables
- Sets up indexes for optimal query performance

**Verify migration success:**
```bash
# The command should complete without errors
# Check your database to confirm tables were created
```

---

## 4. Production Build

### Step 1: Build the Application

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` directory.

### Step 2: Run Production Server

```bash
npm start
```

The server will start on port 5000 (or `PORT` environment variable).

### Production Environment Variables

Ensure these are set for production:

```bash
NODE_ENV=production
DATABASE_URL=your-production-database-url
SESSION_SECRET=your-secure-random-string
```

### Build Output

After building, you'll have:

```
dist/
├── public/           # Frontend assets
│   ├── index.html
│   ├── assets/       # JS, CSS bundles
│   └── widget-loader.js
└── server/           # Backend code
    └── index-prod.js
```

---

## 5. Deploying to Replit

Replit provides the easiest deployment path with built-in hosting.

### Step 1: Fork or Import the Project

**Option A: Fork on Replit**
- Click "Fork" on the Replit project page

**Option B: Import from GitHub**
1. Go to [replit.com](https://replit.com)
2. Click **Create Repl**
3. Select **Import from GitHub**
4. Paste your repository URL

### Step 2: Configure Secrets

In your Replit project:

1. Click **Secrets** in the left panel (lock icon)
2. Add the following secrets:

| Key | Value | Required |
|-----|-------|----------|
| `DATABASE_URL` | Your PostgreSQL connection string | Yes |
| `SESSION_SECRET` | Random 32+ character string | Yes |
| `SMTP_HOST` | SMTP server (e.g., smtp.gmail.com) | No |
| `SMTP_PORT` | SMTP port (e.g., 587) | No |
| `SMTP_USER` | Email address | No |
| `SMTP_PASS` | Email password/app password | No |
| `NOTIFICATION_EMAIL` | Email for lead notifications | No |

### Step 3: Run and Test

1. Click **Run** to start the application
2. The app will be available at your Replit dev URL
3. Test the chatbot and admin panel

### Step 4: Publish Your App

1. Click **Publish** in the top-right corner
2. Configure your published app settings:
   - Choose a custom subdomain (e.g., `gym-chatbot.replit.app`)
   - Set visibility options
3. Click **Publish**

### Step 5: Note Your Published URL

After publishing, your app URL will be:

```
https://your-app-name.replit.app
```

**Important:** Save this URL - you'll need it for embedding the widget.

---

## 6. WordPress Embedding

Embed the chatbot widget on your WordPress site using one of these methods.

### Method 1: Code Snippets Plugin (Recommended)

Best for non-technical users who want easy management.

#### Step 1: Get Your Published App URL

Your URL should look like:
```
https://your-app-name.replit.app
```

#### Step 2: Install Code Snippets Plugin

1. Log in to WordPress Admin
2. Go to **Plugins > Add New**
3. Search for **"Code Snippets"**
4. Click **Install Now**, then **Activate**

#### Step 3: Add the Widget Snippet

1. Go to **Snippets > Add New**
2. Give it a name: "Gym Chatbot Widget"
3. Add this PHP code:

```php
add_action('wp_footer', function() {
    echo '<script src="https://YOUR-APP-URL/widget-loader.js"></script>';
});
```

**Replace `YOUR-APP-URL` with your actual URL:**

```php
add_action('wp_footer', function() {
    echo '<script src="https://gym-chatbot.replit.app/widget-loader.js"></script>';
});
```

4. Set "Run snippet everywhere" to **Yes**
5. Click **Save Changes and Activate**

#### Step 4: Test the Widget

1. Visit your WordPress site (logged out or in incognito)
2. You should see the chat button in the bottom-right corner
3. Click it to open the chatbot

### Method 2: Theme footer.php

For developers comfortable editing theme files.

#### Step 1: Access Theme Editor

1. Go to **Appearance > Theme File Editor**
2. Select your active theme
3. Find and click **footer.php**

#### Step 2: Add Script Before Closing Body Tag

Add this code just before `</body>`:

```php
<!-- Gym Lead Chatbot Widget -->
<script src="https://YOUR-APP-URL/widget-loader.js"></script>
```

#### Step 3: Save and Test

Click **Update File** and test on your site.

**Note:** Changes may be lost when updating your theme. Consider using a child theme.

### Method 3: Insert Headers and Footers Plugin

Alternative plugin option with simple interface.

1. Install **"Insert Headers and Footers"** by WPBeginner
2. Go to **Settings > Insert Headers and Footers**
3. In the **Scripts in Footer** section, add:

```html
<script src="https://YOUR-APP-URL/widget-loader.js"></script>
```

4. Click **Save**

### Troubleshooting WordPress Embedding

#### Widget Not Appearing

**1. Clear all caches:**
- WordPress cache (if using caching plugin)
- CDN cache (Cloudflare, etc.)
- Browser cache (Ctrl+Shift+R)

**2. Check browser console for errors:**
- Right-click > Inspect > Console tab
- Look for red error messages

**3. Verify script is loading:**
- View page source (Ctrl+U)
- Search for "widget-loader.js"
- Ensure the URL is correct

#### Console Errors

**"Failed to load resource" or 404:**
- Verify your app URL is correct
- Ensure the app is running/published
- Check if URL has typos

**"CORS policy" errors:**
The widget-loader.js is configured to handle CORS. If you still see errors:

1. Verify you're using the production/published URL
2. Check that your Replit app is published (not just running in dev mode)
3. Try accessing `https://YOUR-APP-URL/widget-loader.js` directly in browser

**"Script blocked" errors:**
- Some security plugins block external scripts
- Add your app domain to allowed scripts list
- Temporarily disable security plugin to test

#### Widget Appears But Doesn't Work

**Chat window won't open:**
- Check for JavaScript conflicts with other plugins
- Try disabling other plugins one by one

**Chat doesn't load content:**
- Verify DATABASE_URL is configured correctly
- Check Replit logs for server errors

---

## 7. Admin Dashboard Access

### Accessing the Admin Panel

Navigate to:
```
https://YOUR-APP-URL/admin
```

For local development:
```
http://localhost:5000/admin
```

### Features Overview

The admin dashboard provides:

#### Leads Table
- View all captured leads
- See contact information (name, email, phone)
- View fitness goals and preferences
- Check booking dates and times
- Filter and search leads

#### Analytics Dashboard
- Total leads count
- Leads by goal type
- Conversion metrics
- Time-based trends

#### Export Functionality
- Export leads to CSV format
- Filter before exporting
- Download for CRM import

### Viewing Leads

1. Go to `/admin`
2. The leads table shows all captured information:
   - **Name**: Lead's full name
   - **Email**: Contact email
   - **Phone**: Phone number
   - **Goal**: Selected fitness goal
   - **Preferred Time**: Booking preference
   - **Date**: When lead was captured

### Exporting to CSV

1. Click the **Export CSV** button
2. A CSV file will download containing:
   - All lead fields
   - Timestamps
   - Session IDs

Use this for:
- Importing into CRM systems
- Email marketing platforms
- Spreadsheet analysis

### Analytics Dashboard

View key metrics:

- **Total Leads**: All-time lead count
- **Today's Leads**: New leads today
- **Goal Breakdown**: Pie chart of fitness goals
- **Weekly Trend**: Lead volume over time

---

## 8. Custom Domain (Optional)

Connect your own domain to your Replit deployment.

### Step 1: Get Your Custom Domain

Purchase a domain from:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### Step 2: Configure in Replit

1. Open your Replit project
2. Click **Publish**
3. Go to **Custom Domains**
4. Click **Link a Domain**
5. Enter your domain (e.g., `chat.yourgym.com`)

### Step 3: Update DNS Records

Add these DNS records at your domain registrar:

**For subdomain (recommended):**
```
Type: CNAME
Name: chat (or your subdomain)
Value: your-app-name.replit.app
```

**For root domain:**
```
Type: A
Name: @
Value: (Replit will provide IP addresses)
```

### Step 4: Wait for Propagation

DNS changes can take 15 minutes to 48 hours. Check status at [dnschecker.org](https://dnschecker.org).

### Step 5: Update Widget Embed Code

After domain is connected, update your WordPress embed:

```php
add_action('wp_footer', function() {
    echo '<script src="https://chat.yourgym.com/widget-loader.js"></script>';
});
```

---

## 9. Monitoring & Maintenance

### Checking Logs

#### On Replit

1. Open your Replit project
2. View the **Console** panel for real-time logs
3. Check for errors or warnings

#### Log Types

- **Info**: Normal operation messages
- **Warn**: Non-critical issues
- **Error**: Problems requiring attention

### Database Backups

#### Neon Backups

Neon automatically handles:
- Point-in-time recovery
- Daily backups
- 7-day retention (free tier)

To create manual backup:
1. Go to Neon Dashboard
2. Select your project
3. Go to **Backups**
4. Click **Create Backup**

#### Export Data Manually

Use the admin panel CSV export for lead data backup.

### Updating the App

#### On Replit

1. Pull latest changes (if connected to GitHub)
2. Or edit files directly in Replit
3. The app auto-restarts on changes

#### Database Migrations

After schema changes:

```bash
npm run db:push
```

**Important:** Always backup your database before running migrations in production.

### Health Monitoring

#### Check App Status

Visit your app URL - it should load the chatbot interface.

#### API Health Check

```bash
curl https://YOUR-APP-URL/api/health
```

Should return:
```json
{"status": "ok"}
```

#### Common Issues

| Issue | Solution |
|-------|----------|
| App not loading | Check Replit is running, verify URL |
| Database errors | Verify DATABASE_URL, check Neon status |
| Widget not appearing | Clear caches, check console for errors |
| Slow performance | Check database queries, optimize if needed |

### Security Best Practices

1. **Rotate SESSION_SECRET** periodically
2. **Use strong database passwords**
3. **Keep dependencies updated**: `npm audit fix`
4. **Monitor for suspicious activity** in leads table
5. **Enable HTTPS** (automatic on Replit)

---

## Quick Reference

### Essential URLs

| Resource | URL |
|----------|-----|
| Main App | `https://YOUR-APP-URL/` |
| Widget Mode | `https://YOUR-APP-URL/?widget=true` |
| Admin Panel | `https://YOUR-APP-URL/admin` |
| Widget Script | `https://YOUR-APP-URL/widget-loader.js` |

### Essential Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production
npm start

# Database migration
npm run db:push
```

### Minimum Required Secrets

```
DATABASE_URL=postgresql://...
SESSION_SECRET=random-32-char-string
```

---

## Need Help?

- Check [CONFIGURATION.md](./CONFIGURATION.md) for detailed configuration options
- Review console logs for error messages
- Ensure all environment variables are set correctly
