---
title: Database Models
description: Overview of the FluentCommunity ORM model layer.
---

# Database Models

The FluentCommunity ORM layer is built on WPFluent and Eloquent-style models. The list below covers every first-party model in `app/Models/`, including the shared base `Model` wrapper used by the package.

| Model | Table | Notes |
| --- | --- | --- |
| [`Activity`](/database/models/activity) | `fcom_user_activities` | Tracks member-facing activity stream entries such as feed publications and comments. |
| [`BaseSpace`](/database/models/base-space) | `fcom_spaces` | Provides the shared ORM behavior for spaces, courses, space groups, and sidebar links. |
| [`Comment`](/database/models/comment) | `fcom_post_comments` | Stores feed comments, threaded replies, and their moderation-aware relationships. |
| [`Contact`](/database/models/contact) | `fc_subscribers` | Bridges FluentCommunity users to FluentCRM contact records when FluentCRM is installed. |
| [`Course`](/database/models/course) | `fcom_spaces` | A `BaseSpace` scoped to `type = course`, adding enrolment and instructor behavior on top of the shared space columns. |
| [`CourseLesson`](/database/models/course-lesson) | `fcom_posts` | An individual lesson row in `fcom_posts`, scoped by `type` and ordered within its course. |
| [`CourseTopic`](/database/models/course-topic) | `fcom_posts` | A section heading in `fcom_posts` that groups lessons within a course. |
| [`DynamicModel`](/database/models/dynamic-model) | Inherited / runtime-defined | Creates runtime table bindings when FluentCommunity needs an ORM model for a dynamic table. |
| [`Feed`](/database/models/feed) | `fcom_posts` | Represents community posts, announcements, scheduled posts, and other feed content. |
| [`Follow`](/database/models/follow) | `fcom_followers` | A follower relationship in `fcom_followers` (Pro), scoped to active rows. |
| [`Media`](/database/models/media) | `fcom_media_archive` | Stores uploaded media metadata and delivery information for feeds, comments, and spaces. |
| [`Meta`](/database/models/meta) | `fcom_meta` | Backs the shared meta table used across spaces, terms, users, and other object types. |
| [`Moderation`](/database/models/moderation) | `fcom_post_comments` | A member report in `fcom_post_comments` (Pro), scoped to `type = report` and selected down to the reporting columns. |
| [`Model`](/database/models/model) | Inherited / runtime-defined | Defines the shared base ORM behavior inherited by FluentCommunity models built on WPFluent. |
| [`Notification`](/database/models/notification) | `fcom_notifications` | Stores notification payloads before they are fanned out to per-user delivery rows. |
| [`NotificationPreference`](/database/models/notification-preference) | `fcom_notification_prefs` | Holds a member's explicit notification overrides in `fcom_notification_prefs`, one row per event and channel. A missing row means the site default applies. |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `fcom_notification_users` | Represents rows in `fcom_notification_users` where `object_type = notification`. |
| [`NotificationSubscription`](/database/models/notification-subscription) | `fcom_notification_users` | Represents rows in `fcom_notification_users` where `object_type = subscription`. |
| [`Reaction`](/database/models/reaction) | `fcom_post_reactions` | Stores likes and survey votes for feeds, comments, and course content. |
| [`SidebarLink`](/database/models/sidebar-link) | `fcom_spaces` | Uses the shared spaces table to store custom sidebar navigation links. |
| [`Space`](/database/models/space) | `fcom_spaces` | Represents a community space with privacy, membership, topic, and layout settings. |
| [`SpaceGroup`](/database/models/space-group) | `fcom_spaces` | Represents hierarchical group containers for organizing spaces on the portal. |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `fcom_space_user` | Stores the membership, role, and membership metadata for users inside spaces. |
| [`Term`](/database/models/term) | `fcom_terms` | Stores taxonomy-like topics, categories, and term metadata used by feeds and courses. |
| [`User`](/database/models/user) | `users` | Wraps the WordPress `users` table with community-specific relationships and helpers. |
| [`UserMeta`](/database/models/user-meta) | `usermeta` | Wraps the WordPress `usermeta` table for community-focused metadata access. |
| [`XProfile`](/database/models/x-profile) | `fcom_xprofile` | Stores public-facing profile fields, status, verification, and community profile metadata. |
