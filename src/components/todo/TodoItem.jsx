import { motion } from "framer-motion";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  TrashIcon,
  CalendarIcon,
  FlagIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const isDueSoon = todo.dueDate && new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) && !todo.completed;

  const priorityConfig = {
    low: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-500 to-teal-500',
      icon: '🟢'
    },
    medium: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
      gradient: 'from-amber-500 to-orange-500',
      icon: '🟡'
    },
    high: { 
      color: 'text-red-400', 
      bg: 'bg-red-500/10', 
      border: 'border-red-500/30',
      glow: 'shadow-red-500/20',
      gradient: 'from-red-500 to-pink-500',
      icon: '🔴'
    },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl touch-hover ${
        todo.completed 
          ? 'opacity-75' 
          : ''
      }`}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${
        todo.priority === 'high' ? 'from-red-600/10 to-pink-600/10' :
        todo.priority === 'medium' ? 'from-amber-600/10 to-orange-600/10' : 
        'from-emerald-600/10 to-teal-600/10'
      } rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Main card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-xl group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300 card-mobile">
        {/* Priority indicator bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl sm:rounded-l-2xl bg-gradient-to-b ${priorityConfig[todo.priority].gradient} ${
          todo.completed ? 'opacity-30' : ''
        }`} />

        {/* Completion overlay */}
        {todo.completed && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl sm:rounded-2xl pointer-events-none"
            style={{ transformOrigin: 'left' }}
          />
        )}

        <div className="relative p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Completion Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggle(todo.id)}
              className={`relative flex-shrink-0 transition-all duration-300 touch-target ${
                todo.completed 
                  ? "text-emerald-400" 
                  : "text-white/40 hover:text-emerald-400"
              }`}
            >
              {todo.completed ? (
                <CheckCircleIconSolid className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <CheckCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 -z-10"
                />
              )}
            </motion.button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="space-y-2 sm:space-y-3">
                {/* Title */}
                <div className="relative">
                  <h3 className={`text-base sm:text-lg font-semibold transition-all duration-300 ${
                    todo.completed
                      ? "line-through text-white/40"
                      : "text-white"
                  }`}>
                    {todo.title}
                  </h3>
                </div>

                {/* Description */}
                {todo.description && (
                  <p className={`text-sm leading-relaxed ${
                    todo.completed 
                      ? "text-white/30 line-through" 
                      : "text-white/70"
                  }`}>
                    {todo.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* Due Date */}
                  {todo.dueDate && (
                    <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all backdrop-blur-sm ${
                      isOverdue && !todo.completed
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg'
                        : isDueSoon && !todo.completed
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}>
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
                      <span className="sm:hidden">{format(new Date(todo.dueDate), "M/d")}</span>
                      {isOverdue && !todo.completed && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Priority */}
                  <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border backdrop-blur-sm ${
                    priorityConfig[todo.priority].bg
                  } ${priorityConfig[todo.priority].color} ${priorityConfig[todo.priority].border} ${
                    todo.completed ? 'opacity-50' : ''
                  }`}>
                    <span className="text-sm sm:text-base">{priorityConfig[todo.priority].icon}</span>
                    <span className="capitalize hidden sm:inline">{todo.priority} Priority</span>
                    <span className="capitalize sm:hidden">{todo.priority}</span>
                  </div>

                  {/* Time indicators */}
                  {!todo.completed && (
                    <>
                      {isOverdue && (
                        <motion.div
                          animate={{ pulse: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-500/20 text-red-300 rounded-lg sm:rounded-xl text-xs font-medium border border-red-500/30"
                        >
                          <ClockIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">Overdue</span>
                          <span className="sm:hidden">!</span>
                        </motion.div>
                      )}
                      {isDueSoon && !isOverdue && (
                        <motion.div
                          animate={{ pulse: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg sm:rounded-xl text-xs font-medium border border-amber-500/30"
                        >
                          <ClockIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">Due Soon</span>
                          <span className="sm:hidden">Soon</span>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(todo.id)}
              className="flex-shrink-0 p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 border border-transparent hover:border-red-500/30"
            >
              <TrashIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Completion celebration effect */}
          {todo.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 1.2, 0],
                y: [0, -10, -20, -30]
              }}
              transition={{ duration: 2, delay: 0.2 }}
              className="absolute top-4 right-4 text-emerald-400 pointer-events-none"
            >
              <SparklesIcon className="w-6 h-6" />
            </motion.div>
          )}
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
