---
title: List Survey Voters
description: "Returns the members who voted for one survey option, with their public profiles."
outline: false
aside: false
---

Returns the members who voted for one survey option, with their public profiles.

Capped at 100 voters with no pagination. The option is identified by its slug in the path, so an unknown slug returns an empty list rather than an error.

## Endpoint

- **Method:** `GET`
- **Path:** `/feeds/{feed_id}/apps/survey-voters/{option_slug}`
- **Edition:** Core
- **Controller:** `ReactionController@getSurveyVoters`
- **Route source:** `fluent-community/app/Http/Routes/api.php:80`
- **Controller source:** `fluent-community/app/Http/Controllers/ReactionController.php`

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listSurveyVoters" specUrl="/openapi/public/reactions/list-survey-voters.json" />
