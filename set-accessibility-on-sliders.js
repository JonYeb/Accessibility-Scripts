const handleSliderAccessibility = (slider) => {
    const SLIDER_ELEMENTS_BASE_CLASS_SELECTOR = '.product-slider-item';
    const SLIDER_ELEMENTS_ACTIVE_CLASS = 'tns-slide-active';

    const slides = slider.querySelectorAll(SLIDER_ELEMENTS_BASE_CLASS_SELECTOR);
    slides.forEach((slide) => {
        const focusableElements = slide.querySelectorAll('a, button, input, select, textarea');

        if (!slide.classList.contains(SLIDER_ELEMENTS_ACTIVE_CLASS)) {
            slide.setAttribute('aria-hidden', 'true');
            focusableElements.forEach((el) => {
                el.setAttribute('aria-hidden', 'true');
                el.setAttribute('tabindex', '-1');
            });
        } else if (slide.classList.contains(SLIDER_ELEMENTS_ACTIVE_CLASS)) {
            slide.removeAttribute('aria-hidden');
            focusableElements.forEach((el) => {
                el.removeAttribute('aria-hidden');
                el.removeAttribute('tabindex');
            });
        }
    });
};

(function() {
    const SLIDER_BASE_CLASS_SELECTOR = '.base-slider';
    const sliders = document.querySelectorAll(SLIDER_BASE_CLASS_SELECTOR);

    sliders.forEach((slider) => {
        handleSliderAccessibility(slider);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    handleSliderAccessibility(slider);
                }
            });
        });

        observer.observe(slider, { childList: true, subtree: true });
    });
})();