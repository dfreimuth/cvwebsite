# Azure App Service Deployment Script for Static Website
# This script deploys the static website to Azure App Service Free Tier

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$AppServiceName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory=$false)]
    [string]$CustomDomain = "darren.freimuth.name"
)

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput "🚀 Starting Azure App Service deployment for Darren Freimuth Portfolio Website" "Green"

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-ColorOutput "✅ Azure CLI is installed" "Green"
} catch {
    Write-ColorOutput "❌ Azure CLI is not installed. Please install it first." "Red"
    Write-ColorOutput "Download from: https://aka.ms/installazurecliwindows" "Yellow"
    exit 1
}

# Login to Azure (if not already logged in)
Write-ColorOutput "🔐 Checking Azure login status..." "Yellow"
$loginStatus = az account show 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Please log in to Azure..." "Yellow"
    az login
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Failed to log in to Azure" "Red"
        exit 1
    }
}

# Set subscription if provided
if ($SubscriptionId) {
    Write-ColorOutput "🎯 Setting subscription to: $SubscriptionId" "Yellow"
    az account set --subscription $SubscriptionId
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Failed to set subscription" "Red"
        exit 1
    }
}

# Create resource group if it doesn't exist
Write-ColorOutput "📁 Creating resource group: $ResourceGroupName" "Yellow"
az group create --name $ResourceGroupName --location $Location
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "❌ Failed to create resource group" "Red"
    exit 1
}

# Create App Service Plan (Free tier)
$AppServicePlanName = "$AppServiceName-plan"
Write-ColorOutput "📋 Creating App Service Plan: $AppServicePlanName (Free tier)" "Yellow"
az appservice plan create `
    --name $AppServicePlanName `
    --resource-group $ResourceGroupName `
    --sku F1 `
    --is-linux $false

if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "❌ Failed to create App Service Plan" "Red"
    exit 1
}

# Create App Service
Write-ColorOutput "🌐 Creating App Service: $AppServiceName" "Yellow"
az webapp create `
    --name $AppServiceName `
    --resource-group $ResourceGroupName `
    --plan $AppServicePlanName `
    --runtime "node|18-lts"

if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "❌ Failed to create App Service" "Red"
    exit 1
}

# Configure App Service settings for static website
Write-ColorOutput "⚙️ Configuring App Service settings..." "Yellow"
az webapp config appsettings set `
    --name $AppServiceName `
    --resource-group $ResourceGroupName `
    --settings WEBSITE_NODE_DEFAULT_VERSION="18.17.0" SCM_DO_BUILD_DURING_DEPLOYMENT="false"

# Enable HTTPS only
Write-ColorOutput "🔒 Enabling HTTPS only..." "Yellow"
az webapp update `
    --name $AppServiceName `
    --resource-group $ResourceGroupName `
    --https-only true

# Deploy the website files
Write-ColorOutput "📤 Deploying website files..." "Yellow"
$currentPath = Get-Location

# Create a deployment package (zip file)
$deploymentPackage = Join-Path $currentPath "deployment.zip"
if (Test-Path $deploymentPackage) {
    Remove-Item $deploymentPackage -Force
}

# Zip the website files
Add-Type -AssemblyName System.IO.Compression.FileSystem
Write-ColorOutput "📦 Creating deployment package..." "Yellow"

$excludeFolders = @('.git', '.github', 'node_modules', '.vscode')
$tempDeployDir = Join-Path $env:TEMP "portfolio-deploy"

if (Test-Path $tempDeployDir) {
    Remove-Item $tempDeployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDeployDir | Out-Null

# Copy files excluding certain folders
Get-ChildItem -Path $currentPath | Where-Object { 
    $_.Name -notin $excludeFolders -and 
    $_.Name -ne "deployment.zip" -and 
    $_.Name -ne "deploy.ps1" -and
    $_.Name -ne "README.md"
} | Copy-Item -Destination $tempDeployDir -Recurse -Force

# Create the zip file
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDeployDir, $deploymentPackage)

# Deploy using zip deployment
Write-ColorOutput "🚀 Deploying to Azure App Service..." "Yellow"
az webapp deployment source config-zip `
    --name $AppServiceName `
    --resource-group $ResourceGroupName `
    --src $deploymentPackage

if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "❌ Failed to deploy website" "Red"
    exit 1
}

# Clean up temporary files
Remove-Item $tempDeployDir -Recurse -Force
Remove-Item $deploymentPackage -Force

# Get the default URL
$defaultUrl = az webapp show --name $AppServiceName --resource-group $ResourceGroupName --query "defaultHostName" --output tsv
$websiteUrl = "https://$defaultUrl"

Write-ColorOutput "✅ Deployment completed successfully!" "Green"
Write-ColorOutput "🌐 Website URL: $websiteUrl" "Cyan"

# Custom domain configuration instructions
if ($CustomDomain) {
    Write-ColorOutput "" "White"
    Write-ColorOutput "🔧 Custom Domain Configuration for: $CustomDomain" "Yellow"
    Write-ColorOutput "To configure your custom domain, follow these steps:" "White"
    Write-ColorOutput "" "White"
    Write-ColorOutput "1. Add custom domain to App Service:" "White"
    Write-ColorOutput "   az webapp config hostname add --webapp-name $AppServiceName --resource-group $ResourceGroupName --hostname $CustomDomain" "Gray"
    Write-ColorOutput "" "White"
    Write-ColorOutput "2. Get domain verification ID:" "White"
    Write-ColorOutput "   az webapp config hostname get-external-ip --name $AppServiceName --resource-group $ResourceGroupName" "Gray"
    Write-ColorOutput "" "White"
    Write-ColorOutput "3. Configure DNS records with your domain provider:" "White"
    Write-ColorOutput "   - Create a CNAME record: $CustomDomain -> $defaultUrl" "Gray"
    Write-ColorOutput "   - Create a TXT record: asuid.$CustomDomain -> [verification ID from step 2]" "Gray"
    Write-ColorOutput "" "White"
    Write-ColorOutput "4. After DNS propagation, enable SSL:" "White"
    Write-ColorOutput "   az webapp config ssl bind --certificate-thumbprint [thumbprint] --ssl-type SNI --name $AppServiceName --resource-group $ResourceGroupName" "Gray"
    Write-ColorOutput "" "White"
    Write-ColorOutput "📖 For detailed instructions, visit:" "White"
    Write-ColorOutput "   https://docs.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain" "Cyan"
}

Write-ColorOutput "" "White"
Write-ColorOutput "📊 Deployment Summary:" "Green"
Write-ColorOutput "   Resource Group: $ResourceGroupName" "White"
Write-ColorOutput "   App Service: $AppServiceName" "White"
Write-ColorOutput "   App Service Plan: $AppServicePlanName (Free tier)" "White"
Write-ColorOutput "   Website URL: $websiteUrl" "White"
Write-ColorOutput "   HTTPS Only: Enabled" "White"
Write-ColorOutput "" "White"
Write-ColorOutput "🎉 Your portfolio website is now live!" "Green"
