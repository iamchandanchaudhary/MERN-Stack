import { useState } from "react";

function TodoApp() {
    let [todos, setTodos] = useState([""]);
    let [newTodo, setNewTodo] = useState("");

    function addTask() {
        // console.log(["Task Added."]);
        setTodos([...todos, newTodo]);
        setNewTodo("");
    }

    let updateTask = (event) => {
        // console.log(event.target.value);
        setNewTodo(event.target.value);
    }

    return (
        <div className="h-screen w-full flex flex-col items-center">
            <h1 className="text-5xl font-bold my-4">Todo App</h1>
            <div className="p-5 flex ">
                <input type="text" placeholder="Enter Task" value={newTodo} onChange={updateTask} className="border-2 border-black py-1 px-3 rounded-lg" />
                <button onClick={addTask} className="ml-5 rounded-lg bg-blue-500 hover:bg-blue-400 border-2 border-white focus:border-2 focus:border-blue-800 text-white px-3 py-1">Add Task</button>

            </div>

            <div>
                <h1 className="text-xl">Your Tasks:- </h1>
                <ul>
                    {todos.map((todo) => (
                        <li>{todo}</li>
                    ))}

                    {/* <li>{newTodo}</li> */}
                </ul>
            </div>
        </div>
    );
}

export default TodoApp;