import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, CalendarIcon, FlagIcon, XMarkIcon, SparklesIcon, ClockIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showForm, setShowForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedQuickDate, setSelectedQuickDate] = useState('');

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
    setSelectedQuickDate('');
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

  // Minimalistic quick date options
  const getQuickDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return [
      {
        label: 'Today',
        date: today.toISOString().split('T')[0],
        relative: 'today'
      },
      {
        label: 'Tomorrow',
        date: tomorrow.toISOString().split('T')[0],
        relative: 'tomorrow'
      },
      {
        label: 'Next Week',
        date: nextWeek.toISOString().split('T')[0],
        relative: 'next week'
      }
    ];
  };

  const quickDates = getQuickDates();

  const handleQuickDateSelect = (quickDate) => {
    setDueDate(quickDate.date);
    setSelectedQuickDate(quickDate.label);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateString === today.toISOString().split('T')[0]) return 'Today';
    if (dateString === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm safe-area-top safe-area-bottom"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowForm(false);
            }}
          >
            {/* Modal Container */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-mobile">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
              
              {/* Form container */}
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl card-mobile">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0"
                    >
                      <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">Create New Task</h3>
                      <p className="text-blue-200 text-xs sm:text-sm lg:text-base">Add details to organize your work efficiently</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowForm(false)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 touch-target flex-shrink-0"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* Task Title */}
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm font-semibold text-white/90">
                      Task Title *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What needs to be accomplished?"
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800/80 backdrop-blur-sm border-2 border-white/20 rounded-xl sm:rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-base sm:text-lg font-medium transition-all duration-300 hover:border-white/30 touch-target"
                      style={{ 
                        color: '#ffffff',
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        WebkitTextFillColor: '#ffffff'
                      }}
                      autoFocus
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm font-semibold text-white/90">
                      Description (Optional)
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add more details about this task..."
                      rows="3"
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800/80 backdrop-blur-sm border-2 border-white/20 rounded-xl sm:rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-none transition-all duration-300 hover:border-white/30 text-base sm:text-lg"
                      style={{ 
                        color: '#ffffff',
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        WebkitTextFillColor: '#ffffff'
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Minimalistic Due Date Picker */}
                    <div className="space-y-3 sm:space-y-4">
                      <label className="block text-sm font-medium text-white/90">
                        Due Date
                      </label>
                      
                      {/* Selected Date Display */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="cursor-pointer bg-white/8 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/12 hover:border-white/30 transition-all duration-300 touch-target"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                            <span className="text-white font-medium text-sm sm:text-base">
                              {dueDate ? formatDisplayDate(dueDate) : 'Set due date'}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: showDatePicker ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon className="w-4 h-4 text-white/40" />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Minimalistic Date Options */}
                      <AnimatePresence>
                        {showDatePicker && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3">
                              {/* Quick Options */}
                              <div className="flex gap-2">
                                {quickDates.map((option) => (
                                  <motion.button
                                    key={option.label}
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleQuickDateSelect(option)}
                                    className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-target ${
                                      selectedQuickDate === option.label
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/8 text-white/80 hover:bg-white/12 hover:text-white'
                                    }`}
                                  >
                                    {option.label}
                                  </motion.button>
                                ))}
                              </div>

                              {/* Custom Date Input */}
                              <div className="pt-2 border-t border-white/10">
                                <motion.input
                                  whileFocus={{ scale: 1.01 }}
                                  type="date"
                                  value={dueDate}
                                  onChange={(e) => {
                                    setDueDate(e.target.value);
                                    setSelectedQuickDate('');
                                  }}
                                  className="w-full px-3 py-2 bg-white/8 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 [color-scheme:dark] touch-target"
                                  min={new Date().toISOString().split('T')[0]}
                                  style={{ colorScheme: 'dark' }}
                                />
                              </div>

                              {/* Clear Option */}
                              {dueDate && (
                                <motion.button
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  type="button"
                                  onClick={() => {
                                    setDueDate('');
                                    setSelectedQuickDate('');
                                  }}
                                  className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors duration-200 touch-target"
                                >
                                  Clear date
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm font-semibold text-white/90 flex items-center gap-2">
                        <FlagIcon className="w-4 h-4" />
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {priorities.map((p) => (
                          <motion.button
                            key={p.value}
                            type="button"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setPriority(p.value)}
                            className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 font-semibold overflow-hidden touch-target ${
                              priority === p.value
                                ? `bg-gradient-to-r ${p.gradient} text-white border-white/30 shadow-lg shadow-${p.value === 'low' ? 'emerald' : p.value === 'medium' ? 'amber' : 'red'}-500/25`
                                : 'bg-white/8 text-white/70 border-white/20 hover:border-white/40 hover:bg-white/15'
                            }`}
                          >
                            {priority === p.value && (
                              <motion.div
                                layoutId="priority-selector"
                                className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            <div className="relative text-center">
                              <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{p.icon}</div>
                              <div className="text-xs sm:text-sm font-bold">
                                {p.value.charAt(0).toUpperCase() + p.value.slice(1)}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/20">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!title.trim()}
                      className="flex-1 relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-blue-500/25 transition-all duration-300 touch-target"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        Create Task
                      </span>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowForm(false)}
                      className="px-8 py-4 rounded-2xl font-semibold text-white/80 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
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