---
prev:
  text: 'Reactions'
  link: '/hooks/actions/reactions'
next:
  text: 'Notifications'
  link: '/hooks/actions/notifications'
---

# Moderation Actions [PRO]

Actions related to content moderation, flagging, and reporting in Fluent Community Pro.

## Overview

Moderation actions allow you to hook into content flagging, moderation workflows, and report management. These features are available in Fluent Community Pro.

**Total Actions:** 5

---

## Content Flagging

### fluent_community/content_flagged

Fires when content (feed, comment, etc.) is flagged by a user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$flag` | Flag Object | The flag object |
| `$content` | Object | The flagged content (feed, comment, etc.) |

**Flag Object Properties:**
- `id` (int) - Flag ID
- `user_id` (int) - User who flagged the content
- `object_id` (int) - Content ID
- `object_type` (string) - Type: 'feed', 'comment', 'user'
- `reason` (string) - Flag reason
- `description` (string) - Additional details
- `status` (string) - 'pending', 'reviewed', 'dismissed'
- `created_at` (string) - Timestamp

**Example Usage:**

```php
// Notify moderators of flagged content
add_action('fluent_community/content_flagged', function($flag, $content) {
    $moderators = get_users(['role' => 'moderator']);
    
    foreach ($moderators as $moderator) {
        wp_mail(
            $moderator->user_email,
            'Content Flagged for Review',
            sprintf(
                "Content has been flagged:\nType: %s\nReason: %s\nReview: %s",
                $flag->object_type,
                $flag->reason,
                admin_url('admin.php?page=fluent-community-moderation&flag=' . $flag->id)
            )
        );
    }
}, 10, 2);

// Auto-hide content after multiple flags
add_action('fluent_community/content_flagged', function($flag, $content) {
    $flag_count = \FluentCommunity\App\Models\Flag::where('object_id', $flag->object_id)
        ->where('object_type', $flag->object_type)
        ->where('status', 'pending')
        ->count();
    
    if ($flag_count >= 3) {
        // Auto-hide content
        if ($flag->object_type === 'feed') {
            $content->status = 'pending_review';
            $content->save();
            
            error_log(sprintf('Feed %d auto-hidden after %d flags', $content->id, $flag_count));
        }
    }
}, 10, 2);

// Track flagging patterns
add_action('fluent_community/content_flagged', function($flag, $content) {
    $user_flags = get_user_meta($flag->user_id, 'total_flags_submitted', true) ?: 0;
    update_user_meta($flag->user_id, 'total_flags_submitted', $user_flags + 1);
    
    $content_flags = get_post_meta($flag->object_id, 'total_flags_received', true) ?: 0;
    update_post_meta($flag->object_id, 'total_flags_received', $content_flags + 1);
}, 10, 2);

// Send notification to content author
add_action('fluent_community/content_flagged', function($flag, $content) {
    $author_id = $content->user_id;
    
    do_action('fluent_community/notify_user', $author_id, [
        'type' => 'content_flagged',
        'content_id' => $content->id,
        'content_type' => $flag->object_type,
        'message' => 'Your content has been flagged for review.'
    ]);
}, 10, 2);
```

---

### fluent_community/content_moderation/created

Fires when a content moderation entry is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$moderation` | Moderation Object | The moderation entry |

**Moderation Object Properties:**
- `id` (int) - Moderation ID
- `object_id` (int) - Content ID
- `object_type` (string) - Type: 'feed', 'comment', 'user'
- `action` (string) - Action taken: 'approved', 'rejected', 'hidden', 'deleted'
- `moderator_id` (int) - Moderator user ID
- `reason` (string) - Moderation reason
- `notes` (string) - Internal notes
- `created_at` (string) - Timestamp

**Example Usage:**

```php
// Log moderation actions
add_action('fluent_community/content_moderation/created', function($moderation) {
    error_log(sprintf(
        'Moderation action: %s on %s %d by moderator %d',
        $moderation->action,
        $moderation->object_type,
        $moderation->object_id,
        $moderation->moderator_id
    ));
}, 10, 1);

// Notify content author of moderation decision
add_action('fluent_community/content_moderation/created', function($moderation) {
    $content = get_content_by_type($moderation->object_type, $moderation->object_id);
    
    if ($content && $content->user_id) {
        $author = get_user_by('id', $content->user_id);
        $moderator = get_user_by('id', $moderation->moderator_id);
        
        $action_messages = [
            'approved' => 'Your content has been approved.',
            'rejected' => 'Your content has been rejected.',
            'hidden' => 'Your content has been hidden.',
            'deleted' => 'Your content has been removed.'
        ];
        
        wp_mail(
            $author->user_email,
            'Moderation Decision',
            sprintf(
                "%s\n\nReason: %s\n\nModerated by: %s",
                $action_messages[$moderation->action] ?? 'Your content has been reviewed.',
                $moderation->reason,
                $moderator->display_name
            )
        );
    }
}, 10, 1);

// Update moderation statistics
add_action('fluent_community/content_moderation/created', function($moderation) {
    $stats = get_option('moderation_stats', [
        'total' => 0,
        'approved' => 0,
        'rejected' => 0,
        'hidden' => 0,
        'deleted' => 0
    ]);
    
    $stats['total']++;
    if (isset($stats[$moderation->action])) {
        $stats[$moderation->action]++;
    }
    
    update_option('moderation_stats', $stats);
}, 10, 1);

// Award points to moderator
add_action('fluent_community/content_moderation/created', function($moderation) {
    $points = get_user_meta($moderation->moderator_id, 'moderator_points', true) ?: 0;
    update_user_meta($moderation->moderator_id, 'moderator_points', $points + 5);
}, 10, 1);
```

---

## Report Management

### fluent_community/report/after_delete

Fires after a report is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reportId` | int | Deleted report ID |
| `$reportData` | array | Deleted report data |

**Example Usage:**

```php
// Log report deletion
add_action('fluent_community/report/after_delete', function($reportId, $reportData) {
    error_log(sprintf(
        'Report deleted: ID %d, Type: %s, Object: %d',
        $reportId,
        $reportData['object_type'] ?? 'unknown',
        $reportData['object_id'] ?? 0
    ));
}, 10, 2);

// Archive deleted reports
add_action('fluent_community/report/after_delete', function($reportId, $reportData) {
    $archive = get_option('deleted_reports_archive', []);
    
    $archive[] = array_merge($reportData, [
        'deleted_at' => current_time('mysql'),
        'deleted_by' => get_current_user_id()
    ]);
    
    // Keep last 100 deleted reports
    $archive = array_slice($archive, -100);
    
    update_option('deleted_reports_archive', $archive);
}, 10, 2);
```

---

### fluent_community/report/before_delete

Fires before a report is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$report` | Report Object | Report about to be deleted |

**Example Usage:**

```php
// Validate deletion permission
add_action('fluent_community/report/before_delete', function($report) {
    if (!current_user_can('delete_reports')) {
        wp_send_json_error(['message' => 'Insufficient permissions'], 403);
        exit;
    }
}, 10, 1);

// Backup report data
add_action('fluent_community/report/before_delete', function($report) {
    update_option('report_backup_' . $report->id, $report->toArray(), false);
}, 10, 1);

// Check if report is resolved
add_action('fluent_community/report/before_delete', function($report) {
    if ($report->status === 'pending') {
        error_log('Warning: Deleting unresolved report ' . $report->id);
    }
}, 10, 1);
```

---

## Best Practices

### 1. Implement Moderation Queue

```php
add_action('fluent_community/content_flagged', function($flag, $content) {
    $queue = get_option('moderation_queue', []);
    
    $queue[] = [
        'flag_id' => $flag->id,
        'content_id' => $content->id,
        'content_type' => $flag->object_type,
        'priority' => calculate_priority($flag, $content),
        'added_at' => current_time('mysql')
    ];
    
    // Sort by priority
    usort($queue, function($a, $b) {
        return $b['priority'] - $a['priority'];
    });
    
    update_option('moderation_queue', $queue);
}, 10, 2);
```

### 2. Prevent Flag Abuse

```php
add_action('fluent_community/content_flagged', function($flag, $content) {
    // Check if user is flagging too frequently
    $recent_flags = \FluentCommunity\App\Models\Flag::where('user_id', $flag->user_id)
        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime('-1 hour')))
        ->count();
    
    if ($recent_flags > 5) {
        error_log('User ' . $flag->user_id . ' flagging too frequently');
        
        // Optionally block the flag
        wp_send_json_error(['message' => 'You are flagging content too frequently'], 429);
        exit;
    }
}, 5, 2); // Priority 5 to run early
```

### 3. Track Moderator Performance

```php
add_action('fluent_community/content_moderation/created', function($moderation) {
    $moderator_stats = get_user_meta($moderation->moderator_id, 'moderator_stats', true) ?: [
        'total_actions' => 0,
        'approved' => 0,
        'rejected' => 0,
        'average_time' => 0
    ];
    
    $moderator_stats['total_actions']++;
    $moderator_stats[$moderation->action] = ($moderator_stats[$moderation->action] ?? 0) + 1;
    
    update_user_meta($moderation->moderator_id, 'moderator_stats', $moderator_stats);
}, 10, 1);
```

### 4. Implement Auto-Moderation Rules

```php
add_action('fluent_community/content_flagged', function($flag, $content) {
    // Auto-moderate based on rules
    $auto_moderate_reasons = ['spam', 'explicit_content', 'harassment'];
    
    if (in_array($flag->reason, $auto_moderate_reasons)) {
        $flag_count = \FluentCommunity\App\Models\Flag::where('object_id', $flag->object_id)
            ->where('object_type', $flag->object_type)
            ->whereIn('reason', $auto_moderate_reasons)
            ->count();
        
        if ($flag_count >= 2) {
            // Auto-hide content
            do_action('fluent_community/content_moderation/created', (object)[
                'object_id' => $content->id,
                'object_type' => $flag->object_type,
                'action' => 'hidden',
                'moderator_id' => 0, // System action
                'reason' => 'Auto-moderated after multiple flags'
            ]);
        }
    }
}, 10, 2);
```

---

## Common Use Cases

### Moderation Dashboard

```php
// Get moderation statistics
function get_moderation_dashboard_stats() {
    $pending_flags = \FluentCommunity\App\Models\Flag::where('status', 'pending')->count();
    $today_moderations = \FluentCommunity\App\Models\Moderation::whereDate('created_at', today())->count();
    
    return [
        'pending_flags' => $pending_flags,
        'today_moderations' => $today_moderations,
        'stats' => get_option('moderation_stats', [])
    ];
}
```

### Escalate Serious Flags

```php
add_action('fluent_community/content_flagged', function($flag, $content) {
    $serious_reasons = ['illegal_content', 'child_safety', 'violence'];
    
    if (in_array($flag->reason, $serious_reasons)) {
        // Immediately notify admins
        $admins = get_users(['role' => 'administrator']);
        
        foreach ($admins as $admin) {
            wp_mail(
                $admin->user_email,
                '🚨 URGENT: Serious Content Flag',
                sprintf(
                    "URGENT: Content flagged for: %s\n\nImmediate review required:\n%s",
                    $flag->reason,
                    admin_url('admin.php?page=fluent-community-moderation&flag=' . $flag->id)
                )
            );
        }
        
        // Auto-hide immediately
        $content->status = 'hidden';
        $content->save();
    }
}, 10, 2);
```

---

## Dynamic Report Hooks

### fluent_community/report/{$action}

Dynamic hook that fires for specific report actions. Replace `{$action}` with the action name (e.g., `approved`, `dismissed`, `escalated`).

**Example:**
```php
add_action('fluent_community/report/approved', function($report) {
    error_log('Report approved: ' . $report->id);
}, 10, 1);

add_action('fluent_community/report/dismissed', function($report) {
    error_log('Report dismissed: ' . $report->id);
}, 10, 1);
```

---

## See Also

- [User Actions](/hooks/actions/users) - User blocking and management
- [Feed Actions](/hooks/actions/feeds) - Feed status management
- [Comment Actions](/hooks/actions/comments) - Comment moderation

