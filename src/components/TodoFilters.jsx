import { motion } from 'framer-motion';
import { 
  RectangleStackIcon, 
  ClockIcon, 
  CheckCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const TodoFilters = ({ filter, onFilterChange, todoCount }) => {
  const filters = [
    { 
      value: 'all', 
      label: 'All Tasks', 
      icon: RectangleStackIcon,
      color: 'text-blue-300',
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      hoverBg: 'hover:bg-blue-500/10'
    },
    { 
      value: 'active', 
      label: 'Active', 
      icon: ClockIcon,
      color: 'text-amber-300',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/30',
      hoverBg: 'hover:bg-amber-500/10'
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      icon: CheckCircleIcon,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
      hoverBg: 'hover:bg-emerald-500/10'
    },
  ];

  const activeFilter = filters.find(f => f.value === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Task Count */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FunnelIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">
              {todoCount} {todoCount === 1 ? 'Task' : 'Tasks'} Remaining
            </p>
            <p className="text-sm text-gray-400">
              Filter by status to organize your workflow
            </p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="flex gap-2 p-1.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            {filters.map((f, index) => {
              const isActive = filter === f.value;
              const Icon = f.icon;
              
              return (
                <motion.button
                  key={f.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFilterChange(f.value)}
                  className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 min-w-fit ${
                    isActive
                      ? `${f.bg} ${f.color} border ${f.border} shadow-lg`
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className={`absolute inset-0 ${f.bg} rounded-xl border ${f.border}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{f.label}</span>
                    <span className="sm:hidden">{f.value === 'all' ? 'All' : f.label}</span>
                  </div>

                  {/* Hover effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                      whileHover={{ opacity: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active filter glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl blur-xl opacity-20 -z-10 ${
              activeFilter ? activeFilter.bg : 'bg-blue-500/20'
            }`}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Filter Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center lg:text-left"
      >
        <p className="text-sm text-gray-400">
          {filter === 'all' && 'Showing all tasks in your workspace'}
          {filter === 'active' && 'Showing tasks that need your attention'}
          {filter === 'completed' && 'Showing your completed achievements'}
        </p>
      </motion.div>
    </motion.div>
  );
};

TodoFilters.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  todoCount: PropTypes.number.isRequired,
};

export default TodoFilters;