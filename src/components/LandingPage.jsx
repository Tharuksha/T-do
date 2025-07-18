import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckIcon, SparklesIcon, ClockIcon, ChartBarIcon, LockClosedIcon, ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { CheckIcon as CheckIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const LandingPage = ({ onGetStarted }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const backgroundY2 = useTransform(scrollY, [0, 500], [0, -150]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);
  
  // Spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth) * 100;
      const yPos = (clientY / innerHeight) * 100;
      setMousePosition({ x: xPos, y: yPos });
      x.set(clientX);
      y.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const features = [
    {
      icon: SparklesIcon,
      title: "Smart Organization",
      description: "Intuitive task categorization with priority levels and custom tags to keep your workflow organized",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      delay: 0.1
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Visual insights into your productivity with completion rates and progress analytics",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: ClockIcon,
      title: "Due Date Management",
      description: "Never miss a deadline with due date reminders and priority-based task scheduling",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: LockClosedIcon,
      title: "Local Storage",
      description: "Your tasks are safely stored locally in your browser with automatic persistence",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.4
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Create & Organize",
      description: "Add tasks effortlessly with smart categorization, priority levels, and due dates. Our intuitive interface makes task creation a breeze.",
      icon: SparklesIcon,
      gradient: "from-blue-500 to-indigo-600",
      features: ["Smart categorization", "Priority levels", "Due date tracking"]
    },
    {
      step: "02", 
      title: "Track Progress",
      description: "Monitor your productivity with visual progress indicators, completion rates, and insightful analytics to stay motivated.",
      icon: ChartBarIcon,
      gradient: "from-emerald-500 to-teal-600",
      features: ["Visual indicators", "Completion rates", "Analytics dashboard"]
    },
    {
      step: "03",
      title: "Stay Focused",
      description: "Filter tasks by status, priority, or category. Focus on what matters most with our powerful filtering and search capabilities.",
      icon: ClockIcon,
      gradient: "from-amber-500 to-orange-600", 
      features: ["Advanced filtering", "Smart search", "Focus modes"]
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "2M+", label: "Tasks Completed" },
    { number: "4.9", label: "User Rating" }
  ];

  const routineSteps = [
    {
      title: "Morning Planning",
      description: "Start your day by organizing priorities and setting clear intentions",
      icon: "🌅",
      time: "5 min"
    },
    {
      title: "Focus Blocks",
      description: "Work in distraction-free periods with our built-in focus timer",
      icon: "⏰",
      time: "25 min"
    },
    {
      title: "Progress Review",
      description: "Track accomplishments and adjust plans for continuous improvement",
      icon: "📊",
      time: "10 min"
    },
    {
      title: "Evening Reflection",
      description: "Celebrate wins and prepare tomorrow's priorities for better sleep",
      icon: "🌙",
      time: "5 min"
    }
  ];

  const benefits = [
    {
      icon: "🚀",
      title: "Boost Productivity",
      description: "Increase your daily output by up to 40% with smart task management and prioritization",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🎯",
      title: "Stay Focused",
      description: "Eliminate distractions with clean interface and focus-driven design philosophy",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Instant task creation, real-time updates, and seamless performance across all devices",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your data stays local in your browser - no servers, no tracking, complete privacy",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-800 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          }}
        />
        
        {/* Floating Elements */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: backgroundY2 }}
          className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-2xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-50 p-4 sm:p-6 safe-area-top"
      >
        <div className="container-responsive flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
              >
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl blur opacity-30"
              />
            </div>
            <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Task Flow
            </span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="group relative px-3 py-2 xs:px-4 xs:py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl font-semibold text-white shadow-xl shadow-blue-500/25 overflow-hidden text-xs xs:text-sm sm:text-base touch-target"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-1 sm:gap-2">
              <span className="hidden xs:inline">Get Started</span>
              <span className="xs:hidden">Start</span>
              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
        <div className="container-responsive text-center">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm text-white/80 mb-6 sm:mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="hidden sm:inline">Beautiful & Modern Design</span>
                <span className="sm:hidden">Modern Design</span>
              </span>
            </motion.div>

            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 sm:mb-8 leading-none"
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Productivity
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            >
              <span className="hidden sm:inline">Experience elegant task management with beautiful design, 
              intuitive organization, and seamless workflow automation.</span>
              <span className="sm:hidden">Beautiful task management with intuitive design and seamless workflow.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-20 px-4"
          >
            
          </motion.div>

          {/* Hero Preview */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="relative max-w-6xl mx-auto px-4 sm:px-0"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 60px rgba(59, 130, 246, 0.3)",
                    "0 0 100px rgba(59, 130, 246, 0.5)",
                    "0 0 60px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl sm:rounded-3xl"
              />
              
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">Task Flow</div>
                  </div>

                  {/* Dashboard Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Today's Focus</h3>
                      {[
                        { text: "Design system updates", completed: true, priority: "high" },
                        { text: "Client presentation prep", completed: false, priority: "high" },
                        { text: "Team retrospective meeting", completed: true, priority: "medium" },
                        { text: "Code review for new features", completed: false, priority: "low" }
                      ].map((task, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.5 + index * 0.2 }}
                          className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                            task.completed 
                              ? 'bg-emerald-500/15 border-emerald-500/30' 
                              : 'bg-white/8 border-white/20 hover:bg-white/12'
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-4 h-4 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 flex items-center justify-center ${
                              task.completed 
                                ? 'bg-emerald-500 border-emerald-500' 
                                : 'border-white/40 hover:border-blue-400'
                            }`}
                          >
                            {task.completed && <CheckIconSolid className="w-4 h-4 text-white" />}
                          </motion.div>
                          <span className={`flex-1 ${task.completed ? 'line-through text-white/60' : 'text-white'}`}>
                            {task.text}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            task.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {task.priority}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-2xl border border-blue-500/30">
                        <h4 className="text-white font-semibold mb-4">Weekly Progress</h4>
                        <div className="text-3xl font-bold text-white mb-2">87%</div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "87%" }}
                            transition={{ duration: 2, delay: 2 }}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 p-6 rounded-2xl border border-emerald-500/30">
                        <h4 className="text-white font-semibold mb-4">Focus Time</h4>
                        <div className="text-3xl font-bold text-white mb-2">5.2h</div>
                        <div className="text-emerald-300 text-sm">+23% from last week</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transform Your Daily Routine Section */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Daily Routine
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto px-4">
              <span className="hidden sm:inline">Build better habits and create a sustainable productivity system that works for you</span>
              <span className="sm:hidden">Build better habits with a sustainable productivity system</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {routineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative touch-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-500 text-center card-mobile">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl backdrop-blur-sm border border-white/20"
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4 group-hover:text-gray-200 transition-colors">
                    {step.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs sm:text-sm text-blue-300 font-medium">
                    <ClockIcon className="w-3 h-3" />
                    {step.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Productivity Tips */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative touch-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 group-hover:bg-white/12 transition-all duration-500 text-center card-mobile">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎯</div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">80/20 Rule</h4>
                  <p className="text-gray-300 text-xs sm:text-sm">Focus on the 20% of tasks that deliver 80% of your results</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative touch-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 group-hover:bg-white/12 transition-all duration-500 text-center card-mobile">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">2-Minute Rule</h4>
                  <p className="text-gray-300 text-xs sm:text-sm">If it takes less than 2 minutes, do it now instead of adding to your list</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative touch-hover sm:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 group-hover:bg-white/12 transition-all duration-500 text-center card-mobile">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔄</div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Weekly Review</h4>
                  <p className="text-gray-300 text-xs sm:text-sm">Reflect on progress and adjust your system for continuous improvement</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Peak Performance
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto"
            >
              Experience next-generation productivity tools designed for modern professionals
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-3xl p-8 group-hover:bg-white/12 group-hover:border-white/30 transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-2xl`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                How It
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}Works
              </span>
            </h2>
            <p className="text-xl text-gray-300">Follow these simple steps to transform your productivity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 group-hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-6xl font-black text-white/10 group-hover:text-blue-300/20 transition-colors">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * featureIndex }}
                        className="flex items-center text-sm text-blue-300"
                      >
                        <CheckIconSolid className="w-4 h-4 mr-2 text-green-400" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Task Flow Section */}
      <section className="relative z-10 py-32 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Choose
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}Task Flow?
              </span>
            </h2>
            <p className="text-xl text-gray-300">Experience the perfect blend of simplicity and power</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-2xl text-2xl`}
                    >
                      {benefit.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
                <blockquote className="text-2xl md:text-3xl font-light text-white/90 italic mb-8 leading-relaxed">
                  "Task Flow transformed how I manage my daily workflow. It's beautifully simple yet incredibly powerful."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div>
                    <div className="text-white font-semibold">Alex Thompson</div>
                    <div className="text-gray-400 text-sm">Product Manager at TechCorp</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/8 backdrop-blur-2xl border border-white/20 rounded-3xl p-16 group-hover:border-white/30 transition-all duration-500">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-black mb-8"
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Transform
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Your Productivity?
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join thousands of professionals who have revolutionized their workflow with Task Flow's 
                elegant and powerful productivity platform.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-xl text-white shadow-2xl shadow-blue-500/25 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center gap-3">
                  Start Your Journey Today
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="w-6 h-6" />
                  </motion.div>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mb-8 md:mb-0"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Task Flow
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center md:text-right"
            >
              <div className="mb-2">© 2025 Task Flow. All rights reserved.</div>
              <div className="text-sm">MADE WITH ❤️<br></br> THARUKSHA WICKRAMARACHCHI</div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 