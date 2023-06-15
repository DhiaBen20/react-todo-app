import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

let todos = JSON.parse(
    '[{"todo":"Complete online JavaScript course","id":"4f42c0b9-f986-4179-af52-c160b1a5f72a","isComplete":true},{"todo":"Jog around the park","id":"dc83c6cc-45b1-4e76-a5d8-8a8df678d389","isComplete":false},{"todo":"10 minutes meditation","id":"31c42185-db7c-4ea4-a225-75699fbf0d2d","isComplete":false},{"todo":"Read for 1 hour","id":"7dc0df06-7586-4c6f-aa77-2dad74efa7b4","isComplete":false},{"todo":"pick groceries","id":"259ecb7b-8b55-4f23-9684-8d51ed7f75fd","isComplete":false},{"todo":"Complete Todo App on Frontend Mentor","id":"b4a5496c-d134-48ff-8fe4-bbfbca50845f","isComplete":true}]'
);

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
