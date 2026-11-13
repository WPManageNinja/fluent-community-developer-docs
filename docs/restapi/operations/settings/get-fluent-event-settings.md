---
title: "Get Fluent Event Settings"
description: "Returns the FluentEvent integration settings, and where to manage events when the plugin is active."
outline: false
aside: false
---

Returns the FluentEvent integration settings, and where to manage events when the plugin is active.

Two settings — whether the integration is on, and the URL slug events are served under — plus an admin URL that is an empty string when the FluentEvent plugin is not active. That empty string is the only signal in this payload about the plugin's presence.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/fluent-event-settings`
- **Edition:** Core
- **Controller:** `SettingController@getFluentEventSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:202`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- The defaults, integration off and the slug `events`, are filled in on read, so a site that has never saved looks identical to one saved with the defaults.
- The values live in FluentCommunity's own options, not in a WordPress option.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getFluentEventSettings" specUrl="/openapi/public/settings/get-fluent-event-settings.json" />
