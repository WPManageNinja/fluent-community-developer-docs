---
title: Save CRM Tagging Config
description: "Stores the mapping between FluentCRM tags and spaces or courses, and keeps the `has_crm_sync` feature flag in step."
outline: false
aside: false
---

Stores the mapping between FluentCRM tags and spaces or courses, and keeps the `has_crm_sync` feature flag in step.

Non-numeric tag mappings are discarded, and `linked_maps` is reduced to the keys that survive in `tagging_maps`. If none of the mapped ids resolve to a real space or course the whole map is emptied rather than partially saved. Disabling the integration saves the flags and returns early without validating the maps.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/crm-tagging-config`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveCrmTaggingConfig`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:35`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro; `create_user` and `send_welcome_email` cause account creation and outbound email during subsequent tag syncs.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveCrmTaggingConfig" specUrl="/openapi/public/settings/save-crm-tagging-config.json" />
