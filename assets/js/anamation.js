
function initSquareCounterLoader(minDuration = 3000) {
    const preloader = document.getElementById('preloader');
    const counterElement = document.getElementById('counter');
    const mainContent = document.getElementById('main-content');

    if (!preloader || !counterElement) return;

    let currentCount = 1;
    const stepTime = Math.floor(minDuration / 100); // ~30ms mỗi bước

    // 1. Chạy đếm số NGAY LẬP TỨC từ 1 -> 100%
    const counterInterval = setInterval(() => {
        currentCount++;
        counterElement.innerText = currentCount + '%';

        if (currentCount >= 100) {
            clearInterval(counterInterval);
        }
    }, stepTime);

    // 2. Hàm xử lý ẩn Preloader (chỉ chạy 1 lần)
    let isClosed = false;
    function hidePreloader() {
        if (isClosed) return;
        isClosed = true;

        // Đảm bảo số hiển thị đủ 100%
        clearInterval(counterInterval);
        counterElement.innerText = '100%';

        // Thêm class làm mờ (Fade out)
        preloader.classList.add('hidden');

        // Hiển thị nội dung chính
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        // Xóa hoàn toàn khỏi DOM sau khi mờ xong (0.5s)
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }

    // 3. Xử lý thời gian chờ tối thiểu (minDuration) + Bắt sự kiện Load an toàn
    const startTime = Date.now();

    function checkAndHide() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDuration - elapsedTime);

        setTimeout(hidePreloader, remainingTime);
    }

    // Kiểm tra nếu trang đã load xong từ trước (Ready State Check)
    if (document.readyState === 'complete') {
        checkAndHide();
    } else {
        window.addEventListener('load', checkAndHide, { once: true });

        // Fallback an toàn: Nếu sau (minDuration + 2s) mà trang vẫn chưa bắn event load,
        // tự động đóng preloader để không bắt người dùng chờ vô tận.
        setTimeout(checkAndHide, minDuration + 1000);
    }
}

initSquareCounterLoader(3000);