# Setting Up GitHub Secrets for Vercel Deployment

This guide explains how to set up the GitHub secrets required for automatic deployment to Vercel.

## Prerequisites

- A GitHub account with access to your repository
- A Vercel account (you can sign up at [vercel.com](https://vercel.com))
- Your project already pushed to GitHub

## Step 1: Get Vercel Tokens and IDs

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel through the CLI:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   cd /path/to/your/project
   vercel link
   ```

4. Get your Vercel token:
   - Go to your [Vercel account settings](https://vercel.com/account/tokens)
   - Create a new token and copy it

5. Get your project ID and organization ID:
   ```bash
   vercel project ls
   ```
   Note your project name, then run:
   ```bash
   vercel project list
   ```
   This will show your project ID.

   For organization ID, run:
   ```bash
   vercel teams list
   ```
   If you're not part of a team, use your personal account ID from:
   ```bash
   vercel whoami
   ```

## Step 2: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:

   - Name: `VERCEL_TOKEN`
     Value: (paste your Vercel token)

   - Name: `VERCEL_ORG_ID`
     Value: (paste your organization ID or personal account ID)

   - Name: `VERCEL_PROJECT_ID`
     Value: (paste your project ID)

## Step 3: Test Your Deployment

1. Make a small change to your repository
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```

3. Go to the "Actions" tab in your GitHub repository to monitor the workflow
4. Once completed, verify your changes are live on your Vercel deployment

## Troubleshooting

- **Workflow Failure**: Check the GitHub Actions logs for detailed error messages
- **Deployment Issues**: Verify your Vercel tokens and project IDs are correct
- **Permission Errors**: Ensure your Vercel token has deployment permissions
