const images = document.querySelectorAll('.slider .slide img');
let selectedImage = null; // Variable para rastrear la imagen seleccionada

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.classList.add('focused'); // Añadir clase al pasar el mouse
    });

    image.addEventListener('mouseout', () => {
        if (!image.classList.contains('selected')) {
            image.classList.remove('focused'); // Eliminar clase al salir el mouse si no está seleccionada
        }
    });

    image.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que el clic se propague al documento
        if (image.classList.contains('selected')) {
            image.classList.remove('selected'); // Desmarcar si ya está seleccionada
            image.classList.remove('focused'); // Eliminar el efecto de enfoque
            selectedImage = null; // Reiniciar la imagen seleccionada
        } else {
            images.forEach(img => {
                img.classList.remove('selected'); // Desmarcar todas las imágenes
                img.classList.remove('focused'); // Eliminar el efecto de enfoque de todas
            });
            image.classList.add('selected'); // Marcar la imagen seleccionada
            image.classList.add('focused'); // Añadir el efecto de enfoque
            selectedImage = image; // Actualizar la imagen seleccionada
        }
    });
});

// Evento para deseleccionar la imagen al hacer clic en cualquier parte del viewport
document.addEventListener('click', () => {
    if (selectedImage) {
        selectedImage.classList.remove('selected'); // Desmarcar la imagen seleccionada
        selectedImage.classList.remove('focused'); // Eliminar el efecto de enfoque
        selectedImage = null; // Reiniciar la imagen seleccionada
    }
});


