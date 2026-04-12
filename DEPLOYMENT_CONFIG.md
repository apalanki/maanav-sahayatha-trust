# Deployment Configuration

This document explains how to configure the website for different deployment environments.

## Environment Variables

### VITE_BASE_PATH

Controls the base path for all routes and assets in production builds.

**Default value:** `/maanav-sahayatha-trust/` (for GitHub Pages)

**Examples:**

| Deployment | VITE_BASE_PATH | URL |
|---|---|---|
| GitHub Pages | `/maanav-sahayatha-trust/` | `https://apalanki.github.io/maanav-sahayatha-trust/` |
| Custom domain (root) | `/` | `https://mst.org/` |
| S3 + CloudFront | `/` | `https://yourdomain.com/` |
| Subdirectory | `/mst/` | `https://yoursite.com/mst/` |

## How to Set Environment Variables

### For GitHub Pages (Current)

The base path is automatically set to `/maanav-sahayatha-trust/` in production builds.

### For S3 / Custom Domain Deployment

**Option 1: Build with environment variable**
```bash
VITE_BASE_PATH=/ npm run build
```

**Option 2: Create .env.production file**
```
VITE_BASE_PATH=/
```

Then build:
```bash
npm run build
```

**Option 3: Set in CI/CD pipeline**

For GitHub Actions, add to workflow:
```yaml
env:
  VITE_BASE_PATH: /
```

For Vercel, set in dashboard:
- Go to Settings → Environment Variables
- Add `VITE_BASE_PATH` = `/`

For Netlify, set in dashboard:
- Go to Site settings → Build & deploy → Environment
- Add `VITE_BASE_PATH` = `/`

## Quick Deploy Commands

### GitHub Pages (Current)
```bash
git push origin main
```

### S3 (with root base path)
```bash
VITE_BASE_PATH=/ npm run build
aws s3 sync dist/public/ s3://your-bucket/ --delete
```

### Custom Domain (root)
```bash
VITE_BASE_PATH=/ npm run build
# Deploy to your hosting provider
```

### Subdirectory on existing domain
```bash
VITE_BASE_PATH=/mst/ npm run build
# Deploy to your hosting provider
```

## Important Notes

1. **Always set VITE_BASE_PATH before building** - The base path is baked into the build, not configurable at runtime.

2. **Development vs Production** - Development always uses `/` as base path, production uses the configured value.

3. **All links are relative** - The website uses relative links and Wouter routing, so changing the base path won't break navigation.

4. **Static assets** - All assets (images, CSS, JS) are served relative to the base path.

5. **404.html** - Only needed for GitHub Pages. Other hosting providers handle SPA routing differently.

## Verification

After deployment, verify the base path is correct:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Load the page
4. Check that assets (CSS, JS) are loading from the correct path
5. Test navigation - back button should work correctly
6. Check console for any 404 errors

## Troubleshooting

**Assets not loading?**
- Check that `VITE_BASE_PATH` matches your deployment URL
- Verify assets are in the correct directory on your server
- Check browser console for 404 errors

**Routes not working?**
- Ensure `404.html` is deployed (for GitHub Pages only)
- Check that Wouter routing is configured correctly
- Verify all navigation uses relative links

**Build failing?**
- Clear cache: `rm -rf dist/ node_modules/`
- Reinstall dependencies: `npm install`
- Check for TypeScript errors: `npm run check`
