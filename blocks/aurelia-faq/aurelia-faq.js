function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const introRow = rows.shift();
  const intro = document.createElement('div');
  intro.className = 'aurelia-section-intro';
  if (introRow?.children[0]) moveChildren(introRow.children[0], intro);

  const list = document.createElement('div');
  list.className = 'aurelia-faq-list';
  const footer = document.createElement('div');
  footer.className = 'aurelia-faq-footer';

  rows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];
    if (questionCell?.textContent.trim().toLowerCase() === 'link') {
      if (answerCell) moveChildren(answerCell, footer);
      return;
    }

    const item = document.createElement('div');
    item.className = 'aurelia-faq-item';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'aurelia-faq-question';
    button.id = `aurelia-faq-question-${index}`;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `aurelia-faq-answer-${index}`);
    button.textContent = questionCell?.textContent.trim() || `Question ${index + 1}`;

    const answer = document.createElement('div');
    answer.className = 'aurelia-faq-answer';
    answer.id = `aurelia-faq-answer-${index}`;
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', button.id);
    answer.hidden = true;
    if (answerCell) moveChildren(answerCell, answer);

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      answer.hidden = expanded;
    });

    item.append(button, answer);
    list.append(item);
  });

  block.replaceChildren(intro, list, footer);
}
