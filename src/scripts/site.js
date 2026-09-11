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
