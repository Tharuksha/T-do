import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  InformationCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-hide footer after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 right-4 z-50 md:right-8"
      >
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative bg-white/90 backdrop-blur-md shadow-lg rounded-full px-4 py-2.5 hover:bg-white/95 transition-all duration-300 group border border-gray-100 hover:shadow-xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center gap-2 relative">
            <motion.div
              animate={{
                rotate: isVisible ? 0 : 180,
                y: isHovered ? -2 : 0,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="bg-primary/10 rounded-full p-1"
            >
              <ChevronUpIcon className="w-4 h-4 text-primary" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0.9,
                width: "auto",
              }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-gray-600 whitespace-nowrap flex items-center gap-1.5"
            >
              <InformationCircleIcon className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">
                {isVisible ? "Hide" : "Show"} Credits
              </span>
              <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
            </motion.span>
          </div>

          {/* Animated glow effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: -1 }}
          />

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Footer Content */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white/80 backdrop-blur-md border-t border-gray-100 py-8 px-4 fixed bottom-0 w-full shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center relative"
              >
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-lg blur-xl" />
                </div>

                <p className="text-gray-600 text-sm font-medium py-1 px-4 rounded-full backdrop-blur-sm">
                  Made with{" "}
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-red-500 inline-block cursor-default"
                  >
                    ❤️
                  </motion.span>{" "}
                  by{" "}
                  <motion.a
                    href="https://github.com/tharuksha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors duration-300 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tharuksha Wickramarachchi
                    <motion.span
                      className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-secondary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </p>
              </motion.div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
