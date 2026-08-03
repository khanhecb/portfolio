// Render Layout Projects
async function renderProjects(dataFile = './data/projects.json', containerId = 'projects-records') {
    try {

        // Get JSON data
        const response = await fetch(dataFile);

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const projectsData = await response.json();

        // Check Container existed
        const tbody = document.getElementById(containerId);

        if (!tbody) {
            console.warn(`Not Found #${containerId} in DOM`);
            return;
        }

        // Render HTML
        tbody.innerHTML = projectsData.map(({ name, url, year, tags }) => {
            const hasUrl = Boolean(url);

            const nameColumn = hasUrl 
                ? `<td><a class="text-color-primary" href="${url}" target="_blank" rel="noopener">${name}</a></td>`
                : `<td class="text-color-primary">${name}</td>`;

            const linkColumn = hasUrl 
                ? `<td class="hide-on-mobile"><a href="${url}" target="_blank" rel="noopener">${url}</a></td>`
                : `<td class="hide-on-mobile"></td>`;

            const tagsHTML = Array.isArray(tags) 
                ? tags.map(tag => `<span class="tag-item">${tag}</span>`).join('')
                : '';

            return `
                <tr>
                    <td class="text-color-second">${year}</td>
                    ${nameColumn}
                    ${linkColumn}
                    <td class="tags flex flex-wrap hide-on-mobile">${tagsHTML}</td>
                </tr>
            `;
        }).join('');

    } catch (error) {
        console.error("Error: Error when render HTML Projects Layout: ", error);
    }
}

async function renderLayoutSkills(dataFile = './data/skills.json', containerId = 'skills') {

    try {
        const response = await fetch(dataFile);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const skillsJson = await response.json();

        // Check container DOM
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`DOM ID not found #${containerId}`);
            return;
        }

    } catch (error){
        console.error("File not found", error);
    }
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
    renderLayoutSkills();
}

document.addEventListener('DOMContentLoaded', initApp);

