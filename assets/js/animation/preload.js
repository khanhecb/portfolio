(function initCyberLaserPreloader(minDuration = 1200) {

    if (!document.getElementById('preloader')) {
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
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('cyber-counter');
    const status = document.getElementById('cyber-status');

    const statusTexts = ["LOADING CORE...", "FETCHING DATA...", "PARSING UI...", "READY!"];
    let currentCount = 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let progress = Math.min(99, Math.floor((elapsed / minDuration) * 100));

        if (progress > currentCount) {
            currentCount = progress;
            counter.innerText = currentCount + '%';

            if (currentCount > 75) status.innerText = statusTexts[2];
            else if (currentCount > 40) status.innerText = statusTexts[1];
            else status.innerText = statusTexts[0];
        }

        if (elapsed >= minDuration) clearInterval(timer);
    }, 30);

    function finish() {
        clearInterval(timer);
        counter.innerText = '100%';
        status.innerText = statusTexts[3];

        setTimeout(() => {
            preloader.classList.add('hidden');

            setTimeout(() => preloader?.remove(), 1000);
        }, 400);
    }

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    if (document.readyState === 'complete') {
        setTimeout(finish, remaining);
    } else {
        window.addEventListener('load', () => setTimeout(finish, remaining), { once: true });
        setTimeout(finish, minDuration + 750);
    }
})();