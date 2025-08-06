# Darren Freimuth Portfolio Website

A modern, responsive portfolio website showcasing professional experience, skills, and achievements. Built with HTML5, CSS3, and vanilla JavaScript, optimized for deployment on Azure App Service free tier.

## 🌟 Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Performance Optimized**: Fast loading times and minimal resource usage
- **SEO Friendly**: Semantic HTML and proper meta tags
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Azure Ready**: Configured for Azure App Service deployment

## 🗂️ Project Structure

```
cvweb2/
├── 📁 .github/              # GitHub configuration
│   ├── 📁 workflows/        # CI/CD workflows
│   └── 📄 copilot-instructions.md
├── 📁 assets/               # Images and media files
│   └── 📁 images/           # Website images
├── 📁 css/                  # Stylesheets
│   ├── 📄 style.css         # Main styles
│   └── 📄 pages.css         # Page-specific styles
├── 📁 js/                   # JavaScript files
│   └── 📄 main.js           # Main JavaScript functionality
├── 📁 pages/                # Additional HTML pages
│   ├── 📄 resume.html       # Resume page
│   ├── 📄 certifications.html # Certifications page
│   └── 📄 references.html   # References page
├── 📄 index.html            # Main homepage
├── 📄 web.config            # Azure App Service configuration
├── 📄 deploy.ps1            # PowerShell deployment script
├── 📄 azure-deploy.json     # ARM template for infrastructure
└── 📄 README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Modern web browser
- Azure subscription (for deployment)
- PowerShell (for deployment script)
- Azure CLI (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cvweb2
   ```

2. **Open in your favorite editor**
   ```bash
   code .  # VS Code
   ```

3. **Serve locally**
   - Use Live Server extension in VS Code, or
   - Use any local web server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

4. **View in browser**
   - Navigate to `http://localhost:8000`

## 🌐 Azure Deployment

### Method 1: PowerShell Script (Recommended)

1. **Install Azure CLI**
   ```powershell
   # Download from: https://aka.ms/installazurecliwindows
   ```

2. **Run deployment script**
   ```powershell
   .\deploy.ps1 -ResourceGroupName "portfolio-rg" -AppServiceName "darren-freimuth-portfolio"
   ```

3. **Configure custom domain (optional)**
   ```powershell
   .\deploy.ps1 -ResourceGroupName "portfolio-rg" -AppServiceName "darren-freimuth-portfolio" -CustomDomain "darren.freimuth.name"
   ```

### Method 2: ARM Template

1. **Deploy infrastructure**
   ```bash
   az deployment group create \
     --resource-group portfolio-rg \
     --template-file azure-deploy.json \
     --parameters appServiceName=darren-freimuth-portfolio
   ```

2. **Deploy website files**
   ```bash
   az webapp deployment source config-zip \
     --name darren-freimuth-portfolio \
     --resource-group portfolio-rg \
     --src deployment.zip
   ```

### Method 3: GitHub Actions (CI/CD)

1. **Set up Azure credentials**
   - Create service principal:
   ```bash
   az ad sp create-for-rbac --name "portfolio-deployment" --role contributor \
     --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
     --sdk-auth
   ```

2. **Add GitHub secrets**
   - `AZURE_CREDENTIALS`: Output from step 1
   - Update workflow file with your app service name

3. **Push to main branch**
   ```bash
   git push origin main
   ```

## 🔧 Custom Domain Configuration

### DNS Configuration

Add these DNS records with your domain provider:

```
Type: CNAME
Name: @ (or darren)
Value: your-app-name.azurewebsites.net
TTL: 3600

Type: TXT
Name: asuid.darren
Value: [domain verification ID from Azure]
TTL: 3600
```

### SSL Certificate

Azure App Service provides free SSL certificates for custom domains:

```bash
# Enable managed certificate
az webapp config ssl bind \
  --name your-app-name \
  --resource-group your-resource-group \
  --certificate-thumbprint auto \
  --ssl-type SNI
```

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

## 🎨 Design System

### Colors

```css
--primary-color: #2563eb;     /* Blue */
--secondary-color: #64748b;   /* Slate */
--accent-color: #f59e0b;      /* Amber */
--text-primary: #1e293b;      /* Dark slate */
--text-secondary: #64748b;    /* Medium slate */
--background-light: #f8fafc;  /* Light gray */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700 weight
- **Body**: 400 weight
- **Emphasis**: 500-600 weight

### Animations

- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Hover Effects**: translateY(-2px to -10px)
- **Loading**: CSS keyframe animations

## ⚡ Performance Optimizations

- **Lazy Loading**: Images load as they enter viewport
- **CSS**: Optimized with custom properties and minimal nesting
- **JavaScript**: Vanilla JS with debounced scroll events
- **Compression**: Gzip enabled via web.config
- **Caching**: Static assets cached for 30 days

## 🔍 SEO Features

- Semantic HTML5 structure
- Meta tags and Open Graph
- Structured data markup
- Descriptive alt text
- Clean URL structure
- XML sitemap ready

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- Proper heading hierarchy

## 🛠️ Development Tools

### VS Code Extensions

- Live Server
- Prettier
- ESLint
- HTMLHint
- CSS Peek

### Browser DevTools

- Lighthouse audits
- Performance profiling
- Accessibility testing
- Mobile device simulation

## 📊 Analytics Integration

Ready for analytics platforms:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
  // Clarity tracking code
</script>
```

## 🔒 Security Features

- HTTPS enforced
- Security headers via web.config
- XSS protection
- Content Security Policy ready
- No inline scripts (external JS files)

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

## 📝 Content Management

### Adding New Projects

1. Add project data to `js/main.js`
2. Add project images to `assets/images/`
3. Update project grid in `index.html`

### Updating Resume

1. Edit `pages/resume.html`
2. Update experience timeline in main page
3. Sync with PDF version

### Adding Certifications

1. Update `pages/certifications.html`
2. Add certification logos to `assets/images/`
3. Update stats if needed

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths and extensions
   - Verify images are in `assets/images/`

2. **CSS not applying**
   - Clear browser cache
   - Check file paths in HTML

3. **JavaScript errors**
   - Check browser console
   - Verify script loading order

4. **Deployment fails**
   - Check Azure CLI authentication
   - Verify resource group exists
   - Check App Service name availability

### Debugging Tips

```bash
# Test locally
python -m http.server 8000

# Validate HTML
npx html-validate index.html

# Check Azure logs
az webapp log tail --name your-app-name --resource-group your-rg
```

## 📞 Support

For issues, questions, or contributions:

- **Email**: darren@freimuth.name
- **GitHub Issues**: Create an issue in this repository
- **LinkedIn**: [linkedin.com/in/darrenfreimuth](https://linkedin.com/in/darrenfreimuth)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio websites
- **Fonts**: Google Fonts (Inter)
- **Icons**: Heroicons and custom SVGs
- **Hosting**: Microsoft Azure
- **CI/CD**: GitHub Actions

---

Built with ❤️ by Darren Freimuth | © 2025 All Rights Reserved
