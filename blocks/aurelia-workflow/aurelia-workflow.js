function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const intro = document.createElement('div');
  intro.className = 'aurelia-section-intro';
  if (rows[0]?.children[0]) moveChildren(rows[0].children[0], intro);

  const figure = document.createElement('figure');
  figure.className = 'aurelia-workflow-figure';
  if (rows[1]?.children[0]) moveChildren(rows[1].children[0], figure);

  const caption = document.createElement('figcaption');
  if (rows[1]?.children[1]) moveChildren(rows[1].children[1], caption);
  if (caption.textContent.trim()) figure.append(caption);

  block.replaceChildren(intro, figure);
}
