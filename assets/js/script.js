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
        tbody.innerHTML = projectsData.map(({ name, url, year, github, tags }) => {
            const hasUrl = Boolean(url);
            const hasGithub = Boolean(github);


            const nameColumn = hasUrl 
                ? `<td><a class="text-color-primary" href="${url}" target="_blank" rel="noopener">${name}</a></td>`
                : `<td class="text-color-primary">${name}</td>`;

            const linkColumn = hasUrl 
                ? `<td class="hide-on-mobile"><a href="${url}" target="_blank" rel="noopener">URL</a></td>`
                : `<td class="hide-on-mobile"></td>`;
            
            const githubColumn = hasGithub 
                ? `<td class="hide-on-mobile"><a href="${github}" target="_blank" rel="noopener">Github</a></td>`
                : `<td class="hide-on-mobile"></td>`;


            const tagsHTML = Array.isArray(tags) 
                ? tags.map(tag => `<span class="tag-item">${tag}</span>`).join('')
                : '';

            return `
                <tr>
                    <td class="text-color-second">${year}</td>
                    ${nameColumn}
                    ${linkColumn}
                    ${githubColumn}
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

async function renderExpSection( dataFile = './data/exp.json', containerLayoutId = 'exp') {

    // Get Json data
    const response = await fetch( dataFile )

    if ( !response.ok ) {
        console.warn(`File data ${dataFile} not found` );
        return 
    }

    const expJson = await response.json();

    // Check container ID is exist
    const container = document.getElementById( containerLayoutId );

    if ( !container ) {
        console.warn(`Error: Container ID ${ containerLayoutId } not found `);
        return
    }

    // Render HTML
    const containerItems = expJson.map(( {date, title, description }) => {
        return `
            <div class="timeline-item">
                <div class="timeline-node"></div>
                <div class="timeline-card">
                    <div class="timeline-meta">
                        <span class="timeline-year">${date}</span>
                    </div>
                    <h3 class="timeline-title">${title}</h3>
                    <h4 class="desc">${description}</h3>
                </div>
            </div>
        `
    }).join('');

    container.innerHTML = `<div class="tech-timeline">${containerItems}</div>`

}



async function initApp() {
    await loadIncludes();
    renderProjects();
    renderLayoutSkills();
    renderExpSection();
}

document.addEventListener('DOMContentLoaded', initApp);

