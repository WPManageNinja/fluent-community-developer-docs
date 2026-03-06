<DocStatusBanner />

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
POST /wp-json/fluent-community/v2/admin/courses/{course_id}/lessons
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Lesson title |
| `type` | string | Yes | type: "lesson" |
| `section_id` | integer | Yes | ID of the section; where the lesson will be created |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/admin/courses/10/lessons" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JS Fundamentals",
    "type": "lesson",
    "section_id": 11
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
PUT /wp-json/fluent-community/v2/admin/courses/{course_id}/lessons/{lesson_id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lesson` | object | Yes | Lesson data object |
| `lesson.id` | integer | Yes | Lesson ID |
| `lesson.title` | string | Yes | Lesson title |
| `lesson.message` | string | No | Lesson content (HTML with block markup) |
| `lesson.status` | string | No | Lesson status (`draft`, `published`) |
| `lesson.parent_id` | string | No | Parent course ID |
| `lesson.space_id` | string | No | Space ID |
| `lesson.meta` | object | No | Lesson metadata |
| `lesson.meta.media` | object | No | Media settings (`type`, `url`, `content_type`, `html`) |
| `lesson.meta.document_lists` | array | No | Attached document lists |
| `lesson.meta.enable_comments` | string | No | Enable comments (`yes` or `no`) |
| `lesson.meta.enable_media` | string | No | Enable media (`yes` or `no`) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/admin/courses/10/lessons/102" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "lesson": {
      "id": 102,
      "title": "CSS Fundamentals - Updated",
      "message": "<!-- wp:paragraph -->\n<p>Updated content...</p>\n<!-- /wp:paragraph -->",
      "parent_id": "10",
      "space_id": "110",
      "status": "published",
      "meta": {
        "media": {"type": "oembed", "url": "", "content_type": "video", "html": ""},
        "document_lists": [],
        "enable_comments": "yes",
        "enable_media": "yes"
      }
    }
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
