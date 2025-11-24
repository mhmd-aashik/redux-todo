import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Todo, TodoPriority } from "./slices/todoSlice";

const selectAllTodos = (state: RootState) => state.todos.todos;
const selectFilters = (state: RootState) => state.todos.filters;
const selectSortBy = (state: RootState) => state.todos.sortBy;
const selectSortOrder = (state: RootState) => state.todos.sortOrder;

export const selectFilteredAndSortedTodos = createSelector(
  [selectAllTodos, selectFilters, selectSortBy, selectSortOrder],
  (todos, filters, sortBy, sortOrder) => {
    // Filter todos
    const filtered = todos.filter((todo) => {
      if (filters.category !== "all" && todo.category !== filters.category) {
        return false;
      }
      if (filters.priority !== "all" && todo.priority !== filters.priority) {
        return false;
      }
      if (filters.status !== "all" && todo.status !== filters.status) {
        return false;
      }
      if (
        filters.searchQuery &&
        !todo.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !todo.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Sort todos
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === "priority") {
        const priorityOrder: Record<Todo["priority"], number> = {
          high: 3,
          medium: 2,
          low: 1,
        };
        aValue = priorityOrder[a.priority] ?? 0;
        bValue = priorityOrder[b.priority] ?? 0;
      } else if (sortBy === "dueDate") {
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      } else if (sortBy === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        // sortBy === "title"
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }
);

export const selectTodoStats = createSelector([selectAllTodos], (todos) => {
  return {
    total: todos.length,
    pending: todos.filter((t) => t.status === "pending").length,
    inProgress: todos.filter((t) => t.status === "in-progress").length,
    completed: todos.filter((t) => t.status === "completed").length,
    byCategory: {
      work: todos.filter((t) => t.category === "work").length,
      personal: todos.filter((t) => t.category === "personal").length,
      shopping: todos.filter((t) => t.category === "shopping").length,
      health: todos.filter((t) => t.category === "health").length,
      education: todos.filter((t) => t.category === "education").length,
    },
    byPriority: {
      high: todos.filter((t) => t.priority === "high").length,
      medium: todos.filter((t) => t.priority === "medium").length,
      low: todos.filter((t) => t.priority === "low").length,
    },
  };
});
