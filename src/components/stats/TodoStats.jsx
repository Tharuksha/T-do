import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
  TrophyIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";

const TodoStats = ({ todos }) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;
  const highPriority = todos.filter(
    (todo) => todo.priority === "high" && !todo.completed
  ).length;
  const overdue = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;

  const completionRate = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  const stats = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircleIcon,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      gradient: "from-emerald-500 to-teal-500",
      border: "border-emerald-500/30",
      description: "Tasks finished",
      trend: completed > 0 ? "up" : "neutral",
      emoji: "✅"
    },
    {
      label: "In Progress",
      value: pending,
      icon: ClockIcon,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      gradient: "from-blue-500 to-indigo-500",
      border: "border-blue-500/30",
      description: "Active tasks",
      trend: pending > 0 ? "up" : "neutral",
      emoji: "⏳"
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: ExclamationCircleIcon,
      color: "text-red-400",
      bg: "bg-red-500/20",
      gradient: "from-red-500 to-pink-500",
      border: "border-red-500/30",
      description: "Urgent tasks",
      trend: highPriority > 0 ? "up" : "neutral",
      emoji: "🚨"
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: ChartBarIcon,
      color: "text-indigo-400",
      bg: "bg-indigo-500/20",
      gradient: "from-indigo-500 to-purple-500",
      border: "border-indigo-500/30",
      description: "Overall progress",
      trend: completionRate >= 80 ? "up" : completionRate >= 50 ? "neutral" : "down",
      emoji: "📊"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>
        
        {/* Header card */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
            >
              <ChartBarIcon className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
              <p className="text-blue-200">Track your productivity insights</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white mb-1">{todos.length}</div>
              <div className="text-sm text-blue-300">Total Tasks</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative group"
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
            
            {/* Card */}
            <div className={`relative bg-white/8 backdrop-blur-xl border ${stat.border} rounded-2xl p-6 shadow-xl group-hover:bg-white/12 group-hover:border-opacity-50 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl">{stat.emoji}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-white/80">{stat.label}</h3>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
                <p className="text-xs text-white/60">{stat.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Section */}
      {completionRate >= 80 && todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative group"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-3xl blur-xl"></div>
          
          {/* Achievement card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25"
              >
                <TrophyIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  Excellent Progress! 
                  <SparklesIcon className="w-5 h-5 text-emerald-400" />
                </h3>
                <p className="text-emerald-200">You've completed {completionRate}% of your tasks. Keep up the great work!</p>
              </div>
              <div className="text-4xl">🎉</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Streak Section */}
      {completed >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative group"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-3xl blur-xl"></div>
          
          {/* Streak card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25"
              >
                <FireIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  You're on Fire!
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🔥
                  </motion.div>
                </h3>
                <p className="text-amber-200">{completed} tasks completed. You're building momentum!</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Warning for overdue tasks */}
      {overdue > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-3xl blur-xl"></div>
          
          {/* Warning card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg shadow-red-500/25"
              >
                <ExclamationCircleIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Attention Needed</h3>
                <p className="text-red-200">{overdue} {overdue === 1 ? 'task is' : 'tasks are'} overdue. Consider prioritizing them.</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

TodoStats.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
      dueDate: PropTypes.number,
    })
  ).isRequired,
};

export default TodoStats;
