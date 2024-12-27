import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import TodoForm from "./components/todo/TodoForm";
import TodoItem from "./components/todo/TodoItem";
import TodoFilters from "./components/TodoFilters";
import TodoStats from "./components/stats/TodoStats";
import useTodoStore from "./store/todoStore";
import Footer from "./components/Footer";

function App() {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto">
        <Header />

        <TodoStats todos={todos} />

        <TodoForm onAdd={addTodo} />

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          todoCount={activeTodoCount}
        />

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>
        </div>

        {todos.some((todo) => todo.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-6 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear completed
          </button>
        )}
      </div>

      {}
      <Footer />
    </div>
  );
}

export default App;
