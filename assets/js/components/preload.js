/**
 * Animation Preload Page - Hiệu ứng laser border neon, có số đếm từ 0% -> 100%, và thêm Load Core để tạo hiệu ứng
 * @param minDuration
 */
export function initCyberLaserPreloader(minDuration = 1200) {
    const startTime = Date.now();
    let isFinished = false;
    let timerId = null;

    // Init DOM Preload
    function createPreloaderDOM() {
        if (document.getElementById('preloader')) return;

        const html = `
        <div id="preloader">
            <div class="loader-box">
                <span class="laser-line laser-top"></span>
                <span class="laser-line laser-right"></span>
                <span class="laser-line laser-bottom"></span>
                <span class="laser-line laser-left"></span>
                <div id="cyber-counter">0%</div>
            </div>
            <div class="loader-status" id="cyber-status">INITIALIZING...</div>
        </div>`;

        // Check Document Body
        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', html);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertAdjacentHTML('afterbegin', html);
            });
        }
    }

    createPreloaderDOM();

    const statusTexts = ["LOADING CORE...", "FETCHING DATA...", "PARSING UI...", "READY!"];

    // Update Counter
    timerId = setInterval(() => {
        if (isFinished) return;

        const counter = document.getElementById('cyber-counter');
        const status = document.getElementById('cyber-status');
        if (!counter || !status) return;

        const elapsed = Date.now() - startTime;
        let progress = Math.min(99, Math.floor((elapsed / minDuration) * 100));

        counter.innerText = progress + '%';

        if (progress > 75) status.innerText = statusTexts[2];
        else if (progress > 40) status.innerText = statusTexts[1];
        else status.innerText = statusTexts[0];
    }, 30);

    // Hide Preloader
    function finish() {
        if (isFinished) return;
        isFinished = true;

        clearInterval(timerId);

        const preloader = document.getElementById('preloader');
        const counter = document.getElementById('cyber-counter');
        const status = document.getElementById('cyber-status');

        if (counter) counter.innerText = '100%';
        if (status) status.innerText = statusTexts[3];

        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 800);
            }
        }, 300);
    }

    // Turn Off Reload
    function triggerFinish() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);
        setTimeout(finish, remaining);
    }

    // Finish Trigger
    if (document.readyState === 'complete') {
        triggerFinish();
    } else {
        window.addEventListener('load', triggerFinish, { once: true });
        setTimeout(triggerFinish, 4000);
    }
}