---
title: Get Profile
description: "Returns one member public profile by username, with the navigation tabs the portal should render for that member."
outline: false
aside: false
---

Returns one member public profile by username, with the navigation tabs the portal should render for that member.

How much comes back depends on the `profile_page_visibility` privacy setting and on who is asking: a restricted profile is flagged `is_restricted` and omits the bio, website, social links and join date. The profile owner and community admins additionally receive the email address, name parts, and flags saying whether the username, email and password can be changed. The Courses tab only appears when the `course_module` feature is enabled.

## Endpoint

- **Method:** `GET`
- **Path:** `/profile/{username}`
- **Edition:** Core
- **Controller:** `ProfileController@getProfile`
- **Route source:** `fluent-community/app/Http/Routes/api.php:86`
- **Controller source:** `fluent-community/app/Http/Controllers/ProfileController.php`

- Profiles that are not active are hidden from everyone except community moderators, with a 403.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="getProfile" specUrl="/openapi/public/profile/get-profile.json" />
