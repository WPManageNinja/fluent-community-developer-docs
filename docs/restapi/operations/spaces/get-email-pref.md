---
title: "Get Email Pref"
description: "Returns the calling member's email preferences for one space."
outline: false
aside: false
---

Returns the calling member's email preferences for one space.

Three values: how much of the space's new-post email they get (`all`, `admin` or `none`), whether they receive its announcements, and whether the announcement choice is theirs to make at all. The new-post setting is derived from the stored preference rows rather than held as a field, so a member who has never touched it reads as `none`.

## Endpoint

- **Method:** `GET`
- **Path:** `/spaces/{spaceSlug}/email-pref`
- **Edition:** Core
- **Controller:** `SpaceController@getEmailPref`
- **Route source:** `fluent-community/app/Http/Routes/api.php:16`
- **Controller source:** `fluent-community/app/Http/Controllers/SpaceController.php`

- The caller must be an active member of the space; everyone else gets 403, including a member whose own membership is still pending.
- Spaces only. A course slug answers the same 403, because the lookup is scoped to community spaces.
- `show_announcements` is true only when the site sends announcement emails and this member has switched them off globally. The per-space box is an opt-in for someone who opted out, never a per-space mute.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getEmailPref" specUrl="/openapi/public/spaces/get-email-pref.json" />
