# Push to GitHub & Deploy to Netlify

## Step-by-Step Guide

### Step 1: Initialize Git Repository

Open your terminal in the storefront directory:

```bash
cd e:\Expo\shoptest\storefront
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Hair Palace e-commerce storefront

Features:
- Product browsing and search
- Category navigation
- Shopping cart management
- Checkout flow
- Order tracking
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Netlify deployment configuration"
```

### Step 4: Add Your GitHub Repository as Remote

```bash
git remote add origin https://github.com/Ike-Leo/hairpalace-storefront.git
```

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You may be prompted for your GitHub credentials.

### Step 6: Deploy to Netlify

#### Option A: Via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com/start
2. Click "Git" or "Connect to GitHub"
3. Authorize Netlify to access your GitHub account (if needed)
4. Select the repository: **Ike-Leo/hairpalace-storefront**
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18 or higher
6. Click "Deploy site"

#### Option B: Via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify
netlify init

# Deploy to production
netlify deploy --prod
```

### Step 7: Add Environment Variable in Netlify

After connecting your repository to Netlify:

1. Go to your site in Netlify dashboard
2. Navigate to: **Site settings** → **Build & deploy** → **Environment variables**
3. Click "Add a variable"
4. Add the following:

**Variable name:**
```
NEXT_PUBLIC_STORE_API_URL
```

**Value:**
```
https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

5. Click "Save"
6. Trigger a new deployment from the Netlify dashboard

## Verification

After deployment, your site will be live at a URL like:
```
https://hairpalace-storefront.netlify.app
```

### Test Checklist:
- [ ] Homepage loads correctly
- [ ] Products display from API
- [ ] Product detail pages work
- [ ] Add to cart functionality works
- [ ] Cart page displays items
- [ ] Checkout flow works
- [ ] Order tracking works
- [ ] Images load from API
- [ ] Mobile responsive

## Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically detect the push and redeploy your site!

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Domain settings** in Netlify dashboard
2. Click **Add custom domain**
3. Enter your domain name
4. Update DNS records as instructed by Netlify

## Troubleshooting

### Push Fails
- Check that you have write access to the repository
- Verify the remote URL is correct: `git remote -v`

### Netlify Build Fails
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Ensure Node.js version is 18+

### Images Not Loading
- Verify `NEXT_PUBLIC_STORE_API_URL` is set correctly
- Check `next.config.ts` has correct `remotePatterns` (already configured)

### API Errors
- Verify the API URL is accessible
- Check environment variable is set in Netlify (not just locally)

## Quick Reference

**Repository URL:**
```
https://github.com/Ike-Leo/hairpalace-storefront.git
```

**Environment Variable:**
```
NEXT_PUBLIC_STORE_API_URL=https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

**Netlify Dashboard:**
```
https://app.netlify.com
```

## Success!

Once deployed, your Hair Palace storefront will be live and accessible to customers worldwide! 🚀
