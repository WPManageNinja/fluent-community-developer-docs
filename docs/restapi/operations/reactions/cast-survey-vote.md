---
title: Cast Survey Vote
description: "Records the current user vote on a survey post and returns the updated survey configuration with their choices flagged."
outline: false
aside: false
---

Records the current user vote on a survey post and returns the updated survey configuration with their choices flagged.

Send the chosen option identifiers in `vote_indexes`. The post must actually be of the `survey` content type and must have a valid option list; a survey past its `end_date` is refused. The returned options carry a `voted` flag for the caller.

## Endpoint

- **Method:** `POST`
- **Path:** `/feeds/{feed_id}/apps/survey-vote`
- **Edition:** Core
- **Controller:** `ReactionController@castSurveyVote`
- **Route source:** `fluent-community/app/Http/Routes/api.php:78`
- **Controller source:** `fluent-community/app/Http/Controllers/ReactionController.php`

- Requires a signed-in user who can read the post.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="castSurveyVote" specUrl="/openapi/public/reactions/cast-survey-vote.json" />
