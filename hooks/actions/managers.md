---
prev:
  text: 'Followers'
  link: '/hooks/actions/followers'
next: false
---

# Managers Actions [PRO]

Actions related to manager assignment and management in Fluent Community Pro.

## Overview

Manager actions handle the assignment, removal, and updates of managers for spaces, courses, and other community resources. Managers have elevated permissions to moderate and manage specific areas of the community.

**Total Actions:** 4

---

## Manager Assignment

### fluent_community/manager/added

Fires when a manager is added to a resource (space, course, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$manager` | Manager Object | The manager assignment object |
| `$resource` | Object | The resource (space, course, etc.) |

**Manager Object Properties:**
- `id` (int) - Manager assignment ID
- `user_id` (int) - Manager user ID
- `object_id` (int) - Resource ID (space_id, course_id, etc.)
- `object_type` (string) - Type: 'space', 'course', 'portal'
- `role` (string) - Manager role: 'manager', 'moderator', 'admin'
- `permissions` (array) - Specific permissions granted
- `created_at` (string) - Assignment timestamp

**Example Usage:**

```php
// Notify new manager
add_action('fluent_community/manager/added', function($manager, $resource) {
    $user = get_user_by('id', $manager->user_id);
    
    wp_mail(
        $user->user_email,
        'You\'ve Been Assigned as Manager',
        sprintf(
            "Hi %s,\n\nYou've been assigned as a manager for: %s\n\nRole: %s",
            $user->display_name,
            $resource->title ?? $resource->name,
            $manager->role
        )
    );
}, 10, 2);

// Log manager assignment
add_action('fluent_community/manager/added', function($manager, $resource) {
    error_log(sprintf(
        'Manager added: User %d assigned to %s %d with role %s',
        $manager->user_id,
        $manager->object_type,
        $manager->object_id,
        $manager->role
    ));
}, 10, 2);

// Award manager badge
add_action('fluent_community/manager/added', function($manager, $resource) {
    $user_badges = get_user_meta($manager->user_id, 'community_badges', true) ?: [];
    
    if (!in_array('manager', $user_badges)) {
        $user_badges[] = 'manager';
        update_user_meta($manager->user_id, 'community_badges', $user_badges);
    }
}, 10, 2);

// Update resource manager count
add_action('fluent_community/manager/added', function($manager, $resource) {
    $manager_count = get_post_meta($manager->object_id, 'manager_count', true) ?: 0;
    update_post_meta($manager->object_id, 'manager_count', $manager_count + 1);
}, 10, 2);

// Send notification to resource owner
add_action('fluent_community/manager/added', function($manager, $resource) {
    if (isset($resource->created_by)) {
        $new_manager = get_user_by('id', $manager->user_id);
        
        do_action('fluent_community/notify_user', $resource->created_by, [
            'type' => 'manager_added',
            'resource_id' => $resource->id,
            'resource_type' => $manager->object_type,
            'manager_name' => $new_manager->display_name
        ]);
    }
}, 10, 2);
```

---

### fluent_community/manager/updated

Fires when a manager's role or permissions are updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$manager` | Manager Object | Updated manager object |
| `$oldData` | array | Previous manager data |

**Example Usage:**

```php
// Log manager updates
add_action('fluent_community/manager/updated', function($manager, $oldData) {
    $changes = [];
    
    if ($manager->role !== $oldData['role']) {
        $changes[] = sprintf('Role: %s → %s', $oldData['role'], $manager->role);
    }
    
    if ($manager->permissions !== $oldData['permissions']) {
        $changes[] = 'Permissions updated';
    }
    
    if (!empty($changes)) {
        error_log(sprintf(
            'Manager %d updated: %s',
            $manager->id,
            implode(', ', $changes)
        ));
    }
}, 10, 2);

// Notify manager of role change
add_action('fluent_community/manager/updated', function($manager, $oldData) {
    if ($manager->role !== $oldData['role']) {
        $user = get_user_by('id', $manager->user_id);
        
        wp_mail(
            $user->user_email,
            'Manager Role Updated',
            sprintf(
                "Your manager role has been updated from %s to %s.",
                $oldData['role'],
                $manager->role
            )
        );
    }
}, 10, 2);

// Track permission changes
add_action('fluent_community/manager/updated', function($manager, $oldData) {
    $permission_log = get_post_meta($manager->object_id, 'manager_permission_log', true) ?: [];
    
    $permission_log[] = [
        'manager_id' => $manager->id,
        'user_id' => $manager->user_id,
        'old_role' => $oldData['role'],
        'new_role' => $manager->role,
        'updated_at' => current_time('mysql'),
        'updated_by' => get_current_user_id()
    ];
    
    // Keep last 50 changes
    $permission_log = array_slice($permission_log, -50);
    
    update_post_meta($manager->object_id, 'manager_permission_log', $permission_log);
}, 10, 2);
```

---

## Manager Removal

### fluent_community/manager/before_remove

Fires before a manager is removed from a resource.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$manager` | Manager Object | Manager about to be removed |

**Example Usage:**

```php
// Validate removal permission
add_action('fluent_community/manager/before_remove', function($manager) {
    $current_user_id = get_current_user_id();
    
    // Prevent self-removal if last manager
    if ($current_user_id === $manager->user_id) {
        $manager_count = \FluentCommunity\App\Models\Manager::where('object_id', $manager->object_id)
            ->where('object_type', $manager->object_type)
            ->count();
        
        if ($manager_count <= 1) {
            wp_send_json_error([
                'message' => 'Cannot remove the last manager. Assign another manager first.'
            ], 403);
            exit;
        }
    }
}, 10, 1);

// Backup manager data
add_action('fluent_community/manager/before_remove', function($manager) {
    update_option('manager_backup_' . $manager->id, $manager->toArray(), false);
}, 10, 1);

// Check for pending tasks
add_action('fluent_community/manager/before_remove', function($manager) {
    $pending_tasks = get_user_meta($manager->user_id, 'pending_manager_tasks_' . $manager->object_id, true);
    
    if (!empty($pending_tasks)) {
        error_log(sprintf(
            'Warning: Removing manager %d with %d pending tasks',
            $manager->user_id,
            count($pending_tasks)
        ));
    }
}, 10, 1);
```

---

### fluent_community/managed/after_remove

Fires after a manager is removed from a resource.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$managerId` | int | Removed manager ID |
| `$managerData` | array | Removed manager data |

**Example Usage:**

```php
// Notify removed manager
add_action('fluent_community/managed/after_remove', function($managerId, $managerData) {
    $user = get_user_by('id', $managerData['user_id']);
    
    wp_mail(
        $user->user_email,
        'Manager Role Removed',
        sprintf(
            "Your manager role for %s has been removed.",
            $managerData['object_type']
        )
    );
}, 10, 2);

// Log removal
add_action('fluent_community/managed/after_remove', function($managerId, $managerData) {
    error_log(sprintf(
        'Manager removed: ID %d, User %d from %s %d',
        $managerId,
        $managerData['user_id'],
        $managerData['object_type'],
        $managerData['object_id']
    ));
}, 10, 2);

// Update resource manager count
add_action('fluent_community/managed/after_remove', function($managerId, $managerData) {
    $manager_count = get_post_meta($managerData['object_id'], 'manager_count', true) ?: 0;
    update_post_meta($managerData['object_id'], 'manager_count', max(0, $manager_count - 1));
}, 10, 2);

// Remove manager badge if no longer managing anything
add_action('fluent_community/managed/after_remove', function($managerId, $managerData) {
    $remaining_assignments = \FluentCommunity\App\Models\Manager::where('user_id', $managerData['user_id'])->count();
    
    if ($remaining_assignments === 0) {
        $user_badges = get_user_meta($managerData['user_id'], 'community_badges', true) ?: [];
        $user_badges = array_diff($user_badges, ['manager']);
        update_user_meta($managerData['user_id'], 'community_badges', $user_badges);
    }
}, 10, 2);

// Archive manager activity
add_action('fluent_community/managed/after_remove', function($managerId, $managerData) {
    $activity_log = get_user_meta($managerData['user_id'], 'manager_activity_log', true) ?: [];
    
    $activity_log[] = [
        'manager_id' => $managerId,
        'object_id' => $managerData['object_id'],
        'object_type' => $managerData['object_type'],
        'role' => $managerData['role'],
        'removed_at' => current_time('mysql'),
        'removed_by' => get_current_user_id()
    ];
    
    update_user_meta($managerData['user_id'], 'manager_activity_log', $activity_log);
}, 10, 2);
```

---

## Best Practices

### 1. Validate Manager Permissions

```php
add_action('fluent_community/manager/added', function($manager, $resource) {
    // Ensure user has minimum requirements
    $user = get_user_by('id', $manager->user_id);
    
    if (!$user || !user_can($user, 'read')) {
        error_log('Invalid user assigned as manager: ' . $manager->user_id);
    }
}, 10, 2);
```

### 2. Track Manager Activity

```php
add_action('fluent_community/manager/added', function($manager, $resource) {
    $activity = get_option('manager_activity_log', []);
    
    $activity[] = [
        'action' => 'added',
        'manager_id' => $manager->id,
        'user_id' => $manager->user_id,
        'resource_id' => $manager->object_id,
        'resource_type' => $manager->object_type,
        'timestamp' => current_time('mysql'),
        'assigned_by' => get_current_user_id()
    ];
    
    // Keep last 500 activities
    $activity = array_slice($activity, -500);
    
    update_option('manager_activity_log', $activity);
}, 10, 2);
```

### 3. Implement Manager Hierarchy

```php
add_action('fluent_community/manager/added', function($manager, $resource) {
    $role_hierarchy = ['admin' => 3, 'manager' => 2, 'moderator' => 1];
    
    // Store hierarchy level
    update_user_meta(
        $manager->user_id,
        'manager_level_' . $manager->object_id,
        $role_hierarchy[$manager->role] ?? 0
    );
}, 10, 2);
```

### 4. Prevent Duplicate Assignments

```php
add_action('fluent_community/manager/added', function($manager, $resource) {
    $existing = \FluentCommunity\App\Models\Manager::where('user_id', $manager->user_id)
        ->where('object_id', $manager->object_id)
        ->where('object_type', $manager->object_type)
        ->where('id', '!=', $manager->id)
        ->first();
    
    if ($existing) {
        error_log('Duplicate manager assignment detected: ' . $manager->id);
    }
}, 10, 2);
```

---

## Common Use Cases

### Manager Dashboard

```php
// Get manager statistics
function get_manager_dashboard($user_id) {
    $assignments = \FluentCommunity\App\Models\Manager::where('user_id', $user_id)->get();
    
    $stats = [
        'total_assignments' => $assignments->count(),
        'by_type' => [],
        'by_role' => []
    ];
    
    foreach ($assignments as $assignment) {
        $stats['by_type'][$assignment->object_type] = ($stats['by_type'][$assignment->object_type] ?? 0) + 1;
        $stats['by_role'][$assignment->role] = ($stats['by_role'][$assignment->role] ?? 0) + 1;
    }
    
    return $stats;
}
```

### Auto-Assign Managers

```php
// Auto-assign creator as manager
add_action('fluent_community/space/created', function($space) {
    do_action('fluent_community/manager/added', (object)[
        'user_id' => $space->created_by,
        'object_id' => $space->id,
        'object_type' => 'space',
        'role' => 'admin',
        'permissions' => ['all']
    ], $space);
}, 10, 1);
```

### Manager Leaderboard

```php
add_action('fluent_community/manager/added', function($manager, $resource) {
    $leaderboard = get_option('manager_leaderboard', []);
    
    if (!isset($leaderboard[$manager->user_id])) {
        $leaderboard[$manager->user_id] = [
            'assignments' => 0,
            'spaces' => 0,
            'courses' => 0
        ];
    }
    
    $leaderboard[$manager->user_id]['assignments']++;
    $leaderboard[$manager->user_id][$manager->object_type . 's'] = 
        ($leaderboard[$manager->user_id][$manager->object_type . 's'] ?? 0) + 1;
    
    update_option('manager_leaderboard', $leaderboard);
}, 10, 2);
```

---

## See Also

- [Space Actions](/hooks/actions/spaces) - Space management
- [Course Actions](/hooks/actions/courses) - Course management
- [User Actions](/hooks/actions/users) - User permissions

