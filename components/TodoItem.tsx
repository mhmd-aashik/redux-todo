"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  deleteTodo,
  toggleTodoStatus,
  updateTodo,
} from "@/lib/slices/todoSlice";
import type { Todo, TodoCategory, TodoPriority } from "@/lib/slices/todoSlice";

interface TodoItemProps {
  todo: Todo;
}

const categoryColors: Record<TodoCategory, string> = {
  work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  personal:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  shopping: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  education:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const priorityColors: Record<TodoPriority, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
};

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    category: todo.category,
    priority: todo.priority,
    dueDate: todo.dueDate || "",
  });

  const handleUpdate = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        updates: {
          ...editData,
          dueDate: editData.dueDate || undefined,
        },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      dispatch(deleteTodo(todo.id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={2}
          />
          <div className="grid grid-cols-3 gap-2">
            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  category: e.target.value as TodoCategory,
                })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  priority: e.target.value as TodoPriority,
                })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) =>
                setEditData({ ...editData, dueDate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 ${
        todo.status === "completed"
          ? "border-green-500 opacity-75"
          : todo.status === "in-progress"
          ? "border-blue-500"
          : "border-gray-400"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-lg font-semibold text-gray-900 dark:text-white ${
                todo.status === "completed" ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                categoryColors[todo.category]
              }`}
            >
              {todo.category}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                priorityColors[todo.priority]
              }`}
            />
          </div>
          {todo.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              {todo.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span
              className={`px-2 py-1 rounded-full text-white font-medium ${
                statusColors[todo.status]
              }`}
            >
              {todo.status.replace("-", " ")}
            </span>
            {todo.dueDate && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
            <span className="text-xs">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(toggleTodoStatus(todo.id))}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Toggle Status"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
