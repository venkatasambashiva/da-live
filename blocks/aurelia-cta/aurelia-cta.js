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
  if (actions.children.length) {
    const copy = document.createElement('div');
    copy.className = 'aurelia-cta-copy';
    [...content.children].forEach((child) => copy.append(child));
    content.append(copy, actions);
  }

  block.replaceChildren(content);
}
