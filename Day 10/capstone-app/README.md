# ⚡ Capstone App — Modern React Native + Expo

> **Internship Front-End Final Deliverable** · Day 10 · Made by Anas Khan

A production-grade mobile-first app with **gamer-inspired modern UI**, complete auth, local CRUD, API integration, dark/light theme system, and full responsive design for **mobile, tablet, and desktop**.

---

## 🎯 Features

### Core
- 🔐 **Mock Authentication** — Login + Register with persistent session (AsyncStorage)
- 📝 **Notes CRUD** — Create, Read, Update, Delete, Pin notes locally
- 🌐 **API Integration** — Product listing from DummyJSON with search + details
- ❤️ **Favorites** — Bookmark products, persistent across sessions
- 👤 **Profile** — Avatar picker (image library permissions) + editable fields
- ⚙️ **Settings** — Theme toggle, data management, account actions

### UI / UX
- 🌗 **Dark / Light Theme** with system persistence
- 🎨 **5 Neon Accents** (Cyber, Plasma, Magma, Toxic, Gold)
- ✨ **Glassmorphism** headers + tab bars (blur effects)
- 💫 **Hover effects** (web): buttons glow, cards lift, tabs highlight
- 📱 **Fully Responsive** — grid adapts 2 / 3 / 4 / 5 columns by width
- 🎬 **Animations** — animated number counters, spring transitions
- 🍞 **Toast notifications** — success / error / warning / info
- 📊 **Empty states** — every list has a friendly empty state
- ⚡ **Skeleton loaders** for API data

### Navigation
- **Stack** — root navigator (auth gate)
- **Bottom Tabs** — Home, Notes, Explore, Saved (with count badges)
- **Drawer** — side menu with user stats + quick nav + theme toggle

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React Native + Expo SDK 57 |
| Navigation | React Navigation 7 (Stack + Tabs + Drawer) |
| State | React Context API (Auth, Notes, Favorites, Theme, Toast) |
| Storage | AsyncStorage |
| Networking | Fetch API with timeout + abort |
| UI | Custom design system (no UI library — full control) |
| Effects | expo-blur, expo-linear-gradient, expo-image-picker |
| Animations | React Native Animated API |

---

## 📁 Project Structure
