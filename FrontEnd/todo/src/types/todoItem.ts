/**
 * Represents a to-do item in the application.
 * This interface defines the structure of a to-do item, including its properties such as id, title, completion status, and creation date.
 */
export interface TodoItem {
  id?: number;
  title: string;
  isComplete: boolean;
  createdAt?: string;
}
