import { motion } from 'framer-motion';

const TodoFilters = ({ filter, onFilterChange, todoCount }) => {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <p className="text-gray-600">
        {todoCount} {todoCount === 1 ? 'task' : 'tasks'} remaining
      </p>
      <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
        {filters.map((f) => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-md capitalize transition-colors ${
              filter === f
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;