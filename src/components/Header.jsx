import { motion } from "framer-motion";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Header = () => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="text-center mb-12"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <ClipboardDocumentListIcon className="w-12 h-12 text-primary" />
      <h1 className="text-4xl font-bold text-gray-800">Task Organizer</h1>
    </div>
    <p className="text-gray-600">Organize your tasks with style</p>
  </motion.div>
);

export default Header;
