// ===================================
// YANNSERVICE — v7.1
// Clean, minimal interactions
// ===================================

// ===================================
// MOBILE MENU
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .nav-cta a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===================================
// NAV SCROLL EFFECT
// ===================================

const nav = document.querySelector('.nav');

function handleNavScroll() {
    if (nav) {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
            var offset = 72;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================

document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
        var item = this.parentElement;
        var isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(function(el) {
            el.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// FORM SUBMISSION (contact page)
// ===================================

var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        var btn = contactForm.querySelector('button[type="submit"]');
        var original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Envoi en cours...';

        try {
            var response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm)
            });
            var data = await response.json();

            if (response.ok && data.success) {
                contactForm.reset();
                btn.innerHTML = 'Message envoy\u00e9';
                setTimeout(function() { btn.innerHTML = original; btn.disabled = false; }, 3000);
            } else {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        } catch (err) {
            btn.innerHTML = original;
            btn.disabled = false;
        }
    });
}

// ===================================
// MODAL (for pages that use it)
// ===================================

(function() {
    var modal = document.getElementById('urgencyModal');
    var openBtn = document.getElementById('openModalBtn');
    var closeBtn = document.getElementById('closeModalBtn');

    if (!modal || !openBtn) return;

    function open() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) close();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });

    var form = document.getElementById('urgencyForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var original = btn.innerHTML;
            btn.innerHTML = 'Envoi en cours...';
            btn.disabled = true;

            try {
                var response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form)
                });

                if (response.ok) {
                    form.innerHTML = '<div style="text-align:center;padding:2rem 0;"><p style="font-weight:600;margin-bottom:0.25rem;">Message envoy\u00e9.</p><p style="color:#737373;font-size:0.9375rem;">R\u00e9ponse en moins de 30 min.</p></div>';
                    setTimeout(close, 3000);
                } else {
                    btn.innerHTML = original;
                    btn.disabled = false;
                }
            } catch (err) {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    }
})();

// ===================================
// IMAGE GALLERY MODAL (realisations)
// ===================================

var exampleImages = [
    [
        'Photos pages exemples/Photos pages exemples offre 1/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 1/photo 6.png'
    ],
    [
        'Photos pages exemples/Photos pages exemples offre 2/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 2/photo 6.png'
    ],
    [
        'Photos pages exemples/Photos pages exemples offre 3/photo 1.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 2.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 3.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 4.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 5.png',
        'Photos pages exemples/Photos pages exemples offre 3/photo 6.png'
    ]
];

var currentExample = 0;
var currentImageIndex = 0;
var galleryModal = document.getElementById('exampleModal');
var modalGallery = document.getElementById('modalGallery');

function openModal(idx) {
    if (!galleryModal) return;
    currentExample = idx;
    currentImageIndex = 0;
    updateModalImage();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalImage() {
    if (!modalGallery) return;
    var images = exampleImages[currentExample];
    if (images && images[currentImageIndex]) {
        modalGallery.innerHTML = '<img src="' + images[currentImageIndex] + '" alt="Exemple" />';
    }
}

function prevImage() {
    var images = exampleImages[currentExample];
    if (!images) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function nextImage() {
    var images = exampleImages[currentExample];
    if (!images) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

document.addEventListener('keydown', function(e) {
    if (galleryModal && galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
    }
});

window.openModal = openModal;
window.closeModal = closeModal;
window.prevImage = prevImage;
window.nextImage = nextImage;

// ===================================
// OFFER PRE-SELECTION (contact page)
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);

    var offerParam = params.get('offer');
    if (offerParam) {
        var offerSelect = document.getElementById('offer');
        if (offerSelect) offerSelect.value = offerParam;
    }

    var serviceParam = params.get('service');
    if (serviceParam) {
        var serviceSelect = document.getElementById('service');
        if (serviceSelect) serviceSelect.value = serviceParam;
    }

    // ===================================
    // AVAILABILITY STATUS (6h–20h Paris)
    // ===================================

    function updateAvailability() {
        var indicators = document.querySelectorAll('.status-indicator');
        if (!indicators.length) return;

        var now = new Date();
        var parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
        var hour = parisTime.getHours();
        var isAvailable = hour >= 6 && hour < 20;

        indicators.forEach(function(el) {
            var dot = el.querySelector('.status-dot');
            var label = el.querySelector('.status-label');
            if (!dot || !label) return;

            if (isAvailable) {
                el.classList.add('available');
                el.classList.remove('unavailable');
                label.textContent = 'Disponible';
            } else {
                el.classList.add('unavailable');
                el.classList.remove('available');
                label.textContent = 'Indisponible';
            }
        });
    }

    updateAvailability();
    setInterval(updateAvailability, 60000);
});
