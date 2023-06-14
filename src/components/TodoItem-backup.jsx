import { useSortable } from "../hooks/useSortable";
import { useTodos } from "../store";
import CheckIcon from "./icons";

export default function TodoItem({ todo }) {
    let toggleComplete = useTodos.use.toggleComplete();
    let deleteTodo = useTodos.use.deleteTodo();
    let syncStateWithDOM = useTodos.use.syncStateWithDOM();

    let { ref, listeners } = useSortable(syncStateWithDOM);

    return (
        <>
            <div
                className="bg-white dark:bg-[hsl(235,24%,19%)] px-5 py-3 md:py-4 flex items-center gap-3 md:gap-5 border dark:border-[hsl(237,14%,26%)] border-x-transparent border-t-transparent dark:border-x-transparent dark:border-t-transparent group select-none touch-none"
                ref={ref}
                {...listeners}
                data-draggable
                data-draggable-id={todo.id}
            >
                <button
                    className="w-[19px] h-[19px] md:w-6 md:h-6 border dark:border-[hsl(237,14%,26%)] rounded-full"
                    onClick={() => toggleComplete(todo.id)}
                ></button>
                <span
                    className={`flex-1 text-xs md:text-base  ${
                        todo.isComplete
                            ? "line-through text-[hsl(233,11%,84%)] dark:text-[hsl(233,14%,35%)]"
                            : "text-[hsl(235,19%,35%)] dark:text-[hsl(234,39%,85%)]"
                    }`}
                >
                    {todo.todo}
                </span>
                <button
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150"
                    onClick={() => deleteTodo(todo.id)}
                >
                    <CheckIcon />
                </button>
            </div>
        </>
    );
}
