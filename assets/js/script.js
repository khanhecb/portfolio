// Load HTML Component
async function loadIncludes() {
    const includes = document.querySelectorAll("[data-include]");
    for (const element of includes) {
        try {
            const response = await fetch(element.dataset.include);
            if (response.ok) {
                element.outerHTML = await response.text();
            }
        } catch (error) {
            console.error(`Lỗi khi load ${element.dataset.include}:`, error);
        }
    }
}

function animationScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 10;
    let ticking = false;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // 1. Nếu ở sát đỉnh trang (<= 50px), giữ header luôn hiện và xóa shadow
        if (currentScrollY <= 50) {
            header.classList.remove('header-hidden', 'header-scrolled');
            lastScrollY = currentScrollY;
            ticking = false;
            return;
        }

        // Thêm hiệu ứng shadow khi cuộn xuống xa đỉnh trang
        header.classList.add('header-scrolled');

        // Kiểm tra khoảng cách cuộn vượt threshold mới xử lý
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


async function renderSectionProject(dataFile = './data/projects.json', containerId = 'projects') {
    // Check DoOM Container
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`DOM ID not found #${containerId}`);
        return;
    }

    // Fetch dữ liệu & kiểm tra HTTP status
    const response = await fetch(dataFile);
    if (!response.ok) {
        console.warn(`File data not found or error loading: ${dataFile} (Status: ${response.status})`);
        return;
    }

    // Parse dữ liệu JSON
    const projects = await response.json();
    if (!Array.isArray(projects)) {
        console.warn(`Data format error: Expected an array in ${dataFile}`);
        return;
    }

    const projectItemsHTML = projects.map(({ title, description, githubUrl, siteUrl, platforms, technologies }) => {
        const hasGithubUrl = Boolean(githubUrl);
        const hasSiteUrl = Boolean(siteUrl);

        // Render tags
        const technologiesTagHTML = Array.isArray(technologies)
            ? technologies.map(tech => `<li class="project-tag">${tech}</li>`).join('')
            : '';

        // Bọc HTML trong Template String (dấu backtick) và sửa className -> class
        const githubHTML = hasGithubUrl
            ? `<div class="project-icon">
                    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                            <path d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"/>
                        </svg>
                    </a>
                   </div>`
            : '';

        const siteHTML = hasSiteUrl
            ? `<div class="project-icon">
                        <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="View Website">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                <path d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"/>
                            </svg>
                       </a>
                    </div>`
            : '';

        const platformTagHTML = Array.isArray(platforms)
            ? platforms.map(platform => `<li class="project-platform-item">${platform}</li>`).join('')
            : '';

        return `
                <li class="project-card">
                    <div class="project-inner">
                        <div class="project-header">
                            <div class="project-feature">
                                <a href="${siteUrl}" target="_blank" class="project-feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="60" height="60">
                                        <path d="M128 464L512 464C520.8 464 528 456.8 528 448L528 208C528 199.2 520.8 192 512 192L362.7 192C345.4 192 328.5 186.4 314.7 176L276.3 147.2C273.5 145.1 270.2 144 266.7 144L128 144C119.2 144 112 151.2 112 160L112 448C112 456.8 119.2 464 128 464zM512 512L128 512C92.7 512 64 483.3 64 448L64 160C64 124.7 92.7 96 128 96L266.7 96C280.5 96 294 100.5 305.1 108.8L343.5 137.6C349 141.8 355.8 144 362.7 144L512 144C547.3 144 576 172.7 576 208L576 448C576 483.3 547.3 512 512 512z"/>
                                    </svg>
                                </a>
                            </div>

                            <div class="project-actions">
                                ${githubHTML}
                                ${siteHTML}
                            </div>
                        </div>

                        <div class="project-body">
                            <h3 class="project-title">${title}</h3>
                            <ul class="project-platforms">
                                ${platformTagHTML}
                            </ul>
                            <p class="project-description">${description || ''}</p>
                        </div>
                        <div class="project-footer">
                            <ul class="project-tags">
                                ${technologiesTagHTML}
                            </ul>
                        </div>
                    </div>
                </li>
            `;
    }).join('');

    // 5. Bọc toàn bộ các <li> vào <ul> duy nhất
    container.innerHTML = `
            <div class="projects-container">
                <h2 class="projects-title">Projects</h2>
                <ul class="projects-list">
                    ${projectItemsHTML}
                </ul>
            </div>
        `;
}

/**
 * Render phần HTML hiển thị các kỹ năng (Section Skills) từ dữ liệu JSON.
 *
 * @async
 * @param {string} [containerId='skills'] - ID của element container trong HTML.
 * @param {string} [jsonUrl='/data/skills.json'] - Đường dẫn đến file JSON chứa dữ liệu skills.
 * @returns {Promise<void>} Không trả về giá trị, chỉ cập nhật DOM.
 * @throws {Error} Quăng ra lỗi nếu việc fetch dữ liệu không thành công (HTTP response status status !ok).
 */
async function renderSectionSkills(containerId = 'skills', jsonUrl = '/data/skills.json') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get JSON data
    const response = await fetch(jsonUrl);
    if (!response.ok) {
        throw new Error(`Status Error! Status: ${response.status}`);
    }

    // Wait JSON data
    const data = await response.json();

    // Render
    const skillsHTML = data.skills.map(skill => `
                <div class="skill-grid-item ${skill.slug}">
                  <i class="${skill.iconClass}"></i>
                  <span>${skill.name}</span>
                </div>
              `)
        .join('');

    // Render HTML
    container.innerHTML = `
      <div class="skills-grid-container">
        <h2 class="skills-title">${data.title}</h2>
        <div class="skills-icon-grid">
          ${skillsHTML}
        </div>
      </div>
    `;
}

async function initApp() {
    await loadIncludes();
    renderSectionProject();
    renderSectionSkills();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animationScrollHeader);
    } else {
        animationScrollHeader();
    }
}

document.addEventListener('DOMContentLoaded', initApp);




