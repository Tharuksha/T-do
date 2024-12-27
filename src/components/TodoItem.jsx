import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  TrashIcon,
  CalendarIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggle(todo.id)}
              className={`p-1 rounded-full transition-colors ${
                todo.completed ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <CheckCircleIcon className="w-6 h-6" />
            </motion.button>
            
            <div className="flex-1">
              <p
                className={`text-lg transition-all ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </p>
              
              <div className="flex items-center gap-4 mt-2">
                {todo.dueDate && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  </div>
                )}
                
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
                  {todo.priority}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;