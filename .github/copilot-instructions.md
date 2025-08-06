<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project Guidelines

This is a modern portfolio website built with HTML5, CSS3, and vanilla JavaScript. The site is designed to be deployed on Azure App Service free tier.

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper accessibility attributes (alt text, aria-labels, etc.)
- Maintain clean, indented structure
- Use descriptive class names following BEM methodology where appropriate

### CSS
- Use CSS custom properties (variables) defined in :root
- Follow mobile-first responsive design principles
- Use modern layout techniques (Grid, Flexbox)
- Maintain consistent spacing using the defined variables
- Include smooth transitions and animations for better UX

### JavaScript
- Use modern ES6+ syntax
- Follow functional programming principles where possible
- Include proper error handling
- Use meaningful variable and function names
- Add comments for complex logic

## Design Principles

- Clean, modern, professional aesthetic
- Responsive design for all device sizes
- Smooth animations and transitions
- Accessibility-first approach
- Performance optimized

## File Organization

- `/css/` - Stylesheets (main styles and page-specific styles)
- `/js/` - JavaScript files
- `/pages/` - Additional HTML pages
- `/assets/` - Images, icons, and other media files
- Root level - Main index.html and configuration files

## Azure Deployment

The site is configured for Azure App Service deployment with:
- Static website hosting
- Custom domain support
- HTTPS enforcement
- Optimized for free tier limitations

## Browser Support

Target modern browsers with support for:
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties
- Modern web APIs

When suggesting code changes, prioritize performance, accessibility, and maintainability.
