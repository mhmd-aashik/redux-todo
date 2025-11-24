import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoPriority = "low" | "medium" | "high";
export type TodoCategory =
  | "work"
  | "personal"
  | "shopping"
  | "health"
  | "education";
export type TodoStatus = "pending" | "in-progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: TodoPriority;
  category: TodoCategory;
  status: TodoStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Todo[];
  filters: {
    category: TodoCategory | "all";
    priority: TodoPriority | "all";
    status: TodoStatus | "all";
    searchQuery: string;
  };
  sortBy: "createdAt" | "priority" | "dueDate" | "title";
  sortOrder: "asc" | "desc";
}

const initialState: TodoState = {
  todos: [],
  filters: {
    category: "all",
    priority: "all",
    status: "all",
    searchQuery: "",
  },
  sortBy: "createdAt",
  sortOrder: "desc",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<Omit<Todo, "id" | "createdAt" | "updatedAt">>
    ) => {
      const now = new Date().toISOString();
      const newTodo: Todo = {
        ...action.payload,
        id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: now,
        updatedAt: now,
      };
      state.todos.push(newTodo);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Todo> }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        if (todo.status === "pending") {
          todo.status = "in-progress";
        } else if (todo.status === "in-progress") {
          todo.status = "completed";
        } else {
          todo.status = "pending";
        }
        todo.updatedAt = new Date().toISOString();
      }
    },
    setFilter: (
      state,
      action: PayloadAction<
        | { type: "category"; value: TodoCategory | "all" }
        | { type: "priority"; value: TodoPriority | "all" }
        | { type: "status"; value: TodoStatus | "all" }
        | { type: "searchQuery"; value: string }
      >
    ) => {
      if (action.payload.type === "category") {
        state.filters.category = action.payload.value;
      } else if (action.payload.type === "priority") {
        state.filters.priority = action.payload.value;
      } else if (action.payload.type === "status") {
        state.filters.status = action.payload.value;
      } else if (action.payload.type === "searchQuery") {
        state.filters.searchQuery = action.payload.value;
      }
    },
    setSortBy: (
      state,
      action: PayloadAction<"createdAt" | "priority" | "dueDate" | "title">
    ) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: "all",
        priority: "all",
        status: "all",
        searchQuery: "",
      };
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  setFilter,
  setSortBy,
  setSortOrder,
  clearFilters,
} = todoSlice.actions;

export default todoSlice.reducer;
