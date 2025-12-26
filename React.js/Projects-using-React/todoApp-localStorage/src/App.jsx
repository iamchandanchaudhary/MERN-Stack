import { useEffect, useState } from 'react';
import './App.css';
import { TodoContext, TodoProvider } from './Contexts';
import { v4 as uuid } from 'uuid';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/todoItem';

const App = () => {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: uuid(), ...todo }, ...prev]);
  }

  const editTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo"))

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos))
  }, [todos])

  return (

    <TodoProvider value={{ todos, addTodo, editTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gray-900 min-h-screen py-8">
        <div className="bg-gray-800 w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App;
