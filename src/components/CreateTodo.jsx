import { useTodos } from "../store";

export default function CreateTodo() {
    let todo = useTodos.use.todo();
    let setTodo = useTodos.use.setTodo();
    let addTodo = useTodos.use.addTodo();

    function handleSubmit(e) {
        e.preventDefault();
        addTodo(todo);
        setTodo("");
    }

    return (
        <div className="bg-white dark:bg-[hsl(235,24%,19%)] rounded px-5 py-3 md:py-4">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 md:gap-5">
                    <span className="w-[19px] h-[19px] md:w-6 md:h-6 border dark:border-[hsl(237,14%,26%)] rounded-full block"></span>
                    <input
                        type="text"
                        className="dark:bg-[hsl(235,24%,19%)] w-full flex-1 text-xs md:text-base"
                        placeholder="Create a new Todo..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}
