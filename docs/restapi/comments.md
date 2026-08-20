---
title: Comments API
description: Feed comment listing, creation, updates, deletes, and single comment retrieval.
---

# Comments API

Feed comment listing, creation, updates, deletes, and single comment retrieval.

## Authentication

Comment routes are protected by `PortalPolicy` and then validated against feed and space permissions inside the controller.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/feeds/{feed_id}/comments` | Core | [List Feed Comments](/restapi/operations/comments/list-feed-comments) | Returns every comment on a post in chronological order, with each author profile attached and the current user liked state flagged. |
| `POST` | `/feeds/{feed_id}/comments` | Core | [Create Comment](/restapi/operations/comments/create-comment) | Posts a comment or a threaded reply on a feed item, renders its Markdown, links any attached media and bumps the post comment count. |
| `POST` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Update Comment](/restapi/operations/comments/update-comment) | Replaces the body of an existing comment, re-renders it, and reconciles its attached media with the submitted list. |
| `PATCH` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Patch Comment](/restapi/operations/comments/patch-comment) | Pins or unpins a top-level comment so it sorts above the rest of the thread. |
| `DELETE` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Delete Comment](/restapi/operations/comments/delete-comment) | Deletes a comment, recounts the comments on its post and hands any attached media to the media cleanup hook. |
| `GET` | `/profile/{username}/comments` | Core | [Get Comments](/restapi/operations/comments/get-comments) | Returns a paginated list of the comments one member has written, each with the full parent post eager-loaded so the post can open without a second request. |
| `GET` | `/comments/{id}` | Core | [Get Comment](/restapi/operations/comments/get-comment) | Returns a single comment with its author profile, optionally in the shape the editor expects. |
| `GET` | `/admin/courses/{course_id}/comments` | Core | [Get Course Comments](/restapi/operations/comments/get-course-comments) | Returns a paginated, newest-first list of every comment left on lessons within one course, for the course management screen. |
