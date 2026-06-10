# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Developer documentation site for FluentCommunity (VitePress), live at https://dev.fluentcommunity.co/. This repo is a **git submodule** checked out inside the FluentCommunity plugin (`.git` points to `../.git/modules/dev-docs-repo`); its own remote is `WPManageNinja/fluent-community-developer-docs`. Do not confuse it with the parent plugin repo one directory up.

## Commands

Yarn 4 (pinned in `.yarn/releases`, `nodeLinker: node-modules`). npm works too.

```bash
yarn install
yarn docs:dev          # regenerate docs + manifest, then VitePress dev server
yarn docs:build        # regenerate docs + manifest, then production build
yarn docs:preview      # preview a production build
yarn generate:docs     # regeneration only (node scripts/generate-docs.mjs)
yarn generate:manifest # rebuild public/openapi/manifest.json
```

No tests, no linter.

## Generated vs hand-written content (critical)

`scripts/generate-docs.mjs` (~6,200 lines) parses the PHP source of the core plugin (the repo's parent directory) and, if present, the sibling `../fluent-community-pro` plugin. It extracts table schemas, models, hook call sites (`do_action`/`apply_filters`), and REST routes, then emits markdown pages and OpenAPI JSON specs. Pro-only items get a Pro badge.

Every run **deletes and rewrites** these paths (`cleanGeneratedOutput()`) — never hand-edit them; edits will be lost:

- `docs/database/`, `docs/hooks/`, `docs/restapi/`, `docs/modules/`
- `docs/index.md`, `docs/getting-started.md`
- `.generated/` (sidebar-ordering JSON consumed by `.vitepress/config.mts`)
- `public/openapi/<module>/` spec directories

To change generated content, edit the generator itself — prose and metadata live in constants near the top of `scripts/generate-docs.mjs` (`MODEL_SUMMARIES`, `MODEL_ORDER`/`MODEL_SLUGS`, `KEY_METHOD_SUMMARIES`, `MODULE_META`, `HOOK_PAGES`), and page templates live in the `writeFile(...)` sections near the bottom.

Hand-written (safe to edit directly): `docs/guides/`, `docs/helpers/`, `docs/deployment/`.

Since generated output mirrors the checked-out plugin source, regenerating against a different plugin version produces large diffs — that is expected (see "Regenerate docs" commits in history).

## Architecture

- `.vitepress/config.mts` — site config and all sidebars. Sidebars are mostly hard-coded lists; REST API operation pages are discovered from `docs/restapi/operations/<module>/` and ordered via `.generated/restapi-module-order.json`. New hand-written pages must be added to the sidebar arrays here.
- `.vitepress/theme/` — custom theme: `vitepress-openapi` client (interactive REST playground, including Basic-auth handling and SSR fetch shims in `index.ts`), `Mermaid.vue` for ER diagrams/flowcharts, `DocsHome.vue` landing page.
- `public/openapi/` — generated OpenAPI specs powering the playground; `generate-manifest.js` indexes them into `manifest.json`.
