# Deployment Guide - SPA Routing Configuration

## Problem
When the website is deployed with a custom domain, the Initiative section and other routes are not showing because the server is not configured to handle client-side routing properly.

## Solution
React Router requires the server to serve `index.html` for all routes that don't match static files/directories. This allows React to handle the routing on the client side.

## Deployment Options

### 1. Apache Servers (Most Common)
The `.htaccess` file in the `public/` directory handles routing automatically.

**What it does:**
- Rewrites all requests that don't match real files/directories to `index.html`
- React Router takes over and renders the correct component based on the URL

**Ensure your hosting provider has:**
- `mod_rewrite` enabled
- `.htaccess` files are processed in the `public/` or document root directory

### 2. Nginx Servers
Use the configuration in `nginx.conf.example`

**Copy the configuration to your nginx site configuration:**
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/your-site.conf
```

**Edit the file with:**
- Your domain name
- Correct SSL certificate paths
- Correct root path to the `dist` folder

Then reload Nginx:
```bash
sudo systemctl reload nginx
```

### 3. IIS Servers (Windows)
The `web.config` file handles routing.

**Ensure:**
- `web.config` is in your site's root directory
- The server has URL Rewrite module installed

### 4. Vercel
The `vercel.json` file is automatically used for deployment.

**Deploy:**
```bash
npm install -g vercel
vercel
```

### 5. Netlify
The `netlify.toml` file is automatically used for deployment.

**Deploy:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Build & Deployment Steps

### Local Build
```bash
npm run build
# This creates a `dist/` folder with all production files
```

### Upload to Server
1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your web server's document root
3. Ensure the appropriate configuration file (`.htaccess`, `web.config`, etc.) is in place

### Verify Routing Works
1. Go to your domain: `https://yourdomain.com/`
2. Navigate to an initiative: `https://yourdomain.com/initiatives/ges`
3. Refresh the page - the page should still load correctly (not 404)
4. Check browser console for errors (F12)

## Troubleshooting

### Still seeing 404 errors
- **Apache:** Verify `.htaccess` is in the correct directory and `mod_rewrite` is enabled
- **Nginx:** Ensure the `try_files` directive is properly configured
- **IIS:** Check that URL Rewrite module is installed and `web.config` is in the correct location

### Static assets not loading
- Run `npm run build` in production mode
- Verify all files in the `dist/` folder are uploaded to the server
- Check that the asset paths are correct (relative to domain root)

### 3D components not rendering
- Verify Three.js and related 3D libraries are loaded correctly
- Check browser console for WebGL errors
- Ensure adequate GPU memory is available

## Environment Variables
Create a `.env` file if needed for API endpoints:
```
VITE_API_URL=https://api.yourdomain.com
```

Build commands will automatically process these variables.
