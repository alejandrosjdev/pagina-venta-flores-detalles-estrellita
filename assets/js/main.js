/**
 * ==========================================================================
 * DETALLES ESTRELLITA - CORE JS MOTOR
 * ==========================================================================
 */

function makePhoneCall(phoneNumber) {
    const DEFAULT_NUMBER = '+51913224531';
    
    try {
        const targetNumber = (typeof phoneNumber === 'string' && phoneNumber.trim() !== '') 
            ? phoneNumber.trim() 
            : DEFAULT_NUMBER;

        if (typeof window !== 'undefined' && window.location) {
            window.location.href = `tel:${targetNumber}`;
        } else {
            console.error('Error: El objeto "window.location" no está disponible en este entorno.');
        }
    } catch (error) {
        console.error('Ocurrió un error inesperado al intentar realizar la llamada:', error);
    }
}

function openWhatsApp(phoneNumber) {
    const DEFAULT_NUMBER = '51913224531';
    const targetNumber = (typeof phoneNumber === 'string' && phoneNumber.trim() !== '') 
        ? phoneNumber.trim().replace('+', '') 
        : DEFAULT_NUMBER;
        
    // Saludo automático para el comprador
    const message = encodeURIComponent('¡Hola, Detalles Estrellita! Me gustaría obtener más información sobre sus detalles y catálogos.');
    
    try {
        if (typeof window !== 'undefined' && window.location) {
            window.open(`https://wa.me/${targetNumber}?text=${message}`, '_blank');
        } else {
            console.error('Error: El objeto window no está disponible.');
        }
    } catch (error) {
        console.error('Ocurrió un error al intentar abrir WhatsApp:', error);
    }
}


/**
 * Función para comprar un producto específico vía WhatsApp
 */
function buyProduct(productName) {
    const phoneNumber = '51913224531'; // Tu número de Detalles Estrellita
    
    // Mensaje predeterminado con el nombre del producto en negrita (usando * en WhatsApp)
    const message = `¡Hola, Detalles Estrellita! Me encantaría adquirir el detalle: *${productName}*. ¿Podrían brindarme los pasos para concretar la compra?`;
    
    const encodedMessage = encodeURIComponent(message);
    
    try {
        if (typeof window !== 'undefined' && window.location) {
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }
    } catch (error) {
        console.error('Ocurrió un error al intentar abrir WhatsApp para la compra:', error);
    }
}


/* ==========================================================================
FUNCIONALIDAD DEL CARRUSEL (CASH FOR CARS)
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carrusel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carrusel-nav');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const moveToSlide = (targetIndex) => {
        let isReset = false;

        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
            isReset = true;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
            isReset = true;
        }

        if (isReset) {
            track.style.transition = 'none';
            
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            
            track.offsetHeight;
            
            track.style.transition = '';
        } else {
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
        }
        
        slides[currentIndex].classList.remove('active');
        slides[targetIndex].classList.add('active');
        dots[currentIndex].classList.remove('active');
        dots[targetIndex].classList.add('active');
        currentIndex = targetIndex;
    };
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.carrusel-indicator');
        if (!targetDot) return; 
        const targetIndex = dots.indexOf(targetDot);
        moveToSlide(targetIndex);
    });
});