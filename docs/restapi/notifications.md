---
title: Notifications API
description: Read, unread, mark-as-read, and mark-all-read notification workflows.
---

# Notifications API

Read, unread, mark-as-read, and mark-all-read notification workflows.

## Authentication

Notification routes require an authenticated portal user.

## Endpoints

| Method | Path | Edition | Operation | What it does |
| --- | --- | --- | --- | --- |
| `GET` | `/notifications` | Core | [List Notifications](/restapi/operations/notifications/list-notifications) | Returns the paginated notification history for the current user, newest activity first, with the unread total alongside it. |
| `GET` | `/notifications/unread` | Core | [List Unread Notifications](/restapi/operations/notifications/list-unread-notifications) | Returns up to 50 unread notifications for the current user with the unread total, for the notification dropdown. |
| `POST` | `/notifications/mark-read/{notification_id}` | Core | [Mark Notification Read](/restapi/operations/notifications/mark-notification-read) | Marks one notification read for the current user and returns the recalculated unread count. |
| `POST` | `/notifications/mark-read/{feed_id}/by-feed-id` | Core | [Mark Notifications Read By Feed](/restapi/operations/notifications/mark-notifications-read-by-feed) | Marks every notification about one post read for the current user and returns the new unread count together with the remaining unread post ids. |
| `POST` | `/notifications/mark-all-read` | Core | [Mark All Notifications Read](/restapi/operations/notifications/mark-all-notifications-read) | Marks every unread notification read for the current user in a single update. |
