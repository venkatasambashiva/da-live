import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  if (document.body.classList.contains('aurelia')) {
    const content = footer.querySelector('.default-content-wrapper');
    if (content) {
      const paragraphs = [...content.querySelectorAll(':scope > p')];
      const links = content.querySelector(':scope > ul');
      const top = document.createElement('div');
      top.className = 'aurelia-footer-top';
      const brand = document.createElement('div');
      brand.className = 'aurelia-footer-brand';
      paragraphs.slice(0, 2).forEach((paragraph) => brand.append(paragraph));
      if (links) {
        links.className = 'aurelia-footer-links';
        top.append(brand, links);
      } else {
        top.append(brand);
      }

      const bottom = document.createElement('div');
      bottom.className = 'aurelia-footer-bottom';
      paragraphs.slice(2).forEach((paragraph) => bottom.append(paragraph));
      content.replaceChildren(top, bottom);
    }
  }

  block.append(footer);
}
