# FluentCommunity Developer Docs

Developer documentation for [FluentCommunity](https://fluentcommunity.co/) — the WordPress community plugin by WPManageNinja.

**Live site:** [dev.fluentcommunity.co](https://dev.fluentcommunity.co/)

## What's inside

- **Database** — Schema overview, Eloquent-style models, relationships, and query builder usage
- **Hooks** — Action and filter hook references with signatures, parameters, and examples
- **REST API** — Full endpoint reference with interactive playground (112 routes across 10 groups)
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

`docs:dev` and `docs:build` auto-generate database, hook, and REST API references from the FluentCommunity plugin source before starting VitePress.

## Tech stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [Vue 3](https://vuejs.org/) — Component framework
- [Mermaid](https://mermaid.js.org/) — Diagram rendering (ER diagrams, flowcharts)
- [vitepress-openapi](https://github.com/enzonotario/vitepress-openapi) — OpenAPI integration for REST API playground

## Contributing

Found an issue or want to improve the docs? PRs are welcome. Each page has an "Edit this page" link that takes you directly to the source file.

## License

Copyright © 2026 WPManageNinja
