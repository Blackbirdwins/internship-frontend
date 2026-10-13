# Internship Frontend - React, UI/UX & Mobile

A complete 10-day frontend internship journey covering **HTML/CSS fundamentals → Vanilla JavaScript → React.js → React Native (Expo) → Production Capstone App**.

Each day builds on the previous, ending with a full-featured cross-platform mobile/web application.

---

## 📅 Progress Overview

| Day | Topic | Tech | Folder |
|-----|-------|------|--------|
| 1 | Personal Portfolio | HTML, CSS | `Day 1/portfolio day 1` |
| 2 | Vanilla JS Task Manager | JavaScript | `Day 2/Advanced Vanilla JavaScript Task Manager` |
| 3 | React UI Playground | React + Vite | `Day 3/react-ui-playground` |
| 4 | Advanced React Playground | React + Router | `Day 4/react-ui-playground` |
| 5 | Admin CRUD | React + Context | `Day 5/admin-crud` |
| 6 | Admin Dashboard | React + Recharts | `Day 6/admin-dashboard` |
| 7 | React Native Mobile App (basic) | React Native + Expo | `Day 7/anas-mobile` |
| 8 | React Native Mobile App (enhanced) | React Native + Expo | `Day 8/anas-mobile` |
| 9 | Profile Manager | React Native + Expo | `Day 9/profile-manager` |
| 10 | **Capstone App** ⭐ | React Native + Expo | `Day 10/capstone-app` |

---

# 📘 Day-by-Day Breakdown

## 📘 Day 1 — Personal Portfolio

**Goal**: Build a responsive personal portfolio from scratch using pure HTML/CSS.

**Tasks Completed**:
- Built a semantic HTML5 structure (header, main, footer, sections)
- Modern CSS3 layout with Flexbox and Grid
- Responsive design with media queries (mobile / tablet / desktop)
- Custom CSS (no frameworks like Bootstrap or Tailwind)
- Sections: Hero, About, Skills, Projects, Contact
- Smooth scroll + hover interactions
- Custom color palette + typography system

**Folder**: `Day 1/portfolio day 1/`

**Files**:
- `index.html` — Main page structure
- `style.css` — All styling + responsive rules

**Key Learning**:
- Semantic HTML5 tags
- CSS Box Model
- Flexbox + Grid layouts
- Media queries for responsiveness
- No-framework pure CSS approach

---

## 📘 Day 2 — Advanced Vanilla JavaScript Task Manager

**Goal**: Build a full-featured task manager using **pure JavaScript** (no React).

**Tasks Completed**:
- Complete Task Manager with CRUD operations
- **localStorage** persistence (tasks survive browser refresh)
- **API module** integration for external data fetching
- **Analytics module** for task statistics
- Modular code structure:
  - `render.js` — UI rendering logic
  - `storage.js` — localStorage handling
  - `validation.js` — Form validation
  - `utils.js` — Helper functions
  - `api.js` — External API integration
  - `analytics.js` — Task statistics
  - `main.js` — Entry point
- Configured **ESLint** + **Prettier** for code quality
- Task filters (all / active / completed)
- Search + sort functionality

**Folder**: `Day 2/Advanced Vanilla JavaScript Task Manager Day 2/`

**Key Learning**:
- ES6+ features (arrow functions, destructuring, modules)
- DOM manipulation
- Event delegation
- localStorage API
- Fetch API
- Modular architecture in vanilla JS

---

## 📘 Day 3 — React UI Playground & Component Library

**Goal**: Learn React fundamentals by building a reusable component library.

**Tasks Completed**:
- Set up a **React project with Vite** (fast build tool)
- Built a reusable component library from scratch:
  - **Inputs**: `Button`, `Input`, `Dropdown`
  - **Display**: `Avatar`, `Badge`, `Card`, `Loader`
  - **Overlays**: `Modal`, `Toast`, `Accordion`, `Tabs`
  - **States**: `EmptyState`, `ErrorState`
  - **Complex**: `Counter`, `LoginForm`, `TodoList`
- Created a custom `components.css` for the library
- Built a working **Login Page** using the library
- Organized folder structure (`components/`, `pages/`, `styles/`)

**Folder**: `Day 3/react-ui-playground/`

**Key Learning**:
- React basics (JSX, components, props)
- `useState` and `useEffect` hooks
- Component composition
- Props drilling
- Vite build tool

---

## 📘 Day 4 — Advanced React: Routing, Hooks & Layouts

**Goal**: Learn multi-page navigation with React Router and custom hooks.

**Tasks Completed**:
- Implemented **React Router DOM** for multi-page navigation
- Created **4 custom hooks**:
  - `useDebounce` — delay rapid updates (search bar optimization)
  - `useDocumentTitle` — dynamically update page title
  - `useFetch` — reusable data fetching hook
  - `useLocalStorage` — persist state in browser storage
- Built reusable **Layouts**:
  - `MainLayout` — for public pages
  - `DashboardLayout` — for admin/dashboard routes
- Built multiple **Pages**:
  - **Public**: Home, About, Products, ProductDetails, NotFound
  - **Dashboard**: Dashboard, Profile, Settings, Analytics, Overview
- Integrated mock data service + API service (`api.js`)

**Folder**: `Day 4/react-ui-playground/`

**Key Learning**:
- React Router v6 (routes, nested routes, params)
- Custom hooks (reusable logic)
- Layout patterns
- Code splitting / lazy loading
- API abstraction

---

## 📘 Day 5 — Admin CRUD Dashboard

**Goal**: Build a full CRUD admin app with global state management.

**Tasks Completed**:
- Built a full **Admin CRUD** application
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
- Implemented **client-side validation** (`validate.js`)
- Used `useLocalStorage` hook for data persistence

**Folder**: `Day 5/admin-crud/`

**Key Learning**:
- Context API + `useReducer` pattern
- Reducer design (action types, dispatch)
- Form validation
- Modal / dialog patterns
- Protected routes

---

## 📘 Day 6 — Advanced Admin Dashboard

**Goal**: Build a feature-rich admin dashboard with data visualization and animations.

**Tasks Completed**:
- Built a feature-rich **Admin Dashboard** with modern UI
- Built components:
  - `Charts` — data visualization (Recharts)
  - `CommandPalette` — keyboard shortcut palette (Cmd/Ctrl+K)
  - `DataTable` — sortable, filterable table
  - `ErrorBoundary` — graceful error handling
  - `MotionWrappers` — reusable Framer Motion animations
  - `RetryState` — retry UI for failed fetches
  - `Sidebar` — collapsible navigation
  - `StatCard` — KPI cards
  - `Topbar` — header with search + user menu
  - `UI.jsx` — shared UI primitives
- Built pages: **Dashboard, Analytics, Products, Users, Settings**
- Added smooth **Framer Motion** animations
- Wrote **unit tests** using **Vitest + React Testing Library**:
  - `StatCard.test.jsx`
  - `utils.test.js`
  - Test setup in `setup.js`
- Configured Vitest for testing

**Folder**: `Day 6/admin-dashboard/`

**Key Learning**:
- Data visualization (charts)
- Command palette pattern (Cmd+K)
- Error boundaries
- Framer Motion animations
- Unit testing setup
- Advanced table patterns

---

## 📘 Day 7 — React Native Mobile App (Basic)

**Goal**: Get started with React Native + Expo for cross-platform mobile development.

**Tasks Completed**:
- Built a cross-platform mobile app using **React Native + Expo**
- Set up navigation (Stack + Tabs)
- Built screens: Home, Details, Profile
- Used React Native core components:
  - `View`, `Text`, `Image`, `Pressable`, `ScrollView`, `FlatList`
- Styled with `StyleSheet`
- Added app assets (icons, splash screen, adaptive icons)
- Configured `app.json` for Expo
- Basic theme system

**Folder**: `Day 7/anas-mobile/`

**Key Learning**:
- React Native fundamentals
- Expo workflow (start, run, build)
- Mobile navigation patterns
- Native components vs. web
- Styling in React Native (no CSS)
- `FlatList` for optimized lists

---

## 📘 Day 8 — React Native Mobile App (Enhanced)

**Goal**: Add advanced features and polish to the mobile app.

**Tasks Completed**:
- Enhanced the mobile app from Day 7
- **AsyncStorage** integration for data persistence
- **API integration** with loading + error states
- **Pull-to-refresh** on lists
- **Custom components**: Avatar, Card, Badge, EmptyState
- **Toast notifications** for user feedback
- **Form validation** with error display
- **Icon system** using vector icons
- **Safe area** handling for notches
- Better navigation (nested stacks)

**Folder**: `Day 8/anas-mobile/`

**Key Learning**:
- AsyncStorage for local persistence
- API integration in RN
- Custom component design
- Form patterns in RN
- Platform-specific styling
- Better navigation architecture

---

## 📘 Day 9 — Profile Manager with Native Features

**Goal**: Build a profile management app showcasing native device features.

**Tasks Completed**:
- **Image picker** integration (gallery access)
- **Permission handling** (camera roll / photo library)
- **Form fields** — editable profile (name, phone, bio, address)
- **Avatar upload** with preview + crop
- **Settings screen** with theme toggle
- **AsyncStorage** for persisting profile data
- **Modular architecture** with contexts
- **Native-feel UX** (bottom sheets, native alerts)
- Config for native permissions in `app.json`

**Folder**: `Day 9/profile-manager/`

**Key Learning**:
- Native device APIs (image picker)
- Permission flows (request → grant → use)
- File/URI handling
- Native dialogs and modals
- Advanced form patterns
- Expo permission config

---

## 📘 Day 10 — Capstone App (Notes + Favorites + API + Auth) ⭐

**Goal**: Integrate everything learned in Day 1-9 into a production-grade capstone app.

**Tasks Completed**:

### 🔐 Authentication
- **Mock login/register** with 3 demo users (`anas`, `ali`, `guest`)
- **Session persistence** in AsyncStorage
- Role-based UI (`admin`, `user`, `viewer`)
- Auth-gated navigation (login → main app)

### 🧭 Complete Navigation
- **Stack navigator** — root with auth gate
- **Bottom tabs** — Home, Notes, Explore, Saved (with count badges)
- **Drawer menu** — user stats, quick nav, theme toggle, logout
- Custom glass tab bar + responsive layout

### 📝 Local CRUD (Notes)
- Create, Read, Update, Delete notes
- **Pin/unpin** notes (pinned section)
- **Accent color picker** (4 colors per note)
- Persisted in AsyncStorage
- Search-friendly list with empty states

### 🌐 API Integration
- Product listing from **DummyJSON**
- **Search + category filter**
- Product **details page** with description, price, stock, rating
- Quantity picker (1-10)
- **Responsive grid** — 2/3/4/5 columns by width
- Error handling + Retry button
- Loading spinner + timeout (10s)

### ❤️ Favorites / Bookmarks
- Tap heart on any product to save
- **Badge count** on tab + header
- Persisted across sessions
- Clear all option

### 🎨 Theme System
- **Dark / Light** theme toggle
- **5 Neon accents** (Cyber, Plasma, Magma, Toxic, Gold)
- **Glassmorphism** headers + tab bars
- Persisted theme choice
- Instant switch + smooth transitions

### 👤 Profile Native Features
- **Avatar image picker** (gallery)
- **Permissions** flow (request → grant)
- Editable fields (phone, bio)
- Initials fallback

### ✨ Production UX Polish
- **Toast notifications** (success / error / warning / info)
- **Empty states** for every list
- **Loading spinners** + skeleton-style placeholders
- **Hover effects** on web (glow, lift, scale)
- **Animated number counters** for stats
- **Micro-animations** (spring transitions)

### ⚡ Performance
- `FlatList` optimization (`initialNumToRender`, `windowSize`, `removeClippedSubviews`)
- `React.memo` on heavy components (`ProductCard`)
- `useCallback` on data loaders
- Native driver animations

### 📱 Responsive Design
- Custom `useResponsive` hook with breakpoints
- Mobile (2-col) → Tablet (3-col) → Desktop (4-col) → Wide (5-col)
- Content max-width **1000px** centered on desktop
- 2-column product details layout on desktop
- Adaptive padding + spacing

**Folder**: `Day 10/capstone-app/`

**Tech Stack**:
- React Native + Expo SDK 57
- React Navigation 7 (Stack + Tabs + Drawer)
- Context API (5 contexts: Auth, Notes, Favorites, Theme, Toast)
- AsyncStorage
- Fetch API with timeout
- expo-blur, expo-linear-gradient, expo-image-picker

**File Count**: 27 files
- 11 reusable components
- 5 context providers
- 10 screens
- 1 custom hook
- 2 utilities

**See**: [`Day 10/capstone-app/README.md`](./Day%2010/capstone-app/README.md) for full details.

**Key Learning**:
- Integrating all concepts (auth + navigation + CRUD + API + theming + responsive)
- Modular architecture at scale
- Production polish (loading, errors, empty states)
- Custom design system (no UI library)
- Cross-platform responsive design

---

# 🛠️ Tech Stack (All Days)

| Layer | Technologies |
|-------|--------------|
| **Core** | HTML5, CSS3, JavaScript (ES6+) |
| **Frontend Frameworks** | React.js, React Native (Expo) |
| **Build Tools** | Vite, Expo CLI |
| **Routing** | React Router DOM v6, React Navigation 7 |
| **State Management** | Context API + Reducers, Hooks |
| **Storage** | localStorage, AsyncStorage |
| **Styling** | Custom CSS, StyleSheet, Design System |
| **Animation** | Framer Motion, Animated API |
| **Testing** | Vitest, React Testing Library |
| **API** | Fetch API, DummyJSON |
| **Code Quality** | ESLint, Prettier |
| **Native Features** | expo-image-picker, expo-blur, expo-linear-gradient |
| **Dev Tools** | Git, GitHub, VS Code |

---

# 📁 Repository Structure
internship-frontend/
├── Day 1/portfolio day 1/
├── Day 2/Advanced Vanilla JavaScript Task Manager Day 2/
├── Day 3/react-ui-playground/
├── Day 4/react-ui-playground/
├── Day 5/admin-crud/
├── Day 6/admin-dashboard/
├── Day 7/anas-mobile/
├── Day 8/anas-mobile/
├── Day 9/profile-manager/
├── Day 10/capstone-app/ ⭐ Main project
├── practice/
├── .gitignore
├── package-lock.json
└── README.md

text

---

# 🎯 Capstone Highlights (Day 10)

- 🔐 Mock Auth + Persistent Sessions
- 📝 Local Notes CRUD with Pin
- 🌐 API Integration (DummyJSON)
- ❤️ Favorites with Badges
- 👤 Profile with Image Picker
- 🎨 Dark/Light + 5 Neon Accents
- 📱 Fully Responsive (mobile → desktop)
- ✨ Glassmorphism + Animations
- 🍞 Toast Notifications
- ⚡ Optimized Lists + Hooks

---

# 👨‍💻 Author

**Anas Khan**
Frontend Internship · 2026
GitHub: [@Blackbirdswins](https://github.com/Blackbirdswins)

---

*Internship completed successfully — Day 1 through Day 10.*