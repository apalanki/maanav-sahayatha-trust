# Deployment Guide

This guide explains how to deploy the MST website to different environments (GitHub Pages, S3, custom domains, etc.) without code changes.

## Overview

The website is configured to work with different deployment scenarios through environment variables. The base path is automatically set based on the deployment environment.

## Deployment Scenarios

### 1. GitHub Pages (Current Setup)

**URL**: `https://apalanki.github.io/maanav-sahayatha-trust/`

**How it works:**
- The GitHub Actions workflow automatically builds and deploys to GitHub Pages
- Base path is set to `/maanav-sahayatha-trust/`
- No configuration needed

**To deploy:**
```bash
git push origin main
```

### 2. AWS S3 + CloudFront

**URL**: `https://yourdomain.com/` (or any custom domain)

**Setup:**
1. Create an S3 bucket (e.g., `mst-nonprofit-site`)
2. Enable static website hosting
3. Set up CloudFront distribution pointing to the S3 bucket
4. Configure your domain to point to CloudFront

**Build and deploy:**
```bash
# Build with root base path for S3
VITE_BASE_PATH=/ npm run build

# Deploy to S3
aws s3 sync dist/public/ s3://mst-nonprofit-site/ --delete

# Invalidate CloudFront cache (optional)
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 3. Custom Domain (Root URL)

**URL**: `https://mst.org/` or any custom domain

**Setup:**
1. Register domain
2. Point domain to your hosting (S3, Vercel, Netlify, etc.)
3. Set up SSL certificate (free with Let's Encrypt or AWS Certificate Manager)

**Build and deploy:**
```bash
# Build with root base path
VITE_BASE_PATH=/ npm run build

# Deploy to your hosting provider
# (Instructions vary by provider)
```

### 4. Subdirectory on Existing Domain

**URL**: `https://yourorganization.com/mst/`

**Build and deploy:**
```bash
# Build with custom base path
VITE_BASE_PATH=/mst/ npm run build

# Deploy to your hosting provider
```

### 5. Vercel Deployment

**URL**: `https://mst-nonprofit.vercel.app/` or custom domain

**Setup:**
1. Connect GitHub repository to Vercel
2. Vercel automatically detects Vite configuration
3. Set environment variable in Vercel dashboard: `VITE_BASE_PATH=/`

**Deploy:**
```bash
git push origin main
# Vercel automatically builds and deploys
```

### 6. Netlify Deployment

**URL**: `https://mst-nonprofit.netlify.app/` or custom domain

**Setup:**
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist/public`
4. Set environment variable: `VITE_BASE_PATH=/`

**Deploy:**
```bash
git push origin main
# Netlify automatically builds and deploys
```

## Environment Variables

### VITE_BASE_PATH

Controls the base path for all routes and assets.

**Examples:**
- `VITE_BASE_PATH=/` - Root URL (default for custom domains)
- `VITE_BASE_PATH=/maanav-sahayatha-trust/` - GitHub Pages subdirectory
- `VITE_BASE_PATH=/mst/` - Custom subdirectory

**Default behavior:**
- Development: `/`
- Production (GitHub Pages): `/maanav-sahayatha-trust/`
- Production (other): Use `VITE_BASE_PATH` if set, otherwise `/maanav-sahayatha-trust/`

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
# Default (GitHub Pages)
npm run build

# Custom base path
VITE_BASE_PATH=/ npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment Checklist

Before deploying to production:

- [ ] Update contact information in footer (phone, address, email)
- [ ] Replace all dummy data with real MST data (see DUMMY_DATA_TODO.md)
- [ ] Replace placeholder images with real MST photos
- [ ] Update success stories with real beneficiary stories
- [ ] Test all links and navigation
- [ ] Test on mobile devices
- [ ] Set up SSL/HTTPS
- [ ] Configure domain DNS records
- [ ] Set up email for contact form (if implemented)
- [ ] Enable analytics (if desired)
- [ ] Set up backups

## Troubleshooting

### Assets not loading
- Check that `VITE_BASE_PATH` matches your deployment URL
- Verify all image URLs are correct
- Check browser console for 404 errors

### Routes not working
- Ensure `404.html` is deployed (for GitHub Pages)
- Check that back button uses `window.history.back()` (not hardcoded paths)
- Verify Wouter routing configuration

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist/`
- Check for TypeScript errors: `npm run check`

## Support

For deployment issues or questions, refer to:
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
