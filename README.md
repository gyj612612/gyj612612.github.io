# Gao Yujie Personal Homepage

Static personal homepage prepared for GitHub Pages, customized on top of the `dmego/home.github.io` style: full-screen cover, rotating Bing background, Hitokoto quote, shortcut navigation, dark portfolio sections, and structured personal content.

## Local Preview

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`.

## Structure

- `index.html` - dmego-style homepage markup with Gao Yujie content
- `assets/css/vno.css` - base dmego visual system
- `assets/css/home-custom.css` - custom content-section styling
- `assets/js/home-custom.js` - Hitokoto, rotating background, and resume card interactions
- `assets/docs/` - portfolio PDF for download; CV content is represented in-page
- `.github/workflows/pages.yml` - GitHub Pages Actions deployment workflow
- `docs/homepage-knowledge-base.md` - reference and implementation notes

## GitHub Pages

For a user homepage, create a repository named `<github-username>.github.io` and push these files to the repository root. GitHub Pages can publish the branch root directly, or use the included workflow.
