# Parallel Routes Guide (Next.js App Router)

This note explains:

1. What Parallel Routes are
2. Why you would use them
3. How they work
4. How they are implemented in this project (`test-next`)

## 1) What Are Parallel Routes?

Parallel Routes let you render multiple route trees in the same layout at the same time.

In App Router, these are defined as named slots using the `@slotName` folder convention:

- `@team`
- `@analytics`

The parent layout receives them as props:

- `children` (implicit slot)
- `team`
- `analytics`

Important:

- Slots are not part of URL segments.
- URL is matched by route segments, and each slot can resolve independently for the same URL.

## 2) Why Use Parallel Routes?

Use Parallel Routes when parts of a page should behave independently, for example:

- dashboard columns
- side panels
- feed + detail areas
- modal layers (with intercepting routes)

Benefits:

- Keep context in one section while navigating another section.
- Better UX for multi-pane applications.
- Separate loading/error/default UI per slot.

## 3) How It Works

### Folder Convention

- Named slot: `app/segment/@slotName/...`
- Fallback for slot: `app/segment/@slotName/default.tsx`
- Fallback for implicit `children`: `app/segment/default.tsx`

### Navigation Behavior

- Soft navigation (client-side): Next preserves active state of other slots.
- Hard navigation (refresh): unmatched slots render `default.tsx` (or error/404 if missing).

## 4) How We Implemented It Here

## Base Demo Route

- Parent layout: `app/parallel-demo/layout.tsx`
- `children` content:
  - `app/parallel-demo/page.tsx`
  - `app/parallel-demo/settings/page.tsx`
  - `app/parallel-demo/members/page.tsx`
  - `app/parallel-demo/views/page.tsx`
  - `app/parallel-demo/visitors/page.tsx`

## Team Slot

- Slot root: `app/parallel-demo/@team/page.tsx`
- Slot layout (independent slot nav): `app/parallel-demo/@team/layout.tsx`
- Slot subpages:
  - `app/parallel-demo/@team/settings/page.tsx`
  - `app/parallel-demo/@team/members/page.tsx`
  - `app/parallel-demo/@team/team-only/page.tsx`
- Slot fallback: `app/parallel-demo/@team/default.tsx`

## Analytics Slot

- Slot root: `app/parallel-demo/@analytics/page.tsx`
- Slot layout (independent slot nav): `app/parallel-demo/@analytics/layout.tsx`
- Slot subpages:
  - `app/parallel-demo/@analytics/views/page.tsx`
  - `app/parallel-demo/@analytics/visitors/page.tsx`
- Slot fallback: `app/parallel-demo/@analytics/default.tsx`

## Children Fallback

- `app/parallel-demo/default.tsx`

This file is used when Next cannot resolve `children` active state on hard reload for the current URL.

## 5) URLs To Try

Use these URLs in dev mode (`npm run dev`):

- `/parallel-demo`
- `/parallel-demo/settings`
- `/parallel-demo/members`
- `/parallel-demo/views`
- `/parallel-demo/visitors`
- `/parallel-demo/team-only`

### Recommended checks

1. Open `/parallel-demo`.
2. In `@team`, click `Team: settings`.
3. In `@analytics`, click `Analytics: views`.
4. Observe independent section behavior.

For fallback behavior:

1. Open `/parallel-demo/team-only`.
2. Hard refresh the browser.
3. `children` fallback appears from `app/parallel-demo/default.tsx`.

Also on refresh of `/parallel-demo/settings`, `@analytics/default.tsx` appears because no `@analytics/settings` exists.

## 6) Key Learning

- Parallel Routes are ideal for multi-pane UX.
- `default.tsx` is critical for hard refresh behavior in unmatched slots.
- Slot-level layouts are a clean way to build independent tab-like navigation per section.
