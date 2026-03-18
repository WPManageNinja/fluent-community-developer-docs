---
title: Database Schema
description: Table inventory and ER diagrams for FluentCommunity.
---

# Database Schema

FluentCommunity defines 13 first-party database tables in `database/Migrations/`, plus relationships to WordPress core tables and optional integration tables.

## Table Inventory

| Table | Source |
| --- | --- |
| `fcom_user_activities` | database/Migrations/UserActivitiesMigrator.php |
| `fcom_spaces` | database/Migrations/FeedSpaceMigrator.php |
| `fcom_post_comments` | database/Migrations/FeedCommentsMigrator.php |
| `fc_subscribers` | FluentCRM table. It is referenced by FluentCommunity when FluentCRM is installed. |
| `fcom_posts` | database/Migrations/FeedMigrator.php |
| `fcom_media_archive` | database/Migrations/MediaArchiveMigrator.php |
| `fcom_meta` | database/Migrations/MetaMigrator.php |
| `fcom_notifications` | database/Migrations/NotificationsMigrator.php |
| `fcom_notification_users` | database/Migrations/NotificationUserMigrator.php |
| `fcom_post_reactions` | database/Migrations/FeedReactionsMigrator.php |
| `fcom_space_user` | database/Migrations/FeedSpaceUserMigrator.php |
| `fcom_terms` | database/Migrations/TermMigrator.php |
| `users` | WordPress core table. FluentCommunity reads from it but does not create or migrate it. |
| `usermeta` | WordPress core table. FluentCommunity exposes it through `UserMeta`, but schema ownership stays with WordPress. |
| `fcom_xprofile` | database/Migrations/XProfileMigrator.php |
| `fcom_followers` | Inherited / external table |
| `fn_subscriptions` | Inherited / external table |

## Content Relationships

```mermaid
erDiagram
fcom_posts ||--o{ fcom_user_activities : feed
fcom_spaces ||--o{ fcom_user_activities : space
users ||--o{ fcom_user_activities : user
fcom_xprofile ||--o{ fcom_user_activities : xprofile
users ||--o{ fcom_post_comments : user
fcom_xprofile ||--o{ fcom_post_comments : xprofile
fcom_post_comments ||--|| fcom_media_archive : media
fcom_posts ||--o{ fcom_post_comments : post
fcom_post_comments ||--|| fcom_spaces : space
fcom_post_comments ||--o{ fcom_post_reactions : reactions
users ||--o{ fcom_posts : user
fcom_xprofile ||--o{ fcom_posts : xprofile
fcom_spaces ||--o{ fcom_posts : space
fcom_posts ||--o{ fcom_post_comments : comments
fcom_posts ||--o{ fcom_post_reactions : reactions
fcom_posts ||--o{ fcom_followers : follows
fcom_posts ||--o{ fcom_post_reactions : surveyVotes
fcom_posts }o--o{ fcom_terms : terms
fcom_posts ||--o{ fcom_user_activities : activities
fcom_posts ||--o{ fcom_notifications : notifications
fcom_posts ||--o{ fcom_media_archive : media
fcom_posts ||--o{ fcom_media_archive : feed
users ||--o{ fcom_media_archive : user
fcom_xprofile ||--o{ fcom_media_archive : xprofile
fcom_notifications ||--o{ fcom_notification_users : subscribers
fcom_notifications ||--|| fcom_notification_users : subscriber
fcom_posts ||--o{ fcom_notifications : feed
users ||--o{ fcom_notifications : src_user
fcom_xprofile ||--o{ fcom_notifications : xprofile
users ||--o{ fcom_post_reactions : user
fcom_xprofile ||--o{ fcom_post_reactions : xprofile
fcom_posts ||--o{ fcom_post_reactions : feed
fcom_post_comments ||--o{ fcom_post_reactions : comment
users ||--o{ fcom_xprofile : user
fcom_xprofile ||--|| fc_subscribers : contact
fcom_xprofile }o--o{ fcom_spaces : spaces
fcom_xprofile ||--o{ fcom_posts : posts
fcom_xprofile ||--o{ fcom_followers : follows
fcom_xprofile ||--o{ fcom_followers : followers
fcom_xprofile ||--o{ fcom_post_comments : comments
fcom_xprofile }o--o{ fcom_spaces : courses
fcom_space_user ||--o{ fcom_xprofile : space_pivot
fcom_meta ||--o{ fcom_xprofile : community_role
```

## Space, Membership, and Taxonomy Relationships

```mermaid
erDiagram
users ||--o{ fcom_spaces : owner
fcom_space_user ||--o{ fcom_spaces : space_pivot
fcom_spaces }o--o{ users : admins
fcom_spaces ||--o{ fcom_posts : posts
fcom_spaces ||--o{ fcom_post_comments : comments
fcom_spaces }o--o{ users : members
fcom_spaces }o--o{ fcom_xprofile : x_members
fcom_spaces ||--o{ fcom_spaces : group
fcom_spaces ||--o{ fcom_spaces : spaces
users ||--o{ fcom_space_user : user
fcom_xprofile ||--o{ fcom_space_user : xprofile
fcom_spaces ||--o{ fcom_space_user : space
fcom_terms }o--o{ fcom_posts : posts
fcom_terms }o--o{ fcom_spaces : base_spaces
users ||--o{ fcom_xprofile : user
fcom_xprofile ||--|| fc_subscribers : contact
fcom_xprofile }o--o{ fcom_spaces : spaces
fcom_xprofile ||--o{ fcom_posts : posts
fcom_xprofile ||--o{ fcom_followers : follows
fcom_xprofile ||--o{ fcom_followers : followers
fcom_xprofile ||--o{ fcom_post_comments : comments
fcom_xprofile }o--o{ fcom_spaces : courses
fcom_space_user ||--o{ fcom_xprofile : space_pivot
fcom_meta ||--o{ fcom_xprofile : community_role
```

## Notifications, Meta, and Profile Relationships

```mermaid
erDiagram
fcom_notifications ||--o{ fcom_notification_users : subscribers
fcom_notifications ||--|| fcom_notification_users : subscriber
fcom_posts ||--o{ fcom_notifications : feed
users ||--o{ fcom_notifications : src_user
fcom_xprofile ||--o{ fcom_notifications : xprofile
users ||--o{ fcom_notification_users : user
fcom_xprofile ||--o{ fcom_notification_users : xprofile
fcom_notifications ||--o{ fcom_notification_users : notification
users ||--o{ usermeta : user
users ||--o{ fcom_xprofile : user
fcom_xprofile ||--|| fc_subscribers : contact
fcom_xprofile }o--o{ fcom_spaces : spaces
fcom_xprofile ||--o{ fcom_posts : posts
fcom_xprofile ||--o{ fcom_followers : follows
fcom_xprofile ||--o{ fcom_followers : followers
fcom_xprofile ||--o{ fcom_post_comments : comments
fcom_xprofile }o--o{ fcom_spaces : courses
fcom_space_user ||--o{ fcom_xprofile : space_pivot
fcom_meta ||--o{ fcom_xprofile : community_role
```
