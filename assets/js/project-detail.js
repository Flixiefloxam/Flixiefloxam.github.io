(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const project = projects.find((item) => item.id === id) || projects[0];
  const root = document.querySelector('[data-project-detail]');

  if (!root || !project) return;

  // Track the specific project that was actually rendered. The analytics
  // helper sends/queues this asynchronously and never blocks page rendering.
  if (typeof window.trackPortfolioEvent === 'function') {
    window.trackPortfolioEvent(`${project.title} page visited`);
  }

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
    .map((link) => {
      const isGitHubRepo = /^https?:\/\/(?:www\.)?github\.com\//i.test(link.url);
      const analyticsAttribute = isGitHubRepo
        ? `data-project-repo="${project.title}"`
        : '';

      return `<a class="button button--primary" href="${link.url}" ${link.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} ${analyticsAttribute}>${link.label}</a>`;
    })
    .join('');

  const hasTrailer = Boolean(project.trailer?.youtubeId);
  const trailerLabel = project.trailer?.sectionTitle || 'Official trailer';
  const technologies = project.technologies || project.tech || [];

  const studioMeta = project.studio
    ? `<div class="project-meta__studio">
        <span>Studio</span>
        ${project.studioLogo?.src
          ? `<img class="project-meta__logo project-meta__logo--studio" src="${project.studioLogo.src}" alt="${project.studioLogo.alt || project.studio}" title="${project.studioLogo.alt || project.studio}" loading="eager" referrerpolicy="no-referrer">`
          : `<strong>${project.studio}</strong>`}
      </div>`
    : '';

  const publisherMeta = project.publisher
    ? `<div class="project-meta__publisher">
        <span>Publisher</span>
        ${project.publisherLogo?.src
          ? `<img class="project-meta__logo project-meta__logo--publisher" src="${project.publisherLogo.src}" alt="${project.publisherLogo.alt || project.publisher}" title="${project.publisherLogo.alt || project.publisher}" loading="eager" referrerpolicy="no-referrer">`
          : `<strong>${project.publisher}</strong>`}
      </div>`
    : '';

  const technologyLogoEntries = technologies
    .map((technology) => project.technologyLogos?.[technology])
    .filter(Boolean);

  const technologiesMeta = `
    <div class="project-meta__technologies">
      <span>Technologies</span>
      ${technologyLogoEntries.length === technologies.length && technologyLogoEntries.length
        ? `<div class="project-meta__technology-logos">
            ${technologyLogoEntries.map((logo) => `<img class="project-meta__logo project-meta__logo--technology" src="${logo.src}" alt="${logo.alt || 'Technology logo'}" title="${logo.alt || 'Technology'}" loading="eager" referrerpolicy="no-referrer">`).join('')}
          </div>`
        : `<strong>${technologies.join(' · ') || '—'}</strong>`}
    </div>`;

  const roleMeta = project.role
    ? `<div class="project-meta__role"><span>Role</span><strong>${project.role}</strong></div>`
    : '';
  const focusMeta = project.focus
    ? `<div class="project-meta__focus"><span>Focus</span><strong>${project.focus}</strong></div>`
    : '';

  const orderedMetaItems = [
    studioMeta,
    publisherMeta,
    technologiesMeta,
    roleMeta,
    focusMeta
  ].filter(Boolean);

  const orderedMeta = orderedMetaItems.join('');
  const metaCount = orderedMetaItems.length;

  const publisherTitleLogo = project.publisherLogo?.src
    ? `<img class="project-title-lockup__publisher-logo" src="${project.publisherLogo.src}" alt="${project.publisherLogo.alt || project.publisher || 'Publisher logo'}" loading="eager" referrerpolicy="no-referrer">`
    : '';
  const trailerMedia = hasTrailer
    ? `
      <div class="project-detail__video-frame">
        <div class="video-embed">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${project.trailer.youtubeId}?rel=0&playsinline=1&enablejsapi=1"
            data-autoplay-trailer
            data-autoplay-src="https://www.youtube-nocookie.com/embed/${project.trailer.youtubeId}?rel=0&playsinline=1&autoplay=1&enablejsapi=1"
            title="${project.trailer.title || `${project.title} trailer`}"
            loading="eager"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
        ${statusRibbon}
      </div>
      <div class="project-detail__video-caption">
        <span>${trailerLabel}</span>
        <a href="https://www.youtube.com/watch?v=${project.trailer.youtubeId}" target="_blank" rel="noreferrer noopener">Watch on YouTube ↗</a>
      </div>`
    : '';

  const gallery = project.gallery?.length
    ? `
      <section class="project-gallery${project.compactGallery ? ' project-gallery--compact' : ''} section-shell" data-reveal>
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

  const storySection = (section) => {
    const hasBody = (section?.body || []).length > 0;
    const hasItems = (section?.items || []).length > 0;
    if (!section?.title || (!hasBody && !hasItems)) return '';

    const visual = section.visual?.src
      ? `
        <figure class="${section.layout === 'reflection' ? 'project-reflection__visual' : 'project-story__visual'}">
          <img src="${section.visual.src}" alt="${section.visual.alt || ''}" loading="lazy" referrerpolicy="no-referrer">
          ${section.visual.caption ? `<figcaption>${section.visual.caption}</figcaption>` : ''}
        </figure>`
      : '';

    if (section.layout === 'points') {
      return `
        <section class="project-story project-story--points${visual ? '' : ' project-story--no-visual'} section-shell section-shell--bordered" data-reveal>
          <div class="project-story__heading">
            <p class="section-kicker">${section.kicker || 'Perspective'}</p>
            <h2>${section.title}</h2>
          </div>
          <ul class="story-point-list">
            ${(section.items || []).map((item) => `<li>${item}</li>`).join('')}
          </ul>
          ${visual}
        </section>`;
    }

    if (section.layout === 'reflection') {
      const mainParagraphs = section.body.slice(0, -1);
      const takeaway = section.body[section.body.length - 1];

      return `
        <section class="project-reflection section-shell section-shell--bordered" data-reveal>
          <div class="project-reflection__heading">
            <p class="section-kicker">${section.kicker || 'Reflection'}</p>
            <h2>${section.title}</h2>
          </div>
          <div class="project-reflection__body">
            ${mainParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
          </div>
          ${visual}
          <div class="project-reflection__takeaway">
            <p>${takeaway}</p>
          </div>
        </section>`;
    }

    return `
      <section class="project-story${section.columns ? ' project-story--columns' : ''} section-shell section-shell--bordered" data-reveal>
        <div class="project-story__heading">
          <p class="section-kicker">${section.kicker || 'Perspective'}</p>
          <h2>${section.title}</h2>
        </div>
        <div class="project-story__body">
          ${(section.body || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
        ${visual}
      </section>`;
  };

  const storySections = project.storySections || [];
  const storyBeforeFeatures = storySections
    .filter((section) => section.position === 'before-features')
    .map(storySection)
    .join('');
  const storyAfterFeatures = storySections
    .filter((section) => section.position !== 'before-features')
    .map(storySection)
    .join('');

  const standardHeader = `
    <header class="project-detail__header${project.compactDetailSections ? ' project-detail__header--compact' : ''}">
      <div class="project-detail__intro" data-reveal>
        <a class="back-link" href="../#projects">← All projects</a>
        <p class="eyebrow">${project.categoryLabel}${project.year ? ` <span aria-hidden="true">/</span> ${project.year}` : ''}</p>
        <h1>${project.title}</h1>
        <p class="project-detail__lede">${project.summary}</p>
        ${project.summaryNote ? `<p class="project-detail__lede project-detail__lede--note"><strong>${project.summaryNote}</strong></p>` : ''}
      </div>
      <div class="project-detail__media" data-reveal>
        <div class="project-cover">
          <img class="project-detail__hero${project.heroDisplay === 'contain' ? ' project-detail__hero--contain' : ''}" src="${project.image}" alt="Project artwork for ${project.title}" referrerpolicy="no-referrer" ${imageFallback}>
          ${statusRibbon}
        </div>
        ${imageCredit}
      </div>
      <div class="project-detail__meta project-detail__meta--facts" style="--project-meta-count:${metaCount}" data-reveal>
        ${orderedMeta}
      </div>
    </header>`;

  const videoHeader = `
    <header class="project-detail__header project-detail__header--video">
      <a class="back-link project-detail__back" href="../#projects" data-reveal>← All projects</a>

      <div class="project-detail__intro project-detail__intro--video" data-reveal>
        <p class="eyebrow">${project.categoryLabel}${project.year ? ` <span aria-hidden="true">/</span> ${project.year}` : ''}</p>
        <div class="project-title-lockup${publisherTitleLogo ? ' project-title-lockup--with-publisher' : ''}">
          <h1>${project.title}</h1>
          ${publisherTitleLogo}
        </div>
        <p class="project-detail__lede">${project.summary}</p>
        ${project.summaryNote ? `<p class="project-detail__lede project-detail__lede--note"><strong>${project.summaryNote}</strong></p>` : ''}
      </div>

      <div class="project-detail__media project-detail__media--video" data-reveal>
        ${trailerMedia}
      </div>

      <div class="project-detail__meta project-detail__meta--video project-detail__meta--facts" style="--project-meta-count:${metaCount}" data-reveal>
        ${orderedMeta}
      </div>
    </header>`;

  root.innerHTML = `
    ${hasTrailer ? videoHeader : standardHeader}

    ${project.compactDetailSections ? `
    <section class="project-story project-story--overview${project.sectionVisuals?.overview?.src ? '' : ' project-story--no-visual'} section-shell" data-reveal>
      <div class="project-story__heading">
        <p class="section-kicker">Overview</p>
        <h2>About the project</h2>
      </div>
      <div class="project-story__body project-story__body--overview">
        <p>${project.overview}</p>
      </div>
      ${project.sectionVisuals?.overview?.src ? `
        <figure class="project-story__visual project-story__visual--overview">
          <img src="${project.sectionVisuals.overview.src}" alt="${project.sectionVisuals.overview.alt || ''}" loading="lazy" referrerpolicy="no-referrer">
          ${project.sectionVisuals.overview.caption ? `<figcaption>${project.sectionVisuals.overview.caption}</figcaption>` : ''}
        </figure>` : ''}
    </section>` : `
    <section class="detail-grid${overviewVisual ? ' detail-grid--illustrated' : ''} section-shell">
      <div data-reveal>
        <p class="section-kicker">Overview</p>
        <h2>About the project</h2>
        ${overviewVisual}
      </div>
      <div class="prose" data-reveal>
        <p>${project.overview}</p>
      </div>
    </section>`}

    ${storyBeforeFeatures}

    ${project.compactDetailSections ? `
    <section class="project-story project-story--features${project.sectionVisuals?.contribution?.src ? '' : ' project-story--no-visual'} section-shell section-shell--bordered" data-reveal>
      <div class="project-story__heading">
        <p class="section-kicker">${featureKicker}</p>
        <h2>${featureHeading}</h2>
      </div>
      <ul class="contribution-list project-story__contributions">
        ${featureItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      ${project.sectionVisuals?.contribution?.src ? `
        <figure class="project-story__visual project-story__visual--features">
          <img src="${project.sectionVisuals.contribution.src}" alt="${project.sectionVisuals.contribution.alt || ''}" loading="lazy" referrerpolicy="no-referrer">
          ${project.sectionVisuals.contribution.caption ? `<figcaption>${project.sectionVisuals.contribution.caption}</figcaption>` : ''}
        </figure>` : ''}
    </section>` : `
    <section class="detail-grid${contributionVisual ? ' detail-grid--illustrated' : ''} section-shell section-shell--bordered">
      <div data-reveal>
        <p class="section-kicker">${featureKicker}</p>
        <h2>${featureHeading}</h2>
        ${contributionVisual}
      </div>
      <ul class="contribution-list" data-reveal>
        ${featureItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>`}

    ${storyAfterFeatures}

    ${gallery}

    ${links ? `
    <section class="project-cta${project.compactDetailSections ? ' project-cta--compact' : ''} section-shell" data-reveal>
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
    let hasTrackedPlayback = false;
    let youtubePlayer = null;

    const trackPlayback = () => {
      if (hasTrackedPlayback) return;
      hasTrackedPlayback = true;

      if (typeof window.trackPortfolioEvent === 'function') {
        window.trackPortfolioEvent(`${project.title} video played`);
      }
    };

    const createYouTubePlayer = () => {
      if (youtubePlayer || !window.YT || typeof window.YT.Player !== 'function') return;

      try {
        youtubePlayer = new window.YT.Player(autoplayTrailer, {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                trackPlayback();
              }
            }
          }
        });
      } catch (_) {
        // Video playback must remain unaffected if analytics setup fails.
      }
    };

    const loadYouTubeApi = () => {
      if (window.YT && typeof window.YT.Player === 'function') {
        createYouTubePlayer();
        return;
      }

      const previousReadyHandler = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousReadyHandler === 'function') previousReadyHandler();
        createYouTubePlayer();
      };

      if (!document.querySelector('script[data-youtube-iframe-api]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.dataset.youtubeIframeApi = '';
        document.head.appendChild(script);
      }
    };

    const startTrailer = () => {
      if (hasStarted || !autoplaySrc) return;
      hasStarted = true;

      autoplayTrailer.addEventListener('load', loadYouTubeApi, { once: true });
      autoplayTrailer.src = autoplaySrc;

      // If the iframe was already ready/cached, this is harmless.
      loadYouTubeApi();
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
