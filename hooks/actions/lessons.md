---
prev:
  text: 'Courses'
  link: '/hooks/actions/courses'
next:
  text: 'Integrations'
  link: '/hooks/actions/integrations'
---

# Lessons & Sections Actions

## Lesson Actions

### fluent_community/lesson/additional_media_updated

Fires when additional media (supplementary files, resources) is updated for a lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | The lesson being updated |
| `$media` | array | Media data array |

**Lesson Object Properties:**
- `id` (int) - Lesson ID
- `course_id` (int) - Parent course ID
- `title` (string) - Lesson title
- `content` (string) - Lesson content
- `type` (string) - Lesson type ('text', 'video', 'quiz', etc.)
- `serial` (int) - Lesson order
- `settings` (array) - Lesson settings

**Media Array Structure:**
```php
[
    'media_ids' => [123, 456],  // Array of media IDs
    'media_type' => 'document', // Type of media
    'action' => 'add'           // 'add' or 'remove'
]
```

**Source Files:**
- `app-pro/Http/Controllers/CourseAdminController.php`

**Example Usage:**

```php
// Log media updates
add_action('fluent_community/lesson/additional_media_updated', function($lesson, $media) {
    error_log(sprintf(
        'Additional media updated for lesson %d: %s',
        $lesson->id,
        json_encode($media)
    ));
}, 10, 2);

// Notify enrolled students
add_action('fluent_community/lesson/additional_media_updated', function($lesson, $media) {
    $course = get_course($lesson->course_id);
    $students = get_course_students($course->id);
    
    foreach ($students as $student) {
        send_notification($student->user_id, [
            'type' => 'lesson_media_updated',
            'lesson_id' => $lesson->id,
            'course_id' => $course->id,
            'message' => 'New resources added to ' . $lesson->title
        ]);
    }
}, 10, 2);

// Track media changes
add_action('fluent_community/lesson/additional_media_updated', function($lesson, $media) {
    $media_log = get_post_meta($lesson->id, 'media_update_log', true) ?: [];
    $media_log[] = [
        'timestamp' => current_time('mysql'),
        'media' => $media,
        'user_id' => get_current_user_id()
    ];
    update_post_meta($lesson->id, 'media_update_log', $media_log);
}, 10, 2);
```

**Common Use Cases:**
- Notify students about new resources
- Track media change history
- Sync media with external storage
- Update lesson completion requirements
- Log administrative changes

---

### fluent_community/lesson/before_deleted

Fires before a lesson is deleted, allowing you to perform cleanup or prevent deletion.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | The lesson about to be deleted |

**Source Files:**
- `app-pro/Http/Controllers/CourseAdminController.php`

**Example Usage:**

```php
// Log lesson deletion
add_action('fluent_community/lesson/before_deleted', function($lesson) {
    error_log(sprintf(
        'Lesson %d (%s) is being deleted from course %d',
        $lesson->id,
        $lesson->title,
        $lesson->course_id
    ));
}, 10, 1);

// Clean up related data
add_action('fluent_community/lesson/before_deleted', function($lesson) {
    // Delete lesson progress records
    global $wpdb;
    $wpdb->delete(
        $wpdb->prefix . 'fcom_course_progress',
        ['lesson_id' => $lesson->id],
        ['%d']
    );
    
    // Delete lesson media
    $media_ids = get_post_meta($lesson->id, 'media_ids', true);
    if ($media_ids) {
        foreach ($media_ids as $media_id) {
            delete_media($media_id);
        }
    }
}, 10, 1);

// Notify course instructor
add_action('fluent_community/lesson/before_deleted', function($lesson) {
    $course = get_course($lesson->course_id);
    $instructor = get_user_by('id', $course->created_by);
    
    wp_mail(
        $instructor->user_email,
        'Lesson Deleted',
        sprintf(
            'The lesson "%s" has been deleted from your course "%s".',
            $lesson->title,
            $course->title
        )
    );
}, 10, 1);

// Prevent deletion if students have completed it
add_action('fluent_community/lesson/before_deleted', function($lesson) {
    $completion_count = count_lesson_completions($lesson->id);
    
    if ($completion_count > 0) {
        // Log warning
        error_log(sprintf(
            'Warning: Deleting lesson %d that has %d completions',
            $lesson->id,
            $completion_count
        ));
        
        // You could also prevent deletion here if needed
        // wp_die('Cannot delete lesson with student completions');
    }
}, 10, 1);
```

**Common Use Cases:**
- Clean up related data before deletion
- Notify instructors or admins
- Log deletion for audit trail
- Prevent deletion under certain conditions
- Archive lesson data before deletion
- Update course statistics

---

### fluent_community/lesson/updated

Fires after a lesson is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | The updated lesson |
| `$data` | array | Update data array |

**Data Array Structure:**
```php
[
    'title' => 'Updated Title',
    'content' => 'Updated content',
    'settings' => [...],
    'serial' => 2
]
```

**Source Files:**
- `app-pro/Http/Controllers/CourseAdminController.php`

**Example Usage:**

```php
// Log lesson updates
add_action('fluent_community/lesson/updated', function($lesson, $data) {
    error_log(sprintf(
        'Lesson %d updated: %s',
        $lesson->id,
        json_encode($data)
    ));
}, 10, 2);

// Notify enrolled students of significant changes
add_action('fluent_community/lesson/updated', function($lesson, $data) {
    // Only notify if content changed significantly
    if (!isset($data['content']) && !isset($data['title'])) {
        return;
    }
    
    $course = get_course($lesson->course_id);
    $students = get_course_students($course->id);
    
    foreach ($students as $student) {
        send_notification($student->user_id, [
            'type' => 'lesson_updated',
            'lesson_id' => $lesson->id,
            'course_id' => $course->id,
            'message' => 'Lesson "' . $lesson->title . '" has been updated'
        ]);
    }
}, 10, 2);

// Track update history
add_action('fluent_community/lesson/updated', function($lesson, $data) {
    $update_log = get_post_meta($lesson->id, 'update_history', true) ?: [];
    $update_log[] = [
        'timestamp' => current_time('mysql'),
        'user_id' => get_current_user_id(),
        'changes' => array_keys($data)
    ];
    update_post_meta($lesson->id, 'update_history', $update_log);
    update_post_meta($lesson->id, 'last_updated', current_time('mysql'));
}, 10, 2);

// Invalidate student progress if content changed significantly
add_action('fluent_community/lesson/updated', function($lesson, $data) {
    // If quiz questions changed, reset student attempts
    if (isset($data['quiz_questions']) && $lesson->type === 'quiz') {
        reset_lesson_attempts($lesson->id);
        
        error_log(sprintf(
            'Quiz questions updated for lesson %d - student attempts reset',
            $lesson->id
        ));
    }
}, 10, 2);
```

**Common Use Cases:**
- Notify students of content updates
- Track lesson modification history
- Sync changes with external LMS
- Reset progress for significant changes
- Log administrative actions
- Update course metadata

---

## Section Actions

### fluent_community/section/before_deleted

Fires before a course section (topic) is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$courseTopic` or `$topic` | Topic Object | The section being deleted |

**Topic Object Properties:**
- `id` (int) - Topic/Section ID
- `course_id` (int) - Parent course ID
- `title` (string) - Section title
- `serial` (int) - Section order
- `settings` (array) - Section settings

**Source Files:**
- `app/Http/Controllers/CourseAdminController.php:389, 797`

**Example Usage:**

```php
// Log section deletion
add_action('fluent_community/section/before_deleted', function($topic) {
    error_log(sprintf(
        'Section %d (%s) being deleted from course %d',
        $topic->id,
        $topic->title,
        $topic->course_id
    ));
}, 10, 1);

// Delete all lessons in section
add_action('fluent_community/section/before_deleted', function($topic) {
    $lessons = get_section_lessons($topic->id);
    
    foreach ($lessons as $lesson) {
        // This will trigger fluent_community/lesson/before_deleted
        delete_lesson($lesson->id);
    }
}, 10, 1);

// Notify course instructor
add_action('fluent_community/section/before_deleted', function($topic) {
    $course = get_course($topic->course_id);
    $instructor = get_user_by('id', $course->created_by);
    
    wp_mail(
        $instructor->user_email,
        'Course Section Deleted',
        sprintf(
            'The section "%s" has been deleted from your course "%s".',
            $topic->title,
            $course->title
        )
    );
}, 10, 1);
```

**Common Use Cases:**
- Clean up section lessons
- Notify instructors
- Log deletion for audit
- Archive section data
- Update course structure

---

### fluent_community/section/reactions_count_updated

Fires when the reactions count for a section is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | The parent course |
| `$topic` | Topic Object | The section with updated reactions |

**Source Files:**
- `app/Http/Controllers/CourseAdminController.php:731`

**Example Usage:**

```php
// Log reactions count update
add_action('fluent_community/section/reactions_count_updated', function($course, $topic) {
    $reactions_count = get_post_meta($topic->id, 'reactions_count', true) ?: 0;
    
    error_log(sprintf(
        'Section %d reactions updated: %d reactions',
        $topic->id,
        $reactions_count
    ));
}, 10, 2);

// Award points to section creator for engagement
add_action('fluent_community/section/reactions_count_updated', function($course, $topic) {
    $reactions_count = get_post_meta($topic->id, 'reactions_count', true) ?: 0;
    
    // Award points for every 10 reactions
    if ($reactions_count % 10 === 0) {
        $points = get_user_meta($course->created_by, 'community_points', true) ?: 0;
        update_user_meta($course->created_by, 'community_points', $points + 5);
    }
}, 10, 2);
```

**Common Use Cases:**
- Track section engagement
- Award gamification points
- Update course analytics
- Identify popular sections

---

### fluent_community/section/scheduled_at_updated

Fires when a section's scheduled publication time is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | The parent course |
| `$topic` | Topic Object | The section with updated schedule |

**Source Files:**
- `app/Http/Controllers/CourseAdminController.php:728`

**Example Usage:**

```php
// Log schedule updates
add_action('fluent_community/section/scheduled_at_updated', function($course, $topic) {
    $scheduled_at = get_post_meta($topic->id, 'scheduled_at', true);
    
    error_log(sprintf(
        'Section %d scheduled time updated to: %s',
        $topic->id,
        $scheduled_at
    ));
}, 10, 2);

// Notify enrolled students
add_action('fluent_community/section/scheduled_at_updated', function($course, $topic) {
    $scheduled_at = get_post_meta($topic->id, 'scheduled_at', true);
    $students = get_course_students($course->id);
    
    foreach ($students as $student) {
        send_notification($student->user_id, [
            'type' => 'section_rescheduled',
            'course_id' => $course->id,
            'topic_id' => $topic->id,
            'scheduled_at' => $scheduled_at,
            'message' => sprintf(
                'Section "%s" has been rescheduled to %s',
                $topic->title,
                date('F j, Y', strtotime($scheduled_at))
            )
        ]);
    }
}, 10, 2);

// Update course calendar
add_action('fluent_community/section/scheduled_at_updated', function($course, $topic) {
    // Sync with external calendar system
    $scheduled_at = get_post_meta($topic->id, 'scheduled_at', true);
    
    wp_remote_post('https://calendar.example.com/api/events', [
        'body' => json_encode([
            'event_type' => 'section_scheduled',
            'course_id' => $course->id,
            'section_id' => $topic->id,
            'scheduled_at' => $scheduled_at
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Notify students of schedule changes
- Sync with external calendars
- Update course timeline
- Log scheduling changes
- Trigger reminder notifications

---

## See Also

- [Course Actions](/hooks/actions/courses) - Course-related actions
- [Course Filters](/hooks/filters/courses) - Modify course data
- [Examples](/hooks/examples) - Real-world examples

