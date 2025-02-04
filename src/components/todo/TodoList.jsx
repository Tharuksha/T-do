import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-3xl" />
      </div>

      {/* Scrollable container with custom scrollbar */}
      <div
        className="relative max-h-[60vh] overflow-y-auto pr-2 scroll-smooth 
        scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-gray-100/50 
        hover:scrollbar-thumb-primary/30 
        rounded-xl"
      >
        <div className="space-y-4 py-2">
          <AnimatePresence mode="popLayout">
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">
                  No tasks yet. Add one to get started!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
      dueDate: PropTypes.number,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
