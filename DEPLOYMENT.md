# Continuous Deployment Guide

This document provides instructions for setting up continuous deployment for the Digital Twin IIITH project.

## Deploying with Vercel (Recommended)

Vercel provides the best integration with Next.js projects and offers automatic deployments with each GitHub push.

### Step 1: Push Your Code to GitHub

Make sure your project is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Visit [Vercel](https://vercel.com/) and sign up or log in (you can use your GitHub account)
2. Click "Add New..." > "Project"
3. Select your Digital Twin GitHub repository
4. Vercel will auto-detect that it's a Next.js project

### Step 3: Configure Project Settings

Vercel will automatically detect the correct settings for your Next.js application, but you can customize:

- **Project Name**: Enter "digital-twin-iiith" or your preferred name
- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./` (the default)
- **Build Command**: `npm run build` (the default)
- **Output Directory**: `.next` (the default for Next.js)

### Step 4: Environment Variables (if needed)

If your project requires environment variables:

1. Go to "Settings" > "Environment Variables"
2. Add any required variables such as API keys or database connection strings

### Step 5: Deploy

Click "Deploy" and Vercel will:
1. Clone your repository
2. Install dependencies
3. Build the application
4. Deploy to their global CDN

### Automatic Deployments

Once set up, Vercel will automatically:
- Deploy each new commit to the main branch to production
- Create preview deployments for pull requests
- Allow you to roll back to previous deployments if needed

#### GitHub Actions Integration

This project includes GitHub Actions workflows for CI/CD:

1. **CI Workflow**: Runs linting and build tests on push and pull requests
2. **Deploy Workflow**: Automatically deploys to Vercel when changes are pushed to main

To set up the GitHub Actions for Vercel deployment:
1. Follow the instructions in [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)
2. The workflow will use these secrets to deploy your application automatically

### Custom Domains

To use a custom domain:
1. Go to Project Settings > Domains
2. Add your domain and follow the verification instructions

## Alternative: Netlify Deployment

If you prefer Netlify:

1. Create an account at [Netlify](https://www.netlify.com/)
2. Click "New site from Git" > Choose GitHub > Select your repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Click "Deploy site"

## Troubleshooting

- **Build Errors**: Check the build logs in Vercel/Netlify dashboard
- **API Connection Issues**: Ensure environment variables are correctly set
- **Domain Problems**: Verify DNS configuration is correct
