# Knowledge Transfer (KT): Next.js Route Groups

This document provides a complete overview of what Route Groups are in Next.js (App Router), why they are useful, and how we implemented them in this specific project.

---

## 1. What is a Route Group?

In the Next.js App Router (`app` directory), folders generally map directly to URL paths. However, you can mark a folder as a **Route Group** by wrapping its name in parentheses, for example: `(marketing)`.

When a folder is a Route Group, Next.js **completely ignores it** when generating the URL path. It exists solely for organizational purposes and layout management.

**Example Matrix:**
| Folder Path | Resulting URL |
| :--- | :--- |
| `app/about/page.tsx` | `/about` |
| `app/(marketing)/about/page.tsx` | `/about` |

---

## 2. Why use Route Groups?

Route Groups solve several common architectural problems in modern Next.js applications:

1. **Logical Organization:** Group routes by team (e.g., `(marketing)` vs `(development)`), by feature, or by authentication state (`(auth)` vs `(dashboard)`) without making your URLs needlessly convoluted.
2. **Shared Layouts:** You can place a `layout.tsx` file inside a Route Group to wrap *only* the routes inside that group.
3. **Multiple Root Layouts:** If you need completely different HTML/Body structures (e.g., the public site vs the app dashboard), you can remove the top-level `app/layout.tsx` and place distinct root layouts inside route groups like `app/(marketing)/layout.tsx` and `app/(app)/layout.tsx`.

---

## 3. How We Implemented it Here

In this project, we demonstrated Route Groups by creating a top-level `route-group` path that splits its children into two distinct groups using `(marketing)` and `(development)`. 

### Our Folder Structure

```text
app/
 └── route-group/                <-- Maps to /route-group
      ├── (marketing)/           <-- Ignored in URL
      │    └── about/            <-- Maps to /route-group/about
      │         ├── layout.tsx   (Applies purple theme to Marketing pages)
      │         └── page.tsx     (Route handler)
      │
      └── (development)/         <-- Ignored in URL
           └── career/           <-- Maps to /route-group/career
                ├── layout.tsx   (Applies blue theme to Development pages)
                └── page.tsx     (Route handler)
```

### Key Takeaways from Our Implementation

1. **Clean URLs:** 
   Even though the file is located at `app/route-group/(marketing)/about/page.tsx`, the `(marketing)` part is skipped. The user simply visits `http://localhost:3000/route-group/about`.

2. **Targeted Layouts (Themed Borders):** 
   - When you visit `/route-group/about`, you see a **purple border**. This is because the route sits inside the `(marketing)` group, and we placed a `layout.tsx` there that applies a purple theme.
   - When you visit `/route-group/career`, you see a **blue border** because it is wrapped by the `(development)` group layout.
   - Importantly, these layouts **do not affect each other**. The marketing layout boundary completely ignores the development pages, and vice versa, despite both living under the same parent `/route-group` path.

3. **Routing Configuration:**
   In our `app/page.tsx`, notice that the underlying folder structure (`(marketing)` & `(development)`) didn't force us to write complex `href` links. We simply link naturally to the final compiled URL:
   ```tsx
   <Link href="/route-group/about">Marketing About</Link>
   <Link href="/route-group/career">Development Career</Link>
   ```

---

## 4. Caveats & Best Practices

- **Naming Conflicts:** Routes across different Route Groups must not resolve to the same URL path. If you have `(marketing)/about/page.tsx` and `(development)/about/page.tsx`, Next.js will throw an error because both resolve to `/about`.
- **Full Page Loads:** Navigating between routes that use completely different *root* layouts will trigger a full page reload rather than a client-side transition. (This only applies if they are different *root* layouts, not standard nested layouts like we used).
