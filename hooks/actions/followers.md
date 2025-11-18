---
prev:
  text: 'Activities'
  link: '/hooks/actions/activities'
next:
  text: 'Managers'
  link: '/hooks/actions/managers'
---

# Followers Actions

Actions related to user following and follower relationships in Fluent Community.

## Overview

Follower actions are documented in the [User Actions](/hooks/actions/users) page as they are part of the user relationship system.

**Total Actions:** 2 (documented in User Actions)

---

## Available Actions

All follower-related actions are documented in the **User Actions** page:

### fluent_community/followed_user

Fires when a user follows another user.

[View Documentation →](/hooks/actions/users#fluent_community-followed_user)

---

### fluent_community/before_unfollowing_user [PRO]

Fires before a user unfollows another user.

[View Documentation →](/hooks/actions/users#fluent_community-before_unfollowing_user)

---

## Quick Examples

### Track Follower Count

```php
add_action('fluent_community/followed_user', function($followedUser, $followerUser) {
    $follower_count = get_user_meta($followedUser->ID, 'follower_count', true) ?: 0;
    update_user_meta($followedUser->ID, 'follower_count', $follower_count + 1);
}, 10, 2);
```

### Notify on New Follower

```php
add_action('fluent_community/followed_user', function($followedUser, $followerUser) {
    wp_mail(
        $followedUser->user_email,
        'New Follower',
        sprintf('%s is now following you!', $followerUser->display_name)
    );
}, 10, 2);
```

### Award Badge for Follower Milestones

```php
add_action('fluent_community/followed_user', function($followedUser, $followerUser) {
    $follower_count = get_user_meta($followedUser->ID, 'follower_count', true) ?: 0;
    
    $milestones = [10 => 'popular', 50 => 'influencer', 100 => 'celebrity'];
    
    foreach ($milestones as $count => $badge) {
        if ($follower_count === $count) {
            $badges = get_user_meta($followedUser->ID, 'community_badges', true) ?: [];
            $badges[] = $badge;
            update_user_meta($followedUser->ID, 'community_badges', $badges);
            
            do_action('fluent_community/notify_user', $followedUser->ID, [
                'type' => 'badge_earned',
                'badge' => $badge
            ]);
        }
    }
}, 10, 2);
```

---

## See Also

- [User Actions](/hooks/actions/users) - Complete follower action documentation
- [Feed Actions](/hooks/actions/feeds) - Follower feed visibility
- [Notification Actions](/hooks/actions/notifications) - Follower notifications

