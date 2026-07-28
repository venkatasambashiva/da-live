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
    <div class="aurelia-proof-instrument">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="aurelia-proof-orbit orbit-one"></div>
    <div class="aurelia-proof-orbit orbit-two"></div>
  `;

  block.replaceChildren(copy, visual);
}
