# GitHub Setup for Portfolio Deployment

## Overview
This repository is configured with GitHub Actions for automated testing and deployment to Azure App Service.

## Required GitHub Configuration

### 1. Environment Setup
Create a GitHub environment named `production`:
1. Go to your repository settings
2. Navigate to "Environments"
3. Click "New environment"
4. Name it `production`
5. Add any required protection rules (optional)

### 2. Required Secrets
Add the following secrets to your repository:

#### AZURE_CREDENTIALS
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `AZURE_CREDENTIALS`
4. Value: JSON object with Azure service principal credentials

To create Azure credentials:
```bash
az ad sp create-for-rbac --name "github-portfolio-deploy" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} --sdk-auth
```

The output should look like:
```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id"
}
```

### 3. Azure App Service Setup
Ensure you have an Azure App Service named `darren-freimuth-portfolio` or update the `AZURE_WEBAPP_NAME` environment variable in `.github/workflows/deploy.yml`.

## Workflow Overview

### Build and Test Job
- ✅ Validates HTML files
- ✅ Lints CSS with stylelint
- ✅ Lints JavaScript with ESLint
- ✅ Creates deployment artifact

### Deploy Job (Production Only)
- Deploys to Azure App Service on main branch pushes
- Requires Azure credentials and production environment

### Lighthouse Job
- Runs performance audits after deployment
- Generates lighthouse reports

## Local Development

### Prerequisites
- Node.js 16 or higher
- npm

### Setup
```bash
npm install
```

### Available Scripts
```bash
npm start          # Start development server
npm test           # Run all tests (HTML, CSS, JS)
npm run test:html  # Validate HTML
npm run test:css   # Lint CSS
npm run test:js    # Lint JavaScript
```

## Troubleshooting

### Build Failures
If the GitHub Actions build fails:
1. Run `npm test` locally to identify issues
2. Fix any linting errors
3. Commit and push the fixes

### Deployment Failures
If deployment fails:
1. Verify Azure credentials are correct
2. Check that the Azure App Service exists
3. Ensure the service principal has proper permissions

### Common Issues
- **HTML Validation**: Check for unclosed tags or invalid attributes
- **CSS Linting**: Review stylelint rules and fix formatting issues
- **JS Linting**: Check for syntax errors and undefined variables
- **Missing Secrets**: Ensure all required secrets are configured in GitHub

## Configuration Files
- `.htmlvalidate.json` - HTML validation rules
- `.stylelintrc.json` - CSS linting configuration
- `.eslintrc.json` - JavaScript linting configuration
- `.gitignore` - Git ignore patterns
