# Courses

The Courses API allows you to create and manage learning courses within your community.

## Course Object

A course represents a structured learning program with lessons and content.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the course |
| `title` | string | Course title |
| `slug` | string | URL-friendly slug |
| `description` | string | Short description |
| `content` | string | Full course description |
| `featured_image` | string | Featured image URL |
| `status` | string | Publication status (published, draft, archived) |
| `category` | string | Course category |
| `difficulty` | string | Difficulty level (beginner, intermediate, advanced) |
| `duration` | string | Estimated duration |
| `lessons_count` | integer | Number of lessons |
| `students_count` | integer | Number of enrolled students |
| `rating` | float | Average rating (0-5) |
| `reviews_count` | integer | Number of reviews |
| `price` | number | Course price (0 for free) |
| `instructor_id` | integer | Instructor user ID |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Status Values

- `published` - Live and available
- `draft` - Not yet published
- `archived` - No longer active

### Difficulty Levels

- `beginner` - Beginner level
- `intermediate` - Intermediate level
- `advanced` - Advanced level

## List All Courses

Retrieve a list of available courses.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `status` | string | published | Filter by status |
| `category` | string | - | Filter by category |
| `difficulty` | string | - | Filter by difficulty |
| `search` | string | - | Search in title and description |
| `orderby` | string | created_at | Sort field |
| `order` | string | desc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses?status=published&per_page=10" \
  -u "username:password"
```

### Example Response

```json
{
  "courses": {
    "current_page": 1,
    "data": [
      {
        "id": 881,
        "created_by": "54824",
        "parent_id": "78",
        "title": "Introduction to Web Development",
        "slug": "intro-web-development",
        "logo": "https://example.com/logo.jpg",
        "cover_photo": "https://example.com/cover.jpg",
        "description": "Learn the basics of web development",
        "type": "course",
        "privacy": "public",
        "status": "published",
        "serial": "5",
        "settings": {
          "restricted_post_only": "yes",
          "emoji": "",
          "shape_svg": "",
          "custom_lock_screen": "yes",
          "can_request_join": "no",
          "layout_style": "timeline",
          "show_sidebar": "yes",
          "og_image": "",
          "links": [],
          "topic_required": "no",
          "hide_members_count": "no",
          "members_page_status": "members_only",
          "course_type": "self_paced"
        },
        "created_at": "2025-01-06 10:59:31",
        "updated_at": "2025-01-06 10:59:31",
        "isEnrolled": false,
        "sectionsCount": 0,
        "lessonsCount": 12,
        "studentsCount": 145
      }
    ],
    "first_page_url": "https://community.test/wp-json/fluent-community/v2/courses/?page=1",
    "from": 1,
    "last_page": 271,
    "last_page_url": "https://community.test/wp-json/fluent-community/v2/courses/?page=271",
    "links": [
      {
        "url": null,
        "label": "pagination.previous",
        "active": false
      },
      {
        "url": "https://community.test/wp-json/fluent-community/v2/courses/?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "https://community.test/wp-json/fluent-community/v2/courses/?page=2",
        "label": "2",
        "active": false
      },
      {
        "url": null,
        "label": "pagination.next",
        "active": false
      }
    ],
    "next_page_url": "https://community.test/wp-json/fluent-community/v2/courses/?page=2",
    "path": "https://community.test/wp-json/fluent-community/v2/courses",
    "per_page": 10,
    "prev_page_url": null,
    "to": 10,
    "total": 2710
  },
  "course_categories": []
}
```

## Get a Specific Course

Retrieve detailed information about a course.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/{id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Course ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/10" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "id": 10,
    "title": "Introduction to Web Development",
    "slug": "intro-web-development",
    "description": "Learn the basics of web development",
    "content": "<p>Full course description...</p>",
    "featured_image": "https://example.com/course-image.jpg",
    "status": "published",
    "category": "Development",
    "difficulty": "beginner",
    "duration": "4 weeks",
    "lessons_count": 12,
    "students_count": 145,
    "rating": 4.8,
    "reviews_count": 32,
    "price": 0,
    "is_enrolled": true,
    "progress": 45,
    "instructor": {
      "id": 5,
      "display_name": "Jane Instructor",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Experienced web developer"
    },
    "created_at": "2025-01-15T10:00:00",
    "updated_at": "2025-10-20T14:30:00"
  }
}
```

## Create a Course

Create a new course (instructor/admin only).

**HTTP Request**

```
POST /wp-json/fluent-community/v2/courses
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Course title |
| `slug` | string | No | URL slug (auto-generated if omitted) |
| `description` | string | Yes | Short description |
| `content` | string | No | Full course content |
| `featured_image` | string | No | Featured image URL |
| `status` | string | No | Status (published, draft) - default: draft |
| `category` | string | No | Course category |
| `difficulty` | string | No | Difficulty level |
| `duration` | string | No | Estimated duration |
| `price` | number | No | Course price (default: 0) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced JavaScript",
    "description": "Master advanced JavaScript concepts",
    "category": "Development",
    "difficulty": "advanced",
    "duration": "6 weeks",
    "status": "published"
  }'
```

### Example Response

```json
{
  "message": "Course created successfully",
  "data": {
    "id": 25,
    "title": "Advanced JavaScript",
    "slug": "advanced-javascript",
    "status": "published",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Update a Course

Modify an existing course.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/courses/{id}
```

### Parameters

All create parameters are available for updates (all optional).

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/25" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced JavaScript Masterclass",
    "description": "Updated description"
  }'
```

### Example Response

```json
{
  "message": "Course updated successfully",
  "data": {
    "id": 25,
    "title": "Advanced JavaScript Masterclass",
    "updated_at": "2025-10-27T13:00:00"
  }
}
```

## Delete a Course

Remove a course permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/courses/{id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/25" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Course deleted successfully"
}
```

**Warning:** Deleting a course will also delete all associated lessons and student progress.

## Get My Courses

Retrieve courses the current user is enrolled in.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/courses/my-courses
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | active | Filter by status (active, completed, all) |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/courses/my-courses?status=active" \
  -u "username:password"
```

## Best Practices

### 1. Course Organization

Structure courses with clear categories:

```bash
# Create categorized courses
curl -X POST ".../courses" -d '{
  "title": "React Fundamentals",
  "category": "Web Development",
  "difficulty": "intermediate"
}'
```

### 2. Difficulty Levels

Set appropriate difficulty levels:

```bash
# Beginner course
curl -X POST ".../courses" -d '{
  "title": "HTML Basics",
  "difficulty": "beginner"
}'

# Advanced course
curl -X POST ".../courses" -d '{
  "title": "System Architecture",
  "difficulty": "advanced"
}'
```

### 3. Course Pricing

Set pricing strategically:

```bash
# Free course
curl -X POST ".../courses" -d '{
  "title": "Introduction Course",
  "price": 0
}'

# Paid course
curl -X POST ".../courses" -d '{
  "title": "Premium Course",
  "price": 99.99
}'
```

### 4. Draft Management

Use drafts while building courses:

```bash
# Create as draft
curl -X POST ".../courses" -d '{
  "title": "New Course",
  "status": "draft"
}'

# Publish when ready
curl -X PUT ".../courses/25" -d '{
  "status": "published"
}'
```

## Common Use Cases

### Course Catalog

Display a browsable course catalog:

```bash
# Get all published courses
curl ".../courses?status=published&orderby=rating&order=desc"

# Filter by category
curl ".../courses?category=Development"
```

### Student Dashboard

Show enrolled courses:

```bash
# Get user's active courses
curl ".../courses/my-courses?status=active"

# Show progress for each course
curl ".../courses/10/progress"
```

### Course Search

Implement course search:

```bash
# Search courses
curl ".../courses?search=javascript"

# Filter by difficulty
curl ".../courses?difficulty=beginner&search=web"
```

### Instructor Dashboard

Manage instructor's courses:

```bash
# Get courses by instructor
curl ".../courses?instructor_id=5"

# View course analytics
curl ".../courses/10/students"
```

## Error Handling

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

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to manage courses.",
  "data": {
    "status": 403
  }
}
```

### Invalid Difficulty (400)

```json
{
  "code": "invalid_difficulty",
  "message": "Invalid difficulty level",
  "data": {
    "status": 400,
    "allowed_values": ["beginner", "intermediate", "advanced"]
  }
}
```

## Update Course Lockscreen Settings [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

Update lockscreen settings for a course to restrict access based on conditions.

### HTTP Request

```
PUT /wp-json/fluent-community/v2/admin/courses/{course_id}/lockscreens
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_id` | integer | The ID of the course |

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `enabled` | boolean | Yes | Enable/disable lockscreen |
| `type` | string | No | Lockscreen type: `membership`, `payment`, `prerequisite`, `custom` |
| `conditions` | object | No | Lockscreen conditions |
| `message` | string | No | Message to display on lockscreen |
| `button_text` | string | No | Call-to-action button text |
| `button_url` | string | No | Button URL |

### Lockscreen Types

| Type | Description |
|------|-------------|
| `membership` | Require specific membership level |
| `payment` | Require payment/purchase |
| `prerequisite` | Require completion of other courses |
| `custom` | Custom conditions |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/admin/courses/15/lockscreens" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "type": "prerequisite",
    "conditions": {
      "required_courses": [10, 12],
      "required_membership": "premium"
    },
    "message": "Complete the beginner courses before accessing this advanced course",
    "button_text": "View Prerequisites",
    "button_url": "/courses"
  }'
```

### Example Response

```json
{
  "message": "Course lockscreen settings updated successfully",
  "lockscreen": {
    "enabled": true,
    "type": "prerequisite",
    "conditions": {
      "required_courses": [10, 12],
      "required_membership": "premium"
    },
    "message": "Complete the beginner courses before accessing this advanced course",
    "button_text": "View Prerequisites",
    "button_url": "/courses"
  }
}
```

**Permissions:** Course administrator or community administrator

---

## Related Endpoints

- [Lessons](./lessons.md) - Manage course lessons
- [Course Progress](./course-progress.md) - Track student progress
- [Quizzes](./quizzes.md) - Course assessments
- [Profiles](./profiles.md) - View instructor profiles
- [Spaces](./spaces.md) - Space lockscreen settings

