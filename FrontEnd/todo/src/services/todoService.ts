import type { TodoItem } from "../types/todoItem";

const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5250/api";

/**
 * A service object that provides methods for interacting with the backend API to manage todo items.
 * It includes methods for fetching, creating, updating, and deleting todo items.
 */
export const todoService = {
  /**
   * Fetches the list of todo items from the backend API.
   * @returns  A promise that resolves to an array of TodoItem objects.
   */
  async getTodos(): Promise<TodoItem[]> {
    const response = await fetch(`${API_URL}/todo`);

    return response.ok ? response.json() : [];
  },

  /**
   * Creates a new todo item by sending a POST request to the backend API.
   * @param todo - The TodoItem object containing the title and completion status of the new todo.
   * @returns A promise that resolves to the created TodoItem object returned from the API.
   */
  async createTodo(todo: TodoItem): Promise<TodoItem> {
    const response = await fetch(`${API_URL}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    return response.ok
      ? response.json()
      : Promise.reject("Failed to create todo");
  },

  /**
   * Updates an existing todo item by sending a PUT request to the backend API.
   * @param todoId - The ID of the todo item to be updated.
   * @param todo - The updated TodoItem object containing the new title and completion status.
   * @returns A promise that resolves to the updated TodoItem object returned from the API.
   */
  async updateTodo(todoId: number, todo: TodoItem): Promise<TodoItem> {
    const response = await fetch(`${API_URL}/todo/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    return response.ok
      ? response.json()
      : Promise.reject("Failed to update todo");
  },

  /**
   * Deletes a todo item by sending a DELETE request to the backend API.
   * @param todoId - The ID of the todo item to be deleted.
   * @returns A promise that resolves when the deletion is successful.
   */
  async deleteTodo(todoId: number): Promise<void> {
    fetch(`${API_URL}/todo/${todoId}`, {
      method: "DELETE",
    });
  },
};
