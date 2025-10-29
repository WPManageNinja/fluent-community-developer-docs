# Lessons

The Lessons API allows you to create and manage individual lessons within courses.

## Lesson Object

A lesson represents a single learning unit within a course.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the lesson |
| `course_id` | integer | Parent course ID |
| `title` | string | Lesson title |
| `slug` | string | URL-friendly slug |
| `content` | string | Lesson content (HTML) |
| `video_url` | string | Video URL (YouTube, Vimeo, etc.) |
| `duration` | string | Lesson duration |
| `order` | integer | Display order within course |
| `is_preview` | boolean | Whether lesson is free preview |
| `is_completed` | boolean | Whether user completed this lesson |
| `resources` | array | Downloadable resources |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

## List Course Lessons

Retrieve all lessons for a specific course.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{id}/lessons
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Course ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "id": 101,
      "course_id": 10,
      "title": "Introduction to HTML",
      "slug": "intro-html",
      "content": "<p>Lesson content...</p>",
      "video_url": "https://youtube.com/watch?v=abc123",
      "duration": "15 min",
      "order": 1,
      "is_preview": true,
      "is_completed": true,
      "resources": [
        {
          "title": "HTML Cheat Sheet",
          "url": "https://example.com/cheatsheet.pdf"
        }
      ],
      "created_at": "2025-01-15T10:00:00"
    }
  ]
}
```

## Get a Specific Lesson

Retrieve details for a single lesson.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{course_id}/lessons/{lesson_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/101" \
  -u "username:password"
```

## Create a Lesson

Add a new lesson to a course.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses/{id}/lessons
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Lesson title |
| `content` | string | Yes | Lesson content |
| `video_url` | string | No | Video URL |
| `duration` | string | No | Lesson duration |
| `order` | integer | No | Display order |
| `is_preview` | boolean | No | Free preview (default: false) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "CSS Fundamentals",
    "content": "<p>Learn CSS basics...</p>",
    "video_url": "https://youtube.com/watch?v=xyz789",
    "duration": "20 min",
    "order": 2
  }'
```

### Example Response

```json
{
  "message": "Lesson created successfully",
  "data": {
    "id": 102,
    "course_id": 10,
    "title": "CSS Fundamentals",
    "order": 2,
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Update a Lesson

Modify an existing lesson.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/courses/{course_id}/lessons/{lesson_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/102" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "CSS Fundamentals - Updated",
    "content": "<p>Updated content...</p>"
  }'
```

## Delete a Lesson

Remove a lesson from a course.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/courses/{course_id}/lessons/{lesson_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/102" \
  -X DELETE \
  -u "username:password"
```

## Reorder Lessons

Change the order of lessons in a course.

**HTTP Request**

```
PATCH /wp-json/fluent-community/v2/courses/{id}/lessons/reorder
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lesson_ids` | array | Yes | Array of lesson IDs in desired order |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10/lessons/reorder" \
  -X PATCH \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "lesson_ids": [101, 103, 102, 104]
  }'
```

## Best Practices

### 1. Lesson Structure

Organize lessons logically:

```bash
# Create lessons in order
curl -X POST ".../courses/10/lessons" -d '{
  "title": "Lesson 1: Introduction",
  "order": 1
}'

curl -X POST ".../courses/10/lessons" -d '{
  "title": "Lesson 2: Basics",
  "order": 2
}'
```

### 2. Video Content

Use supported video platforms:

```bash
# YouTube
curl -X POST ".../courses/10/lessons" -d '{
  "video_url": "https://youtube.com/watch?v=abc123"
}'

# Vimeo
curl -X POST ".../courses/10/lessons" -d '{
  "video_url": "https://vimeo.com/123456789"
}'
```

### 3. Free Previews

Offer preview lessons:

```bash
curl -X POST ".../courses/10/lessons" -d '{
  "title": "Free Preview Lesson",
  "is_preview": true
}'
```

### 4. Resources

Attach downloadable resources:

```bash
curl -X POST ".../courses/10/lessons" -d '{
  "title": "Lesson with Resources",
  "resources": [
    {
      "title": "Cheat Sheet",
      "url": "https://example.com/file.pdf"
    }
  ]
}'
```

## Common Use Cases

### Course Curriculum

Build a complete curriculum:

```bash
# Create multiple lessons
for i in {1..10}; do
  curl -X POST ".../courses/10/lessons" -d "{
    \"title\": \"Lesson $i\",
    \"order\": $i
  }"
done
```

### Lesson Navigation

Implement prev/next navigation:

```bash
# Get all lessons
curl ".../courses/10/lessons"

# Navigate based on order
# Previous: order - 1
# Next: order + 1
```

### Progress Tracking

Track lesson completion:

```bash
# Mark lesson complete
curl -X POST ".../courses/10/lessons/101/complete"

# Check completion status
curl ".../courses/10/progress"
```

## Error Handling

### Lesson Not Found (404)

```json
{
  "code": "lesson_not_found",
  "message": "Lesson not found",
  "data": {
    "status": 404
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to manage lessons.",
  "data": {
    "status": 403
  }
}
```

### Course Not Found (404)

```json
{
  "code": "course_not_found",
  "message": "Course not found",
  "data": {
    "status": 404
  }
}
```

## Related Endpoints

- [Courses](./courses.md) - Manage courses
- [Course Progress](./course-progress.md) - Track lesson completion

