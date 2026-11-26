---
title: "Get Contact"
description: "Returns the member's FluentCRM contact for the profile widget: status, engagement stats, lifetime value, lists and tags."
outline: false
aside: false
---

Returns the member's FluentCRM contact for the profile widget: status, engagement stats, lifetime value, lists and tags.

Reading needs both community administrator rights and FluentCRM's own read permission. Each tag carries the spaces and courses that tag grants, so an administrator can see what removing it would take away.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}/crm-contact`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `CrmProfileController@getContact`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:122`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/CrmProfileController.php`

- The route only exists when FluentCRM is installed; without it the call is a plain 404.
- A member with no contact is a 200 with `contact: null`, not an error. The write endpoints answer 404 in the same situation.
- `can_manage` is a stronger permission than reading, so an administrator may receive the data and still be refused on a change.
- `lifetime_value` is an empty string when there is nothing to show, and depends on a FluentCRM filter being answered.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getContact" specUrl="/openapi/public/profile/get-contact.json" />
