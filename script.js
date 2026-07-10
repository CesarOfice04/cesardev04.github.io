document.addEventListener('DOMContentLoaded', () => {
    const lang = (navigator.language || navigator.userLanguage || 'en').startsWith('es') ? 'es' : 'en';

    /* ── Page title ── */
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        const titles = {
            en: 'Cesar Chiquito | Software Programmer',
            es: 'Cesar Chiquito | Programador de Software'
        };
        pageTitle.textContent = titles[lang];
    }

    /* ── i18n ── */
    function translateContent() {
        document.querySelectorAll('[data-lang-en][data-lang-es]').forEach(el => {
            if (el.id === 'backToTop') return;
            el.textContent = el.getAttribute(`data-lang-${lang}`);
        });

        document.querySelectorAll('[data-placeholder-en][data-placeholder-es]').forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
        });

        document.querySelectorAll('input[type="submit"][data-lang-en]').forEach(el => {
            el.value = el.getAttribute(`data-lang-${lang}`);
        });

        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            const label = backToTop.getAttribute(`data-lang-${lang}`);
            backToTop.setAttribute('aria-label', label);
            backToTop.setAttribute('title', label);
        }
    }

    translateContent();

    /* ── Hero typing effect ── */
    const navLinks = document.querySelectorAll('.right a');
    const heading = document.querySelector('.font-h1');
    const h3 = document.querySelector('.font-h3');

    if (h3 && heading) {
        const h3Text = h3.textContent;
        h3.textContent = ' ';
        let h3Index = 0;

        const typeH3 = () => {
            if (h3Index < h3Text.length) {
                h3.textContent += h3Text.charAt(h3Index);
                h3Index++;
                setTimeout(typeH3, 100);
            } else {
                h3.classList.add('visible');
            }
        };

        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('visible');
                heading.classList.add('visible');
                if (index === 0) typeH3();
            }, index * 500);
        });
    }

    /* ── About photo reveal on scroll ── */
    const aboutPhoto = document.querySelector('.img-one');
    const aboutSection = document.getElementById('about-me');

    if (aboutPhoto && aboutSection) {
        const revealAboutPhoto = () => {
            const rect = aboutSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                aboutPhoto.classList.add('show');
            }
        };

        window.addEventListener('scroll', revealAboutPhoto, { passive: true });
        revealAboutPhoto();

        document.querySelectorAll('a[href="#about-me"]').forEach(link => {
            link.addEventListener('click', () => aboutPhoto.classList.add('show'));
        });
    }

    /* ── Mobile menu ── */
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeButton = document.querySelector('.close-button');
    const menuContent = document.querySelector('.menu-content');

    const openMenu = () => {
        if (!menuOverlay || !menuContent) return;
        menuOverlay.style.display = 'block';
        menuContent.style.display = 'block';
    };

    const closeMenu = () => {
        if (!menuOverlay || !menuContent) return;
        menuOverlay.style.display = 'none';
        menuContent.style.display = 'none';
    };

    menuButton?.addEventListener('click', openMenu);
    closeButton?.addEventListener('click', closeMenu);

    menuOverlay?.addEventListener('click', (e) => {
        if (e.target === menuOverlay) closeMenu();
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ── CV button hover ── */
    const cvButton = document.querySelector('.btn-cv');
    if (cvButton) {
        cvButton.addEventListener('mouseover', () => cvButton.classList.add('tittle'));
        cvButton.addEventListener('mouseout', () => cvButton.classList.remove('tittle'));
    }

    /* ── Back to top ── */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        const showAfter = 300;

        const toggleBackToTop = () => {
            backToTopBtn.classList.toggle('is-visible', window.scrollY > showAfter);
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Scroll reveal ── */
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealElements.length && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    /* ── Hero video ── */
    const video = document.getElementById('video');
    if (video) {
        const playbackRate = 0.55;
        video.playbackRate = playbackRate;

        video.addEventListener('loadedmetadata', () => {
            video.playbackRate = playbackRate;
        });

        const ensurePlay = () => video.play().catch(() => {});

        if (video.readyState >= 2) {
            ensurePlay();
        } else {
            video.addEventListener('loadeddata', ensurePlay, { once: true });
        }
    }
});
