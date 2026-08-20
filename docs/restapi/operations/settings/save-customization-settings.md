---
title: Save Customization Settings
description: "Stores the portal appearance settings, coercing each field to its expected shape."
outline: false
aside: false
---

Stores the portal appearance settings, coercing each field to its expected shape.

Boolean-style keys are forced to `yes` or `no`. `default_theme_mode` accepts only `light`, `dark` or `system`, and is reset to `light` whenever dark mode is switched off. `affiliate_id` is cast to an integer and blanked when it is zero.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/customization-settings`
- **Edition:** Core
- **Controller:** `SettingController@updateCustomizationSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:160`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveCustomizationSettings" specUrl="/openapi/public/settings/save-customization-settings.json" />
