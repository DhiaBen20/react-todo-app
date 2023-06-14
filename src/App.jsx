import CreateTodo from "./components/CreateTodo";
import TodoFooter from "./components/TodoFooter";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";

export default function App() {
    return (
        <div>
            <TodoHeader />
            <main className="max-w-xl mx-auto px-6 md:px-0">
                <CreateTodo />
                <TodoList />
                <TodoFooter />
            </main>
        </div>
    );
}
