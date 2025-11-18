---
prev:
  text: 'Notifications'
  link: '/hooks/actions/notifications'
next:
  text: 'Portal & UI'
  link: '/hooks/actions/portal'
---

# Courses Actions

Actions related to course creation, management, enrollment, lessons, and quizzes in Fluent Community.

## Overview

These actions allow you to hook into course lifecycle events, student enrollment, lesson completion, and quiz submissions.

**Total Actions:** 19

---

## Course Lifecycle

### fluent_community/course/before_create

Fires before a course is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$courseData` | array | Course data being created |

**Example Usage:**

```php
// Validate course data before creation
add_action('fluent_community/course/before_create', function($courseData) {
    if (empty($courseData['title'])) {
        wp_send_json_error(['message' => 'Course title is required'], 400);
    }
}, 10, 1);

// Set default values
add_action('fluent_community/course/before_create', function(&$courseData) {
    if (!isset($courseData['status'])) {
        $courseData['status'] = 'draft';
    }
}, 10, 1);
```

---

### fluent_community/course/created

Fires immediately after a course is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | The created course object |

**Example Usage:**

```php
// Log course creation
add_action('fluent_community/course/created', function($course) {
    error_log(sprintf(
        'Course created: %s (ID: %d) by User: %d',
        $course->title,
        $course->id,
        $course->created_by
    ));
}, 10, 1);

// Send notification to admins
add_action('fluent_community/course/created', function($course) {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        'New Course Created',
        sprintf('A new course "%s" has been created.', $course->title)
    );
}, 10, 1);

// Auto-enroll course creator
add_action('fluent_community/course/created', function($course) {
    do_action('fluent_community/course/enrolled', $course, $course->created_by);
}, 10, 1);
```

---

### fluent_community/course/updated

Fires after a course is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Updated course object |
| `$oldData` | array | Previous course data |

**Example Usage:**

```php
// Track course changes
add_action('fluent_community/course/updated', function($course, $oldData) {
    $changes = [];
    
    if ($course->title !== $oldData['title']) {
        $changes[] = 'Title changed';
    }
    
    if ($course->status !== $oldData['status']) {
        $changes[] = sprintf('Status: %s → %s', $oldData['status'], $course->status);
    }
    
    if (!empty($changes)) {
        error_log('Course ' . $course->id . ' updated: ' . implode(', ', $changes));
    }
}, 10, 2);

// Notify enrolled students of major changes
add_action('fluent_community/course/updated', function($course, $oldData) {
    if ($course->description !== $oldData['description']) {
        // Get enrolled students
        $students = \FluentCommunity\App\Models\CourseStudent::where('course_id', $course->id)->get();
        
        foreach ($students as $student) {
            // Send notification
            do_action('fluent_community/notify_user', $student->user_id, [
                'type' => 'course_updated',
                'course_id' => $course->id
            ]);
        }
    }
}, 10, 2);
```

---

### fluent_community/course/published

Fires when a course is published.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Published course object |

**Example Usage:**

```php
// Announce new course
add_action('fluent_community/course/published', function($course) {
    // Create announcement feed
    do_action('fluent_community/feed/created', [
        'title' => 'New Course Available!',
        'message' => sprintf('Check out our new course: %s', $course->title),
        'type' => 'announcement',
        'meta' => ['course_id' => $course->id]
    ]);
}, 10, 1);

// Notify followers
add_action('fluent_community/course/published', function($course) {
    $creator = get_user_by('id', $course->created_by);
    $followers = get_user_meta($course->created_by, 'followers', true) ?: [];
    
    foreach ($followers as $follower_id) {
        wp_mail(
            get_userdata($follower_id)->user_email,
            'New Course Published',
            sprintf('%s published a new course: %s', $creator->display_name, $course->title)
        );
    }
}, 10, 1);
```

---

### fluent_community/course/before_delete

Fires before a course is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course about to be deleted |

**Example Usage:**

```php
// Prevent deletion if students enrolled
add_action('fluent_community/course/before_delete', function($course) {
    $student_count = \FluentCommunity\App\Models\CourseStudent::where('course_id', $course->id)->count();
    
    if ($student_count > 0) {
        wp_send_json_error([
            'message' => sprintf('Cannot delete course with %d enrolled students', $student_count)
        ], 403);
    }
}, 10, 1);

// Backup course data
add_action('fluent_community/course/before_delete', function($course) {
    $backup = [
        'course' => $course->toArray(),
        'lessons' => $course->lessons()->get()->toArray(),
        'deleted_at' => current_time('mysql')
    ];
    
    update_option('course_backup_' . $course->id, $backup);
}, 10, 1);
```

---

### fluent_community/course/deleted

Fires after a course is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$courseId` | int | ID of deleted course |
| `$courseData` | array | Deleted course data |

**Example Usage:**

```php
// Clean up related data
add_action('fluent_community/course/deleted', function($courseId, $courseData) {
    // Delete course meta
    delete_post_meta_by_key('course_' . $courseId);
    
    // Clear cache
    wp_cache_delete('course_' . $courseId);
    
    error_log(sprintf('Course deleted: %s (ID: %d)', $courseData['title'], $courseId));
}, 10, 2);

// Notify admins
add_action('fluent_community/course/deleted', function($courseId, $courseData) {
    wp_mail(
        get_option('admin_email'),
        'Course Deleted',
        sprintf('Course "%s" (ID: %d) has been deleted.', $courseData['title'], $courseId)
    );
}, 10, 2);
```

---

## Student Enrollment

### fluent_community/course/enrolled

Fires when a student enrolls in a course.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |
| `$userId` | int | User ID of enrolled student |

**Example Usage:**

```php
// Welcome email to student
add_action('fluent_community/course/enrolled', function($course, $userId) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'Welcome to ' . $course->title,
        sprintf(
            "Hi %s,\n\nYou've successfully enrolled in %s. Let's get started!",
            $user->display_name,
            $course->title
        )
    );
}, 10, 2);

// Award enrollment points
add_action('fluent_community/course/enrolled', function($course, $userId) {
    $points = get_user_meta($userId, 'community_points', true) ?: 0;
    update_user_meta($userId, 'community_points', $points + 50);
}, 10, 2);

// Track enrollment
add_action('fluent_community/course/enrolled', function($course, $userId) {
    $enrollment_count = get_post_meta($course->id, 'total_enrollments', true) ?: 0;
    update_post_meta($course->id, 'total_enrollments', $enrollment_count + 1);
    update_user_meta($userId, 'enrolled_at_' . $course->id, current_time('mysql'));
}, 10, 2);
```

---

### fluent_community/course/student_left

Fires when a student leaves/unenrolls from a course.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |
| `$userId` | int | User ID of student who left |

**Example Usage:**

```php
// Log unenrollment
add_action('fluent_community/course/student_left', function($course, $userId) {
    error_log(sprintf(
        'Student %d left course: %s (ID: %d)',
        $userId,
        $course->title,
        $course->id
    ));
}, 10, 2);

// Update enrollment count
add_action('fluent_community/course/student_left', function($course, $userId) {
    $enrollment_count = get_post_meta($course->id, 'total_enrollments', true) ?: 0;
    update_post_meta($course->id, 'total_enrollments', max(0, $enrollment_count - 1));
}, 10, 2);

// Send feedback request
add_action('fluent_community/course/student_left', function($course, $userId) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'We\'d love your feedback',
        sprintf('You recently left "%s". We\'d appreciate your feedback!', $course->title)
    );
}, 10, 2);
```

---

## Course Completion

### fluent_community/course/completed

Fires when a student completes a course.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Completed course object |
| `$userId` | int | User ID of student |

**Example Usage:**

```php
// Award completion certificate
add_action('fluent_community/course/completed', function($course, $userId) {
    $certificate_id = generate_certificate($course->id, $userId);
    
    update_user_meta($userId, 'certificate_' . $course->id, $certificate_id);
    
    $user = get_user_by('id', $userId);
    wp_mail(
        $user->user_email,
        'Congratulations! Course Completed',
        sprintf('You\'ve completed "%s"! Your certificate is ready.', $course->title)
    );
}, 10, 2);

// Award completion points
add_action('fluent_community/course/completed', function($course, $userId) {
    $points = get_user_meta($userId, 'community_points', true) ?: 0;
    update_user_meta($userId, 'community_points', $points + 500);
}, 10, 2);

// Unlock next course
add_action('fluent_community/course/completed', function($course, $userId) {
    $next_course_id = get_post_meta($course->id, 'next_course_id', true);
    
    if ($next_course_id) {
        update_user_meta($userId, 'unlocked_course_' . $next_course_id, true);
    }
}, 10, 2);
```

---

## Lesson Management

### fluent_community/lesson/updated

Fires after a lesson is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | Updated lesson object |

**Example Usage:**

```php
add_action('fluent_community/lesson/updated', function($lesson) {
    error_log(sprintf('Lesson updated: %s (ID: %d)', $lesson->title, $lesson->id));
    
    // Clear lesson cache
    wp_cache_delete('lesson_' . $lesson->id);
}, 10, 1);
```

---

### fluent_community/lesson/before_deleted

Fires before a lesson is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | Lesson about to be deleted |

**Example Usage:**

```php
add_action('fluent_community/lesson/before_deleted', function($lesson) {
    // Backup lesson content
    update_option('lesson_backup_' . $lesson->id, $lesson->toArray());
}, 10, 1);
```

---

### fluent_community/lesson/additional_media_updated

Fires when additional media is updated for a lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | Lesson object |
| `$mediaData` | array | Updated media data |

**Example Usage:**

```php
add_action('fluent_community/lesson/additional_media_updated', function($lesson, $mediaData) {
    error_log(sprintf('Media updated for lesson %d: %d files', $lesson->id, count($mediaData)));
}, 10, 2);
```

---

### fluent_community/course/lesson_completed

Fires when a student completes a lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lesson` | Lesson Object | Completed lesson |
| `$userId` | int | User ID |
| `$course` | Course Object | Parent course |

**Example Usage:**

```php
// Track progress
add_action('fluent_community/course/lesson_completed', function($lesson, $userId, $course) {
    $completed = get_user_meta($userId, 'completed_lessons_' . $course->id, true) ?: [];
    $completed[] = $lesson->id;
    update_user_meta($userId, 'completed_lessons_' . $course->id, array_unique($completed));
    
    // Award points
    $points = get_user_meta($userId, 'community_points', true) ?: 0;
    update_user_meta($userId, 'community_points', $points + 10);
}, 10, 3);
```

---

## Quiz Management [PRO]

### fluent_community/quiz/submitted

Fires when a student submits a quiz.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$quiz` | Quiz Object | Quiz object |
| `$submission` | array | Quiz submission data |
| `$userId` | int | User ID |

**Example Usage:**

```php
add_action('fluent_community/quiz/submitted', function($quiz, $submission, $userId) {
    $score = $submission['score'];
    $passing_score = $quiz->passing_score;
    
    if ($score >= $passing_score) {
        // Award points for passing
        $points = get_user_meta($userId, 'community_points', true) ?: 0;
        update_user_meta($userId, 'community_points', $points + 100);
        
        // Send congratulations
        $user = get_user_by('id', $userId);
        wp_mail(
            $user->user_email,
            'Quiz Passed!',
            sprintf('Congratulations! You scored %d%% on "%s"', $score, $quiz->title)
        );
    }
}, 10, 3);
```

---

## Notifications [PRO]

### fluent_community/course/scheduled/init_notification

Fires to initialize scheduled course notifications.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |
| `$schedule` | array | Schedule configuration |

**Example Usage:**

```php
add_action('fluent_community/course/scheduled/init_notification', function($course, $schedule) {
    error_log(sprintf('Initializing notifications for scheduled course: %s', $course->title));
}, 10, 2);
```

---

### fluent_community/course/scheduled/unschedule_notification

Fires to unschedule course notifications.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |

**Example Usage:**

```php
add_action('fluent_community/course/scheduled/unschedule_notification', function($course) {
    error_log(sprintf('Unscheduling notifications for course: %s', $course->title));
}, 10, 1);
```

---

### fluent_community/course/structured/init_notification

Fires to initialize structured course notifications.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |

**Example Usage:**

```php
add_action('fluent_community/course/structured/init_notification', function($course) {
    // Set up drip content notifications
    error_log(sprintf('Initializing structured notifications for: %s', $course->title));
}, 10, 1);
```

---

### fluent_community/course/structured/unschedule_notification

Fires to unschedule structured course notifications.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$course` | Course Object | Course object |

**Example Usage:**

```php
add_action('fluent_community/course/structured/unschedule_notification', function($course) {
    error_log(sprintf('Unscheduling structured notifications for: %s', $course->title));
}, 10, 1);
```

---

## Best Practices

### 1. Check Course Status

```php
add_action('fluent_community/course/enrolled', function($course, $userId) {
    if ($course->status !== 'published') {
        return; // Only process published courses
    }
    
    // Your code here
}, 10, 2);
```

### 2. Validate User Permissions

```php
add_action('fluent_community/course/before_delete', function($course) {
    if (!current_user_can('manage_options')) {
        wp_send_json_error(['message' => 'Insufficient permissions'], 403);
    }
}, 10, 1);
```

### 3. Handle Errors Gracefully

```php
add_action('fluent_community/course/completed', function($course, $userId) {
    try {
        // Generate certificate
        $certificate = generate_certificate($course->id, $userId);
    } catch (Exception $e) {
        error_log('Certificate generation failed: ' . $e->getMessage());
        // Continue without failing the completion
    }
}, 10, 2);
```

---

## Dynamic Course Hooks

### fluent_community/course/

Generic course hook that fires for various course events.

**Example:**
```php
add_action('fluent_community/course/', function($course, $action) {
    error_log('Course event: ' . $action);
}, 10, 2);
```

---

## See Also

- [Course Filters](/hooks/filters/courses) - Modify course data
- [Space Actions](/hooks/actions/spaces) - Space-related actions
- [User Actions](/hooks/actions/users) - User enrollment
- [Notification Actions](/hooks/actions/notifications) - Course notifications

