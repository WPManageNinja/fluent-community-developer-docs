---
title: "Post Purge Content"
description: "Blocks a member and permanently deletes the kinds of content named in the request."
outline: false
aside: false
---

Blocks a member and permanently deletes the kinds of content named in the request.

`types` is required and accepts `posts`, `comments`, `messages` and `course_progress`; unknown values are dropped. The member is blocked first, before anything is deleted, and the deletes then run inside a time budget — whatever is left is finished by a background job, so the response may report that it has not completed.

## Endpoint

- **Method:** `POST`
- **Path:** `/members/{user_id}/purge-content`
- **Edition:** Core
- **Controller:** `MembersController@purgeContent`
- **Route source:** `fluent-community/app/Http/Routes/api.php:149`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- This always blocks the member. There is no delete-without-blocking mode, and blocking happens even if every delete is deferred or fails.
- Nothing is reversible. Rows are deleted outright, not trashed, and unblocking the member later does not bring anything back.
- There is no confirmation parameter: sending `types` performs the ban and the deletes.
- It does not delete the WordPress account, the profile row, space memberships, or posts of other types.
- Each delete fires the same hooks a single delete would, so listeners run once per item.
- Asking for a purge while one is running merges the two sets of types rather than starting again.
- Sending an empty `types` answers 422. Blocking a member without deleting anything is a different call.
- Blocking yourself, or a moderator or admin, is refused.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="postPurgeContent" specUrl="/openapi/public/members/post-purge-content.json" />
