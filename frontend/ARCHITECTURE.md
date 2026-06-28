# Architecture & Engineering Standards

This document defines the architectural patterns, code styling rules, and guidelines for the DSD Security Services frontend application. All developers working on this codebase must adhere to these specifications to ensure clean, consistent, and maintainable software.

---

## 1. Project Philosophy

- **Uncompromising Type Safety**: We do not use `any` unless absolutely unavoidable (e.g. interfacing with un-typed external dependencies). All props, states, hooks, and payloads must be strictly typed.
- **Visual & Aesthetic Excellence**: The UI must maintain a premium look and feel. Hardcoded colors or sizing are forbidden; use TailwindCSS classes mapped to our design tokens.
- **Performance by Default**: Pages must be lazy-loaded. Avoid unnecessary state allocations. Component rendering should be clean and deterministic.
- **Accessibility (a11y) First**: Screen readers and keyboard navigation are first-class concerns. Every page must have proper headings, alt tags, focus states, and aria roles.

---

## 2. Folder Structure

We organize our codebase using a modular, feature-oriented structure.

```
src/
├── assets/               # Centralized asset exports (images, icons, logos)
├── config/               # Application configurations (company specs, typed env)
├── constants/            # True constants (routes, static lists; no content)
├── content/              # Page copy, static texts, and localized data
├── hooks/                # Global custom hooks
├── modules/              # Sub-applications / Domain modules
│   ├── admin/            # Admin Dashboard (Placeholder)
│   └── public/           # Public Website domain module
│       ├── components/   # Common components and UI primitives
│       ├── layouts/      # Main layout wrappers
│       ├── pages/        # Public pages & error sub-pages
│       ├── routes/       # Router configurations
│       └── styles/       # CSS stylesheets
├── services/             # API clients and data fetches
├── styles/               # Global styles and Tailwind configs
├── types/                # Split domain type definitions
└── utils/                # Pure utility helper functions
```

---

## 3. Import & Barrel Rules

To prevent spaghetti imports, we enforce the following rules:

1. **Path Alias (`@/`)**: All imports from the `src` directory must use the `@/` alias.
   ```typescript
   // ✅ Correct
   import { ROUTES } from "@/constants";

   // ❌ Incorrect
   import { ROUTES } from "../../../constants/routes";
   ```
2. **Barrel Exports**: Every directory containing multiple components, pages, hooks, utils, or services must contain an `index.ts` file acting as a barrel export.
   ```typescript
   // ✅ Correct
   import { Navbar, Footer } from "@/modules/public/components";

   // ❌ Incorrect
   import Navbar from "@/modules/public/components/common/Navbar";
   import Footer from "@/modules/public/components/common/Footer";
   ```
3. **Dynamic Import Exception**: React lazy-loaded pages inside `AppRoutes.tsx` must import from their direct paths instead of the barrel exports to prevent bundling entire folders during route splitting.

---

## 4. Component Design Rules

- **Functional Components**: All React components must be defined as functional components with explicit return types (`React.JSX.Element`).
- **UI Component Extraction Limit**:
  > [!IMPORTANT]
  > Do not abstract a UI component "just because". Only extract a component to the shared `ui` folder if it is reused in **two or more** places.
- **Semantic Tags**: Use semantic HTML tags (`<nav>`, `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<button>`) instead of generic `<div>` wrappers.
- **Props Interfaces**: Component props must be defined via interfaces using the naming convention `[ComponentName]Props`.
- **Destructuring**: Always destructure props in the component function signature, providing sensible defaults where applicable.

---

## 5. State & Event Rules

- **Hook-Driven Isolation**: Keep complex state management or asynchronous triggers inside hooks or service wrappers.
- **React Hook Form / Standard Event Handlers**: Always type event handlers explicitly:
  - Form Submit: `React.FormEvent<HTMLFormElement>`
  - Input Changes: `React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>`
- **Async State Safety**: When setting component state inside asynchronous `Promise` chains (e.g. `fetch`/`axios`), always track the component's mount status via `isMounted` or `AbortController` to prevent memory leaks and state updates on unmounted components.

---

## 6. Naming Conventions

- **Components**: PascalCase (e.g., `SectionHeader`, `PageHero`)
- **Hooks**: camelCase prefixed with `use` (e.g., `useScrollPosition`)
- **Types & Interfaces**: PascalCase (e.g., `GuardProfile`, `InquiryPayload`). Do **not** prefix interfaces with `I` (e.g., no `IGuardProfile`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `HOME_CONTENT`, `ROUTES`)
- **Variables & Functions**: camelCase (e.g., `formatPhone`, `isSuccess`)
- **CSS classes**: kebab-case (e.g., `service-detail-card`, `navbar-header`)

---

## 7. Future Backend Integration Structure

When bridging to a backend layer:

1. **Axios Client**: Utilize the centralized Axios instance in `src/services/api.ts` which has a configured `baseURL` pointing to `env.apiUrl` and handles timeouts and authorization interceptors.
2. **Service Methods**: Add API requests to their respective files in `src/services/` (e.g. `contactService.ts`). Ensure they return strongly-typed `Promise` wrappers matching defined types in `src/types/`.
3. **Environment Isolation**: Always change values through `.env` configurations, never by mutating the codebase directly.

---

## 8. Coding & Linting Standards

- **Formatting**: Code formatting is enforced via `Prettier` (run `npm run format`).
- **Linting**: Static code analysis is conducted via `oxlint` (run `npm run lint`).
- **Zero Errors**: Pull requests will be rejected if they contain any linter errors, TypeScript compilation warnings, or formatter mismatches.
- **No Placeholders**: Never write TODO, FIXME, or mock codes in production branches without describing the task and creating an issue.
