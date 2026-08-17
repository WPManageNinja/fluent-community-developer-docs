---
title: Render Markdown Preview
description: "Renders submitted Markdown to the same sanitised HTML a saved post would produce, without creating anything."
outline: false
aside: false
---

Renders submitted Markdown to the same sanitised HTML a saved post would produce, without creating anything.

Pass `text`. Adding `with[]=meta` together with a `feed` object also runs the post metadata processing, so link previews and media blocks come back resolved as they would after a save.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/markdown-preview`
- **Edition:** Core
- **Controller:** `FeedsController@markdownToHtml`
- **Route source:** `fluent-community/app/Http/Routes/api.php:82`
- **Controller source:** `fluent-community/app/Http/Controllers/FeedsController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="renderMarkdownPreview" specUrl="/openapi/public/feeds/render-markdown-preview.json" />
