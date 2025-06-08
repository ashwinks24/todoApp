import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = newTodo.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>React To-Do List</h1>

      <form onSubmit={handleAddTodo} style={styles.form}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add
        </button>
      </form>

      <div style={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          style={{
            ...styles.filterBtn,
            fontWeight: filter === "all" ? "bold" : "normal",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            ...styles.filterBtn,
            fontWeight: filter === "active" ? "bold" : "normal",
          }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            ...styles.filterBtn,
            fontWeight: filter === "completed" ? "bold" : "normal",
          }}
        >
          Completed
        </button>
      </div>

      <ul style={styles.list}>
        {filteredTodos.length === 0 && (
          <li style={styles.noTask}>No tasks here.</li>
        )}

        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#999" : "#000",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteBtn}
              aria-label={`Delete task: ${todo.text}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: 6,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "0 15px",
    marginLeft: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  filters: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  filterBtn: {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  list: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  todoText: {
    flex: 1,
    marginLeft: 10,
  },
  deleteBtn: {
    marginLeft: 10,
    border: "none",
    background: "none",
    color: "red",
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  noTask: {
    textAlign: "center",
    color: "#666",
  },
};

export default App;
