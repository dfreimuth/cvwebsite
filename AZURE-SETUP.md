# Azure Deployment Setup Guide

## Setting Up GitHub Actions with Azure Service Principal

### Step 1: Create Azure Service Principal

Run these commands in your terminal (make sure you're logged into Azure CLI):

```bash
# Login to Azure
az login

# List all available subscriptions
az account list --output table

# Get your current subscription ID
az account show --query id --output tsv

# Create service principal (replace YOUR_SUBSCRIPTION_ID and YOUR_RESOURCE_GROUP)
az ad sp create-for-rbac --name "github-actions-cvwebsite" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/YOUR_RESOURCE_GROUP \
  --sdk-auth
```

### Step 2: Copy the JSON Output

The command above will output JSON like this:
```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

### Step 3: Add to GitHub Secrets

1. Go to your GitHub repository: https://github.com/dfreimuth/cvwebsite
2. Click on **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Name: `AZURE_CREDENTIALS`
5. Value: Paste the entire JSON output from Step 2
6. Click **Add secret**

### Step 4: Update Resource Names

Make sure your Azure App Service name matches what's in the workflow:
- App Service Name: `darren-freimuth-portfolio`
- Resource Group: Update in the Azure CLI command above

### Alternative: Disable Azure Deployment Temporarily

If you want to test the build/test pipeline without deployment, you can disable the deployment step by adding this condition to the deploy job in `.github/workflows/deploy.yml`:

```yaml
deploy:
  runs-on: ubuntu-latest
  needs: build-and-test
  if: false  # Disable deployment temporarily
```

## Troubleshooting

### Common Issues:

1. **Service Principal Permissions**: Make sure the service principal has Contributor role on your resource group
2. **Resource Group**: Ensure the resource group exists in Azure
3. **App Service**: Ensure the App Service exists and matches the name in the workflow

### Check Your Setup:

```bash
# List your resource groups
az group list --output table

# List your app services
az webapp list --output table

# Check service principal
az ad sp list --display-name "github-actions-cvwebsite" --output table
```
