import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

let todos = [
    {
        // id: crypto.randomUUID(),
        id: 1,
        todo: "Learn Golang",
        isComplete: false,
    },
    {
        // id: crypto.randomUUID(),
        id: 2,
        todo: "Master VueJS",
        isComplete: false,
    },
    {
        // id: crypto.randomUUID(),
        id: 3,
        todo: "Master Laravel",
        isComplete: false,
    },
    {
        // id: crypto.randomUUID(),
        id: 4,
        todo: "Learn NodeJS",
        isComplete: false,
    },
];

let filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.isComplete),
    completed: (todos) => todos.filter((todo) => todo.isComplete),
};

let useTodos = create(
    persist(
        immer((set, get) => ({
            mode: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light",
            todos,
            todo: "",
            filter: "all",
            setFilter: (filter) => set({ filter }),
            getFilteredTodos: () => filters[get().filter](get().todos),
            getLeftTodosCount: () => filters.active(get().todos).length,
            setTodo: (todo) => set({ todo }),
            setMode: (mode) => set({ mode }),
            addTodo: (todo) =>
                set((state) => {
                    state.todos.push({
                        todo,
                        id: crypto.randomUUID(),
                        isComplete: false,
                    });
                }),
            toggleComplete: (id) =>
                set((state) => {
                    let todo = state.todos.find((todo) => todo.id == id);

                    todo.isComplete = !todo.isComplete;
                }),

            deleteTodo: (id) =>
                set((state) => {
                    state.todos.splice(
                        state.todos.findIndex((todo) => todo.id == id),
                        1
                    );
                }),
            clearCompletedTodo: () =>
                set((state) => {
                    state.todos = state.todos.filter(
                        (todo) => !todo.isComplete
                    );
                }),
            syncStateWithDOM: ({ placement, draggedId, draggedOverId }) =>
                set(({ todos }) => {
                    if (!draggedId || !draggedOverId) return;

                    let draggedIndex = todos.findIndex(
                        (t) => t.id == draggedId
                    );

                    let draggedOverIndex = todos.findIndex(
                        (t) => t.id == draggedOverId
                    );

                    if (placement == "after") {
                        todos.splice(
                            draggedOverIndex +
                                (draggedIndex < draggedOverIndex ? 0 : 1),
                            0,
                            ...todos.splice(draggedIndex, 1)
                        );
                    } else {
                        todos.splice(
                            draggedOverIndex -
                                (draggedIndex < draggedOverIndex ? 1 : 0),
                            0,
                            ...todos.splice(draggedIndex, 1)
                        );
                    }
                }),
        })),
        {
            name: "todos",
            // partialize: (store) => ({
            //     todos: store.todos,
            // }),
        }
    )
);

function debug(todos, { placement, draggedId, draggedOverId }) {
    console.log("placement:", placement);
    console.log(
        "draggedId: ",
        draggedId,
        ", draggedIndex: ",
        todos.findIndex((t) => t.id == draggedId),
        " ",
        todos.at(todos.findIndex((t) => t.id == draggedId)).todo
    );

    console.log(
        "draggedOverId: ",
        draggedOverId,
        ", draggedOverIndex: ",
        todos.findIndex((t) => t.id == draggedOverId),
        " ",
        todos.at(todos.findIndex((t) => t.id == draggedOverId)).todo
    );
}

useTodos.use = {};

for (let key of Object.keys(useTodos.getState())) {
    useTodos.use[key] = () => useTodos((store) => store[key]);
}

export { useTodos };
