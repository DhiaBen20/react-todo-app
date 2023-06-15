import { useTodos } from "../store";

export default function Filter({ filter, active, ...props }) {
    let activeFilter = useTodos.use.filter();
    let setFilter = useTodos.use.setFilter();

    return (
        <button
            {...props}
            className={`font-bold ${
                activeFilter == filter
                    ? "text-[hsl(220,98%,61%)]"
                    : "text-[hsl(236,9%,61%)] hover:text-[hsl(235,19%,35%)] dark:text-zinc-400 dark:hover:text-[hsl(236,33%,92%)]"
            }`}
            onClick={() => setFilter(filter)}
            aria-label={`apply ${filter} filter`}
        />
    );
}
