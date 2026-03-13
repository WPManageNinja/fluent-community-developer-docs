---
title: Comments API
description: Feed comment listing, creation, updates, deletes, and single comment retrieval.
---

# Comments API

Feed comment listing, creation, updates, deletes, and single comment retrieval.

## Authentication

Comment routes are protected by `PortalPolicy` and then validated against feed and space permissions inside the controller.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/feeds/{feed_id}/comments` | Core | [List Feed Comments](/restapi/operations/comments/list-feed-comments) | `CommentsController@getComments` |
| `POST` | `/feeds/{feed_id}/comments` | Core | [Create Comment](/restapi/operations/comments/create-comment) | `CommentsController@store` |
| `POST` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Update Comment](/restapi/operations/comments/update-comment) | `CommentsController@update` |
| `PATCH` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Patch Comment](/restapi/operations/comments/patch-comment) | `CommentsController@patchComment` |
| `DELETE` | `/feeds/{feed_id}/comments/{comment_id}` | Core | [Delete Comment](/restapi/operations/comments/delete-comment) | `CommentsController@deleteComment` |
| `GET` | `/profile/{username}/comments` | Core | [Get Get Comments](/restapi/operations/comments/get-get-comments) | `ProfileController@getComments` |
| `GET` | `/comments/{id}` | Core | [Get Comment](/restapi/operations/comments/get-comment) | `CommentsController@show` |
| `GET` | `/admin/courses/{course_id}/comments` | Core | [Get Get Course Comments](/restapi/operations/comments/get-get-course-comments) | `CourseAdminController@getCourseComments` |
