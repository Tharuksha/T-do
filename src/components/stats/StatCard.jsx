import { motion } from "framer-motion";

const StatCard = ({ label, value, icon: Icon, color, bg, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-lg p-4 shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default StatCard;
