function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const content = document.createElement('div');
  content.className = 'aurelia-cta-content';
  moveChildren(cell, content);

  const actions = document.createElement('div');
  actions.className = 'aurelia-cta-actions';
  content.querySelectorAll('p.button-wrapper').forEach((button) => actions.append(button));
  if (actions.children.length) content.append(actions);

  block.replaceChildren(content);
}
