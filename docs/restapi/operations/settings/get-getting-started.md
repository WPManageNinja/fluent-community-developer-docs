---
title: "Get Getting Started"
description: "Returns the getting-started checklist for the calling administrator, with each step already marked done or not."
outline: false
aside: false
---

Returns the getting-started checklist for the calling administrator, with each step already marked done or not.

Every step is detected from the site's own data — there is no way to tick one by hand — and each carries an optional action telling the client where to send the admin. The summary counts the required steps only, and the state says whether this admin has dismissed the card, finished it, or is owed the one-off completion message.

## Endpoint

- **Method:** `GET`
- **Path:** `/settings/getting-started`
- **Edition:** Core
- **Controller:** `SettingController@getGettingStarted`
- **Route source:** `fluent-community/app/Http/Routes/api.php:194`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- The card state is per administrator, held in their own user meta, while the step results are site data and the same for everyone.
- This GET writes once: the first call on an incomplete checklist records when the admin started.
- The step list varies by install — one step appears only with Pro, another only when the course module is on — and `fluent_community/getting_started_steps` can add, remove or reorder steps.
- A site that was already set up before the feature shipped never gets the completion message, because there is no start time to compare against.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getGettingStarted" specUrl="/openapi/public/settings/get-getting-started.json" />
