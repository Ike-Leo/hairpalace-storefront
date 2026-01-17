# Quick Deploy Guide - Netlify

## Pre-Deployment Checklist

✅ All files are ready for deployment
✅ `netlify.toml` configuration file created
✅ `.env.example` file created for reference
✅ `.gitignore` updated for Netlify

## Deployment Options

### Option A: Quick Deploy via Netlify CLI (Fastest)

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Navigate to storefront directory
cd storefront

# 3. Login to Netlify (opens browser)
netlify login

# 4. Initialize and deploy
netlify init
netlify deploy --prod
```

**That's it!** Your site will be live at a random URL like `https://amazing-site-123456.netlify.app`

### Option B: Deploy via GitHub (Best for Continuous Deployment)

#### Step 1: Initialize Git Repository
```bash
cd storefront
git init
git add .
git commit -m "Initial commit: Hair Palace e-commerce storefront"
```

#### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `hair-palace-storefront`
3. Don't initialize with README (we already have code)
4. Click "Create repository"

#### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/hair-palace-storefront.git
git branch -M main
git push -u origin main
```

#### Step 4: Connect Netlify
1. Go to https://app.netlify.com/start
2. Click "Git" → Connect to GitHub
3. Authorize Netlify (if needed)
4. Select `hair-palace-storefront` repository
5. Click "Deploy site"

#### Step 5: Add Environment Variable
1. Go to Site settings → Environment variables
2. Click "Add a variable"
3. Name: `NEXT_PUBLIC_STORE_API_URL`
4. Value: `https://acoustic-seahorse-440.convex.site/api/store/hair-palace`
5. Click "Save"
6. Trigger a new deployment

## Configuration Files Already Created

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### `next.config.ts`
Already configured with remote image patterns for the API images.

## Environment Variables

Required environment variable for Netlify:
```
NEXT_PUBLIC_STORE_API_URL=https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

## After Deployment

### Your Site URL
After deployment, you'll get a URL like:
- `https://hair-palace-storefront.netlify.app`

### Test Your Deployment
1. ✅ Homepage loads
2. ✅ Products display correctly
3. ✅ Add to cart works
4. ✅ Checkout flow works
5. ✅ Order tracking works
6. ✅ Images load from API

### Custom Domain (Optional)
1. Go to Domain settings in Netlify dashboard
2. Add custom domain
3. Update DNS at your domain provider

## Updates and Maintenance

### Making Updates
```bash
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically rebuild and redeploy!

### Monitoring
- Check deployments: Netlify Dashboard → Deploys
- View logs: Netlify Dashboard → Functions
- Set up notifications: Site settings → Notifications

## Common Issues & Solutions

### Issue: Build fails
**Solution**: Check that Node version is 18+ in netlify.toml

### Issue: API errors on deployed site
**Solution**: Verify environment variable is set correctly in Netlify dashboard

### Issue: Images not loading
**Solution**: Check `next.config.ts` has correct `remotePatterns` (already configured)

### Issue: 404 on page refresh
**Solution**: Ensure `@netlify/plugin-nextjs` plugin is installed (in netlify.toml)

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js/
- Deployment Guide: See `NETLIFY_DEPLOYMENT.md` for detailed instructions

## Next Steps

1. Deploy your site using one of the options above
2. Test all functionality
3. Add custom domain (optional)
4. Set up analytics (optional)
5. Monitor performance

Your storefront is ready to go! 🚀
