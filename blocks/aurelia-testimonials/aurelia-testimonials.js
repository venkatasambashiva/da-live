function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

function createButton(label, text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'aurelia-testimonials-control';
  button.setAttribute('aria-label', label);
  button.textContent = text;
  return button;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const introRow = rows.shift();
  const intro = document.createElement('div');
  intro.className = 'aurelia-section-intro';
  if (introRow?.children[0]) moveChildren(introRow.children[0], intro);

  const stage = document.createElement('div');
  stage.className = 'aurelia-testimonials-stage';

  const slides = rows.map((row, index) => {
    const slide = document.createElement('article');
    slide.className = 'aurelia-testimonials-slide';
    if (index !== 0) slide.hidden = true;
    const [mediaCell, quoteCell] = [...row.children];

    const media = document.createElement('div');
    media.className = 'aurelia-testimonials-avatar';
    if (mediaCell) moveChildren(mediaCell, media);

    const quote = document.createElement('div');
    quote.className = 'aurelia-testimonials-quote';
    if (quoteCell) moveChildren(quoteCell, quote);

    slide.append(media, quote);
    stage.append(slide);
    return slide;
  });

  const controls = document.createElement('div');
  controls.className = 'aurelia-testimonials-controls';
  const previous = createButton('Show previous testimonial', '<');
  const next = createButton('Show next testimonial', '>');
  const dots = document.createElement('div');
  dots.className = 'aurelia-testimonials-dots';

  let activeIndex = 0;
  const setActive = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.hidden = index !== activeIndex;
    });
    dots.querySelectorAll('button').forEach((dot, index) => {
      dot.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
    });
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    dot.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => setActive(index));
    dots.append(dot);
  });

  previous.addEventListener('click', () => setActive(activeIndex - 1));
  next.addEventListener('click', () => setActive(activeIndex + 1));
  controls.append(previous, dots, next);
  block.replaceChildren(intro, stage, controls);
}
