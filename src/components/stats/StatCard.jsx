import { motion } from "framer-motion";
import PropTypes from "prop-types";

const StatCard = ({ label, value, icon: Icon, color, bg, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.15,
      duration: 0.7,
      type: "spring",
      stiffness: 100,
    }}
    whileHover={{ scale: 1.03, translateY: -5 }}
    className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
  >
    {/* Background gradient decoration */}
    <div className={`absolute inset-0 opacity-10 ${bg} blur-2xl -z-10`} />

    <div className="flex items-center gap-6">
      <motion.div
        whileHover={{ rotate: 12 }}
        transition={{ duration: 0.3 }}
        className={`p-4 rounded-2xl ${bg} shadow-lg`}
      >
        <Icon className={`w-10 h-10 ${color}`} />
      </motion.div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wider">
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {value}
          </p>
          <p className="text-sm text-gray-500">tasks</p>
        </div>
      </div>
    </div>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default StatCard;
