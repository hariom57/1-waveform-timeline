const PROJECTS = [
  {
    id: 'campus-dashboard',
    number: '01',
    title: 'Campus Dashboard',
    kicker: 'Campus event planner · Thomso tracker',
    year: '2026 — Present',
    category: ['product', 'engineering'],
    tags: ['Product thinking', 'Full-stack', '3D map'],
    summary: 'A campus experience that brings events, venues and day-planning into one place.',
    metric: '1,000+ unique visitors',
    role: 'Product research and design, 3D map, architecture, frontend and backend engineering',
    status: 'Live product',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Stylized map and event cards illustration"><defs><pattern id="cd-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#aab7d7" stroke-width="1"/></pattern></defs><rect width="680" height="420" rx="22" fill="#f3f2ed"/><rect width="680" height="420" rx="22" fill="url(#cd-grid)"/><path d="M-10 310 C130 260 135 165 260 205 S430 340 700 80" fill="none" stroke="#ffcf31" stroke-width="34" stroke-linecap="round"/><path d="M-10 310 C130 260 135 165 260 205 S430 340 700 80" fill="none" stroke="#242b8c" stroke-width="4" stroke-dasharray="7 10"/><g fill="#1d2b92" stroke="#fff" stroke-width="7"><circle cx="124" cy="266" r="15"/><circle cx="260" cy="205" r="15"/><circle cx="414" cy="277" r="15"/><circle cx="560" cy="172" r="15"/></g><rect x="44" y="40" width="244" height="116" rx="14" fill="#fff" stroke="#d4d5df"/><text x="66" y="72" font-size="14" fill="#6a6b82" font-family="Arial">THOMSO · EVENT TRACKER</text><text x="66" y="102" font-size="26" font-weight="700" fill="#1b214d" font-family="Arial">Find your next</text><text x="66" y="130" font-size="26" font-weight="700" fill="#1b214d" font-family="Arial">moment.</text><rect x="388" y="30" width="240" height="96" rx="14" fill="#202b91"/><text x="410" y="61" font-size="13" fill="#cbd3ff" font-family="Arial">YOUR PLAN</text><text x="410" y="91" font-size="21" font-weight="700" fill="#fff" font-family="Arial">4 saved events</text><circle cx="594" cy="90" r="13" fill="#ffcf31"/></svg>`,
    problem: 'During Thomso, there are many performances, competitions and activities happening across campus. A schedule alone tells visitors what and when, but they still need to find the venue and decide how to move between events.',
    approach: [
      'Brought the event schedule and campus geography together so visitors can move from discovering an event to locating its venue.',
      'Added a personalized event list to make it easier to plan a day around the performances and competitions a person cares about.',
      'Extended access for visitors from outside IIT Roorkee and added a 3D campus map, venue navigation and a crowd heatmap for the festival experience.',
      'Built an email-ingestion pipeline that turns campus broadcasts into reviewable event proposals for administrators.'
    ],
    decisions: [
      'Treat “what, when and where?” as one connected task rather than three separate lookups.',
      'Keep automated event extraction reviewable by admins instead of silently publishing unverified notices.',
      'Build the product around the campus context, not just a list of event names.'
    ],
    outcome: 'The platform passed 1,000 unique visitors during the Thomso period, according to the site analytics described by the team. It is a live campus-facing product, not only a prototype.',
    stack: ['React', 'Express', 'PostgreSQL', 'AWS', 'OAuth', '3D campus map'],
    links: [
      { label: 'Open Campus Dashboard', href: 'https://campus-dashboard.iitr.ac.in/' },
      { label: 'Open Thomso Event Tracker', href: 'https://campus-dashboard.iitr.ac.in/app/fest/now' }
    ],
    note: 'Built with the Tinkering Lab team at IIT Roorkee. The role listed here reflects my direct contributions; team-wide decisions and work were collaborative.'
  },
  {
    id: 'flingbizz',
    number: '02',
    title: 'FlingBizz',
    kicker: 'Skill-based networking & project matching',
    year: '2025 — 2026',
    category: ['product'],
    tags: ['React Native', 'Figma handoff', 'Early testing'],
    summary: 'An early-stage platform for people who want to find collaborators and build projects together.',
    metric: '100+ member tester community',
    role: 'React Native development; translating the co-founder’s Figma designs into working interfaces',
    status: 'Paused early-stage product',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Illustration of a network of collaborators"><rect width="680" height="420" rx="22" fill="#f7f0e5"/><g stroke="#22254a" stroke-width="3" opacity=".55"><path d="M114 122L284 202L490 108L544 284L334 326L284 202L544 284L490 108" fill="none"/><path d="M114 122L173 310L334 326L284 202" fill="none"/></g><g><circle cx="114" cy="122" r="43" fill="#ff725e"/><circle cx="284" cy="202" r="50" fill="#242b8c"/><circle cx="490" cy="108" r="38" fill="#e4bd36"/><circle cx="544" cy="284" r="43" fill="#a9c9b5"/><circle cx="334" cy="326" r="30" fill="#efb2d2"/><circle cx="173" cy="310" r="25" fill="#8ca7e8"/></g><g fill="#fff" font-family="Arial" font-size="22" font-weight="700" text-anchor="middle"><text x="114" y="130">UI</text><text x="284" y="210">Build</text><text x="490" y="116">AI</text><text x="544" y="292">Go</text></g><rect x="38" y="28" width="194" height="42" rx="21" fill="#22254a"/><text x="59" y="55" font-size="17" font-family="Arial" fill="#fff">FIND YOUR PEOPLE</text></svg>`,
    problem: 'The product vision focused on a common early-builder problem: people with ideas are spread across campus, professional networks and online communities, making it difficult to find the right people to create something with.',
    approach: [
      'Helped implement the mobile product in React Native using Figma designs prepared by my co-founder.',
      'Worked on a product concept centered on discovering potential collaborators through skills, interests and project needs.',
      'Contributed to an early feedback/testing community of 100+ people organized through WhatsApp.'
    ],
    decisions: [
      'Translate established Figma designs into usable mobile interfaces rather than treating mockups as the finished product.',
      'Keep discovery and collaboration at the center of the product concept, instead of presenting it as a conventional job board.'
    ],
    outcome: 'The team worked on the app for several months and built an early tester community. Development was later paused because both founders could not consistently commit the required time. It was an early-stage product, not a launched, scaled business.',
    stack: ['React Native', 'Figma', 'Mobile UI implementation'],
    links: [],
    note: 'The Figma designs were created by my co-founder. My contribution was primarily mobile development and implementation. The project was collaborative.'
  },
  {
    id: 'nodeboard',
    number: '03',
    title: 'NodeBoard',
    kicker: 'Real-time collaborative diagram editor',
    year: '2026',
    category: ['engineering', 'product'],
    tags: ['Canvas UI', 'WebSockets', 'Collaboration'],
    summary: 'A shared diagramming canvas for creating and editing visual ideas together in real time.',
    metric: 'Full-stack collaborative MVP',
    role: 'Product implementation, React/TypeScript frontend and Node.js/WebSocket backend',
    status: 'Built and deployed MVP',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Diagram editor canvas illustration"><rect width="680" height="420" rx="22" fill="#eef0f7"/><defs><pattern id="nb-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#c6cce0"/></pattern></defs><rect width="680" height="420" rx="22" fill="url(#nb-dots)"/><g stroke="#5c68c8" stroke-width="4" fill="none"><path d="M190 130H320V230H436"/><path d="M320 230V315H490"/><path d="M436 230V130H536"/></g><g><rect x="90" y="88" width="180" height="84" rx="13" fill="#fff" stroke="#b9c0e6" stroke-width="2"/><rect x="276" y="190" width="180" height="84" rx="13" fill="#262b86"/><rect x="448" y="88" width="150" height="84" rx="13" fill="#ffce39"/><rect x="438" y="284" width="150" height="62" rx="13" fill="#fff" stroke="#b9c0e6" stroke-width="2"/></g><g font-family="Arial" font-size="17" font-weight="700" text-anchor="middle"><text x="180" y="136" fill="#20244a">Idea</text><text x="366" y="238" fill="#fff">Collaborate</text><text x="523" y="136" fill="#20244a">Decision</text><text x="513" y="321" fill="#20244a">Next step</text></g><circle cx="554" cy="54" r="13" fill="#ef725a"/><circle cx="586" cy="54" r="13" fill="#4d9677"/><circle cx="618" cy="54" r="13" fill="#555dbb"/></svg>`,
    problem: 'Visual planning tools are most useful when people can move from a rough idea to a shared structure without constantly exporting files or reconciling different versions.',
    approach: [
      'Built a canvas-based interface using React, TypeScript and HTML5 Canvas for interactive diagram manipulation.',
      'Implemented collaboration rooms, shareable boards and synchronized state using WebSockets.',
      'Developed a Node.js/Express backend with REST APIs and server-side JSON persistence; shared TypeScript models between client and server.'
    ],
    decisions: [
      'Separate the drawing surface from the collaboration layer so interaction and synchronization can be reasoned about independently.',
      'Share model and protocol types across client/server boundaries to reduce drift in the data exchanged between participants.'
    ],
    outcome: 'A functioning real-time diagramming MVP deployed with a Vercel frontend and Render backend. This project was a strong engineering experiment in state synchronization and interaction-heavy UI.',
    stack: ['React', 'TypeScript', 'HTML5 Canvas', 'WebSockets', 'Node.js', 'Express'],
    links: [],
    note: 'This is an engineering-led project. The case study should be expanded with actual product screenshots and a recorded collaboration demo before being presented as a polished design case study.'
  },
  {
    id: 'creative-tech',
    number: '04',
    title: 'GTA-IITR & Redemption VR',
    kicker: '3D campus simulator · VR zombie-survival game',
    year: '2025',
    category: ['creative'],
    tags: ['3D environment design', 'Blender', 'Unity / VR'],
    summary: 'Two game concepts exploring a recognizable campus world and an immersive survival environment.',
    metric: 'Best Presentation · Shrishti 2025',
    role: 'Game ideation and pitching, 3D environment / asset design, Unity-ready asset preparation and showcase storytelling',
    status: 'Showcase projects',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Stylized 3D environment illustration"><rect width="680" height="420" rx="22" fill="#20234f"/><circle cx="530" cy="86" r="48" fill="#ffcf39"/><path d="M0 292L140 198L242 258L345 154L470 252L580 176L680 234V420H0Z" fill="#323977"/><path d="M0 338L170 270L305 318L457 250L680 310V420H0Z" fill="#4b5791"/><g stroke="#a8b5ef" stroke-width="2"><path d="M70 353V270H130V353M140 353V238H210V353M230 353V284H289V353M410 351V246H462V351M480 351V280H545V351" fill="#e8e9f7"/><path d="M82 285H118M82 304H118M82 323H118M151 257H199M151 277H199M151 297H199M151 317H199M420 266H452M420 286H452M420 306H452M493 298H531M493 318H531"/></g><path d="M0 365L170 333L335 366L470 332L680 365" fill="none" stroke="#ffcf39" stroke-width="7"/><text x="38" y="52" fill="#c9d0ff" font-family="Arial" font-size="16" letter-spacing="4">WORLD BUILDING / 3D</text><text x="38" y="91" fill="#fff" font-family="Arial" font-size="30" font-weight="700">Explore another world.</text></svg>`,
    problem: 'Both projects started from experience concepts rather than purely technical exercises: one imagined a GTA-style way to explore IIT Roorkee; the other aimed to create a zombie-survival VR game.',
    approach: [
      'Ideated and pitched the GTA-IITR concept around familiar campus locations and explorable environments.',
      'Created campus models and 3D assets in Blender and prepared them for integration into Unity.',
      'Led 3D asset work for Redemption VR, focusing on Unity-ready assets and the atmosphere of an immersive survival experience.',
      'Helped shape the showcase narrative, presenting the concepts and visuals to judges and visitors.'
    ],
    decisions: [
      'Use recognizable architectural details to anchor a fictional experience in a real place.',
      "Treat environment assets as part of the player's experience and performance budget, not only as standalone renders.",
      'Make the presentation tell a clear story about what the experience would feel like to use.'
    ],
    outcome: 'The team won Best Presentation recognition at Shrishti 2025. My strongest contributions were ideation, pitching, environment / 3D work and visual storytelling.',
    stack: ['Blender', 'Unity', '3D environment design', 'VR assets'],
    links: [],
    note: 'These were team projects. This case study focuses on my own design and 3D contributions, not on claiming sole ownership of the games.'
  },
  {
    id: 'productivity',
    number: '05',
    title: 'Productivity experiments',
    kicker: 'Hercules Habit Warrior · TargetChase',
    year: '2025 — 2026',
    category: ['product', 'engineering'],
    tags: ['Visualization', 'Gamification', 'Frontend'],
    summary: 'Two experiments exploring how progress visualization and playful framing can make personal goals easier to follow.',
    metric: 'Two product concepts',
    role: 'Concept development and web application implementation',
    status: 'Personal experiments',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Progress visualization and habit tracking illustration"><rect width="680" height="420" rx="22" fill="#eff2eb"/><circle cx="230" cy="210" r="120" fill="#fff" stroke="#d1ddcf" stroke-width="2"/><g stroke="#d9e0d8" stroke-width="2" fill="none"><path d="M230 91L342 172L300 310L160 310L118 172Z"/><path d="M230 130L305 184L277 270L183 270L155 184Z"/><path d="M230 169L268 197L254 240L206 240L192 197Z"/></g><path d="M230 120L300 178L268 260L176 240L164 180Z" fill="#6d7be1" opacity=".65" stroke="#333b91" stroke-width="3"/><g fill="#252b81"><circle cx="230" cy="120" r="7"/><circle cx="300" cy="178" r="7"/><circle cx="268" cy="260" r="7"/><circle cx="176" cy="240" r="7"/><circle cx="164" cy="180" r="7"/></g><rect x="390" y="72" width="220" height="82" rx="14" fill="#252b81"/><text x="414" y="103" fill="#c8ceff" font-family="Arial" font-size="15">THIS WEEK</text><text x="414" y="134" fill="#fff" font-family="Arial" font-size="28" font-weight="700">4 / 5 goals</text><rect x="390" y="174" width="220" height="60" rx="12" fill="#fff" stroke="#d1ddcf"/><rect x="390" y="250" width="220" height="60" rx="12" fill="#ffcf39"/><path d="M413 204h18m-9 -9v18M413 280h18m-9 -9v18" stroke="#252b81" stroke-width="3" stroke-linecap="round"/><text x="445" y="210" fill="#24284a" font-family="Arial" font-size="17">Habit streak</text><text x="445" y="286" fill="#24284a" font-family="Arial" font-size="17">Target reached</text></svg>`,
    problem: 'Habit and goal tracking can become a flat list of checkboxes. These projects explore whether visible progress, a sense of challenge and simple feedback loops can make goals feel more tangible.',
    approach: [
      'Hercules Habit Warrior uses an interactive spider-chart visualization to represent progress across habits.',
      'TargetChase frames personal goals as cricket-inspired targets with progress tracking and visual feedback.',
      'Built responsive web interfaces for both concepts.'
    ],
    decisions: [
      'Make progress visible so a user can read patterns rather than only see a task marked done.',
      'Use a metaphor—sports targets or a progress chart—to give the tracking experience a recognizable mental model.'
    ],
    outcome: 'These are personal product experiments rather than validated, scaled products. They show how I explore interface ideas and visualization patterns, and could be strengthened with user testing.',
    stack: ['JavaScript', 'HTML/CSS', 'Charts / data visualization', 'Responsive UI'],
    links: [],
    note: 'Keep whichever experiment has the clearest working demo and best screenshots as the lead item when presenting these projects.'
  },
  {
    id: 'ai-systems',
    number: '06',
    title: 'AI/ML & voice systems',
    kicker: 'NLP experiments · Production voice-AI workflows',
    year: '2026',
    category: ['engineering'],
    tags: ['NLP', 'LLM integrations', 'Backend systems'],
    summary: 'From a sentiment-classification experiment to contributing to production voice-AI workflows at internship scale.',
    metric: 'Engineering + applied AI',
    role: 'ML pipeline implementation and backend / integration engineering',
    status: 'Selected experiments & internship work',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Abstract language model and neural network illustration"><rect width="680" height="420" rx="22" fill="#f4edf4"/><g fill="none" stroke="#7e78bd" stroke-width="3" opacity=".8"><path d="M115 115L248 163L178 278L315 313L372 185L507 127L550 258L438 326"/><path d="M248 163L372 185L438 326M178 278L372 185L550 258M315 313L507 127"/></g><g fill="#292e88" stroke="#f4edf4" stroke-width="7"><circle cx="115" cy="115" r="21"/><circle cx="248" cy="163" r="25"/><circle cx="178" cy="278" r="21"/><circle cx="315" cy="313" r="24"/><circle cx="372" cy="185" r="29"/><circle cx="507" cy="127" r="23"/><circle cx="550" cy="258" r="23"/><circle cx="438" cy="326" r="19"/></g><rect x="36" y="30" width="210" height="40" rx="20" fill="#ffcf39"/><text x="57" y="56" fill="#25294e" font-family="Arial" font-size="15" font-weight="700">LANGUAGE → SIGNAL</text><circle cx="372" cy="185" r="46" fill="none" stroke="#ffcf39" stroke-width="5"/></svg>`,
    problem: 'The projects span two related interests: building a reproducible machine-learning workflow and integrating language / speech capabilities into products with real application constraints.',
    approach: [
      'Built an Amazon product-review sentiment classifier using TF-IDF features and Logistic Regression, with dataset loading and evaluation in Python and scikit-learn.',
      'During the EZAIX internship, contributed to voice-AI workflows using Azure Speech, Azure OpenAI Realtime and Pinecone semantic search.',
      'Worked on backend services and production workflows rather than treating the AI model as an isolated demo.'
    ],
    decisions: [
      'Use a simple, interpretable baseline for the sentiment experiment before exploring more complex approaches.',
      'Treat the model and retrieval components as parts of a broader workflow, with integration, latency and reliability concerns.'
    ],
    outcome: 'The sentiment experiment reported an F1 score of 0.817 on the evaluated Amazon Polarity subset in the project resume. The internship work contributed to a voice-AI stack supporting 75+ languages and 2,000+ daily calls across the broader system.',
    stack: ['Python', 'scikit-learn', 'TF-IDF', 'Azure Speech', 'Azure OpenAI Realtime', 'Pinecone'],
    links: [],
    note: 'Separate personal ML experiments from internship outcomes when presenting this work. The production usage figures describe the broader system, not an individually owned service.'
  }
];

const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function buildCover(project) {
  const cover = create('div', `project-cover cover-${project.id}`);
  // The card and dialog both reuse a cover; namespace SVG IDs to avoid collisions.
  cover.innerHTML = project.cover
    .replaceAll('id="cd-grid"', `id="cd-grid-${project.id}"`)
    .replaceAll('url(#cd-grid)', `url(#cd-grid-${project.id})`)
    .replaceAll('id="nb-dots"', `id="nb-dots-${project.id}"`)
    .replaceAll('url(#nb-dots)', `url(#nb-dots-${project.id})`);
  return cover;
}

function openCase(project, dialog, content) {
  content.replaceChildren();
  const top = create('div', 'case-topline');
  top.append(create('p', 'eyebrow', `${project.number} — ${project.kicker}`), create('p', 'case-year', project.year));
  content.append(top);
  content.append(buildCover(project));
  const title = create('h2', 'case-title', project.title);
  title.id = 'case-title';
  content.append(title);
  content.append(create('p', 'case-summary', project.summary));

  const meta = create('div', 'case-meta');
  for (const [label, value] of [['My role', project.role], ['Status', project.status], ['Focus', project.tags.join(' · ')]]) {
    const item = create('div', 'case-meta-item');
    item.append(create('span', 'eyebrow', label), create('p', '', value));
    meta.append(item);
  }
  content.append(meta);

  const body = create('div', 'case-body');
  const left = create('div', 'case-main-copy');
  left.append(create('h3', '', 'The problem'), create('p', '', project.problem));
  left.append(create('h3', '', 'What I did'));
  const approach = create('ul', 'case-list');
  project.approach.forEach((entry) => approach.append(create('li', '', entry)));
  left.append(approach);
  left.append(create('h3', '', 'Design & engineering decisions'));
  const decisions = create('ul', 'case-list');
  project.decisions.forEach((entry) => decisions.append(create('li', '', entry)));
  left.append(decisions);
  body.append(left);

  const side = create('aside', 'case-aside');
  side.append(create('p', 'eyebrow', 'Outcome / learning'), create('p', 'case-outcome', project.outcome));
  side.append(create('p', 'eyebrow', 'Tools & technology'));
  const tags = create('div', 'case-tech');
  project.stack.forEach((entry) => tags.append(create('span', 'tech-pill', entry)));
  side.append(tags);
  if (project.links.length) {
    side.append(create('p', 'eyebrow', 'Explore'));
    const links = create('div', 'case-links');
    project.links.forEach((link) => {
      const a = create('a', 'case-external', `${link.label} ↗`);
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.append(a);
    });
    side.append(links);
  }
  const note = create('p', 'case-note', project.note);
  side.append(note);
  body.append(side);
  content.append(body);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

export function initProjects() {
  const grid = document.querySelector('#project-grid');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#case-content');
  const close = dialog.querySelector('.dialog-close');

  function render(filter = 'all') {
    grid.replaceChildren();
    const selected = PROJECTS.filter((p) => filter === 'all' || p.category.includes(filter));
    selected.forEach((project) => {
      const article = create('article', `project-card${project.id === 'campus-dashboard' ? ' project-featured' : ''}`);
      article.dataset.categories = project.category.join(' ');
      article.append(buildCover(project));
      const info = create('div', 'project-info');
      const meta = create('div', 'project-meta');
      meta.append(create('span', 'project-number', project.number), create('span', 'project-year', project.year));
      info.append(meta);
      info.append(create('h3', 'project-title', project.title));
      info.append(create('p', 'project-kicker', project.kicker));
      info.append(create('p', 'project-summary', project.summary));
      const tags = create('div', 'project-tags');
      project.tags.forEach((tag) => tags.append(create('span', 'tag', tag)));
      info.append(tags);
      const foot = create('div', 'project-card-foot');
      foot.append(create('span', 'project-metric', project.metric));
      const open = create('button', 'case-open', 'Read case study');
      open.type = 'button';
      open.setAttribute('aria-label', `Read case study: ${project.title}`);
      open.addEventListener('click', () => openCase(project, dialog, content));
      foot.append(open);
      info.append(foot);
      article.append(info);
      grid.append(article);
    });
    grid.dataset.count = String(selected.length);
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const value = filter.dataset.filter;
      filters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      render(value);
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('cancel', () => document.body.classList.remove('dialog-open'));
  render();
}
