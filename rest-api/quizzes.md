<DocStatusBanner />

# Quizzes API [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

Quizzes allow you to add assessments to course lessons, test student knowledge, and track learning progress. Students can submit quiz answers and view their results.

---

## Quiz Object

```json
{
  "id": 1,
  "user_id": 42,
  "course_id": 5,
  "lesson_id": 15,
  "answers": {
    "question_1": "option_a",
    "question_2": "option_c",
    "question_3": ["option_a", "option_b"]
  },
  "score": 85,
  "total_questions": 10,
  "correct_answers": 8,
  "passed": true,
  "passing_score": 70,
  "attempt_number": 1,
  "time_spent": 420,
  "status": "completed",
  "submitted_at": "2024-01-20 14:30:00",
  "graded_at": "2024-01-20 14:30:05",
  "feedback": "Great job! You passed the quiz."
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | integer | Unique identifier for the quiz submission |
| `user_id` | integer | ID of the student who took the quiz |
| `course_id` | integer | ID of the course |
| `lesson_id` | integer | ID of the lesson containing the quiz |
| `answers` | object | Student's submitted answers |
| `score` | integer | Percentage score (0-100) |
| `total_questions` | integer | Total number of questions |
| `correct_answers` | integer | Number of correct answers |
| `passed` | boolean | Whether the student passed |
| `passing_score` | integer | Minimum score required to pass |
| `attempt_number` | integer | Which attempt this is (if retakes allowed) |
| `time_spent` | integer | Time spent in seconds |
| `status` | string | `in_progress`, `completed`, `graded` |
| `submitted_at` | datetime | When the quiz was submitted |
| `graded_at` | datetime | When the quiz was graded |
| `feedback` | string | Instructor feedback or auto-generated message |

---

## Quiz Question Object

```json
{
  "id": "question_1",
  "type": "multiple_choice",
  "question": "What is the capital of France?",
  "options": [
    {
      "id": "option_a",
      "text": "Paris",
      "is_correct": true
    },
    {
      "id": "option_b",
      "text": "London",
      "is_correct": false
    },
    {
      "id": "option_c",
      "text": "Berlin",
      "is_correct": false
    }
  ],
  "points": 10,
  "explanation": "Paris is the capital and largest city of France."
}
```

### Question Types

| Type | Description |
|------|-------------|
| `multiple_choice` | Single correct answer from multiple options |
| `multiple_select` | Multiple correct answers possible |
| `true_false` | True or false question |
| `short_answer` | Text-based answer (manual grading) |

---

## Create a Quiz

Add a new quiz to a course's section.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/courses/{course_id}/lessons
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Lesson title |
| `type` | string | Yes | type: "quiz" |
| `section_id` | integer | Yes | ID of the section; where the quiz will be created |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/admin/courses/13/lessons" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wordpress Intermediate",
    "type": "quiz",
    "section_id": 12,
  }'
```

### Example Response

```json
{
  "message": "Quiz created successfully",
  "data": {
    "id": 102,
    "course_id": 10,
    "title": "Wordpress Intermediate",
    "order": 2,
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Submit Quiz

Submit quiz answers for grading.

### HTTP Request

```
POST /wp-json/fluent-community/v2/courses/{course_id}/lessons/{lesson_id}/quiz/submit
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_id` | integer | The ID of the course |
| `lesson_id` | integer | The ID of the lesson with the quiz |

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `answers` | object | Yes | Quiz answers keyed by question ID |
| `time_spent` | integer | No | Time spent on quiz in seconds |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/courses/5/lessons/15/quiz/submit" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "question_1": "option_a",
      "question_2": "option_c",
      "question_3": ["option_a", "option_b"],
      "question_4": "true"
    },
    "time_spent": 420
  }'
```

### Example Response

```json
{
  "message": "Quiz submitted successfully",
  "quiz_result": {
    "id": 123,
    "score": 85,
    "total_questions": 10,
    "correct_answers": 8,
    "passed": true,
    "passing_score": 70,
    "attempt_number": 1,
    "feedback": "Congratulations! You passed the quiz with 85%.",
    "can_retake": false,
    "next_lesson_unlocked": true,
    "submitted_at": "2024-01-20 14:30:00"
  },
  "detailed_results": [
    {
      "question_id": "question_1",
      "question": "What is the capital of France?",
      "your_answer": "option_a",
      "correct_answer": "option_a",
      "is_correct": true,
      "points_earned": 10,
      "points_possible": 10,
      "explanation": "Paris is the capital and largest city of France."
    },
    {
      "question_id": "question_2",
      "question": "Which planet is closest to the Sun?",
      "your_answer": "option_c",
      "correct_answer": "option_b",
      "is_correct": false,
      "points_earned": 0,
      "points_possible": 10,
      "explanation": "Mercury is the closest planet to the Sun."
    }
  ]
}
```

---

## Get Quiz Result

Retrieve the result of a previously submitted quiz.

### HTTP Request

```
GET /wp-json/fluent-community/v2/courses/{course_id}/lessons/{lesson_id}/quiz/result
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_id` | integer | The ID of the course |
| `lesson_id` | integer | The ID of the lesson with the quiz |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `attempt` | integer | `latest` | Which attempt to retrieve (1, 2, 3, or "latest") |
| `include_answers` | boolean | `true` | Include detailed answer breakdown |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/courses/5/lessons/15/quiz/result?attempt=latest" \
  -u "username:password"
```

### Example Response

```json
{
  "quiz_result": {
    "id": 123,
    "user_id": 42,
    "course_id": 5,
    "lesson_id": 15,
    "score": 85,
    "total_questions": 10,
    "correct_answers": 8,
    "passed": true,
    "passing_score": 70,
    "attempt_number": 1,
    "time_spent": 420,
    "status": "completed",
    "submitted_at": "2024-01-20 14:30:00",
    "graded_at": "2024-01-20 14:30:05",
    "feedback": "Congratulations! You passed the quiz with 85%."
  },
  "quiz_settings": {
    "max_attempts": 3,
    "attempts_used": 1,
    "can_retake": true,
    "time_limit": 1800,
    "show_correct_answers": true,
    "randomize_questions": false
  },
  "detailed_results": [
    {
      "question_id": "question_1",
      "question": "What is the capital of France?",
      "your_answer": "option_a",
      "correct_answer": "option_a",
      "is_correct": true,
      "points_earned": 10,
      "points_possible": 10
    }
  ]
}
```

---

## Get Course Quiz Results (Admin)

Retrieve all quiz results for a course. Admin only.

### HTTP Request

```
GET /wp-json/fluent-community/v2/admin/courses/{course_id}/quiz-results
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_id` | integer | The ID of the course |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lesson_id` | integer | `null` | Filter by specific lesson |
| `user_id` | integer | `null` | Filter by specific student |
| `status` | string | `all` | Filter by status: `all`, `passed`, `failed` |
| `page` | integer | `1` | Page number for pagination |
| `per_page` | integer | `20` | Results per page |
| `orderby` | string | `submitted_at` | Sort by: `submitted_at`, `score`, `user_name` |
| `order` | string | `desc` | Sort order: `asc`, `desc` |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/admin/courses/5/quiz-results?status=passed&per_page=10" \
  -u "username:password"
```

### Example Response

```json
{
  "quiz_results": [
    {
      "id": 123,
      "xprofile": {
        "user_id": 42,
        "total_points": 6425,
        "is_verified": 1,
        "status": "active",
        "display_name": "User Name",
        "username": "username",
        "avatar": "avatar_url",
        "created_at": "2024-03-05 16:37:02",
        "short_description": "User description",
        "meta": {
          "website": "website_url",
          "cover_photo": "cover_photo_url",
          "social_links": {
            "twitter": "@handle",
            "youtube": "@handle",
            "linkedin": "handle",
            "fb": "handle",
            "instagram": "handle"
          },
          "badge_slug": ["badge1", "badge2"]
        },
        "badge": null
      },
      "lesson": {
        "id": 15,
        "title": "Introduction to JavaScript",
        "slug": "intro-javascript"
      },
      "score": 85,
      "total_questions": 10,
      "correct_answers": 8,
      "passed": true,
      "attempt_number": 1,
      "time_spent": 420,
      "submitted_at": "2024-01-20 14:30:00"
    },
    {
      "id": 124,
      "xprofile": {
        "user_id": 43,
        "total_points": 3210,
        "is_verified": 0,
        "status": "active",
        "display_name": "User Name",
        "username": "username",
        "avatar": "avatar_url",
        "created_at": "2024-03-05 16:37:02",
        "short_description": "User description",
        "meta": {
          "website": "website_url",
          "cover_photo": "cover_photo_url",
          "social_links": {
            "twitter": "@handle",
            "youtube": "@handle",
            "linkedin": "handle",
            "fb": "handle",
            "instagram": "handle"
          },
          "badge_slug": ["badge1", "badge2"]
        },
        "badge": null
      },
      "lesson": {
        "id": 15,
        "title": "Introduction to JavaScript",
        "slug": "intro-javascript"
      },
      "score": 92,
      "total_questions": 10,
      "correct_answers": 9,
      "passed": true,
      "attempt_number": 1,
      "time_spent": 380,
      "submitted_at": "2024-01-20 15:15:00"
    }
  ],
  "pagination": {
    "total": 45,
    "per_page": 10,
    "current_page": 1,
    "total_pages": 5
  },
  "statistics": {
    "total_submissions": 45,
    "passed": 38,
    "failed": 7,
    "average_score": 78.5,
    "average_time": 425
  }
}
```

---

## Update Quiz Result (Admin)

Manually update or grade a quiz result. Admin only.

### HTTP Request

```
POST /wp-json/fluent-community/v2/admin/courses/{course_id}/quiz-results/{quiz_id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `course_id` | integer | The ID of the course |
| `quiz_id` | integer | The ID of the quiz result |

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `score` | integer | No | Override score (0-100) |
| `passed` | boolean | No | Override pass/fail status |
| `feedback` | string | No | Instructor feedback |
| `answers` | object | No | Update specific answer grades |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/admin/courses/5/quiz-results/123" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 90,
    "passed": true,
    "feedback": "Excellent work! I gave you extra credit for your detailed short answer."
  }'
```

### Example Response

```json
{
  "message": "Quiz result updated successfully",
  "quiz_result": {
    "id": 123,
    "score": 90,
    "passed": true,
    "feedback": "Excellent work! I gave you extra credit for your detailed short answer.",
    "graded_at": "2024-01-21 10:00:00",
    "graded_by": {
      "id": 1,
      "display_name": "Admin User"
    }
  }
}
```

---

## Best Practices

### Quiz Design
- **Clear Questions**: Write unambiguous questions with clear correct answers
- **Appropriate Difficulty**: Match quiz difficulty to lesson content
- **Balanced Distribution**: Mix question types for comprehensive assessment
- **Meaningful Feedback**: Provide explanations for both correct and incorrect answers

### Grading Configuration
```json
{
  "passing_score": 70,        // 70% required to pass
  "max_attempts": 3,          // Allow 3 attempts
  "show_correct_answers": true, // Show answers after submission
  "time_limit": 1800          // 30 minutes time limit
}
```

### Student Experience
- **Progress Tracking**: Show quiz completion in course progress
- **Immediate Feedback**: Auto-grade when possible for instant results
- **Retake Options**: Allow retakes for learning reinforcement
- **Clear Requirements**: Display passing score and attempt limits upfront

---

## Common Use Cases

### 1. Check Student Progress
```bash
# Get all quiz results for a course
curl -X GET ".../admin/courses/5/quiz-results?orderby=score&order=desc"

# Filter by specific student
curl -X GET ".../admin/courses/5/quiz-results?user_id=42"
```

### 2. Manual Grading
```bash
# Grade a short answer question
curl -X POST ".../admin/courses/5/quiz-results/123" \
  -d '{
    "score": 95,
    "feedback": "Excellent analysis of the topic!"
  }'
```

### 3. Student Retakes Quiz
```bash
# Submit new attempt
curl -X POST ".../courses/5/lessons/15/quiz/submit" \
  -d '{"answers": {...}}'

# View latest result
curl -X GET ".../courses/5/lessons/15/quiz/result?attempt=latest"
```

---

## Error Handling

### Common Errors

**404 Not Found**
```json
{
  "code": "quiz_not_found",
  "message": "No quiz found for this lesson"
}
```

**400 Bad Request**
```json
{
  "code": "invalid_answers",
  "message": "Missing required answers for questions: question_1, question_3"
}
```

**403 Forbidden**
```json
{
  "code": "max_attempts_reached",
  "message": "You have used all 3 attempts for this quiz"
}
```

**409 Conflict**
```json
{
  "code": "already_submitted",
  "message": "You have already submitted this quiz. Use retake if allowed."
}
```

---

## Related Endpoints

- [Courses API](/rest-api/courses) - Manage courses
- [Lessons API](/rest-api/lessons) - Manage lessons
- [Course Progress API](/rest-api/course-progress) - Track student progress
- [Analytics API](/rest-api/analytics) - View quiz statistics
