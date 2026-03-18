---
title: Notifications API
description: Read, unread, mark-as-read, and mark-all-read notification workflows.
---

# Notifications API

Read, unread, mark-as-read, and mark-all-read notification workflows.

## Authentication

Notification routes require an authenticated portal user.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/notifications` | Core | [List Notifications](/restapi/operations/notifications/list-notifications) | `NotificationsController@getNotifications` |
| `GET` | `/notifications/unread` | Core | [List Unread Notifications](/restapi/operations/notifications/list-unread-notifications) | `NotificationsController@getUnreadNotifications` |
| `POST` | `/notifications/mark-read/{notification_id}` | Core | [Mark Notification Read](/restapi/operations/notifications/mark-notification-read) | `NotificationsController@markAsRead` |
| `POST` | `/notifications/mark-read/{feed_id}/by-feed-id` | Core | [Mark Notifications Read By Feed](/restapi/operations/notifications/mark-notifications-read-by-feed) | `NotificationsController@markAsReadByFeedId` |
| `POST` | `/notifications/mark-all-read` | Core | [Mark All Notifications Read](/restapi/operations/notifications/mark-all-notifications-read) | `NotificationsController@markAllRead` |
