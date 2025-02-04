import { motion } from "framer-motion";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-20 pt-16 relative"
    >
      {/* Animated background decorations */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="relative">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-2xl backdrop-blur-sm shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ClipboardDocumentListIcon className="w-16 h-16 text-primary relative z-10" />
          </motion.div>
          <motion.div variants={itemVariants} className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent pb-2">
              Task Organizer
            </h1>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Transform your productivity with our intuitive and elegant task
          management solution
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Header;
