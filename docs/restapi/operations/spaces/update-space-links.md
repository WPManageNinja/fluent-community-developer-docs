---
title: Update Space Links
description: "Replaces the sidebar link list shown on a space with the submitted set."
outline: false
aside: false
---

Replaces the sidebar link list shown on a space with the submitted set.

Each link is sanitised individually and the submitted array replaces the stored one wholesale.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/links`
- **Edition:** Core
- **Controller:** `SpaceController@updateLinks`
- **Route source:** `fluent-community/app/Http/Routes/api.php:27`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access or the admin role in this space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateSpaceLinks" specUrl="/openapi/public/spaces/update-space-links.json" />
