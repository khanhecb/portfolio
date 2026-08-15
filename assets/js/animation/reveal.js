let revealObserver = null;

export function initScrollReveal() {

    const unobservedElements = document.querySelectorAll('.reveal:not([data-revealed])');
    if (!unobservedElements.length) return;

    if (!('IntersectionObserver' in window)) {
        unobservedElements.forEach(el => {
            el.classList.add('active');
            el.dataset.revealed = 'true';
        });
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: "0px 0px -20px 0px"
        });
    }

    unobservedElements.forEach(el => {
        el.dataset.revealed = 'true';
        revealObserver.observe(el);
    });
}