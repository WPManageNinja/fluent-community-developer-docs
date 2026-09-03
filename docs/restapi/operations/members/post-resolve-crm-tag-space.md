---
title: Post Resolve CRM Tag Space
description: "Resolves a FluentCRM tag into a page of contacts to add to the space, optionally creating WordPress users for contacts that do not have one."
outline: false
aside: false
---

Resolves a FluentCRM tag into a page of contacts to add to the space, optionally creating WordPress users for contacts that do not have one.

Requires a valid `tag_id`. Paging is driven by `offset` and `per_page` (clamped between 50 and 500, default 200); `create_missing` controls user creation and `notify_new_users` controls whether new accounts are emailed.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/members/resolve-crm-tag`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `BulkMembersController@resolveCrmTagSpace`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:126`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/BulkMembersController.php`

- Requires the `can_add_member` permission in this space.
- Requires FluentCommunity Pro and an active FluentCRM installation.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="postResolveCrmTagSpace" specUrl="/openapi/public/members/post-resolve-crm-tag-space.json" />
