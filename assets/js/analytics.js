(() => {
  const pendingEvents = [];

  const sendEvent = (name, data = {}) => {
    if (!name) return;

    if (window.umami && typeof window.umami.track === 'function') {
      try {
        // Deliberately do not await the Promise. Navigation must never wait for analytics.
        window.umami.track(name, data);
      } catch (_) {
        // Analytics must never affect the website experience.
      }
      return;
    }

    pendingEvents.push([name, data]);
  };

  const flushPendingEvents = () => {
    if (!window.umami || typeof window.umami.track !== 'function') return;

    while (pendingEvents.length) {
      const [name, data] = pendingEvents.shift();
      try {
        window.umami.track(name, data);
      } catch (_) {
        // Ignore analytics failures.
      }
    }
  };

  window.trackPortfolioEvent = sendEvent;

  // Umami is loaded with defer; these are only fallbacks for unusually slow loads.
  window.addEventListener('load', flushPendingEvents, { once: true });
  setTimeout(flushPendingEvents, 500);
  setTimeout(flushPendingEvents, 2000);

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    // Project repository links are explicitly marked by project-detail.js.
    if (link.dataset.projectRepo) {
      sendEvent(`${link.dataset.projectRepo} repo visited`);
      return;
    }

    // CV downloads. Only actual download buttons count.
    if (link.hasAttribute('download')) {
      const href = link.getAttribute('href') || '';
      if (/\.pdf(?:$|[?#])/i.test(href)) {
        sendEvent('CV download', { format: 'PDF' });
        return;
      }
      if (/\.docx?(?:$|[?#])/i.test(href)) {
        sendEvent('CV download', { format: 'Word' });
        return;
      }
    }

    // Global GitHub profile links.
    if (link.dataset.socialLink === 'github') {
      sendEvent('GitHub profile');
      return;
    }

    // Global LinkedIn links, including the recommendation link.
    if (link.dataset.socialLink === 'linkedin') {
      sendEvent('LinkedIn profile');
      return;
    }

    try {
      const destination = new URL(link.href, window.location.href);
      if (
        destination.hostname === 'www.linkedin.com' &&
        destination.pathname.startsWith('/in/alex-seidel-74ab45280')
      ) {
        sendEvent('LinkedIn profile');
      }
    } catch (_) {
      // Ignore malformed/non-HTTP links.
    }
  }, { capture: true });
})();
