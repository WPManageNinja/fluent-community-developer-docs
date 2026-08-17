---
title: Reactions API
description: Feed/comment reactions plus survey vote and survey voter endpoints.
---

# Reactions API

Feed/comment reactions plus survey vote and survey voter endpoints.

## Authentication

Reaction routes use `PortalPolicy` and enforce feed or comment access checks inside the relevant controller.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `POST` | `/feeds/{feed_id}/react` | Core | [Toggle Feed Reaction](/restapi/operations/reactions/toggle-feed-reaction) | Adds or removes the current user reaction on a post and returns the updated count — a second route onto the same behaviour as the reactions toggle endpoint. |
| `POST` | `/feeds/{feed_id}/comments/{comment_id}/reactions` | Core | [Toggle Comment Reaction](/restapi/operations/reactions/toggle-comment-reaction) | Sets or clears the current user like on a comment and returns the new reaction count with the resulting liked state. |
| `GET` | `/feeds/{feed_id}/reactions` | Core | [List Feed Reactions](/restapi/operations/reactions/list-feed-reactions) | Returns the members who liked a post, with their public profiles, for the reaction list popover. |
| `POST` | `/feeds/{feed_id}/reactions/toggle` | Core | [Post Add Or Remove Post React](/restapi/operations/reactions/post-add-or-remove-post-react) | Adds or removes the current user reaction on a post and returns the updated reaction count. |
| `POST` | `/feeds/{feed_id}/apps/survey-vote` | Core | [Cast Survey Vote](/restapi/operations/reactions/cast-survey-vote) | Records the current user vote on a survey post and returns the updated survey configuration with their choices flagged. |
| `GET` | `/feeds/{feed_id}/apps/survey-voters/{option_slug}` | Core | [List Survey Voters](/restapi/operations/reactions/list-survey-voters) | Returns the members who voted for one survey option, with their public profiles. |
| `GET` | `/comments/{comment_id}/reactions` | Core | [List Comment Reactions](/restapi/operations/reactions/list-comment-reactions) | Returns the members who liked a comment, with their public profiles. |
