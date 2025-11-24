# 🚀 Redux Todo Application - E-commerce Style

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-purple?style=for-the-badge&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)

**A modern, feature-rich todo application demonstrating advanced Redux state management patterns with an e-commerce-inspired architecture**

[Live Demo](#) • [Documentation](#features) • [Installation](#-quick-start)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📸 Features Showcase](#-features-showcase)
- [🏗️ Architecture & Redux Patterns](#️-architecture--redux-patterns)
- [📁 Project Structure](#-project-structure)
- [💡 Key Learnings](#-key-learnings)
- [🔧 Installation](#-installation)

---

## 🎯 Project Overview

This project is a **production-ready todo application** that demonstrates professional Redux state management patterns in a Next.js environment. Inspired by e-commerce architectures, it features advanced filtering, sorting, categorization, and real-time statistics - perfect for showcasing modern frontend development skills.

### 🎓 **Why This Project?**

- ✅ **Real-world Redux patterns** - Learn state management through practical implementation
- ✅ **Type-safe architecture** - Full TypeScript coverage with zero `any` types
- ✅ **Modern Next.js** - Built with App Router and React Server Components
- ✅ **E-commerce-inspired** - Filtering, sorting, and categorization similar to product catalogs
- ✅ **Production-ready** - Clean code, proper error handling, and optimized performance

---

## ✨ Key Features

### 🎨 **E-commerce Style Features**

| Feature | Description |
|---------|-------------|
| **📦 Categorization** | Organize todos into 5 categories: Work, Personal, Shopping, Health, Education |
| **⚡ Priority System** | Three-tier priority levels (High, Medium, Low) with visual indicators |
| **📊 Status Tracking** | Track progress: Pending → In Progress → Completed |
| **🔍 Advanced Filtering** | Filter by category, priority, status, and full-text search |
| **🔄 Smart Sorting** | Sort by date, priority, due date, or title (ascending/descending) |
| **📈 Analytics Dashboard** | Real-time statistics with category and priority breakdowns |
| **📅 Due Dates** | Set and track due dates with visual indicators |
| **🌙 Dark Mode** | Automatic dark mode support based on system preferences |
| **📱 Responsive Design** | Beautiful UI optimized for desktop, tablet, and mobile |

### 🔐 **Type Safety & Best Practices**

- ✅ **Zero `any` types** - Fully typed with TypeScript
- ✅ **Memoized selectors** - Optimized performance with Redux Toolkit `createSelector`
- ✅ **Discriminated unions** - Type-safe action creators
- ✅ **Typed hooks** - Custom `useAppDispatch` and `useAppSelector`

---

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 16.0.3** - React framework with App Router
- **React 19.2** - Latest React with Server Components
- **TypeScript 5** - Full type safety throughout
- **Redux Toolkit 2.11** - Modern Redux with best practices
- **React Redux 9.2** - React bindings for Redux
- **Tailwind CSS 4** - Utility-first CSS framework

### Development Tools

- **ESLint** - Code quality and linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd redux-todo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application! 🎉

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📸 Features Showcase

### 🎯 **Statistics Dashboard**
Real-time analytics showing total todos, status breakdowns, and productivity metrics.

### 🔍 **Advanced Filtering System**
Filter todos by multiple criteria simultaneously:
- Category filter (Work, Personal, Shopping, Health, Education)
- Priority filter (High, Medium, Low)
- Status filter (Pending, In Progress, Completed)
- Full-text search across titles and descriptions

### 🔄 **Smart Sorting**
Sort todos by:
- **Created Date** - Most recent first
- **Priority** - High to low priority
- **Due Date** - Upcoming deadlines first
- **Title** - Alphabetical order

### 📝 **Todo Management**
- Create todos with rich metadata
- Inline editing with instant updates
- Status progression workflow
- Soft delete with confirmation
- Due date tracking

---

## 🏗️ Architecture & Redux Patterns

### **Redux Architecture**

This project demonstrates professional Redux patterns:

#### 1. **Store Configuration**
```typescript
// lib/store.ts
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
```

#### 2. **Slice with Actions**
```typescript
// lib/slices/todoSlice.ts
- addTodo          // Create new todo
- updateTodo       // Update existing todo
- deleteTodo       // Remove todo
- toggleTodoStatus // Cycle through statuses
- setFilter        // Update filters (type-safe)
- setSortBy        // Change sort field
- setSortOrder     // Change sort direction
- clearFilters     // Reset all filters
```

#### 3. **Memoized Selectors**
```typescript
// lib/selectors.ts
- selectFilteredAndSortedTodos  // Computed, filtered, and sorted list
- selectTodoStats               // Statistics with category/priority breakdowns
```

#### 4. **Typed Hooks**
```typescript
// lib/hooks.ts
- useAppDispatch()  // Typed dispatch function
- useAppSelector()  // Typed selector hook
```

### **Data Flow**

```
User Action → Component → Dispatch Action → Reducer → 
Update Store → Selector (memoized) → Component Re-render
```

---

## 📁 Project Structure

```
redux-todo/
├── app/
│   ├── layout.tsx          # Root layout with Redux Provider
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles with Tailwind
│
├── components/
│   ├── ReduxProvider.tsx   # Redux store provider
│   ├── TodoForm.tsx        # Todo creation form
│   ├── TodoItem.tsx        # Individual todo component
│   ├── TodoList.tsx        # Todo list container
│   ├── Filters.tsx         # Filtering & sorting UI
│   └── Stats.tsx           # Statistics dashboard
│
├── lib/
│   ├── store.ts            # Redux store configuration
│   ├── hooks.ts            # Typed Redux hooks
│   ├── selectors.ts        # Memoized selectors
│   └── slices/
│       └── todoSlice.ts    # Todo Redux slice
│
└── public/                 # Static assets
```

---

## 💡 Key Learnings

### **Redux Patterns Implemented**

1. **✅ Redux Toolkit Best Practices**
   - Using `createSlice` for actions and reducers
   - Proper state normalization
   - Immutable updates with Immer

2. **✅ Type Safety**
   - Discriminated unions for type-safe actions
   - Typed hooks for component integration
   - Zero `any` types throughout

3. **✅ Performance Optimization**
   - Memoized selectors with `createSelector`
   - Efficient re-renders with React Redux hooks
   - Optimized filtering and sorting algorithms

4. **✅ Modern React Patterns**
   - Server Components with Next.js App Router
   - Client Components where needed (`'use client'`)
   - Proper component composition

5. **✅ E-commerce Architecture**
   - Product-like data structures (todos as products)
   - Advanced filtering system
   - Sorting and categorization patterns
   - Analytics and statistics dashboard

---

## 🔧 Installation

### Detailed Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd redux-todo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - Next.js, React, React DOM
   - Redux Toolkit & React Redux
   - TypeScript and type definitions
   - Tailwind CSS and PostCSS

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📚 Technical Highlights

### **Type Safety**

- ✅ Fully typed Redux store with TypeScript
- ✅ Discriminated unions for type-safe filter actions
- ✅ Proper typing for all selectors and hooks
- ✅ Zero `any` types - 100% type coverage

### **Performance**

- ✅ Memoized selectors prevent unnecessary recalculations
- ✅ Efficient filtering with O(n) complexity
- ✅ Optimized sorting algorithms
- ✅ React Redux hooks for minimal re-renders

### **Code Quality**

- ✅ ESLint configuration for Next.js
- ✅ Consistent code formatting
- ✅ Proper component separation
- ✅ Clean architecture patterns

---

## 🎯 Use Cases

This application demonstrates skills in:

- ✅ **State Management** - Complex Redux patterns
- ✅ **TypeScript** - Advanced type safety
- ✅ **Next.js** - Modern React framework
- ✅ **UI/UX Design** - Professional, responsive interfaces
- ✅ **Performance** - Optimized selectors and re-renders
- ✅ **Best Practices** - Clean code and architecture

---

## 📖 Documentation

### Redux Concepts Explained

- **Store**: Centralized state container
- **Slice**: Actions and reducers in one place
- **Selectors**: Memoized data extraction
- **Hooks**: Typed React integration

### Component Architecture

- **Server Components**: Default in Next.js App Router
- **Client Components**: For interactive features with Redux
- **Component Composition**: Reusable, maintainable structure

---

## 🤝 Contributing

This is a showcase project, but contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX

---

## 📝 License

This project is open source and available for educational and portfolio purposes.

---

## 🔗 Links

- **Repository**: [GitHub](https://github.com)
- **Live Demo**: [Deployment URL]
- **Documentation**: [Full Docs](#)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ using Next.js, Redux Toolkit, TypeScript, and Tailwind CSS**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat-square&logo=github)](https://github.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green?style=flat-square)](https://portfolio.com)

---

**Showcasing modern frontend development with Redux state management** 🚀

</div>
