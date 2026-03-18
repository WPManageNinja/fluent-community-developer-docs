---
title: Reactions API
description: Feed/comment reactions plus survey vote and survey voter endpoints.
---

# Reactions API

Feed/comment reactions plus survey vote and survey voter endpoints.

## Authentication

Reaction routes use `PortalPolicy` and enforce feed or comment access checks inside the relevant controller.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `POST` | `/feeds/{feed_id}/react` | Core | [Toggle Feed Reaction](/restapi/operations/reactions/toggle-feed-reaction) | `CommentsController@addOrRemovePostReact` |
| `POST` | `/feeds/{feed_id}/comments/{comment_id}/reactions` | Core | [Toggle Comment Reaction](/restapi/operations/reactions/toggle-comment-reaction) | `CommentsController@toggleReaction` |
| `GET` | `/feeds/{feed_id}/reactions` | Core | [List Feed Reactions](/restapi/operations/reactions/list-feed-reactions) | `ReactionController@getByFeedId` |
| `POST` | `/feeds/{feed_id}/apps/survey-vote` | Core | [Cast Survey Vote](/restapi/operations/reactions/cast-survey-vote) | `ReactionController@castSurveyVote` |
| `GET` | `/feeds/{feed_id}/apps/survey-voters/{option_slug}` | Core | [List Survey Voters](/restapi/operations/reactions/list-survey-voters) | `ReactionController@getSurveyVoters` |
| `GET` | `/comments/{comment_id}/reactions` | Core | [List Comment Reactions](/restapi/operations/reactions/list-comment-reactions) | `ReactionController@getByCommentId` |
