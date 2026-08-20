---
title: Feeds API
description: Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview.
---

# Feeds API

Feed creation, retrieval, discovery, ticker updates, bookmarks, and markdown preview.

## Authentication

These routes are registered with `PortalPolicy`. Browser clients typically use WordPress cookie auth and a nonce, while server-to-server integrations can use Application Passwords.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/feeds` | Core | [List Feeds](/restapi/operations/feeds/list-feeds) | Returns a page of posts the current user is allowed to read, transformed for display, with the pinned post of a space returned separately on the first page. |
| `POST` | `/feeds` | Core | [Create Feed](/restapi/operations/feeds/create-feed) | Creates a post, renders its Markdown, attaches media and topics, and returns the transformed post ready to prepend to the feed. |
| `POST` | `/feeds/{feed_id}` | Core | [Update Feed](/restapi/operations/feeds/update-feed) | Replaces the body and metadata of an existing post, re-renders it, reconciles its media and topics, and records an edit history entry. |
| `PATCH` | `/feeds/{feed_id}` | Core | [Patch Feed](/restapi/operations/feeds/patch-feed) | Applies a small state change to a post — pinning it, changing its priority, or turning comments off. |
| `GET` | `/feeds/bookmarks` | Core | [List Bookmarks](/restapi/operations/feeds/list-bookmarks) | Returns a page of the published posts the current user has bookmarked, newest first and transformed for display. |
| `GET` | `/feeds/{feed_slug}/by-slug` | Core | [Get Feed By Slug](/restapi/operations/feeds/get-feed-by-slug) | Returns a single post by slug, fully transformed, along with its reactions summary and author profile. |
| `GET` | `/feeds/{feed_id}/by-id` | Core | [Get Feed By ID](/restapi/operations/feeds/get-feed-by-id) | Returns a single post by numeric id; the id is resolved to a slug and then handled exactly as the by-slug endpoint. |
| `DELETE` | `/feeds/{feed_id}` | Core | [Delete Feed](/restapi/operations/feeds/delete-feed) | Deletes a post from the community. |
| `GET` | `/feeds/ticker` | Core | [Get Feed Ticker](/restapi/operations/feeds/get-feed-ticker) | Returns posts created or updated since a given moment, each with its full payload, plus the unread notification count — the polling endpoint that keeps an open feed fresh. |
| `GET` | `/feeds/ticker-updates` | Core | [Get Ticker Updates](/restapi/operations/feeds/get-ticker-updates) | Returns a lightweight list of post ids that have changed since a given moment, marked created, updated or deleted, without any post content. |
| `POST` | `/feeds/batch` | Core | [Batch Fetch Feeds](/restapi/operations/feeds/batch-fetch-feeds) | Returns the full transformed payload for a list of post ids in one request, for refreshing items a ticker call flagged as changed. |
| `GET` | `/feeds/oembed` | Core | [Get OEmbed](/restapi/operations/feeds/get-oembed) | Fetches and returns link preview metadata for a URL so the composer can show a card before the post is saved. |
| `GET` | `/feeds/links` | Core | [Get Feed Links](/restapi/operations/feeds/get-feed-links) | Returns the configurable link list shown alongside the main feed. |
| `POST` | `/feeds/links` | Core | [Update Feed Links](/restapi/operations/feeds/update-feed-links) | Replaces the feed sidebar link list with the submitted set. |
| `GET` | `/feeds/welcome-banner` | Core | [Get Welcome Banner](/restapi/operations/feeds/get-welcome-banner) | Returns the welcome banner for the current audience — the signed-in variant for members, the logged-out variant for visitors. |
| `POST` | `/feeds/markdown-preview` | Core | [Render Markdown Preview](/restapi/operations/feeds/render-markdown-preview) | Renders submitted Markdown to the same sanitised HTML a saved post would produce, without creating anything. |
| `GET` | `/scheduled-posts` | <span class="pro-badge">PRO</span> | [List Scheduled Posts](/restapi/operations/feeds/list-scheduled-posts) | Returns the paginated list of posts one member has scheduled but not yet published, soonest first. |
| `PUT` | `/scheduled-posts/{feed_id}` | <span class="pro-badge">PRO</span> | [Reschedule Post](/restapi/operations/feeds/reschedule-post) | Moves a scheduled post to a new publish time and re-queues the background action that will publish it. |
| `POST` | `/scheduled-posts/publish/{feed_id}` | <span class="pro-badge">PRO</span> | [Publish Scheduled Post](/restapi/operations/feeds/publish-scheduled-post) | Publishes a scheduled post immediately, cancelling its queued publish action and restamping its creation time to now. |
