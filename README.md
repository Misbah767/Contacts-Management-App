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

## ⚙️ Setup & Run Locally

git clone https://github.com/yourusername/contacts-management-app.git
cd contacts-management-app

# 2️⃣ Install dependencies

npm install

# 3️⃣ Run development server

npm run dev
Visit http://localhost:3000

bash
Copy code

# Unit tests (Jest + React Testing Library)

npm run test

# End-to-End tests (Playwright)

npm run test:e2e

Author

Misbah Ilyas
