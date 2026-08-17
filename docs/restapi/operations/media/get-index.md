---
title: Get Index
description: "Returns a cursor-paginated page of the photos, videos or audio shared in one space, each item carrying the post and author it came from."
outline: false
aside: false
---

Returns a cursor-paginated page of the photos, videos or audio shared in one space, each item carrying the post and author it came from.

Select the tab with `type` set to `photos` (the default), `videos` or `audios`. Paging is by `cursor` — the last media id seen — rather than a page number, and `per_page` defaults to 24 and is clamped between 12 and 48. The first page additionally returns `has_audio` so the client knows whether to offer the audio tab. Only active media attached to published posts is listed.

## Endpoint

- **Method:** `GET`
- **Path:** `/media-gallery/{spaceSlug}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `MediaGalleryController@index`
- **Route source:** `fluent-community-pro/app/Modules/MediaGallery/MediaGalleryModule.php:18`

- Requires the `can_view_media` permission in the space; failure returns 403 carrying `permission_failed`, and an unknown space slug returns 404.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getIndex" specUrl="/openapi/public/media/get-index.json" />
