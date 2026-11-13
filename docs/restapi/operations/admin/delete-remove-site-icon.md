---
title: "Delete Remove Site Icon"
description: "Clears the site icon setting."
outline: false
aside: false
---

Clears the site icon setting.

Unsets WordPress's `site_icon` option and leaves the uploaded image in the media library. Sent as POST with `X-HTTP-Method-Override: DELETE` by the plugin's own client.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/site-icon`
- **Edition:** Core
- **Controller:** `AdminController@removeSiteIcon`
- **Route source:** `fluent-community/app/Http/Routes/api.php:138`
- **Controller source:** `fluent-community/app/Http/Controllers/AdminController.php`

- Super administrators only.
- It removes the setting, not the file, so a caller expecting cleanup will be wrong.
- It reports success even when no icon was set.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="deleteRemoveSiteIcon" specUrl="/openapi/public/admin/delete-remove-site-icon.json" />
