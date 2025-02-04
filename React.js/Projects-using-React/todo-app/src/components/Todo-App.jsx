import { useState } from "react";
import { v4 as uuid } from 'uuid';

function TodoApp() {
    let [todos, setTodos] = useState([ {task: "", id: uuid()} ]);
    let [newTodo, setNewTodo] = useState("");

    function addTask() {
        // console.log(["Task Added."]);
        setTodos([...todos, {task: newTodo, id: uuid()}]);
        setNewTodo("");
    }

    let updateTask = (event) => {
        // console.log(event.target.value);
        setNewTodo(event.target.value);
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-start">
            <div className="w-[450px] p-4">
            <h1 className="text-5xl font-bold my-4 text-center">Todo App</h1>
            <div className="p-5 flex items-center justify-center">
                <input type="text" placeholder="Enter Task" value={newTodo} onChange={updateTask} className="border-2 border-black py-1 px-3 rounded-lg" />
                <button onClick={addTask} className="ml-5 rounded-lg bg-blue-500 hover:bg-blue-400 border-2 border-white focus:border-2 focus:border-blue-800 text-white px-3 py-1">Add Task</button>

            </div>

            <div>
                <h1 className="text-xl font-bold flex">Your Tasks:- </h1>
                <ul className="ml-3 mt-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="mb-0">{todo.task}</li>
                    ))}

                    {/* <li>{newTodo}</li> */}
                </ul>
            </div>

            </div>
        </div>
    );
}

export default TodoApp;