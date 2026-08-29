(() => {
  // Replace these two placeholder URLs with Alex's exact profile addresses.
  const socialUrls = {
    github: 'https://github.com/Flixiefloxam',
    linkedin: 'https://www.linkedin.com/in/alex-seidel-74ab45280',
  };

  document.querySelectorAll('[data-social-link]').forEach((link) => {
    const network = link.dataset.socialLink;
    if (socialUrls[network]) link.href = socialUrls[network];
  });

  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const projects = window.PORTFOLIO_PROJECTS || [];
  if (projects.length) {
    const projectById = new Map(projects.map((project) => [project.id, project]));

    document.querySelectorAll('[data-project-id]').forEach((element) => {
      const project = projectById.get(element.dataset.projectId);
      if (!project?.wip || element.querySelector('.project-status-ribbon')) return;

      const ribbon = document.createElement('span');
      ribbon.className = 'project-status-ribbon';
      ribbon.textContent = 'WIP';
      ribbon.title = 'Work in progress';
      element.appendChild(ribbon);
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const scrollIndicator = document.querySelector('[data-scroll-indicator]');
  if (scrollIndicator) {
    const updateScrollIndicator = () => {
      scrollIndicator.classList.toggle('is-hidden', window.scrollY > 80);
    };

    scrollIndicator.addEventListener('click', () => scrollIndicator.classList.add('is-hidden'));
    window.addEventListener('scroll', updateScrollIndicator, { passive: true });
    updateScrollIndicator();
  }

  const hero = document.querySelector('[data-parallax]');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.16, 80);
      hero.style.setProperty('--parallax-y', `${offset}px`);
    }, { passive: true });
  }
})();
