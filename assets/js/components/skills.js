/**
 * Render phần HTML hiển thị các kỹ năng (Section Skills) từ dữ liệu JSON.
 *
 * @async
 * @param       {string} [containerId='skills']           - ID của element container trong HTML.
 * @param       {string} [jsonUrl='/data/skills.json']    - Đường dẫn đến file JSON chứa dữ liệu skills.
 * @returns     {Promise<void>}                           - Không trả về giá trị, chỉ cập nhật DOM.
 * @throws      {Error}                                   - Throw when HTTP response status status !ok
 */
export async function renderSectionSkills(containerId = 'skills', jsonUrl = '/data/skills.json') {
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
        <h2 class="skills-title reveal">${data.title}</h2>
        <div class="skills-icon-grid reveal">
          ${skillsHTML}
        </div>
      </div>
    `;
}