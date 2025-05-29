import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  HeartIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import useTodoStore from "../store/todoStore";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const { todos } = useTodoStore();

  // Calculate basic stats
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Update time every minute for minimalistic approach
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if user is typing in any form element
      const activeElement = document.activeElement;
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.isContentEditable ||
        activeElement.getAttribute('role') === 'textbox'
      );

      // Disable shortcuts when user is typing in form fields
      if (isTyping) {
        return;
      }

      if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false);
        setShowExportMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  // Export functions
  const exportAsJSON = () => {
    const data = {
      todos,
      exportDate: new Date().toISOString(),
      stats: { totalTasks, completedTasks, activeTasks }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportAsCSV = () => {
    const headers = ['Task', 'Status', 'Priority', 'Created'];
    const csvContent = [
      headers.join(','),
      ...todos.map(todo => [
        `"${todo.text.replace(/"/g, '""')}"`,
        todo.completed ? 'Completed' : 'Active',
        todo.priority || 'Normal',
        todo.createdAt || new Date().toISOString()
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const copyToClipboard = () => {
    const text = todos.map(todo => `${todo.completed ? '✓' : '○'} ${todo.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setShowExportMenu(false);
  };

  return (
    <>
      {/* Minimalistic Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl flex items-center justify-center">
            <motion.div
              animate={{ rotate: isVisible ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/80"
            >
              <ChevronUpIcon className="w-5 h-5" />
            </motion.div>
            
            {/* Subtle task counter */}
            {activeTasks > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-semibold text-white"
              >
                {activeTasks}
              </motion.div>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Minimalistic Footer */}
      <AnimatePresence>
        {isVisible && (
          <motion.footer
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40"
          >
            {/* Clean backdrop */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" />
            
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="relative z-10 max-w-6xl mx-auto px-8 py-6">
              
              {/* Main Content Row */}
              <div className="flex items-center justify-between">
                
                {/* Brand */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Task Flow</h3>
                    
                  </div>
                </motion.div>

                {/* Simple Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:flex items-center gap-6 text-sm text-white/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{totalTasks}</span>
                    <span className="text-white/60">Tasks</span>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{completedTasks}</span>
                    <span className="text-white/60">Done</span>
                  </div>
                  {totalTasks > 0 && (
                    <>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{Math.round((completedTasks / totalTasks) * 100)}%</span>
                        <span className="text-white/60">Complete</span>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <motion.button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 text-white/80" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowKeyboardShortcuts(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <CommandLineIcon className="w-4 h-4 text-white/80" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Bottom Row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between mt-4 pt-4 border-t border-white/10"
              >
                {/* Time */}
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <ClockIcon className="w-3 h-3" />
                  <span className="font-mono">
                    {currentTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Copyright */}
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <HeartIcon className="w-3 h-3 text-rose-400 fill-current" />
                  </motion.div>
                  <span>© 2025</span>
                </div>
              </motion.div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* Export Menu */}
      <AnimatePresence>
        {showExportMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-24 right-8 z-50"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl min-w-[160px]">
              <div className="space-y-1">
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={exportAsJSON}
                  className="w-full flex items-center gap-2 p-2 text-left text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                  JSON
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={exportAsCSV}
                  className="w-full flex items-center gap-2 p-2 text-left text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  CSV
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-2 p-2 text-left text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <ShareIcon className="w-4 h-4" />
                  Copy
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CommandLineIcon className="w-5 h-5" />
                Shortcuts
              </h2>
              
              <div className="space-y-2 text-sm">
                {[
                  { key: "F", desc: "Toggle footer" },
                  { key: "Ctrl + K", desc: "Show shortcuts" },
                  { key: "Escape", desc: "Close dialogs" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <span className="text-white/80">{shortcut.desc}</span>
                    <kbd className="px-2 py-1 bg-white/20 text-white text-xs font-mono rounded border border-white/30">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowKeyboardShortcuts(false)}
                className="w-full mt-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
