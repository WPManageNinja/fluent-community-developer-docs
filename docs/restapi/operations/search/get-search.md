---
title: "Get Search"
description: "Searches posts, comments, members, spaces and courses in one request, and returns a block of results per type."
outline: false
aside: false
---

Searches posts, comments, members, spaces and courses in one request, and returns a block of results per type.

The caller asks for the types it wants and gets one entry per type, each with its items and whether more are available, alongside the search terms the query was reduced to and how long it took. Each type is answered by its own provider, and each provider applies the caller's own visibility rules, so a result set never includes a private space or an unpublished post the caller could not already open.

## Endpoint

- **Method:** `GET`
- **Path:** `/search`
- **Edition:** Core
- **Controller:** `SearchController@search`
- **Route source:** `fluent-community/app/Http/Routes/api.php:137`
- **Controller source:** `fluent-community/app/Http/Controllers/SearchController.php`

- The query text is trimmed, collapsed and cut to 100 characters, then reduced to at most 8 terms of two characters or more.
- `limit` is capped at 20 per type and `page` at 10, and on the last page the "more available" flag is forced to false.
- A type the caller does not ask for is never run, so this is not an "everything" endpoint. Type names are key-sanitised, so they must be lowercase.
- An empty or too-short query still answers 200, with an empty result object and no provider called.
- Guests reach this endpoint on a community whose access level is public, so a provider must not assume there is a logged-in user.
- Add a type with `fluent_community/search/providers`; the course type is itself registered that way by the course module.

::: info Inferred sample
No recorded sample exists for this endpoint yet, so the payload below is inferred from the controller and model definitions. Field names and types are accurate; values are placeholders.
:::

<OAOperation operationId="getSearch" specUrl="/openapi/public/search/get-search.json" />
