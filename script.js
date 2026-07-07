/*document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.right a');
    const h3 = document.querySelector('.font-h3');
    const heading = document.querySelector('.font-h1');
    const h3Text = h3.textContent; // Obtiene el texto del h3
    h3.textContent = ''; // Limpia el contenido del h3
    let h3Index = 0; // Índice para el texto del h3

    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('visible');
            heading.classList.add('visible'); // Muestra el h1 al mismo tiempo que los enlaces
            
            // Inicia el efecto de tecleo para el h3
            if (index === 0) { // Comienza el tecleo solo una vez
                typeH3();
            }
        }, index * 500); // Ajusta el tiempo (en milisegundos) entre cada enlace
    });

    function typeH3() {
        if (h3Index < h3Text.length) {
            h3.textContent += h3Text.charAt(h3Index); // Agrega un carácter
            h3Index++;
            setTimeout(typeH3, 50); // Ajusta la velocidad de tecleo (en milisegundos)
        } else {
            h3.classList.add('visible'); // Muestra el h3 después de escribir
        }
    }
});*/

document.addEventListener('DOMContentLoaded', function() {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith('es') ? 'es' : 'en';

    // Función para traducir el contenido
    function translateContent() {
        const elements = document.querySelectorAll('[data-lang-en], [data-lang-es]');
        elements.forEach(el => {
            if (el.id === 'backToTop') return;
            el.textContent = el.getAttribute(`data-lang-${lang}`);
        });

        const placeholders = document.querySelectorAll('[data-placeholder-en], [data-placeholder-es]');
        placeholders.forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
        });

        const submitButtons = document.querySelectorAll('input[type="submit"][data-lang-en]');
        submitButtons.forEach(el => {
            el.value = el.getAttribute(`data-lang-${lang}`);
        });

        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            const label = backToTop.getAttribute(`data-lang-${lang}`);
            backToTop.setAttribute('aria-label', label);
            backToTop.setAttribute('title', label);
        }
    }

    translateContent(); // Llama a la función de traducción

    const links = document.querySelectorAll('.right a');
    const h3 = document.querySelector('.font-h3');
    const heading = document.querySelector('.font-h1');
    const h3Text = h3.textContent; // Obtiene el texto del h3
    h3.textContent = ''; // Limpia el contenido del h3
    let h3Index = 0; // Índice para el texto del h3

    h3.textContent = ' '; // Espacio vacío inicial

    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('visible');
            heading.classList.add('visible'); // Muestra el h1 al mismo tiempo que los enlaces
            
            // Inicia el efecto de tecleo para el h3
            if (index === 0) { // Comienza el tecleo solo una vez
                typeH3();
            }
        }, index * 500); // Ajusta el tiempo (en milisegundos) entre cada enlace
    });

    function typeH3() {
        if (h3Index < h3Text.length) {
            h3.textContent += h3Text.charAt(h3Index); // Agrega un carácter
            h3Index++;
            setTimeout(typeH3, 100); // Ajusta la velocidad de tecleo (en milisegundos)
        } else {
            h3.classList.add('visible'); // Muestra el h3 después de escribir
        }
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.img-one');
    const aboutMeSection = document.getElementById('about-me');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVisibility() {
        if (isElementInViewport(aboutMeSection)) {
            img.style.opacity = 1;
            img.style.transform = 'translateY(0)';
        }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar al cargar la página

    // Evento para mostrar la imagen al hacer clic en el enlace del menú
    const aboutMeLinks = document.querySelectorAll('a[href="#about-me"]');
    aboutMeLinks.forEach(link => {
        link.addEventListener('click', function() {
            img.style.opacity = 1;
            img.style.transform = 'translateY(0)';
            img.classList.add('show');
        });
    });
});

/*IMAGE*/

document.addEventListener('DOMContentLoaded', function() {
    const imgOne = document.querySelector('.img-one');
    const aboutMeSection = document.getElementById('about-me');

    // Función para verificar si la sección es visible
    function checkVisibility() {
        const rect = aboutMeSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            imgOne.classList.add('show');
        }
    }

    // Escuchar el evento de desplazamiento
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verificar al cargar la página
});

/* MENU */
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeButton = document.querySelector('.close-button');
    const menuContent = document.querySelector('.menu-content');

    function openMenu() {
        if (!menuOverlay || !menuContent) return;
        menuOverlay.style.display = 'block';
        menuContent.style.display = 'block';
    }

    function closeMenu() {
        if (!menuOverlay || !menuContent) return;
        menuOverlay.style.display = 'none';
        menuContent.style.display = 'none';
    }

    if (menuButton) {
        menuButton.addEventListener('click', openMenu);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) closeMenu();
        });
    }

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const downloadButton = document.querySelector('.btn-cv');
    if (downloadButton) {
        downloadButton.addEventListener('mouseover', function() {
            this.classList.add('tittle');
        });
        downloadButton.addEventListener('mouseout', function() {
            this.classList.remove('tittle');
        });
    }

    /* Back to top */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        const showAfter = 300;

        function toggleBackToTop() {
            if (window.scrollY > showAfter) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        }

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* Scroll reveal */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
});
