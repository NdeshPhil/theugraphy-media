/**
 * THEUGRAPHY MEDIA - Main JavaScript
 * Features: Mobile menu, smooth scrolling, active nav, video modal, form handler, scroll effects
 */

(function() {
    'use strict';

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    var menuToggle = document.getElementById('mobile-menu');
    var navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            var icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking a link
        var links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                var icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    // ============================================
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('.nav-links a');

    function highlightActiveNav() {
        var scrollPosition = window.scrollY + 150;

        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(function(item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav();

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    var header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // FADE-UP ANIMATION ON SCROLL
    // ============================================
    var fadeElements = document.querySelectorAll('.fade-up');

    function checkFadeUp() {
        fadeElements.forEach(function(element) {
            var elementTop = element.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeUp);
    checkFadeUp();

    // ============================================
    // VIDEO MODAL FUNCTIONALITY (YouTube)
    // ============================================
    var videoTrigger = document.getElementById('videoTrigger');
    var videoModal = document.getElementById('videoModal');
    var closeModal = document.getElementById('closeModal');
    var youtubeVideo = document.getElementById('youtubeVideo');

    var videoSrc = '';
    if (youtubeVideo) {
        videoSrc = youtubeVideo.src;
    }

    if (videoTrigger && videoModal) {
        videoTrigger.addEventListener('click', function() {
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (youtubeVideo) {
                youtubeVideo.src = videoSrc + '&autoplay=1';
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            document.body.style.overflow = '';
            if (youtubeVideo) {
                youtubeVideo.src = videoSrc;
            }
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                document.body.style.overflow = '';
                if (youtubeVideo) {
                    youtubeVideo.src = videoSrc;
                }
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
            videoModal.style.display = 'none';
            document.body.style.overflow = '';
            if (youtubeVideo) {
                youtubeVideo.src = videoSrc;
            }
        }
    });

    // ============================================
    // FORM SUBMISSION HANDLER
    // ============================================
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');
            var messageInput = document.getElementById('message');

            var isValid = true;
            var errorMessage = '';

            if (!nameInput.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name.';
                nameInput.style.borderColor = '#D4AF37';
            } else {
                nameInput.style.borderColor = '#3A3A3A';
            }

            if (!emailInput.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your email address.';
                emailInput.style.borderColor = '#D4AF37';
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
                emailInput.style.borderColor = '#D4AF37';
            } else {
                emailInput.style.borderColor = '#3A3A3A';
            }

            if (!messageInput.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your message.';
                messageInput.style.borderColor = '#D4AF37';
            } else {
                messageInput.style.borderColor = '#3A3A3A';
            }

            if (!isValid) {
                showFormMessage(errorMessage, 'error');
                return;
            }

            showFormMessage('Thank you! We will get back to you shortly.', 'success');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        var existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        var msgDiv = document.createElement('div');
        msgDiv.className = 'form-message ' + type;
        msgDiv.textContent = message;

        var formContainer = document.querySelector('.contact-form');
        if (formContainer) {
            formContainer.appendChild(msgDiv);
        }

        setTimeout(function() {
            if (msgDiv) msgDiv.remove();
        }, 5000);
    }

    // ============================================
    // LAZY LOAD PREPARATION FOR IMAGES
    // ============================================
    var allImages = document.querySelectorAll('img');

    allImages.forEach(function(img) {
        if (!img.src.includes('logo')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    console.log('THEUGRAPHY MEDIA website loaded successfully');

})();
