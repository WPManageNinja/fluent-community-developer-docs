---
title: "Post Update Getting Started"
description: "Hides, restores or acknowledges the getting-started card for the calling administrator."
outline: false
aside: false
---

Hides, restores or acknowledges the getting-started card for the calling administrator.

Takes one `action`: `dismiss`, `reopen` or `celebrated`. It changes nothing about the checklist itself — the steps are always detected from site data — and answers with the recomputed checklist.

## Endpoint

- **Method:** `POST`
- **Path:** `/settings/getting-started`
- **Edition:** Core
- **Controller:** `SettingController@updateGettingStarted`
- **Route source:** `fluent-community/app/Http/Routes/api.php:195`
- **Controller source:** `fluent-community/app/Http/Controllers/SettingController.php`

- Despite the name, this only changes card visibility for the administrator who calls it.
- `dismiss` can be undone with `reopen`. `celebrated` cannot be undone through the API, and it keeps the card hidden for good.
- The response carries the checklist and no message field, unlike the other settings endpoints.
- Any other action is rejected with 422.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateGettingStarted" specUrl="/openapi/public/settings/post-update-getting-started.json" />
