// ===================================
// YANNWZSERVICE.COM - Main JavaScript
// ===================================

console.log('%c YANNWZSERVICE.COM - Site de conversion', 'color: #0066FF; font-size: 16px; font-weight: bold;');

// ===================================
// FIX: Supprimer les scrollbars internes
// ===================================
(function() {
    // Fonction pour forcer overflow visible sur tous les éléments
    function fixOverflow() {
        const allElements = document.querySelectorAll('section, div, main, article, aside, .container');
        allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                el.style.overflowY = 'visible';
            }
            if (style.maxHeight && style.maxHeight !== 'none' && !el.classList.contains('nav-links') && !el.classList.contains('faq-answer')) {
                el.style.maxHeight = 'none';
            }
        });
    }

    // Exécuter au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixOverflow);
    } else {
        fixOverflow();
    }

    // Exécuter aussi après un court délai (pour les éléments chargés dynamiquement)
    setTimeout(fixOverflow, 100);
    setTimeout(fixOverflow, 500);
})();

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = navLinks.classList.contains('active');

        if (isActive) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        } else {
            navLinks.classList.add('active');
            mobileMenuToggle.classList.add('active');
        }
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileMenuToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleMenu(e);
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-link, .nav-cta a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===================================
// SMOOTH SCROLL WITH OFFSET
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || href === '') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================

const nav = document.querySelector('.nav');

function handleNavScroll() {
    if (window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', throttle(handleNavScroll, 100));
handleNavScroll();

// ===================================
// FAQ ACCORDION
// ===================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// TOAST NOTIFICATIONS
// ===================================

function showToast(title, message, type = 'info', duration = 5000) {
    let container = document.getElementById('toastContainer');

    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Create icon element safely using DOM APIs
    const iconDiv = document.createElement('div');
    iconDiv.className = 'toast-icon';
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('stroke', 'currentColor');
    iconSvg.setAttribute('stroke-width', '2');

    if (type === 'success') {
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '22 4 12 14.01 9 11.01');
        iconSvg.appendChild(path1);
        iconSvg.appendChild(polyline);
    } else if (type === 'error') {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '10');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '15');
        line1.setAttribute('y1', '9');
        line1.setAttribute('x2', '9');
        line1.setAttribute('y2', '15');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '9');
        line2.setAttribute('y1', '9');
        line2.setAttribute('x2', '15');
        line2.setAttribute('y2', '15');
        iconSvg.appendChild(circle);
        iconSvg.appendChild(line1);
        iconSvg.appendChild(line2);
    } else {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '12');
        circle.setAttribute('r', '10');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '12');
        line1.setAttribute('y1', '16');
        line1.setAttribute('x2', '12');
        line1.setAttribute('y2', '12');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '12');
        line2.setAttribute('y1', '8');
        line2.setAttribute('x2', '12.01');
        line2.setAttribute('y2', '8');
        iconSvg.appendChild(circle);
        iconSvg.appendChild(line1);
        iconSvg.appendChild(line2);
    }
    iconDiv.appendChild(iconSvg);

    // Create content element safely using textContent
    const contentDiv = document.createElement('div');
    contentDiv.className = 'toast-content';
    const titleDiv = document.createElement('div');
    titleDiv.className = 'toast-title';
    titleDiv.textContent = title;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'toast-message';
    messageDiv.textContent = message;
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(messageDiv);

    // Create close button safely with event listener (no inline onclick)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close');
    const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSvg.setAttribute('width', '16');
    closeSvg.setAttribute('height', '16');
    closeSvg.setAttribute('viewBox', '0 0 16 16');
    closeSvg.setAttribute('fill', 'none');
    closeSvg.setAttribute('stroke', 'currentColor');
    closeSvg.setAttribute('stroke-width', '2');
    const closeLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    closeLine1.setAttribute('x1', '12');
    closeLine1.setAttribute('y1', '4');
    closeLine1.setAttribute('x2', '4');
    closeLine1.setAttribute('y2', '12');
    const closeLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    closeLine2.setAttribute('x1', '4');
    closeLine2.setAttribute('y1', '4');
    closeLine2.setAttribute('x2', '12');
    closeLine2.setAttribute('y2', '12');
    closeSvg.appendChild(closeLine1);
    closeSvg.appendChild(closeLine2);
    closeBtn.appendChild(closeSvg);
    closeBtn.addEventListener('click', function() {
        toast.remove();
    });

    // Assemble toast safely
    toast.appendChild(iconDiv);
    toast.appendChild(contentDiv);
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    if (duration > 0) {
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    return toast;
}

// ===================================
// FORM SUBMISSION
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';

        try {
            // Show sending toast
            const sendingToast = showToast(
                'Envoi en cours',
                'Transmission de votre demande...',
                'info',
                0
            );

            // Get form data
            const formData = new FormData(contactForm);

            // Send form to Web3Forms
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            // Close sending toast
            sendingToast.classList.add('removing');
            setTimeout(() => sendingToast.remove(), 300);

            if (response.ok && data.success) {
                // Show success message
                showToast(
                    'Message envoy avec succs !',
                    'Je vous rponds sous 24h.',
                    'success',
                    7000
                );

                // Reset form
                contactForm.reset();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Show error message
                showToast(
                    'Erreur d\'envoi',
                    data.message || 'Une erreur est survenue. Veuillez ressayer.',
                    'error',
                    8000
                );
            }
        } catch (error) {
            console.error('Error:', error);

            showToast(
                'Erreur de connexion',
                'Impossible d\'envoyer le message. Contactez-moi directement  yannwzservice@gmail.com',
                'error',
                10000
            );
        } finally {
            // Re-enable button and restore original text
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// ===================================
// MODAL FOR EXAMPLES
// ===================================

const modal = document.getElementById('exampleModal');
const modalGallery = document.getElementById('modalGallery');

// Image collections for each example
const exampleImages = [
    // Example 1 - Offre 1
    [
        'Photos pages exemples/Photos pages exemples offre 1/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 6.png'
    ],
    // Example 2 - Offre 2
    [
        'Photos pages exemples/Photos pages exemples offre 2/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 6.png'
    ],
    // Example 3 - Offre 3
    [
        'Photos pages exemples/Photos pages exemples offre 3/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 6.png'
    ]
];

let currentExample = 0;
let currentImageIndex = 0;

function openModal(exampleIndex) {
    if (!modal) return;
    currentExample = exampleIndex;
    currentImageIndex = 0;
    updateModalImage();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalImage() {
    if (!modalGallery) return;
    const images = exampleImages[currentExample];
    if (images && images[currentImageIndex]) {
        // Clear existing content safely
        while (modalGallery.firstChild) {
            modalGallery.removeChild(modalGallery.firstChild);
        }
        // Create image element safely without innerHTML
        const img = document.createElement('img');
        img.src = images[currentImageIndex];
        img.alt = 'Example ' + (currentExample + 1) + ' - Image ' + (currentImageIndex + 1);
        modalGallery.appendChild(img);
    }
}

function prevImage() {
    const images = exampleImages[currentExample];
    if (!images) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function nextImage() {
    const images = exampleImages[currentExample];
    if (!images) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.prevImage = prevImage;
window.nextImage = nextImage;

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .proof-card, .process-step, .testimonial-card, .pricing-card, .example-card, .feature-card, .faq-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// SERVICE WORKER FOR CACHING
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// ===================================
// PHONE NUMBER FORMATTING
// ===================================

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        // Format as XX XX XX XX XX
        if (value.length > 0) {
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            e.target.value = formatted;
        }
    });
});

// ===================================
// OFFER PRE-SELECTION FROM URL
// ===================================

// Allowed values whitelist for URL parameter validation (XSS prevention)
const ALLOWED_OFFERS = ['essentiel', 'standard', 'premium', 'sur-mesure'];
const ALLOWED_SERVICES = [
    'landing', 'landing-page', 'landingpage',
    'site', 'site-web', 'siteweb',
    'urgence', 'depannage',
    'automatisation', 'ia',
    'special', 'sur-mesure',
    'abonnement-prioritaire', 'abonnement-maintenance', 'abonnement-essentiel',
    'abonnement', 'maintenance', 'essentiel', 'prioritaire'
];

// Sanitize and validate URL parameter against whitelist
function sanitizeUrlParam(value, allowedValues) {
    if (!value || typeof value !== 'string') return null;
    // Normalize: lowercase, trim, only allow alphanumeric and hyphens
    const sanitized = value.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
    return allowedValues.includes(sanitized) ? sanitized : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const offerParam = sanitizeUrlParam(urlParams.get('offer'), ALLOWED_OFFERS);

    if (offerParam) {
        const offerSelect = document.getElementById('offer');
        if (offerSelect) {
            // Only set if the option exists in the select element
            const optionExists = Array.from(offerSelect.options).some(opt => opt.value === offerParam);
            if (optionExists) {
                offerSelect.value = offerParam;
            }
        }

        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    const serviceParam = sanitizeUrlParam(urlParams.get('service'), ALLOWED_SERVICES);
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Map common variations to canonical values
            const serviceMap = {
                'landing-page': 'landing',
                'landingpage': 'landing',
                'site-web': 'site',
                'siteweb': 'site',
                'depannage': 'urgence',
                'abonnement': 'abonnement-prioritaire',
                'maintenance': 'abonnement-maintenance',
                'essentiel': 'abonnement-essentiel',
                'prioritaire': 'abonnement-prioritaire'
            };

            const mappedService = serviceMap[serviceParam] || serviceParam;

            // Only set if the option exists in the select element
            const optionExists = Array.from(serviceSelect.options).some(opt => opt.value === mappedService);
            if (optionExists) {
                serviceSelect.value = mappedService;

                // Highlight the select to draw attention
                serviceSelect.style.borderColor = 'var(--color-primary)';
                serviceSelect.style.boxShadow = '0 0 0 3px var(--color-primary-light)';

                // Remove highlight after 2 seconds
                setTimeout(() => {
                    serviceSelect.style.borderColor = '';
                    serviceSelect.style.boxShadow = '';
                }, 2000);
            }
        }
    }
});

console.log('Site charg avec succs');
