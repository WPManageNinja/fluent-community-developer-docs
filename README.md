# FluentCommunity Developer Docs

Developer documentation for [FluentCommunity](https://fluentcommunity.co/) — the WordPress community plugin by WPManageNinja.

**Live site:** [dev.fluentcommunity.co](https://dev.fluentcommunity.co/)

## What's inside

- **Database** — Schema overview, Eloquent-style models, relationships, and query builder usage
- **Hooks** — Every action and filter in core and Pro (466 hooks across 616 call sites) with parameters, call sites and examples
- **REST API** — All 248 endpoints with an interactive playground, real recorded request/response samples, and the permissions each one needs
- **Helpers** — Utility classes and commonly used helper methods
- **Guides** — Code snippets, menu customization, theme compatibility, webhooks, cloud storage
- **Deployment** — Server requirements, performance optimization, and benchmarks

## Local development

```bash
yarn install
yarn docs:dev      # Start dev server with hot reload
yarn docs:build    # Production build
yarn docs:preview  # Preview production build locally
```

`docs:dev` and `docs:build` auto-generate the database, hook and REST API references
from the FluentCommunity plugin source before starting VitePress. Anything under
`docs/database/`, `docs/hooks/`, `docs/restapi/`, `docs/modules/` and
`public/openapi/` is deleted and rewritten on every run — edit
`scripts/generate-docs.mjs` or the prose files in `data/`, never those pages.

REST samples are recorded from a live install rather than synthesised; see
[`scripts/capture/README.md`](scripts/capture/README.md).

## Tech stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [Vue 3](https://vuejs.org/) — Component framework
- [Mermaid](https://mermaid.js.org/) — Diagram rendering (ER diagrams, flowcharts)
- [vitepress-openapi](https://github.com/enzonotario/vitepress-openapi) — OpenAPI integration for REST API playground

## Contributing

Found an issue or want to improve the docs? PRs are welcome. Each page has an "Edit this page" link that takes you directly to the source file.

## License

Copyright © 2026 WPManageNinja
