---
title: "Get Content Summary"
description: "Counts what a member has posted, for the admin card that offers to delete it."
outline: false
aside: false
---

Counts what a member has posted, for the admin card that offers to delete it.

Four live counts — posts, comments, messages and course progress records — plus whether a purge is already running for that member. The counts are read at request time, so they can differ from what a purge then removes.

## Endpoint

- **Method:** `GET`
- **Path:** `/members/{user_id}/content-summary`
- **Edition:** Core
- **Controller:** `MembersController@getContentSummary`
- **Route source:** `fluent-community/app/Http/Routes/api.php:148`
- **Controller source:** `fluent-community/app/Http/Controllers/MembersController.php`

- Community administrators only; a moderator cannot call it.
- Posts counts only text, image and article posts, so lessons and other post types are excluded.
- `messages` is null when Fluent Messaging is not active, which is different from zero.
- `course_progress` is a count of progress records, not of courses or lessons.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getContentSummary" specUrl="/openapi/public/members/get-content-summary.json" />
