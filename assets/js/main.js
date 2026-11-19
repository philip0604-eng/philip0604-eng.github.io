(() => {
  "use strict";
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }
  const grid = document.getElementById('paper-grid');
  if (!grid) return;
  const search = document.getElementById('paper-search');
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const sort = document.getElementById('sort-select');
  const empty = document.getElementById('empty-results');
  const counter = document.getElementById('result-count');
  const clear = document.getElementById('clear-search');
  const cards = Array.from(grid.querySelectorAll('.paper-card'));
  let active = 'All';
  const normalize = (s) => (s || '').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  function refresh(updateHistory = true) {
    const q = normalize(search.value);
    const terms = q.split(/\s+/).filter(Boolean);
    let matched = 0;
    cards.forEach(card => {
      const themeMatch = active === 'All' || card.dataset.theme === active;
      const haystack = normalize(card.dataset.search);
      const searchMatch = terms.every(term => haystack.includes(term));
      const visible = themeMatch && searchMatch;
      card.hidden = !visible;
      if (visible) matched++;
    });
    filters.forEach(btn => {
      const activeButton = btn.dataset.filter === active;
      btn.classList.toggle('is-active', activeButton);
      btn.setAttribute('aria-pressed', String(activeButton));
    });
    counter.textContent = matched === 40 ? 'Showing all 40 works' : `Showing ${matched} of 40 works`;
    empty.hidden = matched !== 0;
    if (updateHistory && ['http:', 'https:'].includes(window.location.protocol)) {
      const url = new URL(window.location.href);
      if (q) url.searchParams.set('q', search.value.trim()); else url.searchParams.delete('q');
      if (active !== 'All') url.searchParams.set('theme', active); else url.searchParams.delete('theme');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }
  filters.forEach(btn => btn.addEventListener('click', () => { active = btn.dataset.filter; refresh(); }));
  search.addEventListener('input', () => refresh());
  sort.addEventListener('change', () => {
    const method = sort.value;
    const ordered = [...cards].sort((a, b) => {
      if (method === 'pages') return Number.parseInt(b.querySelector('.muted-index').textContent) - Number.parseInt(a.querySelector('.muted-index').textContent);
      if (method === 'theme') return a.dataset.theme.localeCompare(b.dataset.theme) || a.dataset.name.localeCompare(b.dataset.name);
      return a.dataset.name.localeCompare(b.dataset.name);
    });
    ordered.forEach(node => grid.appendChild(node));
  });
  if (clear) clear.addEventListener('click', () => { search.value = ''; active = 'All'; refresh(); search.focus(); });
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('theme');
  if (requested && filters.some(x => x.dataset.filter === requested)) active = requested;
  if (params.get('q')) search.value = params.get('q');
  refresh(false);
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();search.focus();
    }
  });
})();
