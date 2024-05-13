import React, { useState } from 'react';
import './App.css';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo({
      text: value,
      date: null,
      isCompleted: false,
    });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function TodoItem({ todo, index, completeTodo, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = () => {
    editTodo(index, editedText);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
          />
          <button onClick={handleEditSubmit}>Save</button>
        </>
      ) : (
        <>
          <div
            style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
          >
            {todo.text}
          </div>
          <div>{todo.date && `Completed on: ${todo.date}`}</div>
          <div>
            {!todo.isCompleted && (
              <>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={toggleEdit}>Edit</button>
              </>
            )}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

function TodoList({ todos, completeTodo, removeTodo, editTodo }) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

function CompletedTodoList({ completedTodos }) {
  return (
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {completedTodos.map((todo, index) => (
          <li key={index}>
            {todo.text} - Completed on: {todo.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    newTodos[index].date = new Date().toLocaleString();
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, newTodos[index]]);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h2>Todo List</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      </div>
      <div>
        <CompletedTodoList completedTodos={completedTodos} />
      </div>
    </div>
  );
}

export default App;
