import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title: "Todo msg",
            complete: false
        },
    ],
    addTodo: (title) => {},
    editTodo: (id, title) => {},
    deleteTodo: (id),
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext()
}

export const TodoProvider = TodoContext.Provider;