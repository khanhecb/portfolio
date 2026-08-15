import { initScrollReveal } from './animation/reveal.js';
import { renderSectionSkills } from './components/skills.js';
import { renderSectionProject } from './components/projects.js';
import { renderSectionJourney } from './components/journey.js';
import { initCyberLaserPreloader } from './components/preload.js';
import {
    animationScrollHeader,
    headerMobileShowMenu
} from './components/header.js';

// Trigger Preload
initCyberLaserPreloader(1200);

/**
 * Load All HTML Section
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
 * Init app
 */
async function initApp() {
    try {
        await loadIncludes();

        animationScrollHeader();
        headerMobileShowMenu();

        await Promise.allSettled([
            renderSectionSkills(),
            renderSectionProject(),
            renderSectionJourney(),
        ]);


    } catch (error) {
        console.error("ERROR When init:", error);
    } finally {
        initScrollReveal();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}