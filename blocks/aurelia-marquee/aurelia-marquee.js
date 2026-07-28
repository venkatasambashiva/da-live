function getCellText(cell) {
  return cell ? cell.textContent.trim() : '';
}

function createItem(row) {
  const item = document.createElement('div');
  item.className = 'aurelia-marquee-item';
  const [titleCell, detailCell] = [...row.children];

  const title = document.createElement('span');
  title.className = 'aurelia-marquee-title';
  title.textContent = getCellText(titleCell);
  item.append(title);

  const detail = getCellText(detailCell);
  if (detail) {
    const small = document.createElement('span');
    small.className = 'aurelia-marquee-detail';
    small.textContent = detail;
    item.append(small);
  }

  return item;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const track = document.createElement('div');
  track.className = 'aurelia-marquee-track';

  [...rows, ...rows].forEach((row, index) => {
    const item = createItem(row);
    if (index >= rows.length) item.setAttribute('aria-hidden', 'true');
    track.append(item);
  });

  const viewport = document.createElement('div');
  viewport.className = 'aurelia-marquee-viewport';
  viewport.append(track);
  block.replaceChildren(viewport);
}
