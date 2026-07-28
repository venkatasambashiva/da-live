function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  const [copyCell, statsCell] = row ? [...row.children] : [];

  const copy = document.createElement('div');
  copy.className = 'aurelia-proof-copy';
  if (copyCell) moveChildren(copyCell, copy);

  const stats = document.createElement('div');
  stats.className = 'aurelia-proof-stats';
  if (statsCell) {
    [...statsCell.children].forEach((item) => {
      const stat = document.createElement('div');
      stat.className = 'aurelia-proof-stat';
      stat.append(item);
      stats.append(stat);
    });
  }
  copy.append(stats);

  const visual = document.createElement('div');
  visual.className = 'aurelia-proof-visual';
  visual.setAttribute('aria-hidden', 'true');
  visual.innerHTML = `
    <svg viewBox="0 0 500 380" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="380" fill="#132C45"></rect>
      <g opacity="0.9">
        <rect x="40" y="40" width="420" height="60" rx="4" fill="#1E3F60"></rect>
        <rect x="60" y="58" width="140" height="10" rx="2" fill="#2FB6A8"></rect>
        <rect x="60" y="76" width="90" height="8" rx="2" fill="#3A5A78"></rect>
        <rect x="40" y="116" width="200" height="220" rx="4" fill="#0F2A44"></rect>
        <path d="M60 300 L100 250 L130 270 L170 200 L210 240" stroke="#2FB6A8" stroke-width="2.5" fill="none"></path>
        <rect x="256" y="116" width="204" height="100" rx="4" fill="#0F2A44"></rect>
        <rect x="256" y="232" width="204" height="104" rx="4" fill="#0F2A44"></rect>
        <circle cx="358" cy="166" r="30" fill="none" stroke="#E7A649" stroke-width="2"></circle>
        <circle cx="358" cy="284" r="4" fill="#2FB6A8"></circle>
        <circle cx="398" cy="284" r="4" fill="#2FB6A8"></circle>
        <circle cx="438" cy="284" r="4" fill="#E7A649"></circle>
      </g>
    </svg>
  `;

  block.replaceChildren(copy, visual);
}
