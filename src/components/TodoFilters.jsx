import Filter from './Filter'

export default function TodoFilters() {
    return (
        <>
            <Filter filter="all">All</Filter>
            <Filter filter="active">Active</Filter>
            <Filter filter="completed">Completed</Filter>
        </>
    );
}
