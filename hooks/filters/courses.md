---
prev:
  text: 'Settings Filters'
  link: '/hooks/filters/settings'
next:
  text: 'API Responses Filters'
  link: '/hooks/filters/api-responses'
---

# Courses & Lessons Filters

## Course Configuration

### fluent_community/course_info ​

Filters course information data.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$courseInfo` | array | Course information array |
| `$course` | Course | Course object |

**Return:** `array` - Modified course information

**Example Usage:**

```php
// Add custom course data
add_filter('fluent_community/course_info', function($courseInfo, $course) {
    // Add instructor information
    $courseInfo['instructor'] = [
        'name'   => get_user_meta($course->user_id, 'display_name', true),
        'bio'    => get_user_meta($course->user_id, 'bio', true),
        'avatar' => get_avatar_url($course->user_id)
    ];

    // Add course statistics
    $courseInfo['stats'] = [
        'total_students'   => count_course_students($course->id),
        'completion_rate'  => calculate_completion_rate($course->id),
        'average_rating'   => get_course_average_rating($course->id),
        'total_reviews'    => count_course_reviews($course->id)
    ];

    return $courseInfo;
}, 10, 2);

// Add prerequisites
add_filter('fluent_community/course_info', function($courseInfo, $course) {
    $prerequisites = get_course_prerequisites($course->id);

    if ($prerequisites) {
        $courseInfo['prerequisites'] = $prerequisites;
        $courseInfo['has_prerequisites'] = true;
    }

    return $courseInfo;
}, 10, 2);

// Add estimated duration
add_filter('fluent_community/course_info', function($courseInfo, $course) {
    $total_duration = 0;

    foreach ($course->lessons as $lesson) {
        $total_duration += (int) ($lesson->meta['duration'] ?? 0);
    }

    $courseInfo['estimated_duration'] = $total_duration;
    $courseInfo['estimated_duration_formatted'] = format_duration($total_duration);

    return $courseInfo;
}, 10, 2);
```

**Common Use Cases:**
- Add instructor info
- Course statistics
- Prerequisites
- Duration estimates
- Custom metadata

---

### fluent_community/course/meta_fields ​

Filters course meta fields configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$metaFields` | array | Meta fields configuration |
| `$course` | Course | Course object |

**Return:** `array` - Modified meta fields

**Example Usage:**

```php
// Add custom meta fields
add_filter('fluent_community/course/meta_fields', function($metaFields, $course) {
    $metaFields['difficulty_level'] = [
        'type'    => 'select',
        'label'   => 'Difficulty Level',
        'options' => [
            'beginner'     => 'Beginner',
            'intermediate' => 'Intermediate',
            'advanced'     => 'Advanced'
        ],
        'default' => 'beginner'
    ];

    $metaFields['certificate_enabled'] = [
        'type'    => 'checkbox',
        'label'   => 'Enable Certificate',
        'default' => false
    ];

    $metaFields['course_language'] = [
        'type'    => 'text',
        'label'   => 'Course Language',
        'default' => 'English'
    ];

    return $metaFields;
}, 10, 2);

// Add pricing fields
add_filter('fluent_community/course/meta_fields', function($metaFields, $course) {
    $metaFields['is_paid'] = [
        'type'    => 'checkbox',
        'label'   => 'Paid Course',
        'default' => false
    ];

    $metaFields['price'] = [
        'type'        => 'number',
        'label'       => 'Price',
        'placeholder' => '0.00',
        'condition'   => ['is_paid' => true]
    ];

    return $metaFields;
}, 10, 2);
```

**Common Use Cases:**
- Custom course fields
- Pricing information
- Difficulty levels
- Certificates
- Course metadata

---

### fluent_community/course_smart_codes ​

Filters available smart codes for course emails and content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$smartCodes` | array | Smart codes configuration |

**Return:** `array` - Modified smart codes

**Example Usage:**

```php
// Add custom smart codes
add_filter('fluent_community/course_smart_codes', function($smartCodes) {
    $smartCodes['{{course.instructor_name}}'] = [
        'label'       => 'Instructor Name',
        'description' => 'Name of the course instructor',
        'callback'    => function($course) {
            return get_user_meta($course->user_id, 'display_name', true);
        }
    ];

    $smartCodes['{{course.completion_percentage}}'] = [
        'label'       => 'Completion Percentage',
        'description' => 'User\'s course completion percentage',
        'callback'    => function($course, $user) {
            return calculate_user_completion($course->id, $user->ID) . '%';
        }
    ];

    $smartCodes['{{course.certificate_url}}'] = [
        'label'       => 'Certificate URL',
        'description' => 'URL to download certificate',
        'callback'    => function($course, $user) {
            return generate_certificate_url($course->id, $user->ID);
        }
    ];

    return $smartCodes;
});
```

**Common Use Cases:**
- Email templates
- Custom placeholders
- Dynamic content
- Personalization

---

### fluent_community/course_view_json_ld ​

Filters JSON-LD structured data for course SEO.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$jsonLd` | array | JSON-LD structured data |
| `$course` | Course | Course object |

**Return:** `array` - Modified JSON-LD data

**Example Usage:**

```php
// Enhance SEO data
add_filter('fluent_community/course_view_json_ld', function($jsonLd, $course) {
    $jsonLd['@context'] = 'https://schema.org';
    $jsonLd['@type'] = 'Course';
    $jsonLd['name'] = $course->title;
    $jsonLd['description'] = $course->description;
    $jsonLd['provider'] = [
        '@type' => 'Organization',
        'name'  => get_bloginfo('name'),
        'url'   => home_url()
    ];

    // Add instructor
    $jsonLd['instructor'] = [
        '@type' => 'Person',
        'name'  => get_user_meta($course->user_id, 'display_name', true)
    ];

    // Add rating
    $rating = get_course_average_rating($course->id);
    if ($rating) {
        $jsonLd['aggregateRating'] = [
            '@type'       => 'AggregateRating',
            'ratingValue' => $rating,
            'reviewCount' => count_course_reviews($course->id)
        ];
    }

    return $jsonLd;
}, 10, 2);

// Add pricing schema
add_filter('fluent_community/course_view_json_ld', function($jsonLd, $course) {
    if (!empty($course->meta['is_paid'])) {
        $jsonLd['offers'] = [
            '@type'         => 'Offer',
            'price'         => $course->meta['price'] ?? 0,
            'priceCurrency' => 'USD',
            'availability'  => 'https://schema.org/InStock'
        ];
    }

    return $jsonLd;
}, 10, 2);
```

**Common Use Cases:**
- SEO optimization
- Rich snippets
- Course schema
- Search visibility

---

### fluent_community/course_lesson_fullscreen_default ​

Filters the default fullscreen mode for course lessons.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isFullscreen` | bool | Whether fullscreen is default |
| `$course` | Course | Course object |

**Return:** `bool` - Modified fullscreen setting

**Example Usage:**

```php
// Enable fullscreen by default
add_filter('fluent_community/course_lesson_fullscreen_default', function($isFullscreen, $course) {
    return true;
}, 10, 2);

// Course-specific fullscreen
add_filter('fluent_community/course_lesson_fullscreen_default', function($isFullscreen, $course) {
    // Enable for video courses
    if ($course->meta['course_type'] === 'video') {
        return true;
    }

    return false;
}, 10, 2);

// User preference
add_filter('fluent_community/course_lesson_fullscreen_default', function($isFullscreen, $course) {
    $user_id = get_current_user_id();
    $preference = get_user_meta($user_id, 'lesson_fullscreen_preference', true);

    return $preference === 'enabled';
}, 10, 2);
```

**Common Use Cases:**
- Default view mode
- User preferences
- Course type settings
- UX optimization

---

### fluent_community/course_section_collapse_default ​

Filters the default collapse state for course sections.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isCollapsed` | bool | Whether sections are collapsed by default |
| `$course` | Course | Course object |

**Return:** `bool` - Modified collapse setting

**Example Usage:**

```php
// Expand all sections by default
add_filter('fluent_community/course_section_collapse_default', function($isCollapsed, $course) {
    return false; // Expanded
}, 10, 2);

// Collapse for long courses
add_filter('fluent_community/course_section_collapse_default', function($isCollapsed, $course) {
    $lesson_count = count($course->lessons);

    // Collapse if more than 20 lessons
    return $lesson_count > 20;
}, 10, 2);
```

**Common Use Cases:**
- Default UI state
- Course navigation
- UX optimization

---

## Lesson Management

### fluent_community/lesson/create_data ​

Filters lesson data before creation.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lessonData` | array | Lesson data to be created |
| `$course` | Course | Parent course object |

**Return:** `array` - Modified lesson data

**Example Usage:**

```php
// Add default lesson settings
add_filter('fluent_community/lesson/create_data', function($lessonData, $course) {
    // Set default duration
    if (!isset($lessonData['meta']['duration'])) {
        $lessonData['meta']['duration'] = 10; // 10 minutes default
    }

    // Set default lesson type
    if (!isset($lessonData['meta']['lesson_type'])) {
        $lessonData['meta']['lesson_type'] = 'text';
    }

    // Add creation timestamp
    $lessonData['meta']['created_timestamp'] = time();

    return $lessonData;
}, 10, 2);

// Validate lesson data
add_filter('fluent_community/lesson/create_data', function($lessonData, $course) {
    // Require title
    if (empty($lessonData['title'])) {
        throw new \Exception('Lesson title is required');
    }

    // Validate duration
    if (isset($lessonData['meta']['duration']) && $lessonData['meta']['duration'] < 0) {
        throw new \Exception('Duration must be positive');
    }

    return $lessonData;
}, 10, 2);

// Auto-generate slug
add_filter('fluent_community/lesson/create_data', function($lessonData, $course) {
    if (empty($lessonData['slug'])) {
        $lessonData['slug'] = sanitize_title($lessonData['title']);
    }

    return $lessonData;
}, 10, 2);
```

**Common Use Cases:**
- Set defaults
- Validate data
- Auto-generate fields
- Add metadata

---

### fluent_community/lesson/update_data ​

Filters lesson data before update.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lessonData` | array | Lesson data to be updated |
| `$lesson` | Lesson | Existing lesson object |

**Return:** `array` - Modified lesson data

**Example Usage:**

```php
// Track updates
add_filter('fluent_community/lesson/update_data', function($lessonData, $lesson) {
    $lessonData['meta']['last_updated'] = current_time('mysql');
    $lessonData['meta']['updated_by'] = get_current_user_id();
    $lessonData['meta']['update_count'] = ((int) ($lesson->meta['update_count'] ?? 0)) + 1;

    return $lessonData;
}, 10, 2);

// Validate changes
add_filter('fluent_community/lesson/update_data', function($lessonData, $lesson) {
    // Don't allow changing lesson type if students have started
    if (has_lesson_progress($lesson->id)) {
        unset($lessonData['meta']['lesson_type']);
    }

    return $lessonData;
}, 10, 2);

// Sanitize content
add_filter('fluent_community/lesson/update_data', function($lessonData, $lesson) {
    if (isset($lessonData['content'])) {
        $lessonData['content'] = wp_kses_post($lessonData['content']);
    }

    return $lessonData;
}, 10, 2);
```

**Common Use Cases:**
- Track changes
- Validate updates
- Sanitize content
- Update metadata

---

### fluent_community/lesson/get_public_meta ​

Filters lesson meta data exposed to public API.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$publicMeta` | array | Public meta data |
| `$lesson` | Lesson | Lesson object |

**Return:** `array` - Modified public meta

**Example Usage:**

```php
// Add custom public fields
add_filter('fluent_community/lesson/get_public_meta', function($publicMeta, $lesson) {
    $publicMeta['duration'] = $lesson->meta['duration'] ?? 0;
    $publicMeta['lesson_type'] = $lesson->meta['lesson_type'] ?? 'text';
    $publicMeta['is_preview'] = $lesson->meta['is_preview'] ?? false;
    $publicMeta['difficulty'] = $lesson->meta['difficulty'] ?? 'beginner';

    return $publicMeta;
}, 10, 2);

// Hide sensitive data
add_filter('fluent_community/lesson/get_public_meta', function($publicMeta, $lesson) {
    // Remove internal fields
    unset($publicMeta['internal_notes']);
    unset($publicMeta['admin_only']);

    return $publicMeta;
}, 10, 2);

// Add computed fields
add_filter('fluent_community/lesson/get_public_meta', function($publicMeta, $lesson) {
    $publicMeta['completion_count'] = count_lesson_completions($lesson->id);
    $publicMeta['average_time'] = get_average_completion_time($lesson->id);

    return $publicMeta;
}, 10, 2);
```

**Common Use Cases:**
- Expose custom fields
- Hide sensitive data
- Add computed values
- API responses

---

### fluent_community/lesson/sanitize_meta ​

Filters lesson meta data sanitization.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$sanitizedMeta` | array | Sanitized meta data |
| `$rawMeta` | array | Raw meta data |

**Return:** `array` - Modified sanitized meta

**Example Usage:**

```php
// Custom sanitization
add_filter('fluent_community/lesson/sanitize_meta', function($sanitizedMeta, $rawMeta) {
    // Sanitize duration
    if (isset($rawMeta['duration'])) {
        $sanitizedMeta['duration'] = absint($rawMeta['duration']);
    }

    // Sanitize video URL
    if (isset($rawMeta['video_url'])) {
        $sanitizedMeta['video_url'] = esc_url_raw($rawMeta['video_url']);
    }

    // Sanitize lesson type
    if (isset($rawMeta['lesson_type'])) {
        $allowed_types = ['text', 'video', 'audio', 'quiz', 'assignment'];
        $sanitizedMeta['lesson_type'] = in_array($rawMeta['lesson_type'], $allowed_types)
            ? $rawMeta['lesson_type']
            : 'text';
    }

    return $sanitizedMeta;
}, 10, 2);

// Validate ranges
add_filter('fluent_community/lesson/sanitize_meta', function($sanitizedMeta, $rawMeta) {
    // Duration between 1-300 minutes
    if (isset($sanitizedMeta['duration'])) {
        $sanitizedMeta['duration'] = max(1, min(300, $sanitizedMeta['duration']));
    }

    return $sanitizedMeta;
}, 10, 2);
```

**Common Use Cases:**
- Data sanitization
- Input validation
- Type checking
- Security

---

### fluent_community/section/update_data ​

Filters course section data before update.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$sectionData` | array | Section data to be updated |
| `$section` | Section | Existing section object |

**Return:** `array` - Modified section data

**Example Usage:**

```php
// Track section updates
add_filter('fluent_community/section/update_data', function($sectionData, $section) {
    $sectionData['meta']['last_updated'] = current_time('mysql');
    $sectionData['meta']['updated_by'] = get_current_user_id();

    return $sectionData;
}, 10, 2);

// Validate section order
add_filter('fluent_community/section/update_data', function($sectionData, $section) {
    if (isset($sectionData['order']) && $sectionData['order'] < 0) {
        $sectionData['order'] = 0;
    }

    return $sectionData;
}, 10, 2);

// Sanitize section title
add_filter('fluent_community/section/update_data', function($sectionData, $section) {
    if (isset($sectionData['title'])) {
        $sectionData['title'] = sanitize_text_field($sectionData['title']);
    }

    return $sectionData;
}, 10, 2);
```

**Common Use Cases:**
- Track changes
- Validate data
- Sanitize input
- Update metadata

---

## Lesson Access & Completion

### fluent_community/course/can_view_lesson ​

Filters whether a user can view a specific lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether user can view lesson |
| `$lesson` | Lesson | Lesson object |
| `$course` | Course | Course object |
| `$user` | User | User object |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Require course enrollment
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    return is_user_enrolled_in_course($user->ID, $course->id);
}, 10, 4);

// Sequential lesson access
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    $lesson_order = $lesson->meta['order'] ?? 0;

    // First lesson is always accessible
    if ($lesson_order <= 1) {
        return $canView;
    }

    // Check if previous lessons are completed
    $previous_completed = are_previous_lessons_completed($user->ID, $course->id, $lesson_order);

    return $previous_completed;
}, 10, 4);

// Premium lessons
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    $is_premium = $lesson->meta['is_premium'] ?? false;

    if ($is_premium) {
        return in_array('premium_member', $user->roles);
    }

    return $canView;
}, 10, 4);

// Preview lessons
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    // Allow preview lessons for everyone
    if (!empty($lesson->meta['is_preview'])) {
        return true;
    }

    return $canView;
}, 10, 4);
```

**Common Use Cases:**
- Enrollment checks
- Sequential access
- Premium content
- Preview lessons
- Progress tracking

---

### fluent_community/is_allowed_to_complete_lesson ​

Filters whether a user is allowed to mark a lesson as complete.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isAllowed` | bool | Whether user can complete lesson |
| `$lesson` | Lesson | Lesson object |
| `$user` | User | User object |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Require minimum time spent
add_filter('fluent_community/is_allowed_to_complete_lesson', function($isAllowed, $lesson, $user) {
    $time_spent = get_user_lesson_time_spent($user->ID, $lesson->id);
    $required_time = ($lesson->meta['duration'] ?? 10) * 60; // Convert to seconds

    // Must spend at least 80% of lesson duration
    return $time_spent >= ($required_time * 0.8);
}, 10, 3);

// Require quiz completion
add_filter('fluent_community/is_allowed_to_complete_lesson', function($isAllowed, $lesson, $user) {
    if ($lesson->meta['lesson_type'] === 'quiz') {
        $quiz_score = get_user_quiz_score($user->ID, $lesson->id);
        $passing_score = $lesson->meta['passing_score'] ?? 70;

        return $quiz_score >= $passing_score;
    }

    return $isAllowed;
}, 10, 3);

// Require assignment submission
add_filter('fluent_community/is_allowed_to_complete_lesson', function($isAllowed, $lesson, $user) {
    if ($lesson->meta['lesson_type'] === 'assignment') {
        return has_submitted_assignment($user->ID, $lesson->id);
    }

    return $isAllowed;
}, 10, 3);

// Prevent skipping
add_filter('fluent_community/is_allowed_to_complete_lesson', function($isAllowed, $lesson, $user) {
    // Check if user has viewed all lesson content
    $content_viewed = has_viewed_all_content($user->ID, $lesson->id);

    return $content_viewed;
}, 10, 3);
```

**Common Use Cases:**
- Time requirements
- Quiz completion
- Assignment submission
- Content verification
- Progress validation

---

### fluent_community/course/access_message_html ​

Filters the HTML message shown when a user cannot access a lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$accessMessage` | string | HTML access message |
| `$course` | Course | Course object |
| `$lesson` | Lesson | Lesson object |
| `$config` | array | Configuration array |

**Return:** `string` - Modified HTML message

**Example Usage:**

```php
// Custom access message
add_filter('fluent_community/course/access_message_html', function($accessMessage, $course, $lesson, $config) {
    $html = '<div class="lesson-locked">';
    $html .= '<h3>🔒 This lesson is locked</h3>';
    $html .= '<p>Complete previous lessons to unlock this content.</p>';
    $html .= '<a href="' . get_course_url($course->id) . '" class="btn">View Course</a>';
    $html .= '</div>';

    return $html;
}, 10, 4);

// Enrollment required message
add_filter('fluent_community/course/access_message_html', function($accessMessage, $course, $lesson, $config) {
    if (!is_user_enrolled($course->id)) {
        return '<div class="enrollment-required">
            <h3>Enrollment Required</h3>
            <p>Please enroll in this course to access lessons.</p>
            <a href="' . get_enrollment_url($course->id) . '" class="btn-primary">Enroll Now</a>
        </div>';
    }

    return $accessMessage;
}, 10, 4);

// Premium upgrade message
add_filter('fluent_community/course/access_message_html', function($accessMessage, $course, $lesson, $config) {
    if (!empty($lesson->meta['is_premium'])) {
        return '<div class="premium-required">
            <h3>⭐ Premium Content</h3>
            <p>Upgrade to premium to access this lesson.</p>
            <a href="/upgrade" class="btn-premium">Upgrade Now</a>
        </div>';
    }

    return $accessMessage;
}, 10, 4);
```

**Common Use Cases:**
- Custom messages
- Enrollment prompts
- Premium upgrades
- Access instructions

---

## Email Notifications

### fluent_community/default_course_email_notification ​

Filters default course email notification settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$notification` | array | Email notification configuration |

**Return:** `array` - Modified notification settings

**Example Usage:**

```php
// Customize course emails
add_filter('fluent_community/default_course_email_notification', function($notification) {
    $notification['enrollment_confirmation'] = [
        'enabled' => true,
        'subject' => 'Welcome to {{course.title}}!',
        'body'    => 'Hi {{user.name}}, you\'re now enrolled in {{course.title}}.'
    ];

    $notification['lesson_completed'] = [
        'enabled' => true,
        'subject' => 'Lesson completed: {{lesson.title}}',
        'body'    => 'Great job completing {{lesson.title}}!'
    ];

    $notification['course_completed'] = [
        'enabled' => true,
        'subject' => 'Congratulations! You completed {{course.title}}',
        'body'    => 'You\'ve completed all lessons. Download your certificate!'
    ];

    return $notification;
});

// Disable specific notifications
add_filter('fluent_community/default_course_email_notification', function($notification) {
    $notification['lesson_completed']['enabled'] = false;

    return $notification;
});

// Add custom notification
add_filter('fluent_community/default_course_email_notification', function($notification) {
    $notification['halfway_milestone'] = [
        'enabled' => true,
        'subject' => 'You\'re halfway through {{course.title}}!',
        'body'    => 'Keep going! You\'re making great progress.',
        'trigger' => 'course_50_percent_complete'
    ];

    return $notification;
});
```

**Common Use Cases:**
- Email customization
- Notification settings
- Custom triggers
- Engagement emails

---

## Best Practices

### 1. Always Validate User Access

```php
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    // Always check enrollment first
    if (!is_user_enrolled_in_course($user->ID, $course->id)) {
        return false;
    }

    // Then check other conditions
    return $canView;
}, 10, 4);
```

### 2. Sanitize All Input

```php
add_filter('fluent_community/lesson/create_data', function($lessonData, $course) {
    // Sanitize all user input
    if (isset($lessonData['title'])) {
        $lessonData['title'] = sanitize_text_field($lessonData['title']);
    }

    if (isset($lessonData['content'])) {
        $lessonData['content'] = wp_kses_post($lessonData['content']);
    }

    return $lessonData;
}, 10, 2);
```

### 3. Track Progress Properly

```php
add_filter('fluent_community/is_allowed_to_complete_lesson', function($isAllowed, $lesson, $user) {
    // Log completion attempts
    log_lesson_completion_attempt($user->ID, $lesson->id);

    // Verify completion criteria
    return $isAllowed;
}, 10, 3);
```

---

## Related Documentation

- [Course Actions](/hooks/actions/courses)
- [Permissions Filters](/hooks/filters/permissions)
- [Code Snippets](/guides/code-snippets)

