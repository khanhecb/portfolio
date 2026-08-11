document.addEventListener('click', function(event) {
    // Kiểm tra xem phần được click có phải là .burger-icon hoặc nằm bên trong .burger-icon không
    const burgerIcon = event.target.closest('.burger-icon');

    if (burgerIcon) {
        const headerMobile = document.getElementById('header-mobile');
        if (headerMobile) {
            headerMobile.classList.toggle('active');
        }
    }

    // Tự động đóng menu khi click vào link bên trong menu mobile
    if (event.target.closest('#header-mobile .only-mobile a')) {
        const headerMobile = document.getElementById('header-mobile');
        if (headerMobile) {
            headerMobile.classList.remove('active');
        }
    }
});