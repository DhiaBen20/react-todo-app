import { useTodos } from "../store";
import TodoFilters from "./TodoFilters";

export default function TodoFooter() {
    let count = useTodos((store) => store.getLeftTodosCount());
    let clearCompletedTodo = useTodos.use.clearCompletedTodo();

    return (
        <>
            <div
                className={`bg-white dark:bg-[hsl(235,24%,19%)] text-xs md:text-sm px-5 py-4 md:pt-4 md:pb-3.5 flex items-center justify-between shadow-2xl ${
                    count ? "rounded-b" : "rounded"
                }`}
            >
                <span className="text-[hsl(236,9%,61%)] dark:text-zinc-400">
                    {count} items left
                </span>

                <div className="space-x-5 hidden md:block">
                    <TodoFilters />
                </div>

                <button
                    className="text-[hsl(236,9%,61%)] dark:text-zinc-400 dark:hover:text-[hsl(236,33%,92%)]"
                    onClick={clearCompletedTodo}
                >
                    Clear Completed
                </button>
            </div>

            <div className="md:hidden bg-white dark:bg-[hsl(235,24%,19%)] rounded mt-4 text-center space-x-5 py-3.5 shadow-2xl shadow-zinc-300 dark:shadow-zinc-900 text-xs md:text-sm">
                <TodoFilters />
            </div>

            <div className="text-xs text-center mt-12 text-[hsl(236,9%,61%)]">
                Drag and drop to reorder list
            </div>
        </>
    );
}
