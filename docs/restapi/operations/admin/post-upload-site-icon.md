---
title: "Post Upload Site Icon"
description: "Uploads the site icon — the favicon the whole WordPress site uses, not a community-only setting."
outline: false
aside: false
---

Uploads the site icon — the favicon the whole WordPress site uses, not a community-only setting.

A multipart upload under the field name `file`, stored as a media library attachment and then recorded in WordPress's own `site_icon` option. PNG, JPEG, GIF and WebP are accepted, up to 5 MB, and the type is checked against the real file rather than the name.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/site-icon`
- **Edition:** Core
- **Controller:** `AdminController@uploadSiteIcon`
- **Route source:** `fluent-community/app/Http/Routes/api.php:137`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Super administrators only. Community administrators can reach the other settings endpoints but not this one.
- The image must be square within a pixel and at least 64 x 64; 512 x 512 is the size to aim for. A file whose dimensions cannot be read fails with that same message.
- The image is used exactly as uploaded — there is no cropping step.
- A file larger than the server's own upload limit answers 413 before validation runs.
- Each upload leaves a new attachment in the media library; the one it replaces is not removed.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUploadSiteIcon" specUrl="/openapi/public/admin/post-upload-site-icon.json" />
