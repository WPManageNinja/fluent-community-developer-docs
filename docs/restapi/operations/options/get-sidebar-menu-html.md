---
title: Get Sidebar Menu HTML
description: "Returns the server-rendered sidebar HTML together with the spaces the current user can act in, each carrying its resolved permissions, membership and topics."
outline: false
aside: false
---

Returns the server-rendered sidebar HTML together with the spaces the current user can act in, each carrying its resolved permissions, membership and topics.

Community moderators receive every space; everyone else receives only spaces where they hold an active membership. Private spaces the caller is not a member of come back with a `lockscreen_config` in place of content. The spaces map is keyed by slug.

## Endpoint

- **Method:** `GET`
- **Path:** `/options/sidebar-menu-html`
- **Edition:** Core
- **Controller:** `OptionController@getSidebarMenuHtml`
- **Route source:** `fluent-community/app/Http/Routes/api.php:153`
- **Controller source:** `fluent-community/app/Http/Controllers/OptionController.php`

- Signed-out callers receive the rendered HTML and an empty spaces object.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSidebarMenuHtml" specUrl="/openapi/public/options/get-sidebar-menu-html.json" />
