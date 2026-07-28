function moveChildren(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const copy = document.createElement('div');
  copy.className = 'aurelia-hero-copy';
  moveChildren(cell, copy);

  const actions = document.createElement('div');
  actions.className = 'aurelia-hero-actions';
  copy.querySelectorAll('p.button-wrapper').forEach((button) => actions.append(button));
  if (actions.children.length) copy.append(actions);

  const visual = document.createElement('div');
  visual.className = 'aurelia-hero-visual';
  visual.setAttribute('aria-hidden', 'true');
  visual.innerHTML = `
    <div class="aurelia-hero-panel">
      <div class="aurelia-hero-panel-top">
        <span></span><span></span><span></span>
      </div>
      <div class="aurelia-hero-chart">
        <i style="--bar-height: 64%"></i>
        <i style="--bar-height: 38%"></i>
        <i style="--bar-height: 82%"></i>
        <i style="--bar-height: 54%"></i>
        <i style="--bar-height: 72%"></i>
      </div>
      <div class="aurelia-hero-readout">
        <span>Signal drift</span>
        <strong>0.02%</strong>
      </div>
      <div class="aurelia-hero-readout">
        <span>Throughput</span>
        <strong>184 samples/hr</strong>
      </div>
    </div>
    <div class="aurelia-hero-module aurelia-hero-module-one"></div>
    <div class="aurelia-hero-module aurelia-hero-module-two"></div>
  `;

  block.replaceChildren(copy, visual);
}
