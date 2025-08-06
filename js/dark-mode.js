// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Create and add toggle button to navigation
        this.createToggleButton();
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    createToggleButton() {
        const toggle = document.createElement('div');
        toggle.className = 'dark-mode-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        
        toggle.addEventListener('click', () => this.toggleTheme());
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Add to body (fixed position in upper left corner)
        document.body.appendChild(toggle);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Dispatch custom event for other components that might need to know about theme changes
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme switching
        document.documentElement.classList.add('theme-transition');
        
        this.setTheme(newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
        }
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
}

// Smooth theme transition styles
const transitionStyles = `
    .theme-transition,
    .theme-transition *,
    .theme-transition *:before,
    .theme-transition *:after {
        transition: all 0.3s !important;
        transition-delay: 0 !important;
    }
`;

// Add transition styles to head
const style = document.createElement('style');
style.textContent = transitionStyles;
document.head.appendChild(style);

// Initialize dark mode toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});

// Export for potential external use
window.DarkModeToggle = DarkModeToggle;
