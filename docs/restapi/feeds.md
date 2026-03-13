---
title: Feeds API
description: Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview.
---

# Feeds API

Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview.

## Authentication

These routes are registered with `PortalPolicy`. Browser clients typically use WordPress cookie auth and a nonce, while server-to-server integrations can use Application Passwords.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/feeds` | Core | [List Feeds](/restapi/operations/feeds/list-feeds) | `FeedsController@get` |
| `POST` | `/feeds` | Core | [Create Feed](/restapi/operations/feeds/create-feed) | `FeedsController@store` |
| `POST` | `/feeds/{feed_id}` | Core | [Update Feed](/restapi/operations/feeds/update-feed) | `FeedsController@update` |
| `PATCH` | `/feeds/{feed_id}` | Core | [Patch Feed](/restapi/operations/feeds/patch-feed) | `FeedsController@patchFeed` |
| `GET` | `/feeds/bookmarks` | Core | [List Bookmarks](/restapi/operations/feeds/list-bookmarks) | `FeedsController@getBookmarks` |
| `GET` | `/feeds/{feed_slug}/by-slug` | Core | [Get Feed By Slug](/restapi/operations/feeds/get-feed-by-slug) | `FeedsController@getFeedBySlug` |
| `GET` | `/feeds/{feed_id}/by-id` | Core | [Get Feed By ID](/restapi/operations/feeds/get-feed-by-id) | `FeedsController@getFeedById` |
| `DELETE` | `/feeds/{feed_id}` | Core | [Delete Feed](/restapi/operations/feeds/delete-feed) | `FeedsController@deleteFeed` |
| `GET` | `/feeds/ticker` | Core | [Get Feed Ticker](/restapi/operations/feeds/get-feed-ticker) | `FeedsController@getTicker` |
| `GET` | `/feeds/ticker-updates` | Core | [Get Ticker Updates](/restapi/operations/feeds/get-ticker-updates) | `FeedsController@getTickerUpdates` |
| `POST` | `/feeds/batch` | Core | [Batch Fetch Feeds](/restapi/operations/feeds/batch-fetch-feeds) | `FeedsController@batchFetch` |
| `GET` | `/feeds/oembed` | Core | [Get OEmbed](/restapi/operations/feeds/get-oembed) | `FeedsController@getOembed` |
| `GET` | `/feeds/links` | Core | [Get Feed Links](/restapi/operations/feeds/get-feed-links) | `FeedsController@getLinks` |
| `POST` | `/feeds/links` | Core | [Update Feed Links](/restapi/operations/feeds/update-feed-links) | `FeedsController@updateLinks` |
| `GET` | `/feeds/welcome-banner` | Core | [Get Welcome Banner](/restapi/operations/feeds/get-welcome-banner) | `FeedsController@getWelcomeBanner` |
| `POST` | `/feeds/markdown-preview` | Core | [Render Markdown Preview](/restapi/operations/feeds/render-markdown-preview) | `FeedsController@markdownToHtml` |
| `GET` | `/scheduled-posts` | <span class="pro-badge">PRO</span> | [List Scheduled Posts](/restapi/operations/feeds/list-scheduled-posts) | `SchedulePostsController@getScheduledPosts` |
| `PUT` | `/scheduled-posts/{feed_id}` | <span class="pro-badge">PRO</span> | [Reschedule Post](/restapi/operations/feeds/reschedule-post) | `SchedulePostsController@reschedulePost` |
| `POST` | `/scheduled-posts/publish/{feed_id}` | <span class="pro-badge">PRO</span> | [Publish Scheduled Post](/restapi/operations/feeds/publish-scheduled-post) | `SchedulePostsController@publishPost` |
