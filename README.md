# Internship Frontend - React, UI/UX & Mobile

This repository contains my daily frontend tasks (Day 1-7) completed during a frontend internship. It shows my progression from HTML/CSS fundamentals to advanced React applications, admin dashboards, and a React Native mobile app.

## 🚀 Tech Stack
- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Frameworks:** React.js, React Native (Expo)
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **State Management:** Context API, Reducers
- **Styling & Animation:** Custom CSS, Framer Motion
- **Testing:** Vitest, React Testing Library
- **Linting:** ESLint, Prettier

---

## 📅 Day 1: Personal Portfolio

**Tasks Completed:**
- Built a personal portfolio page from scratch.
- Practiced semantic HTML5 and modern CSS3 layouts.
- Focused on responsive design principles.
- Wrote custom CSS from scratch (no frameworks).

**Folder:** `Day 1/portfolio day 1/`

**Files:** `index.html`, `style.css`

---

## 📅 Day 2: Advanced Vanilla JavaScript Task Manager

**Tasks Completed:**
- Built a full Task Manager using **pure JavaScript** (no frameworks).
- Implemented **LocalStorage** for persistence.
- Integrated an **API module** for external data fetching.
- Added an **Analytics** module for task insights.
- Created modular code structure:
  - `render.js` — UI rendering
  - `storage.js` — LocalStorage handling
  - `validation.js` — Form validation
  - `utils.js` — Helper functions
  - `api.js` — API integration
  - `analytics.js` — Task statistics
  - `main.js` — Entry point
- Configured **ESLint** and **Prettier** for code quality (`.prettierrc`, `eslint.config.js`).

**Folder:** `Day 2/Advanced Vanilla JavaScript Task Manager Day 2/`

---

## 📅 Day 3: React UI Playground & Component Library

**Tasks Completed:**
- Set up a React project with **Vite**.
- Built a reusable component library from scratch:
  - **Inputs:** `Button`, `Input`, `Dropdown`
  - **Display:** `Avatar`, `Badge`, `Card`, `Loader`
  - **Overlays:** `Modal`, `Toast`, `Accordion`, `Tabs`
  - **States:** `EmptyState`, `ErrorState`
  - **Complex:** `Counter`, `LoginForm`, `TodoList`
- Created a custom `components.css` for the library.
- Built a `Login` page.

**Folder:** `Day 3/react-ui-playground/`

---

## 📅 Day 4: React Routing, Hooks & Layouts

**Tasks Completed:**
- Implemented **React Router DOM** for multi-page navigation.
- Created **4 custom hooks**:
  - `useDebounce` — delay rapid updates (search bar optimization)
  - `useDocumentTitle` — dynamically update page title
  - `useFetch` — reusable data fetching hook
  - `useLocalStorage` — persist state in browser storage
- Built reusable **Layouts:**
  - `MainLayout` — for public pages
  - `DashboardLayout` — for admin/dashboard routes
- Built multiple **Pages:**
  - Public: Home, About, Products, ProductDetails, NotFound
  - Dashboard: Dashboard, Profile, Settings, Analytics, Overview
- Integrated a mock data service (`productService.js`) and API service (`api.js`).

**Folder:** `Day 4/react-ui-playground/`

---

## 📅 Day 5: Admin CRUD Dashboard

**Tasks Completed:**
- Built a full **Admin CRUD** application.
- Used **Context API + Reducers** for global state:
  - `AuthContext` — login, logout, current user
  - `ThemeContext` — dark/light mode
  - `ToastContext` — notification system
  - `itemReducer` — item management logic
- Built components:
  - `ConfirmDialog` — confirmation for delete actions
  - `ItemForm` — create/edit form with validation
  - `Modal` — reusable modal
  - `LoginPage` — authentication UI
- Implemented client-side validation (`validate.js`).
- Used `useLocalStorage` hook for data persistence.

**Folder:** `Day 5/admin-crud/`

---

## 📅 Day 6: Advanced Admin Dashboard

**Tasks Completed:**
- Built a feature-rich **Admin Dashboard** with modern UI.
- Built components:
  - `Charts` — data visualization
  - `CommandPalette` — keyboard shortcut palette (Cmd/Ctrl+K)
  - `DataTable` — sortable, filterable table
  - `ErrorBoundary` — graceful error handling
  - `MotionWrappers` — reusable Framer Motion animations
  - `RetryState` — retry UI for failed fetches
  - `Sidebar` — collapsible navigation
  - `StatCard` — KPI cards
  - `Topbar` — header with search and user menu
  - `UI.jsx` — shared UI primitives
- Built pages: Dashboard, Analytics, Products, Users, Settings.
- Added smooth **Framer Motion** animations.
- Wrote **unit tests** using Vitest + React Testing Library:
  - `StatCard.test.jsx`
  - `utils.test.js`
  - Test setup in `setup.js`
- Configured Vite for testing.

**Folder:** `Day 6/admin-dashboard/`

---

## 📅 Day 7: React Native Mobile App (Anas Mobile)

**Tasks Completed:**
- Built a cross-platform mobile app using **React Native + Expo**.
- Implemented **Stack Navigation** with `AppNavigator.jsx`.
- Built **4 screens:**
  - `HomeScreen` — landing/feed
  - `ListingScreen` — list of products
  - `DetailsScreen` — detailed view
  - `ProfileScreen` — user profile
- Built reusable mobile components:
  - `Badge`, `Button`, `Card`, `Header`, `Input`, `ProductCard`, `ErrorBoundary`
- Custom utilities:
  - `theme.js` — colors, spacing, typography
  - `platform.js` — platform-specific helpers (iOS/Android)
  - `logger.js` — centralized logging
  - `useResponsive.js` — responsive layout hook
  - `data.js` — mock data
- Added app assets (icons, splash screen, adaptive icons).
- Configured `app.json` for Expo.

**Folder:** `Day 7/anas-mobile/`

---

## 🎮 Practice Projects

### JavaScript Game
A small browser-based game built to practice:
- DOM manipulation
- Game loop logic
- Event handling

**Folder:** `practice/`

**Files:** `index.html`, `style.css`, `game.js`

---

## 🛠️ How to Run Any Project

### For Web Projects (Day 1-6):

1. Navigate to the project folder:
   ```bash
   cd "Day X/project-folder"
