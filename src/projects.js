// Project content lives here. Add demo/video/social links to `links` when ready.
// The first link becomes the cover image link; all links appear on the card and in its case study.
export const PROJECTS = [
  {
    id: 'campus-dashboard', number: '01', title: 'Campus Dashboard',
    kicker: 'Campus event planner / Thomso tracker', year: '2026 - Present',
    category: ['product', 'engineering'], tags: ['Product thinking', 'Full-stack', '3D map'],
    summary: 'A campus experience that brings events, venues and day-planning into one place.',
    metric: '1,000+ unique visitors',
    role: 'Product research and design, 3D map, architecture, frontend and backend engineering',
    status: 'Live product',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Illustration of the Thomso event tracker and campus map"><defs><pattern id="cd-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#aab7d7" stroke-width="1"/></pattern></defs><rect width="680" height="420" rx="22" fill="#f3f2ed"/><rect width="680" height="420" rx="22" fill="url(#cd-grid)"/><path d="M-10 310 C130 260 135 165 260 205 S430 340 700 80" fill="none" stroke="#ffcf31" stroke-width="34" stroke-linecap="round"/><path d="M-10 310 C130 260 135 165 260 205 S430 340 700 80" fill="none" stroke="#242b8c" stroke-width="4" stroke-dasharray="7 10"/><g fill="#1d2b92" stroke="#fff" stroke-width="7"><circle cx="124" cy="266" r="15"/><circle cx="260" cy="205" r="15"/><circle cx="414" cy="277" r="15"/><circle cx="560" cy="172" r="15"/></g><rect x="44" y="40" width="244" height="116" rx="14" fill="#fff" stroke="#d4d5df"/><text x="66" y="72" font-size="14" fill="#6a6b82" font-family="Arial">THOMSO / EVENT TRACKER</text><text x="66" y="102" font-size="26" font-weight="700" fill="#1b214d" font-family="Arial">Find your next</text><text x="66" y="130" font-size="26" font-weight="700" fill="#1b214d" font-family="Arial">moment.</text><rect x="388" y="30" width="240" height="96" rx="14" fill="#202b91"/><text x="410" y="61" font-size="13" fill="#cbd3ff" font-family="Arial">YOUR PLAN</text><text x="410" y="91" font-size="21" font-weight="700" fill="#fff" font-family="Arial">4 saved events</text><circle cx="594" cy="90" r="13" fill="#ffcf31"/></svg>`,
    problem: 'During Thomso, many performances, competitions and activities happen across campus. A schedule says what and when, but visitors still need to find each venue and decide how to move between events.',
    approach: [
      'Brought event discovery and campus geography together so visitors can go from finding an event to locating its venue.',
      'Added a personalized event list to help people plan around the performances and competitions they care about.',
      'Extended access for visitors from outside IIT Roorkee and added a 3D campus map, venue navigation and a crowd heatmap.',
      'Built an email-ingestion pipeline that turns campus broadcasts into reviewable event proposals for administrators.'
    ],
    decisions: [
      'Treat what, when and where as one connected task instead of separate lookups.',
      'Keep automated event extraction reviewable by admins rather than silently publishing unverified notices.',
      'Build the product around campus geography, not just a list of event names.'
    ],
    outcome: 'The platform passed 1,000 unique visitors during the Thomso period, according to the site analytics. It is a live campus-facing product, not only a prototype.',
    stack: ['React', 'Express', 'PostgreSQL', 'AWS', 'OAuth', '3D campus map'],
    links: [
      { label: 'Open Campus Dashboard', href: 'https://campus-dashboard.iitr.ac.in/' },
      { label: 'Open Thomso Event Tracker', href: 'https://campus-dashboard.iitr.ac.in/app/fest/now' }
    ],
    note: 'Built with the Tinkering Lab team at IIT Roorkee. Team-wide decisions and implementation were collaborative; the role listed here reflects my direct contributions.'
  },
  {
    id: 'flingbizz', number: '02', title: 'FlingBizz',
    kicker: 'Skill-based networking and project matching', year: '2025 - 2026',
    category: ['product'], tags: ['React Native', 'Figma handoff', 'Early testing'],
    summary: 'An early-stage platform for people who want to find collaborators and build projects together.',
    metric: '100+ member WhatsApp tester community',
    role: 'React Native development and implementation of my co-founder’s Figma designs',
    status: 'Paused early-stage product',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Illustration of connected collaborators"><rect width="680" height="420" rx="22" fill="#f7f0e5"/><g stroke="#22254a" stroke-width="3" opacity=".55"><path d="M114 122L284 202L490 108L544 284L334 326L284 202L544 284L490 108" fill="none"/><path d="M114 122L173 310L334 326L284 202" fill="none"/></g><g><circle cx="114" cy="122" r="43" fill="#ff725e"/><circle cx="284" cy="202" r="50" fill="#242b8c"/><circle cx="490" cy="108" r="38" fill="#e4bd36"/><circle cx="544" cy="284" r="43" fill="#a9c9b5"/><circle cx="334" cy="326" r="30" fill="#efb2d2"/><circle cx="173" cy="310" r="25" fill="#8ca7e8"/></g><g fill="#fff" font-family="Arial" font-size="22" font-weight="700" text-anchor="middle"><text x="114" y="130">UI</text><text x="284" y="210">Build</text><text x="490" y="116">Match</text><text x="544" y="292">Go</text></g><rect x="38" y="28" width="194" height="42" rx="21" fill="#22254a"/><text x="59" y="55" font-size="17" font-family="Arial" fill="#fff">FIND YOUR PEOPLE</text></svg>`,
    problem: 'The product vision focused on a common early-builder problem: people with ideas are spread across campus, professional networks and online communities, making it difficult to find the right people to create something with.',
    approach: [
      'Implemented mobile interfaces in React Native using Figma designs created by my co-founder.',
      'Worked on a product concept centered on discovering potential collaborators through skills, interests and project needs.',
      'Contributed to an early feedback and testing community of 100+ people organized through WhatsApp.'
    ],
    decisions: [
      'Translate established Figma designs into usable mobile interfaces rather than treating mockups as the finished product.',
      'Keep discovery and collaboration at the center of the concept rather than presenting it as a conventional job board.'
    ],
    outcome: 'The team worked on the app for several months and built an early tester community. Development was later paused because both founders could not consistently commit the required time. It was an early-stage product, not a launched, scaled business.',
    stack: ['React Native', 'Figma', 'Mobile UI implementation'],
    links: [],
    note: 'The Figma designs were created by my co-founder. My contribution was primarily mobile development and implementation.'
  },
  {
    id: 'nodeboard', number: '03', title: 'NodeBoard',
    kicker: 'Real-time collaborative diagram editor', year: '2026',
    category: ['engineering', 'product'], tags: ['Canvas UI', 'WebSockets', 'Collaboration'],
    summary: 'A shared diagramming canvas for creating and editing visual ideas together in real time.',
    metric: 'Full-stack collaborative MVP', role: 'React/TypeScript frontend and Node.js/WebSocket backend',
    status: 'Built and deployed MVP',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Diagram editor canvas illustration"><rect width="680" height="420" rx="22" fill="#eef0f7"/><defs><pattern id="nb-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#c6cce0"/></pattern></defs><rect width="680" height="420" rx="22" fill="url(#nb-dots)"/><g stroke="#5c68c8" stroke-width="4" fill="none"><path d="M190 130H320V230H436"/><path d="M320 230V315H490"/><path d="M436 230V130H536"/></g><g><rect x="90" y="88" width="180" height="84" rx="13" fill="#fff" stroke="#b9c0e6" stroke-width="2"/><rect x="276" y="190" width="180" height="84" rx="13" fill="#262b86"/><rect x="448" y="88" width="150" height="84" rx="13" fill="#ffce39"/><rect x="438" y="284" width="150" height="62" rx="13" fill="#fff" stroke="#b9c0e6" stroke-width="2"/></g><g font-family="Arial" font-size="17" font-weight="700" text-anchor="middle"><text x="180" y="136" fill="#20244a">Idea</text><text x="366" y="238" fill="#fff">Collaborate</text><text x="523" y="136" fill="#20244a">Decision</text><text x="513" y="321" fill="#20244a">Next step</text></g><circle cx="554" cy="54" r="13" fill="#ef725a"/><circle cx="586" cy="54" r="13" fill="#4d9677"/><circle cx="618" cy="54" r="13" fill="#555dbb"/></svg>`,
    problem: 'Visual planning tools are most useful when people can move from a rough idea to a shared structure without constantly exporting files or reconciling different versions.',
    approach: [
      'Built a canvas-based interface using React, TypeScript and HTML5 Canvas for interactive diagram manipulation.',
      'Implemented collaboration rooms, shareable boards and synchronized state using WebSockets.',
      'Developed a Node.js/Express backend with REST APIs and server-side JSON persistence, sharing TypeScript models between client and server.'
    ],
    decisions: [
      'Separate the drawing surface from the collaboration layer so interaction and synchronization can be reasoned about independently.',
      'Share model and protocol types across client and server to reduce drift in exchanged data.'
    ],
    outcome: 'A functioning real-time diagramming MVP deployed with a Vercel frontend and Render backend.',
    stack: ['React', 'TypeScript', 'HTML5 Canvas', 'WebSockets', 'Node.js', 'Express'],
    links: [], note: 'Add a live demo or short collaboration walkthrough here when ready.'
  },
  {
    id: 'gta-iitr', number: '04', title: 'GTA-IITR: 3D Campus Simulator',
    kicker: 'Interactive campus exploration game', year: '2025',
    category: ['creative'], tags: ['Blender', 'Unity', 'Environment design'],
    summary: 'A GTA-style campus exploration concept built around recognizable IIT Roorkee locations and environments.',
    metric: 'Best Presentation, Shrishti 2025',
    role: 'Game ideation and pitching, Blender modeling, environment design and showcase presentation',
    status: 'Team showcase project',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Stylized 3D campus environment illustration"><rect width="680" height="420" rx="22" fill="#20234f"/><circle cx="530" cy="86" r="48" fill="#ffcf39"/><path d="M0 292L140 198L242 258L345 154L470 252L580 176L680 234V420H0Z" fill="#323977"/><path d="M0 338L170 270L305 318L457 250L680 310V420H0Z" fill="#4b5791"/><g stroke="#a8b5ef" stroke-width="2"><path d="M70 353V270H130V353M140 353V238H210V353M230 353V284H289V353M410 351V246H462V351M480 351V280H545V351" fill="#e8e9f7"/><path d="M82 285H118M82 304H118M82 323H118M151 257H199M151 277H199M151 297H199M151 317H199M420 266H452M420 286H452M420 306H452M493 298H531M493 318H531"/></g><path d="M0 365L170 333L335 366L470 332L680 365" fill="none" stroke="#ffcf39" stroke-width="7"/><text x="38" y="52" fill="#c9d0ff" font-family="Arial" font-size="16" letter-spacing="4">WORLD BUILDING / 3D</text><text x="38" y="91" fill="#fff" font-family="Arial" font-size="30" font-weight="700">Explore IIT Roorkee.</text></svg>`,
    problem: 'The concept explored how an interactive game could turn the real IIT Roorkee campus into an explorable world with familiar locations and missions.',
    approach: [
      'Ideated and pitched the GTA-style campus-exploration concept.',
      'Created 3D models of campus locations in Blender and prepared assets for Unity integration.',
      'Contributed to team coordination and the final showcase presentation.'
    ],
    decisions: [
      'Use recognizable campus architecture to make the fictional experience feel grounded in a real place.',
      'Treat the environment as part of the player experience, not just a collection of standalone models.'
    ],
    outcome: 'The team received the Best Presentation Award at Shrishti 2025. My contribution centered on the concept, pitching, 3D environment work and presentation.',
    stack: ['Blender', 'Unity', '3D modeling', 'Environment design'], links: [],
    note: 'This was a team project. The description focuses on my own design and 3D contributions.'
  },
  {
    id: 'redemption-vr', number: '05', title: 'Redemption IITR: Zombie Survival VR',
    kicker: 'Virtual reality game', year: '2025',
    category: ['creative'], tags: ['3D assets', 'Blender', 'VR / Unity'],
    summary: 'A zombie-survival VR experience with immersive environments and game-ready 3D assets.',
    metric: 'Best Presentation, Shrishti 2025',
    role: '3D asset design, Unity-ready asset preparation and showcase presentation',
    status: 'Team showcase project',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Atmospheric zombie survival game environment illustration"><rect width="680" height="420" rx="22" fill="#171c31"/><circle cx="520" cy="86" r="45" fill="#cad1b2" opacity=".86"/><path d="M0 240L120 170L210 222L342 110L455 216L565 146L680 212V420H0Z" fill="#29394a"/><path d="M0 302L140 251L242 292L390 236L510 286L680 239V420H0Z" fill="#344b4a"/><g fill="#b6c4b3" stroke="#151a2e" stroke-width="5"><path d="M82 342V217H166V342Z"/><path d="M178 342V193H247V342Z"/><path d="M427 342V207H493V342Z"/><path d="M505 342V245H590V342Z"/></g><g fill="#ffcf39"><rect x="100" y="246" width="12" height="18"/><rect x="135" y="246" width="12" height="18"/><rect x="196" y="219" width="12" height="18"/><rect x="456" y="236" width="12" height="18"/><rect x="536" y="269" width="12" height="18"/></g><path d="M0 382L150 349L322 386L492 348L680 380" fill="none" stroke="#ffcf39" stroke-width="5" opacity=".8"/><text x="36" y="54" fill="#c9d0ff" font-family="Arial" font-size="15" letter-spacing="4">IMMERSIVE GAME DESIGN</text><text x="36" y="94" fill="#fff" font-family="Arial" font-size="32" font-weight="700">Redemption VR</text></svg>`,
    problem: 'The project needed convincing 3D assets that could support the atmosphere of an immersive zombie-survival game while still being practical to use in Unity.',
    approach: [
      'Led 3D asset design for the VR game and prepared assets for Unity integration.',
      'Focused on performance-conscious, game-ready assets for immersive gameplay.',
      'Helped present the experience during the Shrishti showcase.'
    ],
    decisions: [
      'Balance visual detail with asset performance so the experience remains suitable for VR.',
      'Use environment and asset choices to support the mood of the game.'
    ],
    outcome: 'The team received the Best Presentation Award at Shrishti 2025. My main contribution was 3D asset design and support for the showcase.',
    stack: ['Blender', 'Unity', '3D asset design', 'VR'], links: [],
    note: 'This was a collaborative team project. Performance improvements should only be quantified if measurements are available.'
  },
  {
    id: 'hercules-habit-warrior', number: '06', title: 'Hercules Habit Warrior',
    kicker: 'Gamified productivity app with spider-chart visualization', year: '2025 - Present',
    category: ['product', 'engineering'], tags: ['Habit tracking', 'Visualization', 'Responsive UI'],
    summary: 'A habit-tracking web app that uses a spider chart to make progress across habits more visible.',
    metric: 'Habit and progress visualization',
    role: 'Web interface implementation and UI/UX exploration', status: 'Personal project',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Habit tracking dashboard with a spider chart"><rect width="680" height="420" rx="22" fill="#eff2eb"/><circle cx="230" cy="210" r="120" fill="#fff" stroke="#d1ddcf" stroke-width="2"/><g stroke="#d9e0d8" stroke-width="2" fill="none"><path d="M230 91L342 172L300 310L160 310L118 172Z"/><path d="M230 130L305 184L277 270L183 270L155 184Z"/><path d="M230 169L268 197L254 240L206 240L192 197Z"/></g><path d="M230 120L300 178L268 260L176 240L164 180Z" fill="#6d7be1" opacity=".65" stroke="#333b91" stroke-width="3"/><g fill="#252b81"><circle cx="230" cy="120" r="7"/><circle cx="300" cy="178" r="7"/><circle cx="268" cy="260" r="7"/><circle cx="176" cy="240" r="7"/><circle cx="164" cy="180" r="7"/></g><rect x="390" y="72" width="220" height="82" rx="14" fill="#252b81"/><text x="414" y="103" fill="#c8ceff" font-family="Arial" font-size="15">THIS WEEK</text><text x="414" y="134" fill="#fff" font-family="Arial" font-size="28" font-weight="700">4 / 5 goals</text><rect x="390" y="174" width="220" height="60" rx="12" fill="#fff" stroke="#d1ddcf"/><rect x="390" y="250" width="220" height="60" rx="12" fill="#ffcf39"/><path d="M413 204h18m-9 -9v18M413 280h18m-9 -9v18" stroke="#252b81" stroke-width="3" stroke-linecap="round"/><text x="445" y="210" fill="#24284a" font-family="Arial" font-size="17">Habit streak</text><text x="445" y="286" fill="#24284a" font-family="Arial" font-size="17">Target reached</text></svg>`,
    problem: 'Habit tracking can become a flat list of checkboxes. This project explores a more visual way to review patterns and progress across habits.',
    approach: [
      'Built a web app for tracking habits and visualizing progress with an interactive spider chart.',
      'Made the interface responsive across mobile and desktop layouts.',
      'Explored gamification elements to give progress feedback a clearer sense of momentum.'
    ],
    decisions: [
      'Make progress visible through a chart instead of relying only on checked tasks.',
      'Keep the interface responsive so a quick progress check works on smaller screens.'
    ],
    outcome: 'A personal productivity experiment focused on habit tracking, visual feedback and responsive UI. It should be presented as a project, not as a validated or scaled product.',
    stack: ['JavaScript', 'HTML/CSS', 'Data visualization', 'Responsive UI'], links: [],
    note: 'Add a live demo or a short walkthrough when available.'
  },
  {
    id: 'targetchase', number: '07', title: 'TargetChase',
    kicker: 'Cricket-inspired productivity and goal tracking', year: '2026',
    category: ['product', 'engineering'], tags: ['Gamification', 'Goal tracking', 'Interactive feedback'],
    summary: 'A productivity concept that turns personal goals into cricket-inspired targets and challenges.',
    metric: 'Goal tracking concept', role: 'Product concept and web implementation', status: 'Personal project',
    cover: `<svg viewBox="0 0 680 420" role="img" aria-label="Cricket-inspired goal tracking illustration"><rect width="680" height="420" rx="22" fill="#f8f0d9"/><circle cx="228" cy="212" r="136" fill="#fff" stroke="#d4d7bb" stroke-width="3"/><circle cx="228" cy="212" r="104" fill="#c7d8ae" stroke="#426d54" stroke-width="3"/><circle cx="228" cy="212" r="70" fill="#eff3d9" stroke="#426d54" stroke-width="3"/><circle cx="228" cy="212" r="34" fill="#ffcf39" stroke="#242b8c" stroke-width="3"/><path d="M228 76V348M92 212H364" stroke="#426d54" stroke-width="2" stroke-dasharray="7 8"/><rect x="408" y="78" width="216" height="88" rx="14" fill="#242b8c"/><text x="432" y="110" fill="#cbd3ff" font-family="Arial" font-size="14">TODAY'S TARGET</text><text x="432" y="145" fill="#fff" font-family="Arial" font-size="28" font-weight="700">3 / 5 done</text><rect x="408" y="188" width="216" height="16" rx="8" fill="#d8ddcb"/><rect x="408" y="188" width="130" height="16" rx="8" fill="#426d54"/><text x="408" y="244" fill="#242b8c" font-family="Arial" font-size="19" font-weight="700">Keep the streak going</text><text x="408" y="276" fill="#505272" font-family="Arial" font-size="15">One target at a time.</text></svg>`,
    problem: 'Personal goals can feel vague or difficult to track. TargetChase frames them as targets, with progress feedback inspired by cricket.',
    approach: [
      'Developed a gamified productivity platform that turns goals into target-based challenges.',
      'Added progress tracking and interactive visual feedback to help users see movement toward a target.'
    ],
    decisions: [
      'Use a familiar cricket metaphor to frame progress and milestones.',
      'Keep progress feedback visible so the next action feels concrete.'
    ],
    outcome: 'A personal product experiment exploring goal tracking and gamification.',
    stack: ['JavaScript', 'HTML/CSS', 'Product UI', 'Gamification'], links: [],
    note: 'Add a live demo or walkthrough when available.'
  }
];

const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

let coverInstance = 0;
function buildCover(project) {
  const cover = create('div', `project-cover cover-${project.id}`);
  const instance = `${project.id}-${++coverInstance}`;
  cover.innerHTML = project.cover
    .replaceAll('id="cd-grid"', `id="cd-grid-${instance}"`)
    .replaceAll('url(#cd-grid)', `url(#cd-grid-${instance})`)
    .replaceAll('id="nb-dots"', `id="nb-dots-${instance}"`)
    .replaceAll('url(#nb-dots)', `url(#nb-dots-${instance})`);
  return cover;
}

function buildCoverControl(project, dialog, content) {
  const link = project.links[0];
  if (link?.href) {
    const anchor = create('a', 'project-cover-control');
    anchor.href = link.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', `${link.label} (opens in a new tab)`);
    anchor.append(buildCover(project));
    return anchor;
  }
  const button = create('button', 'project-cover-control');
  button.type = 'button';
  button.setAttribute('aria-label', `Open case study: ${project.title}`);
  button.append(buildCover(project));
  button.addEventListener('click', () => openCase(project, dialog, content, button));
  return button;
}

let lastTrigger = null;
function openCase(project, dialog, content, trigger = null) {
  lastTrigger = trigger || document.activeElement;
  content.replaceChildren();
  const top = create('div', 'case-topline');
  top.append(create('p', 'eyebrow', `${project.number} - ${project.kicker}`), create('p', 'case-year', project.year));
  content.append(top, buildCover(project));
  const title = create('h2', 'case-title', project.title);
  title.id = 'case-title';
  content.append(title, create('p', 'case-summary', project.summary));

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
  left.append(approach, create('h3', '', 'Design and engineering decisions'));
  const decisions = create('ul', 'case-list');
  project.decisions.forEach((entry) => decisions.append(create('li', '', entry)));
  left.append(decisions);
  body.append(left);

  const side = create('aside', 'case-aside');
  side.append(create('p', 'eyebrow', 'Outcome / learning'), create('p', 'case-outcome', project.outcome));
  side.append(create('p', 'eyebrow', 'Tools and technology'));
  const tags = create('div', 'case-tech');
  project.stack.forEach((entry) => tags.append(create('span', 'tech-pill', entry)));
  side.append(tags);
  if (project.links.length) {
    side.append(create('p', 'eyebrow', 'Project links'));
    const links = create('div', 'case-links');
    project.links.forEach((link) => {
      if (!link.href) return;
      const a = create('a', 'case-external', `${link.label} ↗`);
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.append(a);
    });
    side.append(links);
  }
  side.append(create('p', 'case-note', project.note));
  body.append(side);
  content.append(body);

  dialog.showModal();
  dialog.scrollTop = 0;
  content.scrollTop = 0;
  document.body.classList.add('dialog-open');
  window.dispatchEvent(new CustomEvent('portfolio:modal-open'));
}

function tiltCard(card, reducedMotion) {
  if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  card.addEventListener('pointermove', (event) => {
    if (event.target.closest('a')) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 5.5;
    const rotateX = (0.5 - py) * 4.5;
    card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    card.style.setProperty('--pointer-x', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--pointer-y', `${(py * 100).toFixed(1)}%`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
  });
}

export function initProjects() {
  const grid = document.querySelector('#project-grid');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#case-content');
  const close = dialog.querySelector('.dialog-close');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render(filter = 'all') {
    grid.replaceChildren();
    const selected = PROJECTS.filter((project) => filter === 'all' || project.category.includes(filter));
    selected.forEach((project) => {
      const article = create('article', `project-card${project.id === 'campus-dashboard' ? ' project-featured' : ''}`);
      article.dataset.categories = project.category.join(' ');
      article.style.setProperty('--card-index', String(Number(project.number) - 1));
      article.append(buildCoverControl(project, dialog, content));

      const infoButton = create('button', 'project-info-trigger');
      infoButton.type = 'button';
      infoButton.setAttribute('aria-label', `Open case study: ${project.title}`);
      const info = create('div', 'project-info');
      const meta = create('div', 'project-meta');
      meta.append(create('span', 'project-number', project.number), create('span', 'project-year', project.year));
      info.append(meta, create('h3', 'project-title', project.title), create('p', 'project-kicker', project.kicker), create('p', 'project-summary', project.summary));
      const tags = create('div', 'project-tags');
      project.tags.forEach((tag) => tags.append(create('span', 'tag', tag)));
      info.append(tags);
      const foot = create('div', 'project-card-foot');
      foot.append(create('span', 'project-metric', project.metric), create('span', 'case-open', 'Open case study'));
      info.append(foot);
      infoButton.append(info);
      infoButton.addEventListener('click', () => openCase(project, dialog, content, infoButton));
      article.append(infoButton);

      if (project.links.length) {
        const linkRow = create('div', 'project-card-links');
        project.links.forEach((link) => {
          if (!link.href) return;
          const anchor = create('a', 'project-external-link', `${link.label} ↗`);
          anchor.href = link.href;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          linkRow.append(anchor);
        });
        article.append(linkRow);
      }
      tiltCard(article, reducedMotion);
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
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    window.dispatchEvent(new CustomEvent('portfolio:modal-close'));
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
  });
  render();
}
