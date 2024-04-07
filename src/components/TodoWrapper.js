import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [notification, setNotification] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // New state for delete confirmation

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (todos.some((existingTodo) => existingTodo.task === todo)) {
      setNotification('A todo with this name already exists. Please use another name!');
      return;
    }
  
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setDeleteId(id); // Set deleteId instead of deleting immediately

  const confirmDelete = () => { // New function to confirm deletion
    setTodos(todos.filter((todo) => todo.id !== deleteId));
    setDeleteId(null);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    if (todos.some((existingTodo) => existingTodo.task === task && existingTodo.id !== id)) {
      setNotification('A todo with this name already exists. Please use another name!');
      return;
    }
  
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1 className="todo-header">Todo List</h1>

      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      {notification && (
        <div className="modal-overlay">
          <div className="modal-content">
            {notification}
            <br />
            <button className="close-btn" onClick={() => setNotification(null)}>
              Close
            </button>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            Are you sure you want to delete this todo?
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                 alignItems: 'center'
            }}>

            <button className="confirm-btn" onClick={confirmDelete}>
              OK
            </button>
            <button className="cancel-btn" onClick={() => setDeleteId(null)}>
              Cancel
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};