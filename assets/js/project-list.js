(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const containers = document.querySelectorAll('[data-project-list]');

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  containers.forEach((container) => {
    const category = container.dataset.projectList;
    const items = projects.filter((project) => project.category === category);

    container.innerHTML = items.map((project, index) => {
      const fallback = project.imageFallback
        ? `onerror="this.onerror=null;this.src='${escapeHtml(project.imageFallback)}'"`
        : '';
      const statusRibbon = project.wip
        ? '<span class="project-status-ribbon" title="Work in progress">WIP</span>'
        : '';

      return `
      <article class="project-row ${index % 2 ? 'project-row--reverse' : ''}" data-reveal>
        <a class="project-row__media" href="project/?id=${encodeURIComponent(project.id)}" aria-label="Read more about ${escapeHtml(project.title)}">
          <img src="${escapeHtml(project.image)}" alt="Project artwork for ${escapeHtml(project.title)}" loading="lazy" referrerpolicy="no-referrer" ${fallback}>
          ${statusRibbon}
        </a>
        <div class="project-row__content">
          <p class="eyebrow">${escapeHtml(project.role)}${project.year ? ` <span aria-hidden="true">/</span> ${escapeHtml(project.year)}` : ''}</p>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <div class="tag-list" aria-label="Technologies">
            ${project.tech.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
          </div>
          <a class="button button--primary project-row__button" href="project/?id=${encodeURIComponent(project.id)}">View project <span aria-hidden="true">↗</span></a>
        </div>
      </article>
      `;
    }).join('');
  });
})();
