document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('skillsSlider');
    const track = slider?.querySelector('.slide-track');
    const images = document.querySelectorAll('.slider .slide img');

    if (!slider || !track) return;

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

    /* ---- Carrusel continuo + arrastre ---- */
    measureTrack();
    window.addEventListener('resize', measureTrack);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
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

    /* ---- Selección de iconos ---- */
    images.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.classList.add('focused');
        });

        image.addEventListener('mouseout', () => {
            if (!image.classList.contains('selected')) {
                image.classList.remove('focused');
            }
        });

        image.addEventListener('click', (event) => {
            if (hasDragged) return;

            event.stopPropagation();

            if (image.classList.contains('selected')) {
                image.classList.remove('selected');
                image.classList.remove('focused');
                selectedImage = null;
            } else {
                images.forEach(img => {
                    img.classList.remove('selected');
                    img.classList.remove('focused');
                });
                image.classList.add('selected');
                image.classList.add('focused');
                selectedImage = image;
            }
        });
    });

    document.addEventListener('click', () => {
        if (selectedImage) {
            selectedImage.classList.remove('selected');
            selectedImage.classList.remove('focused');
            selectedImage = null;
        }
    });
});
