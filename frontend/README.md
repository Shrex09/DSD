# DSD Security Services — Frontend

A production-grade React + TypeScript frontend for a premium security services company website.
Built with Vite, TailwindCSS v4, Framer Motion, and React Router DOM v7.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | ^19 | UI rendering |
| TypeScript | ^5.8 | Static type safety |
| Vite | ^8 | Build tool & dev server |
| TailwindCSS | ^4 | Utility-first CSS |
| Framer Motion | ^12 | Animations & transitions |
| React Router DOM | ^7 | Client-side routing |
| Axios | ^1 | HTTP client |
| Lucide React | ^1 | Icon library |
| Oxlint | ^1 | Fast code quality linter |
| Prettier | ^3 | Code formatter |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build (Production)
```bash
npm run build    # Runs tsc -b then vite build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint     # oxlint — zero warnings or errors expected
```

### Format
```bash
npm run format          # Prettier — writes all src/ files
npm run format:check    # CI-safe prettier check
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
VITE_APP_NAME=            # Optional: display name override
VITE_API_URL=             # Backend REST API base URL
VITE_GOOGLE_MAPS_KEY=     # Optional: Google Maps embed key
```

> ⚠️ Never import `import.meta.env` directly in components.
> Always read values through `src/config/env.ts`.

---

## Folder Structure

```
src/
├── assets/               # Centralized image exports
│   ├── images/           # Raw image files (jpg, png)
│   └── index.ts          # Named exports for all images
│
├── config/               # App-level configuration
│   ├── company.ts        # CompanyConfig (name, phone, socials, etc.)
│   └── env.ts            # Typed env variable layer
│
├── constants/            # True constants (not content)
│   ├── routes.ts         # ROUTES object — never hardcode paths
│   ├── navigation.ts     # NAV_LINKS, FOOTER_*_LINKS arrays
│   └── index.ts          # Barrel export
│
├── content/              # Page content data (text, copy, FAQs)
│   ├── home.ts           # HOME_CONTENT
│   ├── about.ts          # ABOUT_CONTENT
│   ├── services.ts       # SERVICES_CONTENT (FAQs, header)
│   ├── servicesCatalog.ts# SERVICES_CATALOG (card data)
│   ├── guards.ts         # GUARDS_CONTENT
│   ├── contact.ts        # CONTACT_CONTENT
│   └── index.ts          # Barrel export
│
├── hooks/                # Custom reusable React hooks
│   ├── useScrollPosition.ts
│   ├── useMediaQuery.ts
│   ├── useIntersectionObserver.ts
│   ├── useDebounce.ts
│   └── index.ts
│
├── modules/
│   ├── admin/            # Placeholder — future admin panel
│   └── public/           # Public-facing website
│       ├── components/
│       │   ├── common/   # Shared layout components
│       │   │   ├── Navbar.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Loader.tsx
│       │   │   ├── SEO.tsx
│       │   │   ├── ScrollToTop.tsx
│       │   │   ├── ErrorBoundary.tsx
│       │   │   └── index.ts
│       │   ├── ui/       # Reused UI primitives (≥2 usages)
│       │   │   ├── PageHero.tsx      # Hero on interior pages
│       │   │   ├── SectionHeader.tsx # Badge + h2 + subtitle
│       │   │   ├── EmptyState.tsx    # Empty list state
│       │   │   ├── ErrorState.tsx    # Fetch error state
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── layouts/
│       │   ├── MainLayout.tsx        # Navbar + Outlet + Footer
│       │   └── index.ts
│       ├── pages/
│       │   ├── errors/               # Error pages
│       │   │   ├── Forbidden.tsx     # 403
│       │   │   ├── ServerError.tsx   # 500
│       │   │   └── Maintenance.tsx
│       │   ├── Home.tsx
│       │   ├── About.tsx
│       │   ├── Services.tsx
│       │   ├── Guards.tsx
│       │   ├── Contact.tsx
│       │   ├── NotFound.tsx          # 404
│       │   └── index.ts
│       ├── routes/
│       │   ├── AppRoutes.tsx         # All routes (lazy-loaded)
│       │   └── index.ts
│       ├── styles/                   # CSS files (unchanged)
│       └── index.ts
│
├── services/             # API service layer
│   ├── api.ts            # Axios instance (reads from env.ts)
│   ├── contactService.ts # submitInquiry()
│   ├── guardService.ts   # getGuardsList()
│   └── index.ts
│
├── styles/
│   └── theme.ts          # Typed JS mirror of CSS variables
│
├── types/                # All TypeScript type definitions
│   ├── common.ts         # LoaderProps, SEOProps, EmptyStateProps, etc.
│   ├── company.ts        # CompanyConfig and nested types
│   ├── contact.ts        # InquiryPayload, SubmitResponse
│   ├── content.ts        # All page content block interfaces
│   ├── guard.ts          # GuardProfile
│   ├── navigation.ts     # NavLink
│   ├── service.ts        # ServiceCatalogItem, ServicePreviewCard
│   └── index.ts          # Barrel re-export from all type files
│
├── utils/                # Pure utility functions
│   ├── cn.ts             # className merge utility
│   ├── formatDate.ts     # Date display formatting
│   ├── formatPhone.ts    # Phone number formatting
│   ├── iconResolver.ts   # String → LucideIcon mapper
│   ├── scroll.ts         # scrollToTop, scrollToElement
│   ├── validators.ts     # isValidEmail, isValidPhone, etc.
│   └── index.ts
│
├── App.tsx               # Root component (ErrorBoundary + BrowserRouter)
├── main.tsx              # ReactDOM entry point
└── vite-env.d.ts         # Vite client types + image module declarations
```

---

## Naming Conventions

| Category | Convention | Example |
|---|---|---|
| Components | PascalCase | `Navbar.tsx`, `SectionHeader.tsx` |
| Hooks | camelCase + `use` prefix | `useScrollPosition.ts` |
| Types / Interfaces | PascalCase, no `I` prefix | `GuardProfile`, `NavLink` |
| Constants | UPPER_SNAKE_CASE | `ROUTES`, `NAV_LINKS`, `HOME_CONTENT` |
| Enums | PascalCase | (none yet) |
| Utility functions | camelCase | `formatPhone`, `scrollToTop` |
| CSS files | kebab-case | `global.css`, `home.css` |

---

## Import Conventions

Always use the `@/` path alias for cross-directory imports.

```typescript
// ✅ Correct
import { Navbar } from "@/modules/public/components";
import { ROUTES } from "@/constants";
import { HOME_CONTENT } from "@/content";

// ❌ Incorrect
import Navbar from "../../components/common/Navbar";
```

Use barrel imports when importing multiple items from the same directory:

```typescript
// ✅ Correct
import { PageHero, SectionHeader } from "@/modules/public/components/ui";

// ❌ Unnecessary repetition
import PageHero from "@/modules/public/components/ui/PageHero";
import SectionHeader from "@/modules/public/components/ui/SectionHeader";
```

> ⚠️ Exception: Lazy-loaded pages in `AppRoutes.tsx` use direct file imports,
> not barrel imports, because `lazy()` needs a dynamic import pointing to a single file.

---

## Quality Gate

Before merging any branch, all of the following must pass:

- [ ] `npm run build` — zero TypeScript errors
- [ ] `npm run lint` — zero oxlint warnings/errors
- [ ] `npm run format:check` — zero Prettier formatting violations
- [ ] No `console.log` left in production code
- [ ] No `TODO` or `FIXME` comments without a linked issue
- [ ] All pages render correctly at all 6 routes
- [ ] Contact form submits and shows success state
- [ ] Guards page loads mock cards correctly
- [ ] No React warnings in browser console
