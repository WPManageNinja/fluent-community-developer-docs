---
title: Save Snippets Settings
description: "Stores the custom CSS and, for callers allowed to post unfiltered HTML, the custom JavaScript injected into the portal."
outline: false
aside: false
---

Stores the custom CSS and, for callers allowed to post unfiltered HTML, the custom JavaScript injected into the portal.

CSS is sanitised before storage. Custom JavaScript is only written when the caller holds the WordPress `unfiltered_html` capability; otherwise the previously stored script is silently retained, so the save appears to succeed while the JS field is ignored.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/snippets-settings`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@updateSnippetsSettings`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:34`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; the stored snippets run on every portal page.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveSnippetsSettings" specUrl="/openapi/public/settings/save-snippets-settings.json" />
