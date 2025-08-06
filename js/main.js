// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Scroll one viewport height down
            const viewportHeight = window.innerHeight;
            const currentScroll = window.pageYOffset;
            const targetScroll = currentScroll + viewportHeight;
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });

        // Hide scroll indicator when user scrolls past hero section
        window.addEventListener('scroll', () => {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                const scrollPosition = window.pageYOffset;
                
                if (scrollPosition > heroHeight * 0.8) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .highlight-item,
        .stat-item,
        .timeline-item,
        .project-card,
        .contact-item,
        .section-header
    `);

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const titleElement = document.querySelector('.title-main');
    if (!titleElement) return;

    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '2px solid white';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 1000);
        }
    };

    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Contact form handling with EmailJS
function initContactForm() {
    if (!contactForm) return;

    // Initialize EmailJS (you'll need to replace these with your actual IDs)
    emailjs.init('FEvOc8s7H72S8JdZI'); // Replace with your EmailJS public key

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Send email using EmailJS
            await emailjs.send(
                'service_6b8kmo9',     // Replace with your EmailJS service ID
                'template_f4hngu9',    // Replace with your EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Darren Freimuth'
                }
            );
            
            showSuccessMessage();
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            showErrorMessage('Failed to send message. Please try again or contact me directly at darren@freimuth.com');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show success message
function showSuccessMessage() {
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        contactForm.appendChild(successMsg);
    }
    
    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    let errorMsg = document.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = `
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
        `;
        contactForm.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    setTimeout(() => {
        errorMsg.remove();
    }, 5000);
}

// Particle background effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (100 - distance) / 100})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
}

// Counter animation for stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Progress bar for page scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #f59e0b);
        z-index: 1001;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initScrollIndicator();
    initScrollAnimations();
    initTypingAnimation();
    initContactForm();
    initCounterAnimation();
    initScrollProgress();
    initLazyLoading();
    initKeyboardNavigation();
    
    // Add a small delay for more dramatic effect
    setTimeout(() => {
        initParticleEffect();
        initParallaxEffect();
    }, 500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
