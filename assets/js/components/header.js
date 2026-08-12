/**
 * Animation for Header scroll. Hiệu ứng khi kéo lên thì header hiện, khi scroll xuống thì ẩn
 */
export function animationScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 10;
    let ticking = false;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 50) {
            header.classList.remove('header-hidden', 'header-scrolled');
            lastScrollY = currentScrollY;
            ticking = false;
            return;
        }

        // Shadow for Header
        header.classList.add('header-scrolled');

        // Thread Hold
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);

        if (scrollDifference > scrollThreshold) {
            if (currentScrollY > lastScrollY) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollY = currentScrollY;
        }

        ticking = false;
    };

    // Thêm passive: true để tối ưu mượt mà khi cuộn trang
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Hiệu ứng Mobile menu, khi click vào burger icon. Có 2 trạng thái và activate và không. Hiệu ứng xoay kiểm soát bằng CSS.
 */
export function headerMobileShowMenu() {
    document.addEventListener('click', function (event) {
        // Click
        const burgerIcon = event.target.closest('.burger-icon');

        if (burgerIcon) {
            const headerMobile = document.getElementById('header-mobile');
            if (headerMobile) {
                headerMobile.classList.toggle('active');
            }
        }

        // Close Menu Mobile
        if (event.target.closest('#header-mobile .only-mobile a')) {
            const headerMobile = document.getElementById('header-mobile');
            if (headerMobile) {
                headerMobile.classList.remove('active');
            }
        }
    });
}
