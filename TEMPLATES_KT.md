# Knowledge Transfer (KT): Next.js Templates (`template.tsx`)

This document provides a complete overview of what Templates are in Next.js (App Router), how they differ from Layouts, and how we implemented them to demonstrate their specific behaviors.

---

## 1. What is a Template?

In the Next.js App Router, `template.tsx` files are very similar to `layout.tsx` files in that they wrap child components (pages or nested layouts). However, they have one fundamental and crucial difference:

**Templates create a new instance for each of their children on navigation.**

Whenever a user navigates between routes that share a template, the template component is entirely destroyed and rebuilt (remounted).

---

## 2. Layouts vs. Templates

| Feature | `layout.tsx` | `template.tsx` |
| :--- | :--- | :--- |
| **Re-renders on navigation** | ❌ No (Persists) | ✅ Yes (Remounts) |
| **Component State (e.g., `useState`)** | Preserved | Reset on navigation |
| **`useEffect` triggers** | Only on initial mount | Triggers on every navigation |
| **DOM Elements** | Kept in the DOM | Destroyed and recreated |
| **Primary Use Cases** | Shared navbars, footers, sidebars | Page transitions, resetting state |

---

## 3. When should you use a Template?

You should default to using `layout.tsx`. Only use `template.tsx` when you specifically need the "remounting" behavior. Common use cases include:

1. **Enter/Exit Animations:** Using libraries like Framer Motion to animate pages in and out. Since the template remounts, the entrance animation triggers on every navigation.
2. **Forcing State Resets:** Features that rely on resetting `useState` or `useEffect` on navigation (e.g., a feedback form that should clear when the user changes pages).
3. **Changing Suspense Behavior:** In our demo, we used `<Suspense>` inside a template to show a loading state that triggers *every* time navigating between child routes.

---

## 4. How We Implemented it Here (`temp-demo`)

To demonstrate the difference, we created a route under `/temp-demo` that uses both a Layout and nested Templates.

### Our Folder Structure

```text
app/
 └── temp-demo/
      ├── layout.tsx         (🟦 Blue Border - Persists)
      ├── template.tsx       (🟧 Orange Border - Remounts)
      ├── page.tsx
      ├── about/
      │    └── page.tsx
      └── blog/
           ├── template.tsx  (🟥 Red Border - Remounts)
           ├── page.tsx
           └── [slug]/
                └── page.tsx (Dynamic Route)
```

### Key Demonstrations in Our Code

1. **The Persisting Layout (Blue):**
   The blue box (`layout.tsx`) remains completely static when you click the links (`/temp-demo`, `/temp-demo/about`, `/temp-demo/blog`). If you were to type into an `<input>` inside this layout, the text would remain intact during navigation.

2. **The Remounting Templates (Orange & Red):**
   - **Render IDs:** Inside `template.tsx`, we generate a random string (`Math.random()`) on render. Notice how this ID changes on *every single navigation*. If this were a layout, the ID would never change.
   - **Animations:** We added Tailwind CSS entrance animations (`animate-in fade-in slide-in-from-bottom-2`). Because the component is destroyed and rebuilt in the DOM, the animation plays every time you click a link.
   - **Suspense boundaries:** We wrapped the children in `<Suspense>` and added an artificial delay (using `await new Promise(...)`) to the page components. Because the template remounts, it forces the `<Suspense>` fallback ("Loading...") to show up again during the transition.

3. **Template Nesting**
   When you navigate into the `blog/post-1` route, you trigger *both* the Root Template (Orange) and the Nested Blog Template (Red) to remount simultaneously. Next.js handles this nested hierarchy gracefully.
