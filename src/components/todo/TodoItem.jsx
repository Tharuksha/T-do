import { motion } from "framer-motion";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  TrashIcon,
  CalendarIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { priorityColors } from "../../utils/priorityColors";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(todo.id)}
            className={`p-1 rounded-full transition-colors flex-shrink-0 ${
              todo.completed ? "text-green-500" : "text-gray-400"
            }`}
          >
            <CheckCircleIcon className="w-6 h-6" />
          </motion.button>

          <div className="flex-1 min-w-0">
            <div
              className="max-h-32 overflow-y-auto pr-2 
              scrollbar-thin scrollbar-thumb-primary/10 
              scrollbar-track-transparent hover:scrollbar-thumb-primary/20"
            >
              <p
                className={`text-lg transition-all ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </p>

              {todo.description && (
                <p className="text-gray-600 mt-1 text-sm">{todo.description}</p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {todo.dueDate && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
                </div>
              )}

              <span
                className={`text-xs px-2.5 py-1 rounded-full ${
                  priorityColors[todo.priority].bg
                } ${priorityColors[todo.priority].text}`}
              >
                {todo.priority}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.number,
    priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
