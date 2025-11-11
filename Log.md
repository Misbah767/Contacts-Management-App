# LOG.md — Development Timeline & Work Notes

## Phase 1 — Setup & Planning (Hour 0–2)

- Initialized Next.js 14 project with TypeScript and Tailwind CSS.
- Configured ESLint + Prettier for code consistency.
- Created initial folder structure (`app/`, `components/`, `lib/`, `tests/`).
- Added `layout.tsx` and `page.tsx` for base layout and navigation.
- Planned architecture for Contacts → Tasks flow using App Router.

---

## Phase 2 — Contacts Module (Hour 2–7)

- Implemented `generateContacts.ts` using **faker-js** to produce 10k+ mock contacts.
- Built `useContacts` hook handling search, sort, and pagination.
- Integrated **virtualized rendering** with `react-virtuoso` for smooth performance.
- Added full **keyboard navigation** (Up/Down for list, Left/Right for pages, Enter for select).
- Enhanced accessibility using proper ARIA roles (`role="listbox"`, `role="option"`).

---

## 🧩 Phase 3 — Tasks Module (Hour 7–12)

- Created dynamic route `/tasks/[contactid]/page.tsx`.
- Developed `useTasks` hook for task CRUD (add, edit, toggle, delete).
- Implemented **optimistic UI** with simulated API delays and failure handling.
- Added empty/error states and retry option for better UX.
- Integrated validation to prevent empty or duplicate tasks.

---

## Phase 4 — Reusable Components & UI Enhancements (Hour 12–15)

- Extracted reusable UI elements: `Button`, `Input`, `Loader`, and modals.
- Applied **Tailwind CSS** for a clean and consistent interface.
- Improved overall layout responsiveness and smooth scroll behavior.
- Added subtle focus outlines for accessibility and keyboard clarity.

---

## Phase 5 — Testing & Final Polish (Hour 15–19)

- Added **Jest + React Testing Library** unit tests for hooks and components.
- Added **Playwright E2E** test simulating full user flow (Contacts → Tasks CRUD).
- Verified keyboard navigation and a11y behavior.
- Updated `README.md` and `ADR.md` with structure, decisions, and trade-offs.
- Performed final review and performance check (virtualized rendering, memoization).

---

## ✅ Phase 6 — Wrap-up & Submission (Hour 19–20)

- Ran final lint and test checks.
- Cleaned up unused files and optimized imports.
- Prepared final ZIP + GitHub repository.
- Verified all requirements met:
  - ✅ 10k+ contacts virtualization
  - ✅ CRUD for tasks
  - ✅ Optimistic UI + error handling
  - ✅ Accessibility + keyboard navigation
  - ✅ Jest + Playwright tests
  - ✅ ADR.md, README.md, LOG.md included

---

## ⚖️ Trade-offs & Reflections

- Focused on **performance and usability** within limited time.
- Chose **in-memory simulation** over a backend for simplicity and speed.
- Prioritized clean modular design and accessibility.
- Completed within **~20 hours**, demonstrating efficient planning and execution.
