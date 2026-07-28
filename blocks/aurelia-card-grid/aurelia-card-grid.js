function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

function moveIntro(block, container) {
  const firstRow = block.querySelector(':scope > div');
  const firstCell = firstRow?.children[0];
  if (!firstCell || !firstCell.querySelector('h2')) return;

  const intro = document.createElement('div');
  intro.className = 'aurelia-section-intro';
  moveChildren(firstCell, intro);
  firstRow.remove();
  container.append(intro);
}

function createCard(row, variant, index) {
  const card = document.createElement('article');
  card.className = 'aurelia-card-grid-card';
  const cells = [...row.children];

  if (variant === 'insights') {
    const media = document.createElement('div');
    media.className = 'aurelia-card-grid-media';
    if (cells[0]) moveChildren(cells[0], media);
    card.append(media);

    const body = document.createElement('div');
    body.className = 'aurelia-card-grid-body';
    if (cells[1]) moveChildren(cells[1], body);
    card.append(body);
    return card;
  }

  const marker = document.createElement('div');
  marker.className = 'aurelia-card-grid-marker';
  if (variant === 'categories') {
    marker.textContent = cells[0]?.textContent.trim() || String(index + 1).padStart(2, '0');
  } else if (variant === 'industries') {
    marker.classList.add(`swatch-${index + 1}`);
    marker.setAttribute('aria-hidden', 'true');
  }
  card.append(marker);

  const body = document.createElement('div');
  body.className = 'aurelia-card-grid-body';
  const contentCell = variant === 'categories' || variant === 'industries' ? cells[1] : cells[0];
  if (contentCell) moveChildren(contentCell, body);
  card.append(body);
  return card;
}

export default function decorate(block) {
  const variant = [...block.classList].find((name) => name !== 'aurelia-card-grid' && name !== 'block');
  const container = document.createElement('div');
  container.className = 'aurelia-card-grid-inner';
  moveIntro(block, container);

  const grid = document.createElement('div');
  grid.className = 'aurelia-card-grid-list';
  [...block.querySelectorAll(':scope > div')].forEach((row, index) => {
    grid.append(createCard(row, variant, index));
  });
  container.append(grid);
  block.replaceChildren(container);
}
