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
    "label": "Monetary Design & Inflation",
    "title": "How can monetary design affect inflation?",
    "intro": "Begin with competing theories of money and fungibility. Move through prices, idle capacity, household behavior and macroeconomic stability; then test institutional implementation, financing, and verifiable delivery.",
    "papers": [
      [
        "monetary-design-and-inflation",
        "START HERE",
        "An inflation-focused framework linking purpose-bound purchasing rights to capacity, prices and the fiscal settlement of claims."
      ],
      [
        "fungibility-not-quantity",
        "THE CENTRAL HYPOTHESIS",
        "Examines whether the fungibility of purchasing power changes monetary transmission beyond changes in the quantity of money."
      ],
      [
        "designing-money",
        "MONETARY ARCHITECTURE",
        "Introduces purpose-bounded money as an institutional alternative and motivates the mechanisms tested in narrower studies."
      ],
      [
        "an-analysis-of-demand-and-supply-under-purpose-bound-money",
        "MARKET EQUILIBRIUM",
        "Traces how restricted purchasing rights change household demand, firms’ supply decisions, prices and welfare."
      ],
      [
        "purpose-bound-transfers-idle-capacity-and-inflation",
        "SPARE-CAPACITY TEST",
        "Distinguishes genuine extra service provision from pure demand shifts and pass-through of public settlement costs."
      ],
      [
        "beyond-universal-basic-income-can-purpose-bound-transfers-deliver-more-welfare-with-less-inflation",
        "TRANSFER COMPARISON",
        "Compares purpose-bound benefits with unrestricted basic income, with particular attention to inflation and welfare trade-offs."
      ],
      [
        "optimal-price-stabilization-with-purpose-bound-money",
        "DYNAMIC PRICE POLICY",
        "Develops state-contingent price-stabilization rules and their interaction with supply and conversion constraints."
      ],
      [
        "liquidity-segmentation-and-welfare-resilience",
        "SHOCK TRANSMISSION",
        "Tests whether differentiated liquidity can preserve essential provision as demand and supply conditions change."
      ],
      [
        "a-dynamic-general-equilibrium-theory-of-purpose-bound-money",
        "GENERAL EQUILIBRIUM",
        "Extends the monetary question to endogenous labor, health, firm entry, investment, sectoral capacity and public finance."
      ],
      [
        "programmable-liquidity-and-recursive-welfare-stabilization",
        "RECURSIVE COORDINATION",
        "Explores segmented liquidity, dynamic welfare persistence and stability under recursively adjusting institutional rules."
      ],
      [
        "designing-an-ai-enabled-global-central-bank",
        "ISSUER DESIGN",
        "Asks how an AI-assisted supranational monetary institution could verify capacity and govern restricted issuance."
      ],
      [
        "market-design-for-a-federated-purpose-bound-monetary-system",
        "NETWORK INSTITUTIONS",
        "Investigates participation, competition and coordination in a federated purpose-bound payment system."
      ],
      [
        "participation-competition-and-commitment-in-purpose-bound-finance",
        "COMMITMENT CREDIBILITY",
        "Examines incentives for providers and institutions to participate in a purpose-bound finance network."
      ],
      [
        "scaling-solidarity",
        "NETWORK AND BACKING",
        "Connects purpose-bound money to welfare-service networks, provider capacity, fiscal backing and indirect price spillovers."
      ],
      [
        "empirical-foundations-of-a-purpose-bound-economy",
        "EVIDENCE AND METHODS",
        "Evaluates the empirical analogues and identification requirements for institutional monetary proposals."
      ],
      [
        "life-beyond-monetary-scarcity",
        "WELFARE EXTENSION",
        "Explores the broader societal implications of purpose-restricted purchasing power and the limits of nominal abundance."
      ],
      [
        "supply-before-spending",
        "CAPACITY FIRST",
        "Studies credible future demand and capacity verification before restricted purchasing rights become spendable."
      ],
      [
        "beyond-interest-rates",
        "BEYOND THE POLICY RATE",
        "Asks when purpose-bound payments add stabilization value beyond conventional monetary, fiscal and prudential tools."
      ]
    ]
  },
  "persistent-inequality": {
    "label": "Persistent Inequality",
    "title": "What keeps inequality persistent?",
    "intro": "A route from mathematical and intergenerational mechanisms to practical inequality-reducing institutions. The central distinction is between a gap observed today and the processes that transmit advantage across sectors and generations.",
    "papers": [
      [
        "breaking-the-cycle-of-inequality",
        "START HERE",
        "Identifies feedback links between finance, housing, health and education that allow disadvantages to reproduce over time."
      ],
      [
        "mechanisms-of-inequality",
        "STRUCTURAL FRAMEWORK",
        "Models cumulative advantage and explores architectural constraints on the cross-domain propagation of inequality."
      ],
      [
        "optimal-inequality",
        "DISTRIBUTIONAL LIMITS",
        "Distinguishes mathematical inequality bounds from incentive-compatible and socially optimal distributions."
      ],
      [
        "from-redistribution-to-design",
        "STARTING CAPITAL",
        "Explores Capital at Birth as an ex-ante intervention in wealth ownership and future economic participation."
      ],
      [
        "from-coercion-to-design",
        "LABOR AND SUBSISTENCE",
        "Analyzes how subsistence constraints shape reservation wages, labor participation and transition costs."
      ],
      [
        "rethinking-microfinance",
        "LOCAL MARKETS",
        "Compares the welfare gains from nearby microenterprise entry with the costs of financing and market displacement."
      ],
      [
        "the-economics-of-aesthetic-experience",
        "ACCESS BEYOND NECESSITY",
        "Examines how prices, geography and capacity distribute opportunities for cultural and aesthetic experience."
      ],
      [
        "invisible-welfare",
        "DIGNITY AND TAKE-UP",
        "Examines whether privacy-preserving delivery can reduce stigma, disclosure burden and non-take-up of social protection."
      ]
    ]
  },
  "institutional-access": {
    "label": "Institutions & Access",
    "title": "How do institutions expand access?",
    "intro": "Access depends on more than nominal entitlements. Follow international service institutions, practical delivery systems, housing and transport, knowledge and scientific opportunity, and credible cross-border financing.",
    "papers": [
      [
        "access-over-output",
        "START HERE",
        "Distinguishes existing productive output from the institutions and purchasing power needed to make goods accessible."
      ],
      [
        "embassies-of-welfare",
        "CROSS-BORDER SERVICES",
        "Proposes transnational public-service outposts and examines how public welfare delivery could cross jurisdictions."
      ],
      [
        "ending-hunger-through-market-design",
        "FOOD AND NUTRITION",
        "Treats dependable meal access as a deliverable right supported by contracted food-service capacity."
      ],
      [
        "designing-dignity",
        "RESIDENTIAL QUALITY",
        "Develops affordable high-quality living through reusable architectural design, shared amenities and portability."
      ],
      [
        "globalizing-access-to-homeownership",
        "COLLATERAL ACCESS",
        "Explores guarantees that assist creditworthy households lacking the accumulated collateral needed to buy a home."
      ],
      [
        "rail-networks-inequality-and-economic-development",
        "PUBLIC MOBILITY",
        "Investigates access to existing employment and services without requiring costly private mobility assets."
      ],
      [
        "democratizing-international-travel",
        "AFFORDABLE AIR TRAVEL",
        "Studies voluntary charter contracting and demand pooling to widen international travel at acceptable carrier economics."
      ],
      [
        "public-spaces-as-catalysts-for-economic-development",
        "CIVIC INFRASTRUCTURE",
        "Evaluates early provision of accessible public spaces as an input into urban welfare and development."
      ],
      [
        "towards-a-global-public-library-network",
        "KNOWLEDGE ACCESS",
        "Examines a federated library network to reduce the practical costs of learning and information access."
      ],
      [
        "from-credentials-to-competence",
        "PROFESSIONAL LEARNING",
        "Tests modular university instruction, independent assessment and employer recognition beyond selective degree admission."
      ],
      [
        "globalizing-scientific-opportunity",
        "RESEARCH OPPORTUNITY",
        "Proposes university consortia and locally anchored research institutions to broaden scientific and industrial capability."
      ],
      [
        "land-power-and-access",
        "ENERGY AND IMPORT ACCESS",
        "Connects renewable-energy and compute exports to foreign-exchange earnings and household access to traded goods."
      ],
      [
        "monetary-autonomy-for-global-cities",
        "URBAN SERVICE ACCESS",
        "Explores state-contingent access to idle city services under fixed nominal payments and safeguarded procurement."
      ],
      [
        "purpose-bound-finance-for-global-crises",
        "EMERGENCY DELIVERY",
        "Examines cross-border purchasing rights, verifiable real service capacity and treaty-limited crisis interventions."
      ],
      [
        "financing-universal-basic-income-through-global-sovereign-debt-markets",
        "UNIVERSAL INCOME FINANCE",
        "Investigates a sovereign-funding partnership that could support household payments through independently funded and enforceable revenue streams."
      ]
    ]
  },
  "financial-resilience": {
    "label": "Financial Resilience",
    "title": "What makes finance resilient?",
    "intro": "Follow distinct mechanisms of failure and recovery: collateral and cash-flow spirals, bank-run incentives, informational continuity, international liquidity, public debt and supply-price shocks.",
    "papers": [
      [
        "a-new-architecture-for-financial-stability",
        "START HERE",
        "Develops countercyclical collateral guarantees and cash-flow insurance to limit forced sales and viable-firm failure."
      ],
      [
        "from-fragility-to-design",
        "BANK-RUN INCENTIVES",
        "Analyzes withdrawal coordination and the proposed replacement of demandable claims with purpose-contingent liquidity."
      ],
      [
        "the-global-credit-archive",
        "INFORMATION CONTINUITY",
        "Separates transferable credit information from a failed intermediary so that other lenders can assess borrowers."
      ],
      [
        "from-triffin-to-a-global-reserve-currency",
        "INTERNATIONAL LIQUIDITY",
        "Examines jointly backed reserve instruments, settlement reliability, liquidity support and sovereign commitments."
      ],
      [
        "productivity-linked-purpose-bound-money-and-sovereign-debt-sustainability",
        "ORDINARY DEBT RELIEF",
        "Tests whether verified fiscal substitution can retire sovereign debt without concealing new obligations."
      ],
      [
        "global-sovereign-debt-resets-and-fiscal-resilience",
        "EXCEPTIONAL DEBT STRESS",
        "Studies international creditor redemption, public balance sheets and inflation-constrained fiscal recovery."
      ],
      [
        "mechanism-design-for-countering-stagflation",
        "COST-SHOCK RESILIENCE",
        "Explores input allocation under commodity scarcity as a way to limit simultaneous price increases and output loss."
      ]
    ]
  },
  "innovation-guarantees": {
    "label": "Market Guarantees & Innovation",
    "title": "Can market guarantees accelerate innovation?",
    "intro": "Start with enforceable future markets for climate technology; then compare AI demand assurance, shared compute infrastructure, national innovation networks and long-run capital allocation.",
    "papers": [
      [
        "transforming-climate-agreements",
        "START HERE",
        "Proposes treaty-backed advance purchasing markets, performance standards and scale-sensitive rewards for environmental inventions."
      ],
      [
        "programmable-demand-and-innovation-investment",
        "AI ADOPTION GUARANTEES",
        "Examines whether enforceable minimum demand can overcome irreversible investment risk in AI-enabled services."
      ],
      [
        "market-design-for-shared-ai-infrastructure",
        "COMMON INFRASTRUCTURE",
        "Studies voluntary pooling of computing capacity, investment incentives, efficient dispatch and competition safeguards."
      ],
      [
        "reorganizing-the-national-economy",
        "INDUSTRIAL COORDINATION",
        "Proposes federated research assets, labor matching and shared innovation facilities while preserving firm competition."
      ],
      [
        "the-computational-organization-of-innovation",
        "INNOVATION CAPITAL",
        "Examines platform concentration, purpose-bound innovation capital and recursive investment governance at AI scale."
      ],
      [
        "recursive-coordination-capitalism",
        "PROGRAMMABLE COORDINATION",
        "Extends demand commitments into recursive innovation, adoption and institutional adjustment in AI-scale economies."
      ],
      [
        "redesigning-shareholder-capitalism",
        "SOCIAL VALUE ALLOCATION",
        "Studies how external social returns and audited information might reshape investment within shareholder markets."
      ],
      [
        "the-informational-transformation-of-capitalism",
        "CAPITAL-MARKET INFORMATION",
        "Examines the transition from price-only signals toward informational coordination and purpose-oriented capital allocation."
      ],
      [
        "reprogramming-capitalism",
        "BROADER MONETARY DESIGN",
        "Connects purpose-bound monetary architecture and computational governance to economic coordination and innovation."
      ],
      [
        "reframing-global-fiscal-architecture",
        "FOUNDATIONAL ARCHITECTURE",
        "Situates purpose-oriented money, capital endowments and welfare institutions within a broader global fiscal proposal."
      ],
      [
        "protocol-humanism",
        "BOOK-LENGTH SYNTHESIS",
        "Synthesizes the broader institutional vision, human guarantees and the governance of innovation in an AI-intensive economy."
      ]
    ]
  },
  "collective-choice": {
    "label": "Democracy & Collective Choice",
    "title": "How should collective choices be made?",
    "intro": "One author-selected manuscript addresses democratic choice directly. It connects Arrow’s impossibility theorem to preference diversity, information, lobbying, agenda setting and legitimate public consultation.",
    "papers": [
      [
        "the-economics-of-preference-diversity",
        "DIRECT MATCH",
        "Distinguishes linear rankings and directed circular orders; models strategic participation, lobbying and accountable policy consultation."
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
