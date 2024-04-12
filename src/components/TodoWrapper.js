import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { getAllToDo, addToDo, deleteTodoFromApi, updateTodoFromApi } from "../utils/HandleApi";

export const TodoWrapper = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [toDo, setToDo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const addTodo = (todo) => {
    addToDo(todo, setToDo);
  };

  const deleteTodo = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    deleteTodoFromApi(deleteId, setToDo);
    setDeleteId(null);
  };

  const toggleComplete = (id) => {
    const todoToUpdate = toDo.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedData = { ...todoToUpdate, completed: !todoToUpdate.completed };
      updateTodoFromApi(id, updatedData, setToDo);
    }
  };

  const editTask = (id, newTask) => {
    const todoToUpdate = toDo.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedData = { ...todoToUpdate, task: newTask };
      updateTodoFromApi(id, updatedData, setToDo);
    }
  };

  const editTodo = (id) => {
    setIsEditing(id);
    setToDo(
      toDo.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo, isEditing: false }
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1 className="todo-header">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {toDo.map((item) =>
          item.isEditing ? (
            <EditTodoForm key={item.id} editTodo={editTask} task={item} />
          ) : (
            <Todo
              key={item.id}
              task={item}
              deleteTodo={() => deleteTodo(item.id)}
              editTodo={() => editTodo(item.id)}
              toggleComplete={() => toggleComplete(item.id)}
            />
          )
        )}
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            Are you sure you want to delete this todo?
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="confirm-btn" onClick={confirmDelete}>OK</button>
              <button className="cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
