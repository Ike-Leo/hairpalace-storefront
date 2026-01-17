# Deploy to Netlify - Step by Step

## Quick Start

1. **Go to Netlify**: https://app.netlify.com/start
2. **Connect GitHub**: Click "Git" or "Connect to GitHub"
3. **Select Repository**: Choose `Ike-Leo/hairpalace-storefront`
4. **Configure & Deploy**: Follow settings below
5. **Add Environment Variable**: See step below

---

## Detailed Steps

### Step 1: Connect Netlify to GitHub

1. Go to https://app.netlify.com/start
2. You'll see options: "Git", "Bitbucket", "GitLab"
3. Click **"Git"** or **"Connect to GitHub"**
4. If not already authorized:
   - Click "Authorize Netlify" on GitHub
   - Grant Netlify access to your repositories

### Step 2: Select Your Repository

After connecting GitHub:
1. Netlify will show a list of your repositories
2. Find and select: **`Ike-Leo/hairpalace-storefront`**
3. Click **"Import site"** or **"Connect"**

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js, but verify these settings:

#### Build Settings
- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`

#### Environment
- **Node version**: 18 or higher

### Step 4: Deploy Site

1. Click **"Deploy site"** or **"Create site"**
2. Wait for Netlify to build your site (2-5 minutes)
3. You'll get a URL like: `https://amazing-site-123456.netlify.app`

### Step 5: Add Environment Variable (CRITICAL!)

After the initial deploy (or before), add the API URL:

1. Go to your site dashboard in Netlify
2. Navigate to: **Site settings** → **Build & deploy** → **Environment**
3. Click **"Add a variable"**
4. Enter:
   - **Key**: `NEXT_PUBLIC_STORE_API_URL`
   - **Value**: `https://acoustic-seahorse-440.convex.site/api/store/hair-palace`
5. Click **"Save"**
6. Trigger a new deployment:
   - Go to **Deploys** → Click **"Trigger deploy"** → **"Deploy site"**

### Step 6: Verify Deployment

After deployment completes, test your site:
- [ ] Homepage loads at your Netlify URL
- [ ] Products display from API
- [ ] Add to cart works
- [ ] Checkout works
- [ ] Images load correctly

---

## Your Netlify Dashboard

After deployment, you can access:
- **Site Overview**: https://app.netlify.com/sites/YOUR-SITE-NAME/overview
- **Deploy Logs**: https://app.netlify.com/sites/YOUR-SITE-NAME/deploys
- **Site Settings**: https://app.netlify.com/sites/YOUR-SITE-NAME/settings

---

## Environment Variable Reference

```
NEXT_PUBLIC_STORE_API_URL=https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

**Important**: This variable must be added in Netlify, not just in `.env.local`!

---

## Netlify Configuration Already Set Up

Your `netlify.toml` file is already configured with:
- Next.js plugin for optimal performance
- Correct build settings
- Node version requirements

---

## Troubleshooting

### Build Fails
- Check deploy logs in Netlify dashboard
- Ensure Node version is 18+
- Verify all dependencies are in package.json

### Products Don't Load
- Make sure `NEXT_PUBLIC_STORE_API_URL` is set in Netlify environment variables
- Check browser console for API errors
- Verify the API is accessible

### Images Don't Display
- Verify `next.config.ts` has correct `remotePatterns` (already configured)
- Check that API URL is correct in environment variable

### 404 on Page Refresh
- Ensure `@netlify/plugin-nextjs` is in netlify.toml (already configured)
- Clear browser cache and try again

---

## Custom Domain (Optional)

### Option 1: Netlify Subdomain
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Choose a Netlify subdomain like: `hairpalace-storefront.netlify.app`
4. Click **"Save"**

### Option 2: Your Own Domain
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Update DNS records as shown by Netlify
5. Wait for DNS propagation (up to 48 hours)

---

## Future Updates

After making changes to your code:

```bash
cd e:\Expo\shoptest\storefront
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically:
1. Detect the new commit
2. Build your site
3. Deploy the changes

No manual intervention needed!

---

## Production Checklist

Before going live:

- [x] Code pushed to GitHub
- [ ] Connected to Netlify
- [ ] Environment variables set
- [ ] Initial deployment successful
- [ ] All features tested
- [ ] Custom domain configured (optional)
- [ ] Analytics set up (optional)
- [ ] Error monitoring configured (optional)

---

## Monitoring

Netlify provides built-in monitoring:
- **Build times**: Dashboard → Deploys
- **Bandwidth usage**: Dashboard → Bandwidth
- **Site visits**: Dashboard → Analytics (enable in settings)
- **Form submissions**: Dashboard → Forms

---

## Support Links

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js/
- Netlify Community: https://answers.netlify.com

---

## Success!

Once deployed, your Hair Palace storefront will be live and accessible worldwide! 🚀

Your URL will be: `https://hairpalace-storefront.netlify.app` (or similar)
