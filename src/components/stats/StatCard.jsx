import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from "@heroicons/react/24/outline";

const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  bg, 
  gradient, 
  border, 
  description, 
  trend = "neutral", 
  index 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowTrendingUpIcon className="w-4 h-4 text-success-500" />;
      case "down":
        return <ArrowTrendingDownIcon className="w-4 h-4 text-error-500" />;
      default:
        return <MinusIcon className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 12,
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={`group relative overflow-hidden card-premium border ${border || 'border-neutral-200'} hover:shadow-hard`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className={`absolute inset-0 ${bg} opacity-30 blur-2xl`}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Gradient Border Effect on Hover */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient || 'from-neutral-200 to-neutral-300'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.4 }}
            className={`relative p-3 rounded-xl ${bg} ${border ? `border ${border}` : ''} shadow-soft group-hover:shadow-medium transition-shadow`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
            
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-xl ${bg} blur-md opacity-0 group-hover:opacity-50 transition-opacity`}
            />
          </motion.div>

          {/* Trend Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              trend === 'up' ? 'bg-success-50' :
              trend === 'down' ? 'bg-error-50' : 'bg-neutral-50'
            }`}
          >
            {getTrendIcon()}
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="text-sm font-semibold text-neutral-600 uppercase tracking-wider"
          >
            {label}
          </motion.p>
          
          <div className="flex items-baseline gap-2">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-3xl font-bold text-gradient-primary"
            >
              {value}
            </motion.p>
            {typeof value === 'number' && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-sm text-neutral-500 font-medium"
              >
                {value === 1 ? 'task' : 'tasks'}
              </motion.p>
            )}
          </div>

          {description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="text-xs text-neutral-500 mt-1"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Progress Bar for Completion Rate */}
        {label.toLowerCase().includes('completion') && typeof value === 'string' && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: index * 0.1 + 0.7, duration: 1 }}
            className="mt-4"
          >
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: value }}
                transition={{ delay: index * 0.1 + 0.8, duration: 1.2, ease: "easeOut" }}
                className={`h-2 rounded-full bg-gradient-to-r ${gradient || 'from-primary-500 to-primary-600'}`}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Hover shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          background: [
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
          ],
          x: ["-100%", "200%"]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </motion.div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  gradient: PropTypes.string,
  border: PropTypes.string,
  description: PropTypes.string,
  trend: PropTypes.oneOf(["up", "down", "neutral"]),
  index: PropTypes.number.isRequired,
};

export default StatCard;
