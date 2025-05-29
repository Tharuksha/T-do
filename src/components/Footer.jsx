import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  HeartIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show footer initially for 2 seconds, then hide
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const links = [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Support", href: "#support" },
    { label: "Docs", href: "#docs" },
  ];

  return (
    <>
      {/* Elegant Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          {/* Subtle glow */}
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center justify-center">
            <motion.div
              animate={{ rotate: isVisible ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronUpIcon className="w-5 h-5 text-gray-300" />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>

      {/* Premium Footer */}
      <AnimatePresence>
        {isVisible && (
          <motion.footer
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed bottom-0 left-0 right-0 z-40"
          >
            {/* Premium Glass Background */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-t border-white/20" />
            
            <div className="relative z-10 max-w-6xl mx-auto px-8 py-6">
              {/* Main Content */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Brand Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                  >
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Task Flow Pro</h3>
                    <p className="text-sm text-gray-400">Premium Task Management</p>
                  </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-8"
                >
                  {links.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                      className="text-sm text-gray-300 hover:text-blue-400 transition-colors font-medium relative group"
                    >
                      {link.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Status & Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 text-sm"
                >
                  {/* Live Status */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-gray-300 font-medium">Live</span>
                  </div>

                  {/* Time */}
                  <div className="text-gray-400">
                    {currentTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t border-white/20 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Copyright */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>&copy; 2024 Task Flow Pro</span>
                  <span className="text-gray-600">•</span>
                  <span>All rights reserved</span>
                </div>

                {/* Made with love */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <HeartIcon className="w-3 h-3 text-rose-500 fill-current" />
                  </motion.div>
                  <span>by our team</span>
                  <motion.a
                    href="#about"
                    whileHover={{ scale: 1.1 }}
                    className="ml-2 text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Premium Progress Bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
            />
          </motion.footer>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut hint */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 3 }}
            className="fixed bottom-20 right-6 z-30"
          >
            <motion.div
              className="bg-slate-900/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs text-gray-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs font-mono">F</kbd> for footer
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
