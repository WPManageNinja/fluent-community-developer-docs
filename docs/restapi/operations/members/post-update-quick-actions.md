---
title: "Post Update Quick Actions"
description: "Sets the verified mark, the badges and the moderation flag on a member, from the admin card."
outline: false
aside: false
---

Sets the verified mark, the badges and the moderation flag on a member, from the admin card.

Each of the three is applied only when its key is present, so a call can change one without disturbing the others. The verified mark and the badges are stored on the profile; the flag is handed to Pro's moderation module through `fluent_community/member/update_flag`, and core stores nothing itself.

## Endpoint

- **Method:** `POST`
- **Path:** `/members/{user_id}/quick-actions`
- **Edition:** Core
- **Controller:** `MembersController@updateQuickActions`
- **Route source:** `fluent-community/app/Http/Routes/api.php:151`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- The two switches do not take the same kind of value. The flag must be the exact string `yes`, while the verified mark is read as a number — so sending `true` for the flag unflags the member, and sending `yes` for verified unverifies them.
- Sending an empty `badge_slugs` array clears every badge; leaving the key out keeps them.
- Badges are ignored when the badge feature is off, and the flag does nothing at all without Pro's content moderation — in both cases the call still reports success.
- Flagging an administrator or moderator is refused before anything is written.
- Member status is not settable here; that is the member update endpoint.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postUpdateQuickActions" specUrl="/openapi/public/members/post-update-quick-actions.json" />
