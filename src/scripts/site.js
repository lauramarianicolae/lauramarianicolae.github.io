(() => {
  const bar = document.querySelector('[data-bar]');
  const heading = document.querySelector('.intro h1');

  if (bar && heading && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    }, { rootMargin: '-52px 0px 0px 0px' }).observe(heading);
  }

  const abstracts = [...document.querySelectorAll('details')];
  let wasOpen = [];
  window.addEventListener('beforeprint', () => {
    wasOpen = abstracts.map((d) => d.open);
    abstracts.forEach((d) => { d.open = true; });
  });
  window.addEventListener('afterprint', () => {
    abstracts.forEach((d, i) => { d.open = wasOpen[i]; });
  });

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  abstracts.forEach((details) => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('.abstract');
    if (!summary || !body || !body.animate) return;
    let running;
    summary.addEventListener('click', (event) => {
      if (calm.matches) return;
      event.preventDefault();
      const opening = !details.open || details.classList.contains('is-closing');
      const from = details.open ? body.getBoundingClientRect().height : 0;
      if (running) running.cancel();
      details.open = true;
      details.classList.toggle('is-closing', !opening);
      const to = opening ? body.scrollHeight : 0;
      running = body.animate(
        { height: [`${from}px`, `${to}px`], opacity: opening ? [from ? 1 : 0, 1] : [1, 0] },
        { duration: 300, easing: 'cubic-bezier(0.2, 0, 0.2, 1)' }
      );
      running.onfinish = () => {
        running = null;
        if (!opening) {
          details.open = false;
          details.classList.remove('is-closing');
        }
      };
    });
  });

  const status = document.querySelector('[data-copy-status]');

  if (navigator.clipboard) {
    document.querySelectorAll('[data-copy]').forEach((copy) => {
      copy.hidden = false;
      let timer;
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(copy.dataset.copy);
        } catch {
          return;
        }
        copy.classList.add('is-copied');
        if (status) status.textContent = 'Email address copied';
        clearTimeout(timer);
        timer = setTimeout(() => {
          copy.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 1600);
      });
    });
  }
})();
