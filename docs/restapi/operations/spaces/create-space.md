---
title: Create Space
description: "Creates a space, makes the caller its first admin, and attaches the submitted cover photo, logo and topics."
outline: false
aside: false
---

Creates a space, makes the caller its first admin, and attaches the submitted cover photo, logo and topics.

`space[title]` and a `space[privacy]` of `public`, `private` or `secret` are required, and the slug — derived from `slug` or the title — must be unique. Turning on `settings.topic_required` without any `topic_ids` is rejected. Cover photo, logo and OG image URLs must resolve to unclaimed uploaded media, which is then marked permanent. New spaces are appended to the end of their group serial order.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces`
- **Edition:** Core
- **Controller:** `SpaceController@create`
- **Route source:** `fluent-community/app/Http/Routes/api.php:9`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin access, or the admin role in the space named by `space_id`.
- The creator is attached as a space admin automatically.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="createSpace" specUrl="/openapi/public/spaces/create-space.json" />
