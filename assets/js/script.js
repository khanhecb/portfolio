import { initScrollReveal } from './animation/reveal.js';
import { renderSectionSkills } from './components/skills.js';
import { renderSectionProject } from './components/projects.js';
import { initCyberLaserPreloader } from './components/preload.js';
import {
    animationScrollHeader,
    headerMobileShowMenu
} from './components/header.js';

// 1. Kích hoạt Preloader NGAY LẬP TỨC để phủ màn hình trước khi render
initCyberLaserPreloader(1200);

/**
 * Load tất cả các thành phần HTML tĩnh (Header, Footer, Nav...)
 */
async function loadIncludes() {
    const includes = document.querySelectorAll("[data-include]");
    if (!includes.length) return;

    // Tải song song tất cả các include để tối ưu thời gian
    const tasks = Array.from(includes).map(async (element) => {
        const file = element.dataset.include;
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const html = await response.text();
            element.outerHTML = html;
        } catch (error) {
            console.error(`Lỗi khi load include [${file}]:`, error);
        }
    });

    await Promise.all(tasks);
}

/**
 * Khởi chạy toàn bộ ứng dụng
 */
async function initApp() {
    try {
        // Step 1: Load Layout Skeleton (Header/Footer...)
        await loadIncludes();

        // Step 2: Gán sự kiện Header ngay khi Header HTML đã có trong DOM
        animationScrollHeader();
        headerMobileShowMenu();

        // Step 3: Fetch & Render dữ liệu động song song (Parallel execution)
        await Promise.allSettled([
            renderSectionSkills(),
            renderSectionProject(),
        ]);

    } catch (error) {
        console.error("Lỗi trong quá trình khởi tạo ứng dụng:", error);
    } finally {
        // Step 4: Kích hoạt Scroll Reveal sau khi toàn bộ HTML & Dynamic Data đã lên DOM
        initScrollReveal();
    }
}

// Kiểm tra DOM ready an toàn cho ES Module
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}