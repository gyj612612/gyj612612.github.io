# Personal Homepage Knowledge Base

## Goal

Build a GitHub Pages friendly personal homepage for Gao Yujie with a polished portfolio surface and an interactive resume/portfolio reader.

## Local Reference Intake

- `dmego/home.github.io`
  - Requested reference.
  - `git clone` repeatedly timed out in this environment, but GitHub zip downloads succeeded.
  - Useful pattern: no-build static site, simple `index.html`, GitHub Pages compatible, light animation, remote assets.
  - Avoid copying directly: its current template is a full-screen single card, depends on remote unpkg assets, and is less suitable for a resume/portfolio browsing experience.
- `cobiwave/simplefolio`
  - Downloaded as a zip reference.
  - Useful pattern: clear sections for hero, about, projects, contact, reveal animation.
  - Avoid copying directly: old Parcel/Bootstrap stack adds dependencies and its resume treatment is only a PDF link.

## Web Reference Intake

- GitHub Pages official docs: a static site can be published from a repository branch, which fits a root-level `index.html` workflow.
- PDF.js: useful for in-browser PDF rendering, but overkill for a static portfolio when we can pre-render PDF pages as images.
- Swiper-style touch carousel patterns: useful interaction model, but a custom lightweight reader is enough for page swipe, buttons, dots, keyboard navigation, and thumbnails.

## Design Direction

- Use a restrained editorial portfolio layout rather than a generic developer template.
- First screen should immediately communicate name, discipline, and strongest work signals.
- Keep visual assets concrete: convert CV facts into structured web sections and keep the portfolio PDF as the only downloadable document.
- Avoid single-color dominance, oversized marketing cards, nested cards, and decorative gradient blobs.
- Use a quiet background, sharp typography, measured spacing, and real document previews.
- Make project/resume browsing central, not hidden behind a download link.

## Interaction Direction

- Build an interactive document reader:
  - use structured HTML resume cards, not screenshots as page content;
  - swipe left/right on touch devices;
  - previous/next controls on desktop;
  - keyboard arrow navigation;
  - page dots;
  - downloadable portfolio PDF as supporting material only.
- Keep all interactions in plain JavaScript for easy GitHub Pages publishing.

## Implementation Direction

- Current implementation uses the `dmego/home.github.io` static homepage pattern:
  - full-screen `panel-cover` intro;
  - rotating Bing background from `assets/json/images.js`;
  - Hitokoto quote from `https://v1.hitokoto.cn`;
  - primary and social shortcut navigation;
  - structured content sections below the cover.
- Keep it as a static site:
  - `index.html`
  - `assets/css/vno.css`
  - `assets/css/home-custom.css`
  - `assets/js/home-custom.js`
  - `assets/docs/Gao-Yujie-portfolio.pdf` for the portfolio download only
- Optional local dev server: `python -m http.server`.
- Avoid requiring a JavaScript build unless later features clearly need it.
- GitHub login is not needed for cloning public references or local preview.
- GitHub login will be needed only when pushing to a user-owned repository through authenticated `git`/`gh`.

## Publishing Notes

- For a user site, create a repository named `<github-username>.github.io`.
- Push the static files to the default branch.
- In GitHub repository settings, enable Pages from the branch root if it is not automatic.
- A custom domain is optional and should be deferred until the core page is working.
