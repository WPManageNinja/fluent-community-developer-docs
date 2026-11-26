---
title: "Post Save Moderation Note"
description: "Saves the private administrator note on a member."
outline: false
aside: false
---

Saves the private administrator note on a member.

One note per member, up to 2000 characters, stamped with who saved it and when. The note is visible to administrators on the member's profile, and never to the member.

## Endpoint

- **Method:** `POST`
- **Path:** `/members/{user_id}/moderation-note`
- **Edition:** Core
- **Controller:** `MembersController@saveModerationNote`
- **Route source:** `fluent-community/app/Http/Routes/api.php:150`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- Sending an empty note clears it, and still rewrites the stamp.
- There is no history — the previous note is replaced.
- Unlike the moderation actions beside it, a note can be saved on an administrator or moderator.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postSaveModerationNote" specUrl="/openapi/public/members/post-save-moderation-note.json" />
