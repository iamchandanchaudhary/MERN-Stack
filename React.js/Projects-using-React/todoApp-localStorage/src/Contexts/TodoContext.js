import { useContext, createContext } from "react";
// import { v4 as uuid } from 'uuid';

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false
        },
    ],
    addTodo: (todo) => {},
    editTodo: (id, todo) => {},
    deleteTodo: (id),
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext()
}

export const TodoProvider = TodoContext.Provider;