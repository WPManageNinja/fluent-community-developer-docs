---
title: "Post Update Email Pref"
description: "Updates the calling member's email preferences for one space."
outline: false
aside: false
---

Updates the calling member's email preferences for one space.

Send `new_posts`, `announcements`, or both — anything left out stays as it is, and sending neither is an error. Writing `new_posts` rewrites that member's preference rows for the space, which are the same rows the profile notification settings edit.

## Endpoint

- **Method:** `POST`
- **Path:** `/spaces/{spaceSlug}/email-pref`
- **Edition:** Core
- **Controller:** `SpaceController@updateEmailPref`
- **Route source:** `fluent-community/app/Http/Routes/api.php:17`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- The response is the recomputed state, not an echo of what was sent.
- Setting `announcements` is silently ignored when the site has announcement emails switched off, or when the member has not opted out globally. The call still answers 200, with the unchanged value in the response.
- A member who receives admin-post emails from the space always receives its announcements, so `announcements` can read true straight after being set to false.
- `new_posts` must be `all`, `admin` or `none`. The call is idempotent — repeating it converges on the same rows.
- New-post emails are queued a couple of minutes after a post and the recipients are read when the job runs, so a change made in that window still applies.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateEmailPref" specUrl="/openapi/public/spaces/post-update-email-pref.json" />
