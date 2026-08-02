async function loadIncludes() {
    const includes = document.querySelectorAll("[data-include]");

    for (const element of includes) {
        const response = await fetch(element.dataset.include);

        if (response.ok) {
            element.outerHTML = await response.text();
        }
    }
}

loadIncludes();