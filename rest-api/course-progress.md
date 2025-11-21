<DocStatusBanner />

# Course Progress

The Course Progress API allows you to track student enrollment, lesson completion, and course progress.

## Progress Object

A progress object represents a student's progress through a course.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `course_id` | integer | Course ID |
| `user_id` | integer | Student user ID |
| `progress_percentage` | integer | Completion percentage (0-100) |
| `completed_lessons` | integer | Number of completed lessons |
| `total_lessons` | integer | Total number of lessons |
| `time_spent` | string | Total time spent |
| `last_accessed` | datetime | Last access timestamp |
| `started_at` | datetime | Enrollment timestamp |
| `completed_at` | datetime | Completion timestamp (null if not completed) |
| `certificate_url` | string | Certificate URL (if completed) |

## Enroll in Course

Enroll the current user in a course.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses/{id}/enroll
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Course ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/enroll" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Successfully enrolled in course",
  "data": {
    "enrollment_id": 456,
    "course_id": 10,
    "user_id": 1,
    "enrolled_at": "2025-10-27T12:00:00"
  }
}
```

## Unenroll from Course

Unenroll the current user from a course.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses/{id}/unenroll
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/unenroll" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Successfully unenrolled from course"
}
```

## Get Course Progress

Retrieve the current user's progress in a course.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{id}/progress
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/progress" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "course_id": 10,
    "user_id": 1,
    "progress_percentage": 45,
    "completed_lessons": 5,
    "total_lessons": 12,
    "time_spent": "3 hours 25 minutes",
    "last_accessed": "2025-10-27T11:30:00",
    "started_at": "2025-10-15T10:00:00",
    "completed_at": null,
    "next_lesson": {
      "id": 106,
      "title": "JavaScript Basics",
      "order": 6
    }
  }
}
```

## Mark Lesson as Complete

Mark a lesson as completed for the current user.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses/{id}/lessons/{lesson_id}/complete
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Course ID |
| `lesson_id` | integer | Yes | Lesson ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/101/complete" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Lesson marked as complete",
  "data": {
    "lesson_id": 101,
    "completed_at": "2025-10-27T12:00:00",
    "progress_percentage": 50,
    "next_lesson": {
      "id": 102,
      "title": "Next Lesson"
    }
  }
}
```

## Mark Lesson as Incomplete

Mark a lesson as incomplete (undo completion).

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses/{id}/lessons/{lesson_id}/incomplete
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/101/incomplete" \
  -X POST \
  -u "username:password"
```

## Get Course Students

Retrieve a list of students enrolled in a course.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{id}/students
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |
| `orderby` | string | enrolled_at | Sort field |
| `order` | string | desc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/students?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "user_id": 1,
      "username": "john_doe",
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "progress_percentage": 45,
      "enrolled_at": "2025-10-15T10:00:00",
      "last_accessed": "2025-10-27T11:30:00"
    }
  ],
  "meta": {
    "total": 145,
    "per_page": 20,
    "current_page": 1
  }
}
```

## Get Course Certificate

Get or generate a certificate for a completed course.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{id}/certificate
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/certificate" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "certificate_url": "https://example.com/certificates/abc123.pdf",
    "certificate_id": "CERT-2025-001",
    "issued_at": "2025-10-27T12:00:00",
    "course_title": "Introduction to Web Development",
    "student_name": "John Doe"
  }
}
```

## Best Practices

### 1. Auto-enrollment

Automatically enroll users when they access a course:

```javascript
async function accessCourse(courseId) {
  // Check if enrolled
  const progress = await getCourseProgress(courseId);
  
  if (!progress) {
    // Auto-enroll
    await fetch(`/wp-json/fluent-community/v2/courses/${courseId}/enroll`, {
      method: 'POST'
    });
  }
  
  // Show course content
}
```

### 2. Progress Tracking

Track progress automatically:

```javascript
// Mark lesson complete when video ends
videoPlayer.on('ended', async () => {
  await fetch(`/wp-json/fluent-community/v2/courses/${courseId}/lessons/${lessonId}/complete`, {
    method: 'POST'
  });
  
  // Update UI
  updateProgressBar();
});
```

### 3. Progress Indicators

Show visual progress:

```bash
# Get progress
curl ".../courses/10/progress"

# Display progress bar
# 45% complete = 5 of 12 lessons
```

### 4. Certificate Generation

Generate certificates on completion:

```bash
# Check if course is complete
curl ".../courses/10/progress"

# If progress_percentage === 100
curl ".../courses/10/certificate"
```

## Common Use Cases

### Student Dashboard

Display enrolled courses with progress:

```bash
# Get enrolled courses
curl ".../courses/my-courses?status=active"

# Get progress for each
curl ".../courses/10/progress"
curl ".../courses/11/progress"
```

### Course Completion

Handle course completion:

```bash
# Mark final lesson complete
curl -X POST ".../courses/10/lessons/112/complete"

# Check if course is complete
curl ".../courses/10/progress"

# Generate certificate
curl ".../courses/10/certificate"
```

### Instructor Analytics

Track student progress:

```bash
# Get all students
curl ".../courses/10/students"

# View individual progress
curl ".../courses/10/progress?user_id=1"
```

### Resume Learning

Resume where user left off:

```bash
# Get progress
curl ".../courses/10/progress"

# Response includes next_lesson
{
  "next_lesson": {
    "id": 106,
    "title": "JavaScript Basics"
  }
}

# Navigate to next lesson
```

## Error Handling

### Not Enrolled (403)

```json
{
  "code": "not_enrolled",
  "message": "You must be enrolled in this course",
  "data": {
    "status": 403
  }
}
```

### Already Enrolled (400)

```json
{
  "code": "already_enrolled",
  "message": "You are already enrolled in this course",
  "data": {
    "status": 400
  }
}
```

### Course Not Complete (400)

```json
{
  "code": "course_not_complete",
  "message": "You must complete all lessons to get a certificate",
  "data": {
    "status": 400,
    "progress_percentage": 75
  }
}
```

### Lesson Already Complete (200)

```json
{
  "message": "Lesson already marked as complete",
  "data": {
    "completed_at": "2025-10-25T10:00:00"
  }
}
```

## Related Endpoints

- [Courses](./courses.md) - Manage courses
- [Lessons](./lessons.md) - Manage lessons
- [Profiles](./profiles.md) - View student profiles
