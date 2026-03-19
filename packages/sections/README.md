# `@mardu/sections`

Shared content sections for multiple Mardu frontends.

## Public API

- `WhitepaperSection`

## `WhitepaperSection` contract

- Props:
  - `title?: string`
  - `description?: string`
  - `benefits?: string[]`
  - `coverImageSrc?: string`
  - `className?: string`
- Behavior:
  - posts to `/api/whitepaper/request`
  - shows a success dialog after a successful request
  - contains no site-specific branding or DTO validation logic
