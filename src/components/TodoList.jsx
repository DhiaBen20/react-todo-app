import { useTodos } from "../store";
import TodoItem from "./TodoItem";

export default function TodoList() {
    let todos = useTodos((store) => store.getFilteredTodos());

    return (
        <div className="bg-white dark:bg-[hsl(235,21%,11%)] mt-4 md:mt-6 rounded-t overflow-hidden shadow-2xl">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
