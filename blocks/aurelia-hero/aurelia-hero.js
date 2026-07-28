function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const copy = document.createElement('div');
  copy.className = 'aurelia-hero-copy';
  moveChildren(cell, copy);

  const heading = copy.querySelector('h1');
  if (heading && !heading.querySelector('br')) {
    heading.innerHTML = heading.innerHTML.replace(',', ',<br>');
  }

  const actions = document.createElement('div');
  actions.className = 'aurelia-hero-actions';
  copy.querySelectorAll('p.button-wrapper').forEach((button) => actions.append(button));
  if (actions.children.length) copy.append(actions);

  const visual = document.createElement('div');
  visual.className = 'aurelia-hero-visual';
  visual.setAttribute('aria-hidden', 'true');
  visual.innerHTML = `
    <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aurelia-hero-surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1E3F60"></stop>
          <stop offset="100%" stop-color="#0B1E32"></stop>
        </linearGradient>
        <linearGradient id="aurelia-hero-signal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3FCFC0"></stop>
          <stop offset="100%" stop-color="#1E8C81"></stop>
        </linearGradient>
      </defs>
      <rect width="520" height="400" fill="url(#aurelia-hero-surface)"></rect>
      <rect x="60" y="120" width="400" height="200" rx="10" fill="#0F2A44" stroke="#2A4D6E" stroke-width="1.5"></rect>
      <rect x="80" y="140" width="200" height="110" rx="4" fill="#08182A"></rect>
      <path d="M85 235 L120 190 L150 210 L185 165 L220 200 L260 150" stroke="url(#aurelia-hero-signal)" stroke-width="3" fill="none" stroke-linecap="round"></path>
      <circle cx="120" cy="190" r="3" fill="#3FCFC0"></circle>
      <circle cx="185" cy="165" r="3" fill="#3FCFC0"></circle>
      <circle cx="260" cy="150" r="3" fill="#3FCFC0"></circle>
      <rect x="300" y="140" width="140" height="16" rx="3" fill="#1B3A5C"></rect>
      <rect x="300" y="164" width="100" height="10" rx="2" fill="#26496C"></rect>
      <rect x="300" y="182" width="120" height="10" rx="2" fill="#26496C"></rect>
      <rect x="300" y="200" width="80" height="10" rx="2" fill="#26496C"></rect>
      <circle cx="420" cy="270" r="18" fill="none" stroke="#3FCFC0" stroke-width="2"></circle>
      <circle cx="420" cy="270" r="4" fill="#3FCFC0"></circle>
      <rect x="60" y="330" width="400" height="14" rx="7" fill="#0F2A44"></rect>
    </svg>
  `;

  block.replaceChildren(copy, visual);
}
