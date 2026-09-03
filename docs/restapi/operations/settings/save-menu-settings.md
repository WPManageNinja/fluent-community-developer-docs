---
title: Save Menu Settings
description: "Replaces the portal navigation configuration, preserving the protected attributes of built-in menu entries."
outline: false
aside: false
---

Replaces the portal navigation configuration, preserving the protected attributes of built-in menu entries.

Items missing a title or a permalink are discarded. Items without a slug are treated as new custom entries and get a generated one. For entries that already exist, `is_system`, `is_locked`, `is_unavailable` and `slug` are carried over from the stored version so a client cannot promote a custom link into a system one.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/menu-settings`
- **Edition:** Core
- **Controller:** `SettingController@saveMenuSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:164`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveMenuSettings" specUrl="/openapi/public/settings/save-menu-settings.json" />
