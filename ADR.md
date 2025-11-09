# ADR: Virtualized Contacts List with Keyboard Navigation (Advanced)

## Status

Accepted

## Context

We must display **10,000+ contacts** with excellent UX while supporting:

- Multi-field search (name, email, phone, company, username)
- Sorting (A→Z, Z→A) across many fields
- Pagination with user-selectable page sizes (10, 25, 100, 1000, 100000)
- Keyboard accessibility & selection (arrow keys, Enter)
- Smooth virtualized scrolling
- Per-contact Tasks page (create / read / update / delete / toggle) with validation and error UI
- Mobile & desktop responsiveness
- Test coverage: unit tests + Playwright e2e

Rendering everything at once would break performance. We must virtualize, debounce searches, and keep selection + pages synchronized.

---

## Decision

- Use **react-virtuoso** for virtualization (smooth scrolling, large lists).
- Implement `useContacts` hook to handle:
  - Loading/generating large datasets (mock or remote)
  - Debounced multi-field search
  - Multi-field sorting and direction
  - Pagination + per-page dropdown options
  - Selected index and keyboard navigation sync
  - Exposed API usable by UI and tests
- Implement `useTasks` hook to:
  - Store tasks in localStorage for quick dev persistence
  - Provide create, update, delete, toggle operations and byContact lookup
  - Return structured validation errors for UI
- Keyboard support:
  - ArrowUp / ArrowDown — move selection within the current paginated/virtual window
  - ArrowLeft / ArrowRight — navigate pages
  - Enter — open selected contact (navigate to Tasks)
  - Home/End — jump to start/end of current page
  - Selection is scrolled into view (via react-virtuoso API)
- UX:
  - Debounced search (300ms) with query highlighting in UI optionally
  - Search filters for specific fields (dropdown or `field:value` syntax)
  - Per-page options in dropdown: `[10, 25, 100, 1000, 100000]`
  - When perPage is huge (e.g., 100000) virtualization still prevents rendering all items at once
  - Task creation validates required fields; UI shows red border + message on validation error

---

## Consequences

- **Performance**: Only visible items are rendered; enormous datasets supported.
- **Accessibility**: Keyboard-first navigation and focus management improves screen-reader friendliness.
- **Complexity**: Hook logic grows (filtering, sorting, keyboard sync) but remains testable & modular.
- **Testability**: Hook exposes deterministic API for unit tests; e2e will exercise keyboard flows, create/update/delete tasks, and pagination.

---

## Alternatives Considered

1. Render all contacts — rejected due to memory/CPU at 10k+.
2. Use `react-window` or `react-window-infinite-loader` — viable, but `react-virtuoso` chosen for easier variable-height support and simpler APIs.
3. Server-side pagination/search — recommended for real production datasets, but mock/local approach chosen for assessment & offline dev. Hook is written so server integration is simple later.

---

## Implementation Notes

- Keep page and selection synchronized. When user changes page, selectedIndex must be clamped into new page range.
- Keyboard handlers should `preventDefault()` to avoid browser scroll interfering with virtualization.
- Expose explicit methods to programmatically set selection, goToPage, setPerPage, setSort, setQuery for test automation.
- Provide comprehensive unit tests for `useContacts` and `useTasks` and e2e Playwright tests for the full flow.
