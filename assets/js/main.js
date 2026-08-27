/**
 * ==========================================================================
 * PACIFIC TOWING & WINDSOR TOWING - CORE JS MOTOR
 * ==========================================================================
 */

function makePhoneCall(phoneNumber) {

    const DEFAULT_NUMBER = '+17077744810';
    
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

function sendEmergencyEmail(serviceName) {
    const companyEmail = 'Towservice101@gmail.com';
    const clientPhone = '+17077744810'; 
    const defaultService = serviceName || 'Towing / Roadside Assistance';
    
    const subject = `Urgent Assistance Request: ${defaultService} - Pacific Towing`;
    const body = `Hello Pacific Towing,\n\nI am reaching out to your dispatch line (${clientPhone}) because I urgently require assistance for: ${defaultService}.\n\nI am currently on the road near Santa Rosa/Healdsburg and need help as soon as possible.\n\nPlease contact me back at this email address or via my phone.\n\nRegards.`;
    
    const mailtoUrl = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.assign(mailtoUrl);
}

function showCustomAlert(title, message, type) {
    const overlay = document.getElementById("custom-alert");
    const titleEl = document.getElementById("custom-alert-title");
    const msgEl = document.getElementById("custom-alert-message");
    const iconEl = document.getElementById("custom-alert-icon");
    const btn = document.getElementById("custom-alert-btn");

    if (!overlay || !titleEl || !msgEl || !iconEl || !btn) return;

    titleEl.textContent = title;
    msgEl.textContent = message;
    
    if (type === 'success') {
        iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
        iconEl.className = 'custom-alert-icon success';
        btn.style.backgroundColor = '#28a745';
    } else {
        iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        iconEl.className = 'custom-alert-icon error';
        btn.style.backgroundColor = '#cc1818';
    }

    overlay.classList.add("show");

    btn.onclick = function() {
        overlay.classList.remove("show");
    };
}

// ==========================================================================
// Fomulario
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const gmailBtn = document.getElementById("sticky-gmail-btn");
    if (gmailBtn) {
        gmailBtn.addEventListener("click", (event) => {
            event.preventDefault(); 
            if (typeof sendEmergencyEmail === "function") {
                sendEmergencyEmail('General Inquiry'); 
            }
        });
    }
    const quoteForm = document.getElementById("quoteForm");
    if (quoteForm) {
        quoteForm.addEventListener("submit", async (event) => {
            event.preventDefault(); 
            const COOLDOWN_TIME = 60000;
            const lastSubmission = localStorage.getItem('lastFormSubmission');
            const now = Date.now();
            if (lastSubmission && (now - lastSubmission) < COOLDOWN_TIME) {
                showCustomAlert(
                    "Slow down!", 
                    "Please wait a minute before sending another request.", 
                    "error"
                );
                return;
            }
            const submitBtn = quoteForm.querySelector(".btn-submit-quote");
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Request...`;
            submitBtn.disabled = true;

            const formData = new FormData(quoteForm);

            try {
                const response = await fetch(quoteForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) throw new Error("Network response was not ok");

                localStorage.setItem('lastFormSubmission', Date.now());

                showCustomAlert(
                    "Awesome!", 
                    "Your quote request has been sent successfully. The owner will review it and get back to you soon.", 
                    "success"
                );
                
                quoteForm.reset();

            } catch (error) {
                console.error("Transmission Error:", error);
                showCustomAlert(
                    "Submission Failed", 
                    "Oops! Something went wrong. Please try again or contact us directly.", 
                    "error"
                );
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});


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