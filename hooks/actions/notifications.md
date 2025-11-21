---
prev:
  text: 'Reactions'
  link: '/hooks/actions/reactions'
next:
  text: 'Courses'
  link: '/hooks/actions/courses'
---

<DocStatusBanner />

# Notifications Actions

## Notification Cleanup

### fluent_community/remove_old_notifications

Fires when old notifications are being removed from the system.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$daysOld` | int | Number of days old for notifications to be removed |
| `$deletedCount` | int | Number of notifications deleted |

**Example Usage:**

```php
// Log notification cleanup
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    error_log(sprintf(
        'Removed %d notifications older than %d days',
        $deletedCount,
        $daysOld
    ));
}, 10, 2);

// Send cleanup report to admin
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    if ($deletedCount > 100) {
        $admin_email = get_option('admin_email');
        wp_mail(
            $admin_email,
            'Notification Cleanup Report',
            sprintf(
                'Cleaned up %d notifications older than %d days.',
                $deletedCount,
                $daysOld
            )
        );
    }
}, 10, 2);

// Update cleanup statistics
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    $stats = get_option('notification_cleanup_stats', []);
    
    $stats[] = [
        'date' => current_time('mysql'),
        'days_old' => $daysOld,
        'deleted_count' => $deletedCount
    ];
    
    // Keep last 30 cleanup records
    $stats = array_slice($stats, -30);
    
    update_option('notification_cleanup_stats', $stats);
}, 10, 2);

// Optimize database after large cleanup
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    if ($deletedCount > 1000) {
        global $wpdb;
        $table = $wpdb->prefix . 'fcom_notifications';
        $wpdb->query("OPTIMIZE TABLE {$table}");
        
        error_log('Optimized notifications table after cleanup');
    }
}, 10, 2);
```

---

## Course Notification Actions

The following notification actions are related to courses and are documented in the [Courses Actions](/hooks/actions/courses) page:

### fluent_community/course/scheduled/init_notification

Initialize scheduled course notifications.

[View Documentation →](/hooks/actions/courses#fluent_community-course-scheduled-init_notification)

---

### fluent_community/course/scheduled/unschedule_notification

Unschedule course notifications.

[View Documentation →](/hooks/actions/courses#fluent_community-course-scheduled-unschedule_notification)

---

### fluent_community/course/structured/init_notification

Initialize structured course notifications (drip content).

[View Documentation →](/hooks/actions/courses#fluent_community-course-structured-init_notification)

---

### fluent_community/course/structured/unschedule_notification

Unschedule structured course notifications.

[View Documentation →](/hooks/actions/courses#fluent_community-course-structured-unschedule_notification)

---

## Best Practices

### 1. Configure Cleanup Schedule

```php
// Set up custom cleanup schedule
add_action('init', function() {
    if (!wp_next_scheduled('fluent_community_cleanup_notifications')) {
        wp_schedule_event(time(), 'daily', 'fluent_community_cleanup_notifications');
    }
});

add_action('fluent_community_cleanup_notifications', function() {
    // Trigger cleanup for notifications older than 90 days
    do_action('fluent_community/remove_old_notifications', 90, 0);
});
```

### 2. Backup Before Cleanup

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    if ($deletedCount > 0) {
        // Backup notification data before deletion
        global $wpdb;
        $table = $wpdb->prefix . 'fcom_notifications';
        $cutoff_date = date('Y-m-d H:i:s', strtotime("-{$daysOld} days"));
        
        $old_notifications = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$table} WHERE created_at < %s LIMIT 1000",
            $cutoff_date
        ), ARRAY_A);
        
        if (!empty($old_notifications)) {
            update_option('notification_backup_' . date('Y-m-d'), $old_notifications, false);
        }
    }
}, 5, 2); // Priority 5 to run before deletion
```

### 3. Monitor Cleanup Performance

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    $start_time = microtime(true);
    
    // Your cleanup logic here
    
    $execution_time = microtime(true) - $start_time;
    
    if ($execution_time > 5) {
        error_log(sprintf(
            'Notification cleanup took %.2f seconds for %d records',
            $execution_time,
            $deletedCount
        ));
    }
}, 10, 2);
```

### 4. Selective Cleanup

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    // Keep important notifications even if old
    global $wpdb;
    $table = $wpdb->prefix . 'fcom_notifications';
    
    // Restore important notification types
    $important_types = ['system_alert', 'security_notice', 'payment_confirmation'];
    
    foreach ($important_types as $type) {
        // Mark as important to prevent future deletion
        $wpdb->update(
            $table,
            ['is_important' => 1],
            ['type' => $type]
        );
    }
}, 10, 2);
```

---

## Common Use Cases

### Archive Old Notifications

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    global $wpdb;
    $table = $wpdb->prefix . 'fcom_notifications';
    $archive_table = $wpdb->prefix . 'fcom_notifications_archive';
    $cutoff_date = date('Y-m-d H:i:s', strtotime("-{$daysOld} days"));
    
    // Move to archive table instead of deleting
    $wpdb->query($wpdb->prepare(
        "INSERT INTO {$archive_table} SELECT * FROM {$table} WHERE created_at < %s",
        $cutoff_date
    ));
    
    error_log('Archived old notifications to archive table');
}, 10, 2);
```

### Send Digest Before Cleanup

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    // Send unread notifications digest before cleanup
    global $wpdb;
    $table = $wpdb->prefix . 'fcom_notifications';
    $cutoff_date = date('Y-m-d H:i:s', strtotime("-{$daysOld} days"));
    
    $unread_notifications = $wpdb->get_results($wpdb->prepare(
        "SELECT user_id, COUNT(*) as count FROM {$table} 
         WHERE created_at < %s AND is_read = 0 
         GROUP BY user_id",
        $cutoff_date
    ));
    
    foreach ($unread_notifications as $notification) {
        if ($notification->count > 5) {
            $user = get_user_by('id', $notification->user_id);
            wp_mail(
                $user->user_email,
                'Unread Notifications Reminder',
                sprintf('You have %d unread notifications that will be archived soon.', $notification->count)
            );
        }
    }
}, 5, 2); // Run before cleanup
```

### Cleanup Statistics Dashboard

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    $stats = get_option('notification_stats', [
        'total_cleaned' => 0,
        'last_cleanup' => null,
        'average_per_cleanup' => 0
    ]);
    
    $stats['total_cleaned'] += $deletedCount;
    $stats['last_cleanup'] = current_time('mysql');
    $stats['last_deleted_count'] = $deletedCount;
    
    // Calculate average
    $cleanup_count = get_option('notification_cleanup_count', 0) + 1;
    $stats['average_per_cleanup'] = round($stats['total_cleaned'] / $cleanup_count);
    
    update_option('notification_stats', $stats);
    update_option('notification_cleanup_count', $cleanup_count);
}, 10, 2);
```

### Adjust Cleanup Frequency

```php
add_action('fluent_community/remove_old_notifications', function($daysOld, $deletedCount) {
    // If cleanup is removing too many notifications, adjust frequency
    if ($deletedCount > 10000) {
        // Switch to more frequent cleanup
        wp_clear_scheduled_hook('fluent_community_cleanup_notifications');
        wp_schedule_event(time(), 'twicedaily', 'fluent_community_cleanup_notifications');
        
        error_log('Increased notification cleanup frequency due to high volume');
    }
}, 10, 2);
```

---

## See Also

- [Course Actions](/hooks/actions/courses) - Course notification actions
- [User Actions](/hooks/actions/users) - User notification preferences
- [Feed Actions](/hooks/actions/feeds) - Feed notification triggers

