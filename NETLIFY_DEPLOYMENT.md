# Deploying Hair Palace Storefront to Netlify

This guide will walk you through deploying your Next.js storefront to Netlify.

## Option 1: Deploy via Netlify CLI (Recommended)

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Login to Netlify
```bash
netlify login
```

### 3. Initialize Netlify
From the storefront directory:
```bash
cd storefront
netlify init
```

### 4. Deploy
```bash
netlify deploy --prod
```

## Option 2: Deploy via Netlify Website (GUI)

### Step 1: Push to GitHub
1. Initialize git repository (if not already done):
```bash
cd storefront
git init
git add .
git commit -m "Initial commit: Hair Palace storefront"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hair-palace-storefront.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your `hair-palace-storefront` repository

### Step 3: Configure Build Settings
Netlify should auto-detect Next.js, but verify these settings:

**Build command:**
```
npm run build
```

**Publish directory:**
```
.next
```

**Node version:** 18 or higher

### Step 4: Environment Variables
Add this environment variable in Netlify dashboard:
```
NEXT_PUBLIC_STORE_API_URL=https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

To add environment variables:
1. Go to Site settings → Build & deploy → Environment variables
2. Click "Add variable"
3. Paste the variable name and value

### Step 5: Deploy
Click "Deploy site" - Netlify will build and deploy your storefront!

## Post-Deployment Checklist

- [ ] Site builds successfully
- [ ] Environment variables are set
- [ ] Products load from API
- [ ] Add to cart works
- [ ] Checkout flow completes
- [ ] Order tracking works
- [ ] Images display correctly
- [ ] Mobile responsive

## Netlify Configuration

The `netlify.toml` file is already configured with:
- Next.js plugin for optimal performance
- Build commands
- Node version requirements

## Custom Domain (Optional)

To use a custom domain:
1. Go to Domain settings in Netlify
2. Click "Add custom domain"
3. Enter your domain name
4. Update DNS records as instructed

## Troubleshooting

### Build fails
- Check that Node version is 18+
- Verify environment variables are set
- Check build logs in Netlify dashboard

### API errors
- Verify `NEXT_PUBLIC_STORE_API_URL` is set correctly
- Check that the API is accessible from your deployed site

### Images not loading
- Verify `next.config.ts` has the correct `remotePatterns` configuration (already set up)

### 404 errors on navigation
- Make sure you're using the Netlify Next.js plugin (already configured in `netlify.toml`)

## Monitoring Deployments

Netlify provides:
- Real-time deployment logs
- Build time metrics
- Error tracking
- Performance monitoring

Access these from your Netlify dashboard.

## Updating the Site

After making changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically detect changes and redeploy!

## Production Considerations

1. **Analytics**: Add Netlify Analytics or Google Analytics
2. **Error Tracking**: Consider adding Sentry for error monitoring
3. **Performance**: Monitor site performance with Netlify's Lighthouse integration
4. **SEO**: Update metadata in `app/layout.tsx` for better SEO
5. **Security**: Ensure API URL uses HTTPS (already configured)

## Support

- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment
- Netlify Community: https://answers.netlify.com
