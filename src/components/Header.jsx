import { motion } from "framer-motion";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-24 relative"
    >
      {/* Minimal Background Glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-extralight leading-[0.85] tracking-tighter">
            <span className="text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Task Flow
            </span>
          </h1>
        </motion.div>

        {/* Simple Underline */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </motion.div>

        {/* Minimal Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-lg md:text-xl text-gray-400 font-sans font-light leading-relaxed tracking-wide">
            Beautiful task management for professionals
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
