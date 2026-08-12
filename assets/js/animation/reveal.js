// Biến lưu trữ Singleton observer
let revealObserver = null;

export function initScrollReveal() {
    // 1. Lọc ra những phần tử có class .reveal CHƯA ĐƯỢC KÍCH HOẠT observer
    const unobservedElements = document.querySelectorAll('.reveal:not([data-revealed])');
    if (!unobservedElements.length) return;

    // Fallback cho trình duyệt cũ không hỗ trợ IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        unobservedElements.forEach(el => {
            el.classList.add('active');
            el.dataset.revealed = 'true';
        });
        return;
    }

    // 2. Tái sử dụng Instance observer duy nhất
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Ngừng theo dõi sau khi phần tử đã hiện ra
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: "0px 0px -20px 0px"
        });
    }

    // 3. Đánh dấu và đưa các element mới vào Observer
    unobservedElements.forEach(el => {
        el.dataset.revealed = 'true'; // Đánh dấu đã observe
        revealObserver.observe(el);
    });
}