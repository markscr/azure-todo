import { useState, useEffect } from "react";
import type { TodoItem } from "./types/todoItem";
import { todoService } from "./services/todoService";

import "./App.css";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await todoService.createTodo({
        title: newTodo,
        isComplete: false,
      });
      setTodos([...todos, todo]);
      setNewTodo("");
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const handleToggle = async (todo: TodoItem) => {
    if (!todo.id) return;

    try {
      const updated = { ...todo, isComplete: !todo.isComplete };
      await todoService.updateTodo(todo.id, updated);
      // Map through the existing todos and replace the updated one with the new data
      setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div className="app">
      <header className="App-header">
        <h1>Todo List</h1>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo..."
          />
          <button type="submit">Add</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => handleToggle(todo)}
                />
                <span
                  style={{
                    textDecoration: todo.isComplete ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => todo.id && handleDelete(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
