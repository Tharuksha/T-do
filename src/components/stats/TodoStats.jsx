import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import StatCard from './StatCard';

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
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  );
};

export default TodoStats;