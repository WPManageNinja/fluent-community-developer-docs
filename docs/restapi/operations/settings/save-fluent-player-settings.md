---
title: Save Fluent Player Settings
description: "Stores the FluentPlayer integration settings and returns the normalised result."
outline: false
aside: false
---

Stores the FluentPlayer integration settings and returns the normalised result.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/fluent-player-settings`
- **Edition:** Core
- **Controller:** `SettingController@updateFluentPlayerSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:168`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveFluentPlayerSettings" specUrl="/openapi/public/settings/save-fluent-player-settings.json" />
