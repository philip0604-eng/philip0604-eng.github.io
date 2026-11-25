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
  const cards = Array.from(grid.querySelectorAll('.paper-card'));
  const totalWorks = cards.length;
  const routeBanner = document.getElementById('curated-route');
  const routeClear = document.getElementById('curated-route-clear');
  const normalize = (s) => (s || '').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const getSlug = (card) => card.querySelector('h3 a').getAttribute('href').split('/').pop().replace(/\.html$/, '');
  const slugToCard = new Map(cards.map(card => [getSlug(card), card]));
  const ROUTES = {
  "monetary-inflation": {
    "title": "How can monetary design affect inflation?",
    "intro": "A focused comparison of restricted purchasing rights, idle supplier capacity, endogenous supply, and price-stabilization rules. The broad monetary proposals are followed by papers that identify conditions under which inflation can still occur.",
    "papers": [
      [
        "monetary-design-and-inflation",
        "START HERE",
        "The central conditional framework for prices, sectoral capacity, and restricted transfers."
      ],
      [
        "purpose-bound-transfers-idle-capacity-and-inflation",
        "THE TRANSFER TEST",
        "Compares restricted claims and cash while accounting for idle capacity and settlement obligations."
      ],
      [
        "optimal-price-stabilization-with-purpose-bound-money",
        "DYNAMIC POLICY",
        "Examines capacity investment, forward demand, and state-contingent conversion rules."
      ],
      [
        "an-analysis-of-demand-and-supply-under-purpose-bound-money",
        "MICROECONOMIC CHANNEL",
        "Studies household demand, suppliers, and equilibrium responses to purpose-bound purchasing rights."
      ],
      [
        "mechanism-design-for-countering-stagflation",
        "COST-PUSH SHOCKS",
        "Investigates input scarcity and commodity-price shocks, a distinct source of inflation."
      ],
      [
        "fungibility-not-quantity",
        "FOUNDATIONAL ARGUMENT",
        "Presents the broader non-fungibility hypothesis to interrogate alongside the narrower tests."
      ],
      [
        "beyond-interest-rates",
        "POLICY COMPARISON",
        "Assesses what purpose-bound instruments add to existing rate, fiscal, and prudential policy."
      ]
    ]
  },
  "persistent-inequality": {
    "title": "What keeps inequality persistent?",
    "intro": "Investigate wealth accumulation, cross-domain transmission, incentive-compatible distribution, and the barriers that turn unequal assets into unequal opportunities. Papers are included for an identifiable inequality mechanism, not merely a passing mention of inequality.",
    "papers": [
      [
        "breaking-the-cycle-of-inequality",
        "START HERE",
        "Models how disadvantage propagates between housing, education, health, and finance."
      ],
      [
        "mechanisms-of-inequality",
        "STRUCTURAL FRAMEWORK",
        "Explores accumulation dynamics, cross-domain boundaries, and inequality containment."
      ],
      [
        "optimal-inequality",
        "DISTRIBUTION THEORY",
        "Separates mathematical upper bounds from welfare-optimal, incentive-compatible allocations."
      ],
      [
        "from-redistribution-to-design",
        "INITIAL ENDOWMENTS",
        "Examines capital-at-birth as an intervention in the distribution of starting assets."
      ],
      [
        "globalizing-access-to-homeownership",
        "COLLATERAL BARRIER",
        "Shows how insufficient accumulated wealth can restrict homeownership even with repayment capacity."
      ],
      [
        "rail-networks-inequality-and-economic-development",
        "ACCESS WITHOUT OWNERSHIP",
        "Tests whether shared transport reduces dependence on private wealth for reaching opportunities."
      ]
    ]
  },
  "institutional-access": {
    "title": "How do institutions expand access?",
    "intro": "A practical reading route through institutions that widen access to goods, knowledge, services, housing, and mobility. Each paper centers on a specific access constraint or delivery mechanism.",
    "papers": [
      [
        "access-over-output",
        "START HERE",
        "Frames development in terms of usable access to goods and services, not output alone."
      ],
      [
        "designing-dignity",
        "HOUSING QUALITY",
        "Considers affordable residential living through reusable architectural design and shared amenities."
      ],
      [
        "globalizing-access-to-homeownership",
        "HOUSING FINANCE",
        "Studies mortgage collateral guarantees that may relax entry barriers to ownership."
      ],
      [
        "towards-a-global-public-library-network",
        "KNOWLEDGE ACCESS",
        "Proposes library networks to reduce barriers to learning and information."
      ],
      [
        "rail-networks-inequality-and-economic-development",
        "LOCAL MOBILITY",
        "Explores how public rail access connects households to jobs and services."
      ],
      [
        "democratizing-international-travel",
        "INTERNATIONAL MOBILITY",
        "Examines collective charter procurement as a way to lower the cost of travel."
      ],
      [
        "ending-hunger-through-market-design",
        "NUTRITION ACCESS",
        "Focuses on mechanisms for making nutrition services genuinely deliverable."
      ],
      [
        "public-spaces-as-catalysts-for-economic-development",
        "PUBLIC SPACE",
        "Studies access to high-quality civic space as a development input."
      ],
      [
        "embassies-of-welfare",
        "CROSS-BORDER DELIVERY",
        "Explores a transnational service-access institution and implementation issues."
      ]
    ]
  },
  "financial-resilience": {
    "title": "What makes finance resilient?",
    "intro": "Follow the distinct failure channels: borrower cash flow, falling collateral, lost credit information, bank runs, sovereign debt, global reserves, and crisis financing. These mechanisms should not be treated as interchangeable.",
    "papers": [
      [
        "a-new-architecture-for-financial-stability",
        "START HERE",
        "Links countercyclical collateral support with temporary cash-flow insurance."
      ],
      [
        "the-global-credit-archive",
        "INFORMATION CONTINUITY",
        "Asks how borrower information can survive bank failure and support refinancing."
      ],
      [
        "from-fragility-to-design",
        "BANK RUNS",
        "Analyzes run incentives and proposed changes to the structure of liquidity claims."
      ],
      [
        "global-sovereign-debt-resets-and-fiscal-resilience",
        "SOVEREIGN STRESS",
        "Studies exceptional debt redemption under monetary and fiscal constraints."
      ],
      [
        "productivity-linked-purpose-bound-money-and-sovereign-debt-sustainability",
        "DEBT SUSTAINABILITY",
        "Considers verified fiscal substitution and the resource limits of debt retirement."
      ],
      [
        "from-triffin-to-a-global-reserve-currency",
        "GLOBAL LIQUIDITY",
        "Examines international reserve services, shared backing, and solvency."
      ],
      [
        "purpose-bound-finance-for-global-crises",
        "CRISIS COORDINATION",
        "Studies emergency cross-border procurement and jointly supported settlement."
      ]
    ]
  },
  "innovation-guarantees": {
    "title": "Can market guarantees accelerate innovation?",
    "intro": "Explore when credible future demand, contract enforcement, shared infrastructure, and research networks change investment decisions. These papers address innovation incentives and constraints rather than innovation as a generic keyword.",
    "papers": [
      [
        "transforming-climate-agreements",
        "START HERE",
        "Proposes treaty-backed purchasing markets for new environmental technologies."
      ],
      [
        "programmable-demand-and-innovation-investment",
        "ADOPTION INCENTIVES",
        "Applies demand assurances to firms investing in AI-enabled services."
      ],
      [
        "supply-before-spending",
        "SUPPLY COMMITMENTS",
        "Models how assured future demand can induce capacity investment and entry."
      ],
      [
        "market-design-for-shared-ai-infrastructure",
        "SHARED COMPUTE",
        "Studies strategic infrastructure investment and benefits and costs of federated AI capacity."
      ],
      [
        "reorganizing-the-national-economy",
        "INDUSTRIAL NETWORKS",
        "Explores shared research assets and coordination among competing firms."
      ],
      [
        "globalizing-scientific-opportunity",
        "RESEARCH CAPACITY",
        "Connects international university consortia to local scientific and industrial capability."
      ],
      [
        "the-computational-organization-of-innovation",
        "INNOVATION GOVERNANCE",
        "Examines capital allocation and platform power in large-scale AI innovation."
      ]
    ]
  },
  "collective-choice": {
    "title": "How should collective choices be made?",
    "intro": "This archive currently has one manuscript directly centered on democratic social choice, preference aggregation, and strategic public consultation. Other writings that merely mention governance are deliberately excluded.",
    "papers": [
      [
        "the-economics-of-preference-diversity",
        "DIRECT MATCH",
        "Analyzes Arrow, preference diversity, agenda control, lobbying, and the institutional design of collective choice."
      ]
    ]
  }
};
  const params = new URLSearchParams(window.location.search);
  let active = 'All';
  let activeRoute = Object.prototype.hasOwnProperty.call(ROUTES, params.get('route')) ? params.get('route') : null;
  const requested = params.get('theme');
  if (requested && filters.some(x => x.dataset.filter === requested)) active = requested;
  if (params.get('q')) search.value = params.get('q');
  const curatedOption = document.createElement('option');
  curatedOption.value = 'curated';
  curatedOption.textContent = 'Suggested reading order';
  if (activeRoute) { sort.prepend(curatedOption); sort.value = 'curated'; }

  function sortCards(method) {
    const routeSlugs = activeRoute ? ROUTES[activeRoute].papers.map(p => p[0]) : [];
    const rank = new Map(routeSlugs.map((slug, index) => [slug,index]));
    const ordered = [...cards].sort((a,b) => {
      if (method === 'curated' && activeRoute) return (rank.get(getSlug(a)) ?? 1000) - (rank.get(getSlug(b)) ?? 1000) || a.dataset.name.localeCompare(b.dataset.name);
      if (method === 'pages') return Number.parseInt(b.querySelector('.muted-index').textContent) - Number.parseInt(a.querySelector('.muted-index').textContent);
      if (method === 'theme') return a.dataset.theme.localeCompare(b.dataset.theme) || a.dataset.name.localeCompare(b.dataset.name);
      return a.dataset.name.localeCompare(b.dataset.name);
    });
    ordered.forEach(node => grid.appendChild(node));
  }
  function removeRouteNotes() {
    cards.forEach(card => card.querySelector('.curated-paper-note')?.remove());
  }
  function resetRoute() {
    if (!activeRoute) return;
    activeRoute = null;
    curatedOption.remove();
    sort.value = 'title';
    removeRouteNotes();
    sortCards('title');
  }
  function decorateRouteCards() {
    removeRouteNotes();
    if (!activeRoute) return;
    const route = ROUTES[activeRoute];
    route.papers.forEach(([slug, label, reason], i) => {
      const card = slugToCard.get(slug);
      if (!card) return;
      const box = document.createElement('div');
      box.className = 'curated-paper-note';
      const step = document.createElement('span');
      step.className = 'curated-paper-step';
      step.textContent = String(i + 1).padStart(2, '0') + ' / ' + label;
      const explanation = document.createElement('p');
      explanation.textContent = reason;
      box.append(step, explanation);
      const subtitle = card.querySelector('.card-subtitle');
      const abstract = card.querySelector('.card-abstract');
      if (subtitle) subtitle.insertAdjacentElement('afterend', box);
      else if (abstract) abstract.insertAdjacentElement('beforebegin', box);
      else card.appendChild(box);
    });
    sortCards('curated');
  }
  function refresh(updateHistory = true) {
    const q = normalize(search.value);
    const terms = q.split(/\s+/).filter(Boolean);
    const selected = activeRoute ? new Set(ROUTES[activeRoute].papers.map(p => p[0])) : null;
    let matched = 0;
    cards.forEach(card => {
      const routeMatch = !selected || selected.has(getSlug(card));
      const themeMatch = active === 'All' || card.dataset.theme === active;
      const textMatch = terms.every(term => normalize(card.dataset.search).includes(term));
      const visible = routeMatch && themeMatch && textMatch;
      card.hidden = !visible;
      if (visible) matched++;
    });
    filters.forEach(btn => {
      const chosen = btn.dataset.filter === active;
      btn.classList.toggle('is-active', chosen);
      btn.setAttribute('aria-pressed', String(chosen));
    });
    if (routeBanner) {
      routeBanner.hidden = !activeRoute;
      if (activeRoute) {
        const route = ROUTES[activeRoute];
        document.getElementById('curated-route-title').textContent = route.title;
        document.getElementById('curated-route-intro').textContent = route.intro;
        document.getElementById('curated-route-count').textContent = `${route.papers.length} selected ${route.papers.length === 1 ? 'paper' : 'papers'} · in suggested reading order`;
        document.getElementById('curated-route-badge').textContent = `${route.papers.length} DIRECT ${route.papers.length === 1 ? 'MATCH' : 'MATCHES'}`;
      }
    }
    if (activeRoute) counter.textContent = `Showing ${matched} of ${ROUTES[activeRoute].papers.length} selected works`;
    else counter.textContent = matched === totalWorks ? `Showing all ${totalWorks} works` : `Showing ${matched} of ${totalWorks} works`;
    empty.hidden = matched !== 0;
    if (updateHistory && ['http:','https:'].includes(window.location.protocol)) {
      const url = new URL(window.location.href);
      if (q) url.searchParams.set('q', search.value.trim()); else url.searchParams.delete('q');
      if (active !== 'All') url.searchParams.set('theme',active); else url.searchParams.delete('theme');
      if (activeRoute) url.searchParams.set('route',activeRoute); else url.searchParams.delete('route');
      window.history.replaceState({},'',url.pathname+url.search+url.hash);
    }
  }
  // Searching or choosing a broad field returns to the full archive, preventing invisible route constraints.
  search.addEventListener('input',() => { resetRoute(); active='All'; refresh(); });
  filters.forEach(btn => btn.addEventListener('click',() => { resetRoute(); search.value=''; active=btn.dataset.filter; refresh(); }));
  sort.addEventListener('change',() => sortCards(sort.value));
  const clearEverything = () => { resetRoute();search.value='';active='All';refresh();search.focus(); };
  document.getElementById('clear-search')?.addEventListener('click',clearEverything);
  document.getElementById('clear-empty-results')?.addEventListener('click',clearEverything);
  routeClear?.addEventListener('click',clearEverything);
  decorateRouteCards();
  refresh(false);
  document.addEventListener('keydown',(e) => {
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault(); search.focus();
    }
  });
})();
