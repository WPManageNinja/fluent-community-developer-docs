# Giphy API [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

The Giphy API integration allows members to search and embed GIF images from Giphy directly into posts and comments, making conversations more engaging and expressive.

---

## Giphy Object

```json
{
  "id": "3o7btPCcdNniyf0ArS",
  "title": "Happy Dance GIF",
  "url": "https://giphy.com/gifs/happy-dance-3o7btPCcdNniyf0ArS",
  "images": {
    "original": {
      "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
      "width": 480,
      "height": 270,
      "size": 1234567
    },
    "downsized": {
      "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy-downsized.gif",
      "width": 400,
      "height": 225,
      "size": 567890
    },
    "preview": {
      "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy-preview.gif",
      "width": 200,
      "height": 113,
      "size": 123456
    }
  },
  "rating": "g",
  "trending_datetime": "2024-01-20 10:00:00"
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Giphy's unique identifier for the GIF |
| `title` | string | Title/description of the GIF |
| `url` | string | Giphy page URL for the GIF |
| `images` | object | Different size variants of the GIF |
| `rating` | string | Content rating: `g`, `pg`, `pg-13`, `r` |
| `trending_datetime` | datetime | When the GIF was trending (if applicable) |

---

## Search Giphy

Search for GIFs from Giphy's library.

### HTTP Request

```
GET /wp-json/fluent-community/v2/giphy
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | Required | Search query (e.g., "happy", "celebration") |
| `limit` | integer | `25` | Number of results to return (max 50) |
| `offset` | integer | `0` | Pagination offset |
| `rating` | string | `g` | Content rating filter: `g`, `pg`, `pg-13`, `r` |
| `lang` | string | `en` | Language code (e.g., `en`, `es`, `fr`) |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/giphy?q=happy&limit=10" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "id": "3o7btPCcdNniyf0ArS",
      "title": "Happy Dance GIF",
      "url": "https://giphy.com/gifs/happy-dance-3o7btPCcdNniyf0ArS",
      "images": {
        "original": {
          "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
          "width": 480,
          "height": 270,
          "size": 1234567
        },
        "downsized": {
          "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy-downsized.gif",
          "width": 400,
          "height": 225,
          "size": 567890
        },
        "preview": {
          "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy-preview.gif",
          "width": 200,
          "height": 113,
          "size": 123456
        },
        "fixed_height": {
          "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200.gif",
          "width": 356,
          "height": 200
        },
        "fixed_width": {
          "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/200w.gif",
          "width": 200,
          "height": 113
        }
      },
      "rating": "g"
    },
    {
      "id": "l0MYt5jPR6QX5pnqM",
      "title": "Happy Birthday GIF",
      "url": "https://giphy.com/gifs/happy-birthday-l0MYt5jPR6QX5pnqM",
      "images": {
        "original": {
          "url": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
          "width": 500,
          "height": 281
        },
        "downsized": {
          "url": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy-downsized.gif",
          "width": 400,
          "height": 225
        },
        "preview": {
          "url": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy-preview.gif",
          "width": 200,
          "height": 113
        }
      },
      "rating": "g"
    }
  ],
  "pagination": {
    "total_count": 1234,
    "count": 10,
    "offset": 0
  },
  "meta": {
    "status": 200,
    "msg": "OK",
    "response_id": "abc123xyz"
  }
}
```

---

## Embedding GIFs in Content

### In Posts

When creating or updating a post, include the Giphy URL in the content:

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Celebrating our milestone!",
    "message": "We just hit 10,000 members! 🎉",
    "space_id": 5,
    "meta": {
      "giphy": {
        "id": "3o7btPCcdNniyf0ArS",
        "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
        "width": 480,
        "height": 270
      }
    }
  }'
```

### In Comments

Include Giphy data when creating a comment:

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds/123/comments" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Congratulations! 🎊",
    "meta": {
      "giphy": {
        "id": "l0MYt5jPR6QX5pnqM",
        "url": "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
      }
    }
  }'
```

---

## Best Practices

### Search Optimization
- **Specific Keywords**: Use descriptive search terms for better results
- **Appropriate Ratings**: Filter by rating to ensure content appropriateness
- **Pagination**: Load results in batches for better performance
- **Caching**: Cache popular search results to reduce API calls

### Content Moderation
```json
{
  "rating_filter": "pg",        // Limit to family-friendly content
  "enable_reporting": true,     // Allow users to report inappropriate GIFs
  "admin_review": false         // Auto-approve or require review
}
```

### Performance
- **Use Preview Images**: Load preview versions first, then full GIF on interaction
- **Lazy Loading**: Only load GIFs when they enter viewport
- **Size Limits**: Use `downsized` or `fixed_height` variants for better performance
- **CDN Delivery**: Giphy serves content via CDN for fast loading

---

## Common Use Cases

### 1. Search for Trending GIFs
```bash
# Search for celebration GIFs
curl -X GET ".../giphy?q=celebration&limit=20&rating=g"

# Search for reaction GIFs
curl -X GET ".../giphy?q=thumbs+up&limit=10"
```

### 2. Add GIF to Post
```bash
# Create post with GIF
curl -X POST ".../feeds" \
  -d '{
    "message": "Great work team!",
    "meta": {
      "giphy": {
        "id": "3o7btPCcdNniyf0ArS",
        "url": "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
      }
    }
  }'
```

### 3. Paginate Through Results
```bash
# First page
curl -X GET ".../giphy?q=happy&limit=25&offset=0"

# Second page
curl -X GET ".../giphy?q=happy&limit=25&offset=25"

# Third page
curl -X GET ".../giphy?q=happy&limit=25&offset=50"
```

---

## Configuration

### Admin Settings

To enable Giphy integration, configure your Giphy API key in the admin settings:

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/settings/features" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "giphy_enabled": true,
    "giphy_api_key": "your_giphy_api_key",
    "giphy_rating": "pg",
    "giphy_language": "en"
  }'
```

### Rating Levels

| Rating | Description | Suitable For |
|--------|-------------|--------------|
| `g` | General Audiences | All ages, family-friendly |
| `pg` | Parental Guidance | May contain mild content |
| `pg-13` | Parents Strongly Cautioned | May not be suitable for children |
| `r` | Restricted | Adult content |

---

## Image Variants

Giphy provides multiple size variants for each GIF:

| Variant | Description | Use Case |
|---------|-------------|----------|
| `original` | Full resolution | High-quality display |
| `downsized` | Reduced file size | Faster loading |
| `preview` | Small preview | Thumbnails, search results |
| `fixed_height` | Fixed height (200px) | Consistent grid display |
| `fixed_width` | Fixed width (200px) | Responsive layouts |
| `fixed_height_small` | Small fixed height (100px) | Mobile views |

### Recommended Usage

```javascript
// Search results: Use preview
<img src="{gif.images.preview.url}" />

// Post content: Use downsized
<img src="{gif.images.downsized.url}" />

// Full view: Use original
<img src="{gif.images.original.url}" />
```

---

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "code": "missing_query",
  "message": "Search query parameter 'q' is required"
}
```

**401 Unauthorized**
```json
{
  "code": "invalid_api_key",
  "message": "Invalid Giphy API key. Please configure in admin settings."
}
```

**403 Forbidden**
```json
{
  "code": "giphy_disabled",
  "message": "Giphy integration is not enabled for this community"
}
```

**429 Too Many Requests**
```json
{
  "code": "rate_limit_exceeded",
  "message": "Giphy API rate limit exceeded. Please try again later."
}
```

---

## Rate Limits

Giphy API has rate limits based on your API key tier:

- **Free Tier**: 42 requests per hour per IP
- **Paid Tier**: Higher limits based on plan

**Best Practices:**
- Cache search results
- Implement client-side debouncing for search
- Use pagination to reduce total requests
- Monitor usage in admin dashboard

---

## Related Endpoints

- [Feeds API](/rest-api/feeds) - Create posts with GIFs
- [Comments API](/rest-api/comments) - Add GIFs to comments
- [Media API](/rest-api/media) - Manage media content
- [Settings API](/rest-api/settings) - Configure Giphy integration

---

## Additional Resources

- [Giphy API Documentation](https://developers.giphy.com/docs/api)
- [Giphy Content Guidelines](https://support.giphy.com/hc/en-us/articles/360020027752)
- [Giphy Attribution Requirements](https://support.giphy.com/hc/en-us/articles/360020027752-GIPHY-Attribution)

