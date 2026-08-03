/** 
 * TÊN FILE: main.js
 * CHỨC NĂNG: Load Component HTML, Quản lý Dữ liệu và Render Giao diện
 */

// ==========================================
// PHẦN 1: DỮ LIỆU (DATA)
// ==========================================
const projectsData = [
    {
        year: "2025 - Now",
        name: "Bảo trì",
        url: "",
        tags: ["Cpanel", "SSH", "Maintain", "Migrate", "Deploy", "Backup", "Error", "Web Mail", "DNS"]
    },
    {
        year: "2026",
        name: "GuangNa Furniture",
        url: "https://guangnafurniture.com",
        tags: ["Flatsome", "Woocommerce", "Cloudflare", "HTML & CSS", "PHP + ACF"]
    },
    {
        year: "2026",
        name: "CPAP - Bpharm",
        url: "https://cpap.com.vn",
        tags: ["Flatsome", "Woocommerce", "Cloudflare", "HTML & CSS & JS", "Redis"]
    },
    {
        year: "2026",
        name: "Trutech",
        url: "https://trutech-mfg.com.vn/",
        tags: ["Ainexa", "Elementor", "HTML/CSS/JS", "Light/Dark Mode"]
    },
    {
        year: "2026",
        name: "Danh Ca Minh Cảnh",
        url: "https://danhcaminhcanh.com",
        tags: ["Gutenberg", "Woocommerce", "Python", "GG Sheet", "Telegram", "Sepay"]
    },
    {
        year: "2026",
        name: "Nguyễn Hải Media",
        url: "https://nguyenhaimedia.com",
        tags: ["FSE", "Gutenberg", "ACF"]
    },
    {
        year: "2025",
        name: "Cricket Fashion",
        url: "https://cricketfashion.vn/",
        tags: ["Elementor", "Theme The7"]
    },
    {
        year: "2026",
        name: "LandingPage mua vé",
        url: "https://intwomencelebration.org/ticker-2026/",
        tags: ["Paypal", "Forminator"]
    },
    {
        year: "2025",
        name: "Form đăng ký khám bệnh",
        url: "https://sleepfi.vn/",
        tags: ["Forminator", "GG Sheet Script", "Email SMTP", "PHP"]
    }
];



// Load 
function renderProjects() {
    const tbody = document.getElementById('projects-tbody');
    if (!tbody) {
        console.warn("Chưa tìm thấy #projects-tbody trong DOM");
        return;
    }

    tbody.innerHTML = projectsData.map(project => {
        const nameColumn = project.url 
            ? `<td><a class="text-color-primary" href="${project.url}" target="_blank" rel="noopener">${project.name}</a></td>`
            : `<td class="text-color-primary">${project.name}</td>`;

        const linkColumn = project.url 
            ? `<td class="hide-on-mobile"><a href="${project.url}" target="_blank" rel="noopener">${project.url}</a></td>`
            : `<td class="hide-on-mobile"></td>`;

        const tagsHTML = project.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');

        return `
            <tr>
                <td class="text-color-second">${project.year}</td>
                ${nameColumn}
                ${linkColumn}
                <td class="tags flex flex-wrap hide-on-mobile">${tagsHTML}</td>
            </tr>
        `;
    }).join('');
}

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


async function initApp() {
    await loadIncludes();
    renderProjects();
}

document.addEventListener('DOMContentLoaded', initApp);