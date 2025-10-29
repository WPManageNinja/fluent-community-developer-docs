# Leaderboard API [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

The Leaderboard API provides gamification features to encourage community engagement. Track member activity, award points, assign levels, and display top contributors.

---

## Leaderboard Entry Object

```json
{
  "user_id": 42,
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
  "rank": 1,
  "total_points": 2450,
  "level": {
    "id": 5,
    "title": "Expert Contributor",
    "slug": "expert-contributor",
    "min_points": 2000,
    "max_points": 5000,
    "badge_icon": "🏆",
    "badge_color": "#FFD700"
  },
  "points_breakdown": {
    "posts_created": 850,
    "comments_made": 600,
    "reactions_received": 500,
    "courses_completed": 300,
    "helpful_votes": 200
  },
  "achievements": [
    {
      "id": 1,
      "title": "First Post",
      "icon": "✍️",
      "earned_at": "2024-01-15 10:00:00"
    },
    {
      "id": 5,
      "title": "100 Comments",
      "icon": "💬",
      "earned_at": "2024-02-20 14:30:00"
    }
  ],
  "stats": {
    "posts_count": 45,
    "comments_count": 120,
    "reactions_count": 89,
    "courses_completed": 5,
    "member_since": "2024-01-10"
  }
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `user_id` | integer | User's unique identifier |
| `user` | object | User profile information |
| `rank` | integer | Current position on leaderboard |
| `total_points` | integer | Total points earned |
| `level` | object | Current level/badge information |
| `points_breakdown` | object | Points by activity type |
| `achievements` | array | Earned achievement badges |
| `stats` | object | Activity statistics |

---

## Level Object

```json
{
  "id": 5,
  "title": "Expert Contributor",
  "slug": "expert-contributor",
  "description": "Awarded to highly active community members",
  "min_points": 2000,
  "max_points": 5000,
  "badge_icon": "🏆",
  "badge_color": "#FFD700",
  "serial": 5,
  "perks": [
    "Priority support",
    "Custom profile badge",
    "Access to exclusive spaces"
  ],
  "members_count": 23
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | integer | Level unique identifier |
| `title` | string | Display name of the level |
| `slug` | string | URL-friendly identifier |
| `description` | string | Level description |
| `min_points` | integer | Minimum points required |
| `max_points` | integer | Maximum points for this level |
| `badge_icon` | string | Icon/emoji for the badge |
| `badge_color` | string | Hex color code for badge |
| `serial` | integer | Display order |
| `perks` | array | Benefits of reaching this level |
| `members_count` | integer | Number of members at this level |

---

## Get Leaderboard

Retrieve the community leaderboard with top members.

### HTTP Request

```
GET /wp-json/fluent-community/v2/leaderboard
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | string | `all_time` | Time period: `all_time`, `this_month`, `this_week`, `today` |
| `limit` | integer | `50` | Number of entries to return (max 100) |
| `space_id` | integer | `null` | Filter by specific space |
| `include_current_user` | boolean | `true` | Include current user's rank even if not in top |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/leaderboard?period=this_month&limit=20" \
  -u "username:password"
```

### Example Response

```json
{
  "leaderboard": [
    {
      "title": "Last 7 days",
      "items": [
        {
          "user_id": "1",
          "total_points": "0",
          "xprofile": {
            "user_id": 1,
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
            "last_activity": "2025-10-29 06:55:33",
            "badge": null
          }
        },
        {
          "user_id": "2",
          "total_points": "0",
          "xprofile": {
            "user_id": 2,
            "total_points": 927,
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
            "last_activity": "2025-01-04 04:59:08",
            "badge": null
          }
        }
      ],
      "key": "7_days"
    },
    {
      "title": "Last 30 days",
      "items": [
        {
          "user_id": "1",
          "total_points": "0",
          "xprofile": {
            "user_id": 1,
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
            "last_activity": "2025-10-29 06:55:33",
            "badge": null
          }
        }
      ],
      "key": "30_days"
    },
    {
      "title": "All time",
      "items": [
        {
          "user_id": "1",
          "total_points": "1",
          "xprofile": {
            "user_id": 1,
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
            "last_activity": "2025-10-29 06:55:33",
            "badge": null
          }
        }
      ],
      "key": "all_time"
    }
  ]
}
```

---

## Get Levels

Retrieve all available levels and their requirements. Admin only.

### HTTP Request

```
GET /wp-json/fluent-community/v2/admin/leaderboards/levels
```

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/admin/leaderboards/levels" \
  -u "username:password"
```

### Example Response

```json
{
  "levels": [
    {
      "id": 1,
      "title": "Newcomer",
      "slug": "newcomer",
      "description": "Welcome to the community!",
      "min_points": 0,
      "max_points": 100,
      "badge_icon": "🌱",
      "badge_color": "#9E9E9E",
      "serial": 1,
      "perks": [],
      "members_count": 150
    },
    {
      "id": 2,
      "title": "Regular Member",
      "slug": "regular-member",
      "description": "Active community participant",
      "min_points": 100,
      "max_points": 500,
      "badge_icon": "👤",
      "badge_color": "#2196F3",
      "serial": 2,
      "perks": [
        "Create polls",
        "Upload images"
      ],
      "members_count": 85
    },
    {
      "id": 3,
      "title": "Active Member",
      "slug": "active-member",
      "description": "Consistently engaged member",
      "min_points": 500,
      "max_points": 1000,
      "badge_icon": "⭐",
      "badge_color": "#4CAF50",
      "serial": 3,
      "perks": [
        "Create events",
        "Custom profile theme"
      ],
      "members_count": 45
    },
    {
      "id": 4,
      "title": "Valued Contributor",
      "slug": "valued-contributor",
      "description": "Highly engaged community member",
      "min_points": 1000,
      "max_points": 2000,
      "badge_icon": "💎",
      "badge_color": "#9C27B0",
      "serial": 4,
      "perks": [
        "Priority support",
        "Featured profile"
      ],
      "members_count": 28
    },
    {
      "id": 5,
      "title": "Expert Contributor",
      "slug": "expert-contributor",
      "description": "Top-tier community leader",
      "min_points": 2000,
      "max_points": 5000,
      "badge_icon": "🏆",
      "badge_color": "#FFD700",
      "serial": 5,
      "perks": [
        "All previous perks",
        "Exclusive spaces access",
        "Community moderator badge"
      ],
      "members_count": 12
    }
  ],
  "points_config": {
    "post_created": 50,
    "comment_made": 10,
    "reaction_received": 5,
    "course_completed": 100,
    "helpful_vote": 20,
    "profile_completed": 50
  }
}
```

---

## Save Levels

Create or update leaderboard levels and point configuration. Admin only.

### HTTP Request

```
POST /wp-json/fluent-community/v2/admin/leaderboards/levels
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `levels` | array | Yes | Array of level objects |
| `points_config` | object | No | Points awarded for each activity |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/admin/leaderboards/levels" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "levels": [
      {
        "id": 1,
        "title": "Newcomer",
        "slug": "newcomer",
        "description": "Welcome to the community!",
        "min_points": 0,
        "max_points": 100,
        "badge_icon": "🌱",
        "badge_color": "#9E9E9E",
        "serial": 1,
        "perks": []
      },
      {
        "title": "Rising Star",
        "slug": "rising-star",
        "description": "Quickly becoming active",
        "min_points": 100,
        "max_points": 300,
        "badge_icon": "🌟",
        "badge_color": "#FFC107",
        "serial": 2,
        "perks": ["Create polls"]
      }
    ],
    "points_config": {
      "post_created": 50,
      "comment_made": 10,
      "reaction_received": 5,
      "course_completed": 100,
      "helpful_vote": 20
    }
  }'
```

### Example Response

```json
{
  "message": "Levels saved successfully",
  "levels": [
    {
      "id": 1,
      "title": "Newcomer",
      "slug": "newcomer",
      "min_points": 0,
      "max_points": 100,
      "badge_icon": "🌱",
      "badge_color": "#9E9E9E",
      "serial": 1
    },
    {
      "id": 6,
      "title": "Rising Star",
      "slug": "rising-star",
      "min_points": 100,
      "max_points": 300,
      "badge_icon": "🌟",
      "badge_color": "#FFC107",
      "serial": 2
    }
  ],
  "points_config": {
    "post_created": 50,
    "comment_made": 10,
    "reaction_received": 5,
    "course_completed": 100,
    "helpful_vote": 20
  }
}
```

---

## Best Practices

### Level Design
- **Progressive Difficulty**: Make each level harder to achieve than the last
- **Meaningful Rewards**: Offer tangible perks at each level
- **Clear Requirements**: Display point requirements prominently
- **Balanced Progression**: Ensure levels are achievable but challenging

### Points Configuration
```json
{
  "post_created": 50,          // Creating a post
  "comment_made": 10,          // Making a comment
  "reaction_received": 5,      // Receiving a reaction
  "course_completed": 100,     // Completing a course
  "helpful_vote": 20,          // Getting a helpful vote
  "profile_completed": 50,     // Completing profile
  "daily_login": 5,            // Daily login bonus
  "space_joined": 10           // Joining a space
}
```

### Gamification Strategy
- **Visible Progress**: Show members their current level and next milestone
- **Regular Updates**: Recalculate leaderboard frequently (hourly/daily)
- **Fair Competition**: Consider time periods (monthly resets) for fairness
- **Recognition**: Highlight top contributors in community

---

## Common Use Cases

### 1. Display Top Contributors
```bash
# Get top 10 this month
curl -X GET ".../leaderboard?period=this_month&limit=10"

# Get top contributors in specific space
curl -X GET ".../leaderboard?space_id=5&limit=20"
```

### 2. Configure Gamification
```bash
# Set up levels and points
curl -X POST ".../admin/leaderboards/levels" \
  -d '{
    "levels": [...],
    "points_config": {
      "post_created": 50,
      "comment_made": 10
    }
  }'
```

### 3. Track User Progress
```bash
# Get leaderboard with current user
curl -X GET ".../leaderboard?include_current_user=true"
```

---

## Point Calculation

### Activity Points

| Activity | Default Points | Description |
|----------|---------------|-------------|
| Create Post | 50 | Publishing a new post |
| Make Comment | 10 | Commenting on a post |
| Receive Reaction | 5 | Getting a reaction on your content |
| Complete Course | 100 | Finishing a course |
| Helpful Vote | 20 | Comment marked as helpful |
| Complete Profile | 50 | Filling out profile (one-time) |
| Daily Login | 5 | Logging in each day |
| Join Space | 10 | Joining a new space |

### Bonus Points

- **First Post**: +50 bonus points
- **100 Comments Milestone**: +100 bonus points
- **Course Completion Streak**: +50 per consecutive course
- **Weekly Active**: +25 for 7 consecutive days

---

## Error Handling

### Common Errors

**404 Not Found**
```json
{
  "code": "leaderboard_disabled",
  "message": "Leaderboard feature is not enabled"
}
```

**400 Bad Request**
```json
{
  "code": "invalid_period",
  "message": "Invalid time period. Use: all_time, this_month, this_week, today"
}
```

**403 Forbidden**
```json
{
  "code": "permission_denied",
  "message": "You do not have permission to manage leaderboard levels"
}
```

---

## Related Endpoints

- [Members API](/rest-api/members) - View member profiles
- [Analytics API](/rest-api/analytics) - View engagement statistics
- [Activities API](/rest-api/activities) - Track member activities
- [Settings API](/rest-api/settings) - Configure gamification settings

