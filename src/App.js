import { useState,useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos]=useState([
  ]);  
  const todoNameRef = useRef();
  
  const handleAddTodo = () => {
    //task add 
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };


  return (
    <div>
    <TodoList todos= {todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef}/>
    <button onClick={handleAddTodo}>タスクを追加</button>
    <button onClick={handleClear}>タスクの削除</button>
    <button onClick={handleDeleteAll}>すべてのタスク削除</button>
    <div>未完了タスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
