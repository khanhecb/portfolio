export async function renderSectionJourney(
    config = "./data/journey.json",
    containerId = "journey")
{
    // Init
    let html = ``

    // Check ID
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Could not find container with id '" + containerId + "'");
        return html;
    }

    // Fetch HTTP Status
    const response = await fetch(config);

    if (!response.ok) {
        console.error("Not found response: " + response.statusText);
        throw new Error("Invalid journey data format");
    }

    // Parse JSON
    const journey = await response.json();
    if (!journey) {
        console.error("Could not find journey");
        return html;
    }

    // Render Button
    const renderTabButton = journey.map((item, index) => {
        const activeClass = index === 0 ? " active" : "";
        const targetId = `tab-${index}`;
        return `<button class="tab btn-tab ${activeClass}" data-target="${targetId}">${item.time}</button>`
    }).join("");

    // Render
    const renderContent = journey.map((item, index) => {
        const activeClass = index === 0 ? " active" : "";
        const targetId = `tab-${index}`;
        let listDescription = ``
        let listTags = ``

        if (Array.isArray(item.description)) {
            item.description.map((description) => {
                listDescription += `<li class="content-item">${description}</li>`
            });
        }

        if (Array.isArray(item.tags)) {
            item.tags.map((tag) => {
                listTags += `<li class="tag">${tag}</li>`
            })
        }

        return `
        <div class="tab-content ${activeClass}" id="${targetId}">
                <div class="tab-content-header">
                    <h3>${item.title}</h3>
                </div>
                <div class="tab-content-body">
                    <ul class="content-list">${listDescription}</ul>
                </div>
                <div class="tab-content-footer">
                    <ul class="tags">
                        ${listTags}
                    </ul>
                </div>
        </div>
        `
    }).join("");

    html = `        
        <div class="component-tabs" role="tablist" aria-label="Developer journey">
            <div class="tabs journey-year-area">
                ${renderTabButton}
            </div>
    
            <div class="content-area journey-content-area">
                <div class="content-area-inner">
                    ${renderContent}
                </div>
            </div>
        </div>
    `
    container.innerHTML = html;
    setupTabEvents(container);
}


function setupTabEvents(container) {
    const tabsContainer = container.querySelector(".component-tabs");
    if (!tabsContainer) return;

    tabsContainer.addEventListener("click", (event) => {
        const clickedBtn = event.target.closest(".btn-tab");
        if (!clickedBtn) return; // Nếu click không trúng nút tab thì bỏ qua

        const targetId = clickedBtn.getAttribute("data-target");

        // Xóa class active của tất cả buttons & tab-content trong container
        container.querySelectorAll(".btn-tab").forEach(btn => btn.classList.remove("active"));
        container.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

        // Kích hoạt active cho Button & Content tương ứng
        clickedBtn.classList.add("active");
        const targetContent = container.querySelector(`#${targetId}`);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    });
}