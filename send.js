document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('button');
    const form = document.getElementById('form');

    if (!btn || !form) {
        console.error('EmailJS: no se encontró el formulario de contacto.');
        return;
    }

    const notification = document.getElementById('form-notification');
    const notifTitle = notification ? notification.querySelector('.form-notification__title') : null;
    const notifMessage = notification ? notification.querySelector('.form-notification__message') : null;
    const notifClose = notification ? notification.querySelector('.form-notification__close') : null;

    const lang = (navigator.language || 'en').startsWith('es') ? 'es' : 'en';

    const messages = {
        sending: { en: 'Sending...', es: 'Enviando...' },
        sendBtn: { en: 'Send Email', es: 'Enviar Correo' },
        success: {
            title: {
                en: 'Message sent successfully',
                es: 'Mensaje enviado con éxito'
            },
            body: {
                en: 'Thank you for reaching out. I will review your message and get back to you shortly.',
                es: 'Gracias por contactarme. Revisaré tu mensaje y te responderé a la brevedad posible.'
            }
        },
        error: {
            title: {
                en: 'Could not send message',
                es: 'No se pudo enviar el mensaje'
            },
            body: {
                en: 'Something went wrong. Please try again later or contact me directly via social media.',
                es: 'Ocurrió un error. Por favor intenta de nuevo más tarde o contáctame directamente por redes sociales.'
            }
        }
    };

    let hideTimer = null;

    function getButtonLabel() {
        return btn.getAttribute(`data-lang-${lang}`) || messages.sendBtn[lang];
    }

    function showNotification(type, title, message) {
        if (!notification || !notifTitle || !notifMessage) {
            window.alert(`${title}\n\n${message}`);
            return;
        }

        clearTimeout(hideTimer);
        notification.hidden = false;
        notification.classList.remove('is-success', 'is-error', 'is-visible');
        notification.classList.add(type === 'success' ? 'is-success' : 'is-error');
        notifTitle.textContent = title;
        notifMessage.textContent = message;

        requestAnimationFrame(() => {
            notification.classList.add('is-visible');
        });

        hideTimer = setTimeout(hideNotification, 6000);
    }

    function hideNotification() {
        if (!notification) return;
        notification.classList.remove('is-visible');
        setTimeout(() => {
            notification.hidden = true;
        }, 400);
    }

    if (notifClose) {
        notifClose.addEventListener('click', hideNotification);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (typeof emailjs === 'undefined') {
            showNotification(
                'error',
                messages.error.title[lang],
                lang === 'es'
                    ? 'EmailJS no está cargado. Verifica tu conexión a internet.'
                    : 'EmailJS is not loaded. Check your internet connection.'
            );
            return;
        }

        btn.value = messages.sending[lang];
        btn.disabled = true;

        const serviceID = 'default_service';
        const templateID = 'template_my573vp';
        const publicKey = 'g0liggak1ADrNmmIi';

        emailjs.sendForm(serviceID, templateID, form, { publicKey })
            .then(() => {
                btn.value = getButtonLabel();
                btn.disabled = false;
                showNotification(
                    'success',
                    messages.success.title[lang],
                    messages.success.body[lang]
                );
                form.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                btn.value = getButtonLabel();
                btn.disabled = false;
                showNotification(
                    'error',
                    messages.error.title[lang],
                    messages.error.body[lang]
                );
            });
    });
});
