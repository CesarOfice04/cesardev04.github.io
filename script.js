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
            setTimeout(typeH3, 100); // Ajusta la velocidad de tecleo (en milisegundos)
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
            el.textContent = el.getAttribute(`data-lang-${lang}`);
        });
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
    const aboutMeLink = document.querySelector('a[href="#about-me"]');
    if (aboutMeLink) {
        aboutMeLink.addEventListener('click', function() {
            img.style.opacity = 1;
            img.style.transform = 'translateY(0)';
        });
    }
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

const menuButton = document.querySelector('.menu-button');
const menuOverlay = document.getElementById('menuOverlay');
const closeButton = document.querySelector('.close-button');

menuButton.addEventListener('click', () => {
    menuOverlay.style.display = 'block'; // Muestra el overlay
    document.querySelector('.menu-content').style.display = 'block'; // Muestra el contenido del menú
});

closeButton.addEventListener('click', () => {
    menuOverlay.style.display = 'none'; // Oculta el overlay
    document.querySelector('.menu-content').style.display = 'none'; // Oculta el contenido del menú
});

/* IMAGE ZOOM*/
const images = document.querySelectorAll('.slider .slide img');

images.forEach(image => {
    image.addEventListener('click', () => {
        // Eliminar la clase 'focused' de todas las imágenes
        images.forEach(img => img.classList.remove('focused'));
        
        // Agregar la clase 'focused' a la imagen seleccionada
        image.classList.add('focused');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.btn-cv');

    downloadButton.addEventListener('mouseover', function() {
        this.classList.add('tittle');
    });

    downloadButton.addEventListener('mouseout', function() {
        this.classList.remove('tittle');
    });
});
