import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, CalendarIcon, FlagIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({
      title,
      description: description.trim() || null,
      dueDate: dueDate ? new Date(dueDate).getTime() : null,
      priority,
    });
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setShowForm(false);
  };

  const priorities = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      icon: '🟢',
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      ring: 'ring-emerald-200',
      border: 'border-emerald-300',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      value: 'medium', 
      label: 'Medium Priority', 
      icon: '🟡',
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      ring: 'ring-amber-200',
      border: 'border-amber-300',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      icon: '🔴',
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      ring: 'ring-red-200',
      border: 'border-red-300',
      gradient: 'from-red-500 to-pink-500'
    },
  ];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="w-full group relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
            
            {/* Main button */}
            <div className="relative bg-white/10 backdrop-blur-xl border-2 border-dashed border-blue-400/30 rounded-2xl p-8 text-blue-300 hover:border-blue-400/60 hover:text-blue-200 transition-all duration-300 hover:bg-white/15">
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <PlusIcon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white mb-1">Add New Task</div>
                  <div className="text-sm text-blue-300/80">Create a new task with priority and due date</div>
                </div>
                <ChevronRightIcon className="w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              {/* Sparkles effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>
            
            {/* Form container */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                  >
                    <PlusIcon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Create New Task</h3>
                    <p className="text-blue-200">Add details to organize your work efficiently</p>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Task Title */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/90">
                    Task Title *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be accomplished?"
                    className="w-full px-4 py-4 bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-lg font-medium transition-all duration-300"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white/90">
                    Description (Optional)
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details about this task..."
                    rows="3"
                    className="w-full px-4 py-4 bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-none transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Due Date */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white/90">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Due Date
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-4 bg-white/8 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 [color-scheme:dark]"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white/90">
                      <FlagIcon className="w-4 h-4 inline mr-2" />
                      Priority Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {priorities.map((p) => (
                        <motion.button
                          key={p.value}
                          type="button"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPriority(p.value)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-xs font-semibold ${
                            priority === p.value
                              ? `bg-gradient-to-r ${p.gradient} text-white border-white/30 shadow-lg`
                              : 'bg-white/8 text-white/70 border-white/20 hover:border-white/40 hover:bg-white/12'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">{p.icon}</div>
                            <div className="text-xs">{p.value.charAt(0).toUpperCase() + p.value.slice(1)}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-white/20">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!title.trim()}
                    className="flex-1 relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-blue-500/25 transition-all duration-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <PlusIcon className="w-5 h-5" />
                      Create Task
                    </span>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowForm(false)}
                    className="px-6 py-4 rounded-2xl font-semibold text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default TodoForm;