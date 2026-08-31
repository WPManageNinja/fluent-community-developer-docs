---
title: List Topics
description: "Returns the post topics defined for the community, along with every space they can be attached to."
outline: false
aside: false
---

Returns the post topics defined for the community, along with every space they can be attached to.

Pass `optionsOnly` for the trimmed id/title/description shape used by pickers; that variant also skips the space list. A `search` term filters topics by title, case-insensitively.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/topics`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getTopics`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:45`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a community admin, a course admin, or the admin role in the space named by `space_id`; course creators may call the `optionsOnly` variant.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listTopics" specUrl="/openapi/public/admin/list-topics.json" />
