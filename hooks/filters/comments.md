# Comments Filters

Filters for modifying comment data, validation, and API responses in Fluent Community.

## Overview

These filters allow you to modify comment data before it's saved, validate comment content, and customize API responses.

**Total Filters:** 5

---

## Comment Data Modification

### fluent_community/comment/comment_data

Modify comment data before a new comment is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Comment data to be inserted |
| `$requestData` | array | Original request data |

**Input Data Structure:**
```php
[
    'user_id' => 123,
    'post_id' => 456,
    'parent_id' => null, // or parent comment ID for replies
    'message' => 'Comment text',
    'type' => 'comment',
    'status' => 'published',
    'meta' => []
]
```

**Return Value:** Modified array or `WP_Error` for validation errors

**Example Usage:**

```php
// Validate minimum length
add_filter('fluent_community/comment/comment_data', function($data, $requestData) {
    $message = strip_tags($data['message']);
    
    if (strlen($message) < 10) {
        return new WP_Error(
            'comment_too_short',
            'Comments must be at least 10 characters long',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);

// Block spam keywords
add_filter('fluent_community/comment/comment_data', function($data, $requestData) {
    $spam_keywords = ['viagra', 'casino', 'lottery'];
    $message = strtolower($data['message']);
    
    foreach ($spam_keywords as $keyword) {
        if (stripos($message, $keyword) !== false) {
            return new WP_Error(
                'spam_detected',
                'Your comment contains prohibited content',
                ['status' => 403]
            );
        }
    }
    
    return $data;
}, 10, 2);
```

---

### fluent_community/comment/update_comment_data

Modify comment data before an existing comment is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Update data |
| `$existingComment` | Comment Object | Current comment |
| `$requestData` | array | Request data |

**Return Value:** Modified array or `WP_Error`

---

## API Response Filters

### fluent_community/comments_query_response

Modify comments API response before sending to client.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comments` | array | Array of comment arrays |
| `$feed` | Feed Object | Parent feed object |

**Return Value:** Modified comments array

---

## Configuration Filters

### fluent_community/max_comment_char_length

Set maximum comment length in characters.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxLength` | int | Maximum length (default: 5000) |

**Return Value:** Integer

---

## See Also

- [Comment Actions](/hooks/actions/comments) - Comment lifecycle hooks
- [Feed Filters](/hooks/filters/feeds) - Feed data filters
- [Examples](/hooks/examples) - Real-world examples

