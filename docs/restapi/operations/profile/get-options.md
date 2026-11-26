---
title: "Get Options"
description: "Lists the tags or lists an administrator can choose from in the contact widget."
outline: false
aside: false
---

Lists the tags or lists an administrator can choose from in the contact widget.

Pass `type=lists` for lists; anything else is treated as tags. For tags, each option carries the spaces and courses it grants. `search` matches the title.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/crm-options`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CrmProfileController@getOptions`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:123`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/CrmProfileController.php`

- At most 50 options come back, ordered by title, with no paging — `search` is the only way to reach anything past the first 50.
- The username in the path is ignored: the options are site-wide, so an unknown member still returns the full list.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getOptions" specUrl="/openapi/public/profile/get-options.json" />
