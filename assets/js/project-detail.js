(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const project = projects.find((item) => item.id === id) || projects[0];
  const root = document.querySelector('[data-project-detail]');

  if (!root || !project) return;

  document.title = `${project.title} — Game Developer Portfolio`;

  if (project.pageBackground?.src) {
    root.classList.add('project-detail--themed');
    const backgroundSrc = /^https?:\/\//i.test(project.pageBackground.src)
      ? project.pageBackground.src
      : new URL(project.pageBackground.src, document.baseURI).href;
    root.style.setProperty('--project-page-background', `url("${backgroundSrc}")`);
    root.style.setProperty('--project-page-background-position', project.pageBackground.position || 'center top');
    root.style.setProperty('--project-page-background-size', project.pageBackground.size || 'cover');
    root.style.setProperty('--project-page-background-repeat', project.pageBackground.repeat || 'no-repeat');
    root.style.setProperty('--project-page-background-attachment', project.pageBackground.attachment || 'fixed');
    root.style.setProperty('--project-page-overlay', String(project.pageBackground.overlay ?? 0.84));
  }

  const imageFallback = project.imageFallback
    ? `onerror="this.onerror=null;this.src='${project.imageFallback}'"`
    : '';
  const imageCredit = project.imageCredit
    ? `<p class="project-image-credit">${project.imageCredit}</p>`
    : '';
  const statusRibbon = project.wip
    ? '<span class="project-status-ribbon" title="Work in progress">WIP</span>'
    : '';

  const links = (project.links || [])
    .map((link) => `<a class="button button--primary" href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${link.label}</a>`)
    .join('');

  const trailer = project.trailer?.youtubeId
    ? `
      <section class="project-trailer section-shell section-shell--bordered" data-reveal>
        <div class="project-trailer__heading">
          <p class="section-kicker">Watch</p>
          <h2>${project.trailer.sectionTitle || 'Official trailer'}</h2>
          <p>${project.trailer.description || 'See the game in action in the official announcement trailer.'}</p>
        </div>
        <div class="project-trailer__media">
          <div class="video-embed">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${project.trailer.youtubeId}?rel=0&playsinline=1"
              data-autoplay-trailer
              data-autoplay-src="https://www.youtube-nocookie.com/embed/${project.trailer.youtubeId}?rel=0&playsinline=1&autoplay=1"
              title="${project.trailer.title || `${project.title} trailer`}"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
          <a class="project-trailer__link" href="https://www.youtube.com/watch?v=${project.trailer.youtubeId}" target="_blank" rel="noreferrer noopener">Watch on YouTube ↗</a>
        </div>
      </section>`
    : '';

  const gallery = project.gallery?.length
    ? `
      <section class="project-gallery section-shell" data-reveal>
        <div class="project-gallery__heading">
          <p class="section-kicker">Gallery</p>
          <h2>Inside the game</h2>
        </div>
        <div class="project-gallery__grid">
          ${project.gallery.map((item, index) => `
            <figure class="project-gallery__item${index === 0 ? ' project-gallery__item--feature' : ''}">
              <a href="${item.src}" target="_blank" rel="noreferrer noopener" aria-label="Open full-size image: ${item.alt}">
                <img src="${item.src}" alt="${item.alt}" loading="lazy" referrerpolicy="no-referrer" ${project.imageFallback ? `onerror="this.onerror=null;this.src='${project.imageFallback}'"` : ''}>
              </a>
              <figcaption>${item.caption}</figcaption>
            </figure>`).join('')}
        </div>
        ${project.galleryCredit ? `<p class="project-gallery__credit">${project.gallerySource ? `<a href="${project.gallerySource}" target="_blank" rel="noreferrer noopener">${project.galleryCredit} ↗</a>` : project.galleryCredit}</p>` : ''}
      </section>`
    : '';

  const sectionVisual = (visual) => visual?.src
    ? `<figure class="detail-section-visual">
        <img src="${visual.src}" alt="${visual.alt || ''}" loading="lazy" referrerpolicy="no-referrer" ${project.imageFallback ? `onerror="this.onerror=null;this.src='${project.imageFallback}'"` : ''}>
        ${visual.caption ? `<figcaption>${visual.caption}</figcaption>` : ''}
      </figure>`
    : '';

  const overviewVisual = sectionVisual(project.sectionVisuals?.overview);
  const contributionVisual = sectionVisual(project.sectionVisuals?.contribution);
  const isProfessionalProject = project.category === 'professional-games';
  const featureItems = isProfessionalProject
    ? (project.contributions || [])
    : (project.keyFeatures || project.contributions || []);
  const featureKicker = isProfessionalProject ? 'Contribution' : 'Highlights';
  const featureHeading = isProfessionalProject ? 'What I worked on' : 'Key Features';

  root.innerHTML = `
    <header class="project-detail__header">
      <div class="project-detail__intro" data-reveal>
        <a class="back-link" href="../#projects">← All projects</a>
        <p class="eyebrow">${project.categoryLabel}${project.year ? ` <span aria-hidden="true">/</span> ${project.year}` : ''}</p>
        <h1>${project.title}</h1>
        <p class="project-detail__lede">${project.summary}</p>
        <div class="project-detail__meta">
          <div><span>Role</span><strong>${project.role || '—'}</strong></div>
          <div><span>Technologies</span><strong>${(project.technologies || project.tech || []).join(' · ') || '—'}</strong></div>
          <div><span>Focus</span><strong>${project.focus || '—'}</strong></div>
        </div>
      </div>
      <div class="project-detail__media" data-reveal>
        <div class="project-cover">
          <img class="project-detail__hero${project.heroDisplay === 'contain' ? ' project-detail__hero--contain' : ''}" src="${project.image}" alt="Project artwork for ${project.title}" referrerpolicy="no-referrer" ${imageFallback}>
          ${statusRibbon}
        </div>
        ${imageCredit}
      </div>
    </header>

    <section class="detail-grid${overviewVisual ? ' detail-grid--illustrated' : ''} section-shell">
      <div data-reveal>
        <p class="section-kicker">Overview</p>
        <h2>About the project</h2>
        ${overviewVisual}
      </div>
      <div class="prose" data-reveal>
        <p>${project.overview}</p>
      </div>
    </section>

    <section class="detail-grid${contributionVisual ? ' detail-grid--illustrated' : ''} section-shell section-shell--bordered">
      <div data-reveal>
        <p class="section-kicker">${featureKicker}</p>
        <h2>${featureHeading}</h2>
        ${contributionVisual}
      </div>
      <ul class="contribution-list" data-reveal>
        ${featureItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>

    ${trailer}

    ${gallery}

    ${links ? `
    <section class="project-cta section-shell" data-reveal>
      <div>
        <p class="section-kicker">Explore</p>
        <h2>Explore the implementation.</h2>
      </div>
      <div class="button-row">${links}</div>
    </section>` : ''}
  `;

  const autoplayTrailer = root.querySelector('[data-autoplay-trailer]');

  if (autoplayTrailer) {
    const trailerContainer = autoplayTrailer.closest('.video-embed') || autoplayTrailer;
    const autoplaySrc = autoplayTrailer.dataset.autoplaySrc;
    let hasStarted = false;

    const startTrailer = () => {
      if (hasStarted || !autoplaySrc) return;
      hasStarted = true;
      autoplayTrailer.src = autoplaySrc;
    };

    if ('IntersectionObserver' in window) {
      const trailerObserver = new IntersectionObserver((entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.45);
        if (!visibleEntry) return;

        startTrailer();
        trailerObserver.disconnect();
      }, {
        threshold: [0, 0.45, 0.75],
        rootMargin: '0px 0px -8% 0px'
      });

      trailerObserver.observe(trailerContainer);
    } else {
      startTrailer();
    }
  }

  root.querySelectorAll('[data-reveal]').forEach((item) => requestAnimationFrame(() => item.classList.add('is-visible')));
})();
