---
title: Get Space Meta Settings
description: "Returns the extra space settings panels contributed by integrations, or `null` when nothing has registered any."
outline: false
aside: false
---

Returns the extra space settings panels contributed by integrations, or `null` when nothing has registered any.

The panels come entirely from the `fluent_community/space/meta_fields` filter, so the response is empty on a stock install.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/{spaceSlug}/meta-settings`
- **Edition:** Core
- **Controller:** `SpaceController@getMetaSettings`
- **Route source:** `fluent-community/app/Http/Routes/api.php:16`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- Requires community-admin or course-admin access, or the admin role in this space.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getSpaceMetaSettings" specUrl="/openapi/public/spaces/get-space-meta-settings.json" />
