---
title: Update Space By Slug
description: "Updates a space record and its settings, and returns a redirect URL when the change altered its slug."
outline: false
aside: false
---

Updates a space record and its settings, and returns a redirect URL when the change altered its slug.

The payload is nested under `data`. A blank title is rejected and a slug already taken by another space is rejected. Turning on `topic_required` requires the space to end up with at least one topic, whether from the payload or from what is already attached. Sending a media field empty clears that image. `topic_ids`, when present, replaces the topic set and is trimmed to the configured maximum. Any `meta_settings` block is dispatched to per-provider hooks rather than stored directly.

## Endpoint

- **Method:** `PUT`
- **Path:** `/spaces/{spaceSlug}/by-slug`
- **Edition:** Core
- **Controller:** `SpaceController@patchBySlug`
- **Route source:** `fluent-community/app/Http/Routes/api.php:11`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access or the admin role in this space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="updateSpaceBySlug" specUrl="/openapi/public/spaces/update-space-by-slug.json" />
