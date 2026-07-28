# Recreate Aurelia Source Page at `/source`

## Summary
Build the referenced Aurelia Scientific page as `https://da.live/#/venkatasambashiva/da-live/source`, not the root home page. The execution will first try DA Live authoring through the DA Source API/browser session, then fall back to a complete local `drafts/` backup if DA still returns “Not permitted.” DA’s Source API supports creating folders, HTML documents, JSON, and media, and file creation uses multipart `data` uploads. ([docs.da.live](https://docs.da.live/developers/api/source))

## Implementation Changes
- Add an Aurelia page theme scoped by metadata `theme: aurelia`, preserving the source visual tokens: navy `#132C45`, deep navy `#0B1E32`, teal `#2FB6A8`, amber `#E7A649`, paper `#F6F8F9`, Inter, Space Grotesk, and IBM Plex Mono.
- Create reusable EDS blocks for the page sections:
  `aurelia-hero`, `aurelia-marquee`, `aurelia-card-grid`, `aurelia-workflow`, `aurelia-proof`, `aurelia-testimonials`, `aurelia-faq`, and `aurelia-cta`.
- Update `header` and `footer` styling/decorators only as needed to support the Aurelia utility bar, nav row, tools, dark footer, and responsive behavior while preserving existing boilerplate behavior for non-Aurelia pages.
- Add local font files under `fonts/aurelia/`, page/theme CSS in `styles/`, and a small `icons/aurelia-logo.svg`; keep generated SVG-style lab panels as CSS/DOM rather than image assets.
- Download and use all external image assets from the source page:
  `workflow.gif`, `photo-lab-3.jpg`, `photo-lab-4.jpg`, `photo-lab-5.jpg`, `avatar-1.png`, `avatar-2.png`, `avatar-3.png`.
- Upload those assets under DA path `/media/aurelia/` when DA write access works; DA docs recommend media folders as a supported organization pattern and list JPG, PNG, GIF, SVG, PDF, and MP4 as supported media types. 

## DA And Local Content
- DA primary target:
  create/update `/source.html`, `/nav.html`, `/footer.html`, `/media/`, and `/media/aurelia/` under `venkatasambashiva/da-live`.
- DA API attempt:
  verify list/write access first; if `admin.da.live` returns `401` or `403`, stop DA mutation attempts and use local fallback. DA permissions are controlled with read/write actions in DA config. 
- Local fallback:
  create `drafts/source.plain.html`, `drafts/nav.plain.html`, `drafts/footer.plain.html`, and `drafts/media/aurelia/*`.
- Authoring model:
  use simple block tables for each section, with collection rows for product/category/industry/insight/testimonial/FAQ items. Preserve source content order: hero, product ticker, customer strip, category grid, industry cards, workflow GIF, proof/stat split, insights, testimonials, FAQ, CTA, footer.

## Test Plan
- Install dependencies if needed with `npm install`; current `node_modules` is absent.
- Run `npm run lint` and fix JS/CSS lint issues.
- Start local preview with:
  `npx -y @adobe/aem-cli up --no-open --forward-browser-logs --html-folder drafts`
- Validate `http://localhost:3000/source` and `http://localhost:3000/source.plain.html` with Chrome DevTools screenshots at desktop, tablet, and narrow mobile widths.
- Verify all seven images load, the workflow GIF animates, FAQ items toggle with accessible buttons, testimonial arrows/dots update the active slide, and there is no horizontal overflow or console error.
- If DA creation succeeds, validate the DA edit URL and the AEM preview URL for `/source`; if DA remains blocked, deliver the local backup as the complete working artifact.

## Assumptions
- Target is `/source`, per your selection; root `/index.html` is left untouched.
- DA should be tried first, then local fallback, per your selection.
- The existing `.gitignore` change is user-owned and must not be reverted.
- Use `git -c safe.directory=...` for read-only git checks instead of changing global git config.
- No DA-specific MCP is loaded; Chrome DevTools MCP is available for inspection and UI/API-assisted authoring.
