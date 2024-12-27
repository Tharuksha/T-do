import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const TodoStats = ({ todos }) => {
  const completed = todos.filter(todo => todo.completed).length;
  const pending = todos.filter(todo => !todo.completed).length;
  const highPriority = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;

  const stats = [
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircleIcon,
      color: 'text-green-500',
      bg: 'bg-green-100',
    },
    {
      label: 'Pending',
      value: pending,
      icon: ClockIcon,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100',
    },
    {
      label: 'High Priority',
      value: highPriority,
      icon: ExclamationCircleIcon,
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TodoStats;