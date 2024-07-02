document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const dotContainer = document.querySelector('.dot-container');
    let currentSlideIndex = 0;
    let slideInterval;

    function createDots() {
        for (let i = 0; i < slides.children.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentSlideIndex = i;
                updateSlide();
                stopSlider();
            });
            dotContainer.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    function slide(direction) {
        if (direction === 'next') {
            currentSlideIndex++;
            if (currentSlideIndex >= slides.children.length) {
                currentSlideIndex = 0;
            }
        } else {
            currentSlideIndex--;
            if (currentSlideIndex < 0) {
                currentSlideIndex = slides.children.length - 1;
            }
        }
        updateSlide();
    }

    function updateSlide() {
        const slideWidth = slides.querySelector('.slide').clientWidth;
        const translateX = -currentSlideIndex * slideWidth;
        slides.style.transform = `translate3d(${translateX}px, 0, 0)`;
        updateDots();
    }

    function startSlider() {
        slideInterval = setInterval(() => slide('next'), 2000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    createDots();
    startSlider();

    slides.addEventListener('mouseenter', stopSlider);
    slides.addEventListener('mouseleave', startSlider);
});


document.addEventListener("DOMContentLoaded", function() {
    var header = document.querySelector(".sticky-header");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 30) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    });
});