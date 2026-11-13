---
title: "Post Update Fluent Event Settings"
description: "Saves the FluentEvent integration settings."
outline: false
aside: false
---

Saves the FluentEvent integration settings.

Takes a `settings` object holding the on/off flag and the events slug. Only those two keys are kept; anything else in the object is dropped. The slug is checked against the portal\'s own routes and the space sub-pages, so events cannot take a path the community already uses.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/fluent-event-settings`
- **Edition:** Core
- **Controller:** `SettingController@updateFluentEventSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:203`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- The flag is compared against the exact string `yes`, so `true`, `1` and `on` all save as off.
- Turning the integration on does not take effect in the same request — the integration is wired up on the next page load.
- The endpoint does not check whether the FluentEvent plugin is installed, so it will store an enabled integration with no plugin behind it. Installing the plugin is a separate call.
- Re-saving the slug a site already uses is allowed; a slug that sanitises down to nothing fails with the same message as one that is taken.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateFluentEventSettings" specUrl="/openapi/public/settings/post-update-fluent-event-settings.json" />
