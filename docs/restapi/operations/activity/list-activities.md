---
title: List Activities
description: "Returns the most recent post-published and comment-added events, collapsed to one entry per post per action, with a pre-rendered message and a portal route for each."
outline: false
aside: false
---

Returns the most recent post-published and comment-added events, collapsed to one entry per post per action, with a pre-rendered message and a portal route for each.

Scope the stream with `context[space_id]` or `context[user_id]`; when both are present the space wins. `per_page` defaults to 5 and is capped by the `fluent_community/max_per_page` filter (100 by default), and `has_more` is derived by fetching one extra row rather than by counting. A call with no space returns `pinned_posts` as well; scoped to a space, pinned posts are returned only when `with_pins` is set, and `with_pending_count` adds the number of pending join requests for callers who can add members.

## Endpoint

- **Method:** `GET`
- **Path:** `/activities`
- **Edition:** Core
- **Controller:** `ActivityController@getActivities`
- **Route source:** `fluent-community/app/Http/Routes/api.php:139`
- **Controller source:** `fluent-community/app/Http/Controllers/ActivityController.php`

- Callers who are not community moderators see only activity flagged public or belonging to a space they are a member of.
- Activity from deactivated or blocked profiles, and from posts that are no longer published, is filtered out.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listActivities" specUrl="/openapi/public/activity/list-activities.json" />
