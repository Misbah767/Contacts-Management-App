# 📇 Contacts Management App

A high-performance **Next.js 14 + React (TypeScript)** application for managing contacts with **search**, **sort**, **pagination**, **virtualization**, and full **keyboard accessibility** — optimized to handle **10,000+ records** smoothly.

---

## 🚀 Features

- ⚡ **Efficient rendering** of 10,000+ contacts via [`react-virtuoso`](https://virtuoso.dev/) virtualization.
- 🔍 **Search** contacts by **name**, **email**, or **phone number**.
- ↕️ **Sort** contacts by **name**, **email**, or **company** (ascending/descending).
- 📄 **Pagination** with configurable items per page.
- ⌨️ **Keyboard navigation**:
  - **↑ / ↓** → Move selection within the list
  - **← / →** → Navigate pages
  - **Enter** → Select and open contact tasks
- 🧭 **Accessibility (a11y)**:
  - `role="listbox"` and `role="option"` for assistive technologies
  - Focused items automatically scrolled into view
- 🌀 **Smooth scrolling** for seamless keyboard UX.
- 📱 **Responsive design** — optimized for both mobile and desktop.

---

## 🧱 Tech Stack

| Category       | Tools                                     |
| -------------- | ----------------------------------------- |
| Framework      | **Next.js 14 (App Router)**               |
| Library        | **React 18+**, **TypeScript**             |
| Virtualization | [`react-virtuoso`](https://virtuoso.dev/) |
| Styling        | **Tailwind CSS**                          |
| Mock Data      | [`@faker-js/faker`](https://fakerjs.dev/) |
| Utilities      | **uuid** for unique IDs                   |
| Testing        | **Jest + RTL**, **Playwright**            |

---

## 🗂️ Project Structure

📦 contacts-management-app
│
├── 📁 app/ # Next.js App Router (main routes)
│ ├── 📁 contacts/ # Contacts page (search, sort, pagination, virtualization)
│ │ └── page.tsx # Contacts list page
│ │
│ ├── 📁 tasks/ # Tasks page (per contact)
│ │ └── [contactid]/page.tsx # Dynamic route for individual contact tasks
│ │
│ ├── page.tsx # Home page (main navigation)
│ ├── layout.tsx # Global layout (header/footer)
│ └── globals.css # Global Tailwind & base styles
│
├── 📁 src/ # Application source
│ ├── 📁 components/ # Reusable UI components
│ │ ├── 📁 AddTaskButton/ # "Add Task" button component
│ │ │ └── AddTaskButton.tsx
│ │ ├── 📁 CheckBox/ # Checkbox input component
│ │ ├── 📁 ContactItem/ # Single contact card in list
│ │ ├── 📁 DueDateModal/ # Modal for selecting task due date
│ │ ├── 📁 Input/ # Reusable text input component
│ │ ├── 📁 Loader/ # Loading spinner component
│ │ ├── 📁 TaskActions/ # Task action buttons (edit, delete, toggle)
│ │ └── 📁 TaskList/ # Renders list of tasks
│ │
│ ├── 📁 hooks/ # Custom hooks
│ │ ├── useContacts.ts # Hook for contact data, filtering, sort & pagination
│ │ └── useTasks.ts # Hook for managing tasks (CRUD, localStorage)
│ │
│ ├── 📁 lib/ # Core logic, scripts, and models
│ │ ├── 📁 models/ # TypeScript data models
│ │ │ ├── contactModel.ts # Contact model definition
│ │ │ └── taskModel.ts # Task model definition
│ │ │
│ │ ├── 📁 scripts/ # Utility scripts
│ │ │ └── generateData.ts # Generates 10,000+ mock contacts using faker
│ │ │
│ │ └── 📁 utils/ # Utility helpers
│ │ ├── simulateApi.ts # Simulated API delay/helper
│ │ ├── storage.ts # LocalStorage management helpers
│ │ └── tagsManager.ts # Tag management utilities
│
├── 📁 tests/ # Testing setup
│ ├── 📁 hooks/ # Hook unit tests (Jest + RTL)
│ │ └── useContacts.test.tsx
│ │
│ ├── 📁 pages/ # Page-level tests
│ │ └── home.test.tsx # Home page rendering and navigation tests
│ │
│ └── 📁 results/ # Playwright test results & reports
│ └── test-report/ # HTML or JSON reports
│
├── 📁 public/ # Static assets (icons, favicons, images)
│
├── jest.config.ts # Jest unit testing configuration
├── jest.setup.ts # Jest setup file (RTL config, mocks)
├── playwright.config.ts # Playwright E2E configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── postcss.config.js # PostCSS setup
├── eslint.config.js # ESLint rules and settings
├── package.json # Project metadata & dependencies
└── README.md # Project documentation

## ⚙️ Setup & Run Locally

```bash
# 1️⃣ Clone repository
git clone https://github.com/yourusername/contacts-management-app.git
cd contacts-management-app

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run development server
npm run dev
Visit 👉 http://localhost:3000

🧪 Testing
bash
Copy code
# Unit tests (Jest + React Testing Library)
npm run test

# End-to-End tests (Playwright)
npm run test:e2e
🧭 Future Enhancements
✅ CRUD operations for contacts

♿ Enhanced accessibility testing

🧩 Infinite scroll mode (optional replacement for pagination)

📊 Filter by company or tag

🧑‍💻 Author
Misbah Ilyas

```
