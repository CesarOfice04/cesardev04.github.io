const SKILLS = [
    { src: 'img/pngegg (59).png', alt: 'Javascript' },
    { src: 'img/pngegg (60).png', alt: 'CSS' },
    { src: 'img/pngegg (61).png', alt: 'HTML' },
    { src: 'img/pngegg (62).png', alt: 'PHP' },
    { src: 'img/pngegg (65).png', alt: 'Python' },
    { src: 'img/pngegg (66).png', alt: 'C++' },
    { src: 'img/pngegg (67).png', alt: 'C#' },
    { src: 'img/pngegg (70).png', alt: 'Java' },
    { src: 'img/pngegg (63).png', alt: 'PostgreSQL' },
    { src: 'img/pngegg (64).png', alt: 'MySQL' },
    { src: 'img/pngegg (68).png', alt: 'Github' },
    { src: 'img/pngegg (69).png', alt: 'Git' }
];

function buildSkillsTrack(track) {
    const slides = [...SKILLS, ...SKILLS];

    slides.forEach(({ src, alt }) => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        const img = document.createElement('img');
        img.className = 'image';
        img.src = src;
        img.alt = alt;

        slide.appendChild(img);
        track.appendChild(slide);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('skillsSlider');
    const track = slider?.querySelector('.slide-track');

    if (!slider || !track) return;

    buildSkillsTrack(track);

    const images = slider.querySelectorAll('.slide img');
    let selectedImage = null;
    let position = 0;
    let dragDelta = 0;
    let trackHalfWidth = 0;
    let scrollSpeed = 0;
    let lastTime = performance.now();
    let isPointerDown = false;
    let pointerStartX = 0;
    let hasDragged = false;

    const SCROLL_DURATION = 38;
    const DRAG_THRESHOLD = 6;

    function measureTrack() {
        trackHalfWidth = track.scrollWidth / 2;
        scrollSpeed = trackHalfWidth > 0 ? trackHalfWidth / SCROLL_DURATION : 0;
    }

    function wrapPosition(value) {
        if (trackHalfWidth <= 0) return value;
        let wrapped = value;
        while (wrapped <= -trackHalfWidth) wrapped += trackHalfWidth;
        while (wrapped > 0) wrapped -= trackHalfWidth;
        return wrapped;
    }

    function applyTransform() {
        const displayPosition = wrapPosition(position + dragDelta);
        track.style.transform = `translate3d(${displayPosition}px, 0, 0)`;
    }

    function tick(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        if (scrollSpeed > 0) {
            position -= scrollSpeed * dt;
            position = wrapPosition(position);
        }

        applyTransform();
        requestAnimationFrame(tick);
    }

    function onPointerDown(event) {
        if (event.button !== undefined && event.button !== 0) return;

        isPointerDown = true;
        hasDragged = false;
        pointerStartX = event.clientX;
        dragDelta = 0;
        slider.classList.add('is-dragging');
        slider.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
        if (!isPointerDown) return;

        dragDelta = event.clientX - pointerStartX;

        if (Math.abs(dragDelta) > DRAG_THRESHOLD) {
            hasDragged = true;
        }

        applyTransform();
    }

    function onPointerEnd(event) {
        if (!isPointerDown) return;

        isPointerDown = false;
        slider.classList.remove('is-dragging');

        if (slider.hasPointerCapture(event.pointerId)) {
            slider.releasePointerCapture(event.pointerId);
        }

        position = wrapPosition(position + dragDelta);
        dragDelta = 0;
        applyTransform();
    }

    measureTrack();
    window.addEventListener('resize', measureTrack);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrollSpeed = 0;
    }

    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerEnd);
    slider.addEventListener('pointercancel', onPointerEnd);
    slider.addEventListener('lostpointercapture', () => {
        if (isPointerDown) {
            isPointerDown = false;
            slider.classList.remove('is-dragging');
            position = wrapPosition(position + dragDelta);
            dragDelta = 0;
            applyTransform();
        }
    });

    requestAnimationFrame(tick);

    images.forEach(image => {
        image.addEventListener('mouseover', () => image.classList.add('focused'));

        image.addEventListener('mouseout', () => {
            if (!image.classList.contains('selected')) {
                image.classList.remove('focused');
            }
        });

        image.addEventListener('click', (event) => {
            if (hasDragged) return;

            event.stopPropagation();

            if (image.classList.contains('selected')) {
                image.classList.remove('selected', 'focused');
                selectedImage = null;
            } else {
                images.forEach(img => img.classList.remove('selected', 'focused'));
                image.classList.add('selected', 'focused');
                selectedImage = image;
            }
        });
    });

    document.addEventListener('click', () => {
        if (!selectedImage) return;
        selectedImage.classList.remove('selected', 'focused');
        selectedImage = null;
    });
});
