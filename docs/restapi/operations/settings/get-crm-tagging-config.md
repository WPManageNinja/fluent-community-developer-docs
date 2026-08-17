---
title: Get CRM Tagging Config
description: "Returns the FluentCRM tagging configuration together with every space and course that can be mapped, and the CRM tag list to map them onto."
outline: false
aside: false
---

Returns the FluentCRM tagging configuration together with every space and course that can be mapped, and the CRM tag list to map them onto.

Spaces are grouped by space group, with ungrouped ones under "Other Spaces" and all courses under a separate group. `crm_tags` is empty and `has_fluentcrm` is false when FluentCRM is not installed.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/crm-tagging-config`
- **Edition:** Core
- **Controller:** `SettingController@getCrmTaggingConfig`
- **Route source:** `fluent-community/app/Http/Routes/api.php:165`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Reading is available in core, but saving the configuration is a Pro endpoint.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getCrmTaggingConfig" specUrl="/openapi/public/settings/get-crm-tagging-config.json" />
