import { AnimatePresence, motion } from "framer-motion";
import TodoForm from "./todo/TodoForm";
import TodoItem from "./todo/TodoItem";
import TodoFilters from "./TodoFilters";
import TodoStats from "./stats/TodoStats";
import useTodoStore from "../store/todoStore";
import Footer from "./Footer";

function TodoApp({ onBackToLanding }) {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-800 relative overflow-hidden safe-area-top safe-area-bottom">
      {/* Enhanced Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 8,
          }}
          className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 15,
          }}
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-2xl"
        />
        
        {/* Additional premium background elements */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10">
        {/* Premium Container with better max-width */}
        <div className="container-responsive py-6 sm:py-8 lg:py-12">
          {/* Back to Landing Button - Enhanced */}
          {onBackToLanding && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 sm:mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBackToLanding}
                className="group relative overflow-hidden touch-target"
              >
                {/* Button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl blur-xl"></div>
                
                {/* Button content */}
                <div className="relative flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-gray-300 hover:text-blue-400 bg-white/8 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl hover:bg-white/12 hover:border-blue-400/30 transition-all duration-300 shadow-xl">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Landing</span>
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* Premium Main Layout Grid */}
          <div className="mt-4 sm:mt-8">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Left Column - Enhanced Stats Dashboard */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="xl:col-span-4 space-y-4 sm:space-y-6 order-2 xl:order-1"
              >
                <TodoStats todos={todos} />
                
                {/* Additional Premium Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative group"
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Info card */}
                  <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl group-hover:bg-white/12 transition-all duration-300 card-mobile">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1">Productivity Boost</h3>
                        <p className="text-white/70 text-xs sm:text-sm">Stay organized and achieve your goals with Task Flow Pro</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Enhanced Todo Management */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="xl:col-span-8 space-y-6 sm:space-y-8 order-1 xl:order-2"
              >
                
                {/* Todo Form Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <TodoForm onAdd={addTodo} />
                </motion.div>

                {/* Filters Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl sm:rounded-3xl blur-xl"></div>
                  
                  {/* Filters card */}
                  <div className="relative bg-white/8 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl card-mobile">
                    <TodoFilters
                      filter={filter}
                      onFilterChange={setFilter}
                      todoCount={activeTodoCount}
                    />
                  </div>
                </motion.div>

                {/* Todo List Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  {/* Section Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {filter === "all" && "All Tasks"}
                      {filter === "active" && "Active Tasks"}
                      {filter === "completed" && "Completed Tasks"}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  </div>
                  
                  {/* Todo Items Container */}
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent hover:scrollbar-thumb-blue-500/40">
                    <AnimatePresence mode="popLayout">
                      {filteredTodos.length > 0 ? (
                        filteredTodos.map((todo, index) => (
                          <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.8 }}
                            transition={{ 
                              delay: index * 0.05,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                          >
                            <TodoItem
                              todo={todo}
                              onToggle={toggleTodo}
                              onDelete={deleteTodo}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          {/* Background glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>
                          
                          {/* Empty state card */}
                          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-16 text-center shadow-2xl">
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25"
                            >
                              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </motion.div>
                            
                            <h3 className="text-3xl font-bold text-white mb-4">
                              {filter === "completed" 
                                ? "No completed tasks yet"
                                : filter === "active"
                                ? "All caught up!"
                                : "Ready to be productive?"
                              }
                            </h3>
                            
                            <p className="text-xl text-gray-300 leading-relaxed max-w-md mx-auto">
                              {filter === "completed" 
                                ? "Complete some tasks to see them here and celebrate your achievements."
                                : filter === "active"
                                ? "You have no pending tasks. Time to add some new goals and keep the momentum going!"
                                : "Add your first task above and start organizing your day with our beautiful task management system."
                              }
                            </p>
                            
                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                                  style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 2) * 40}%`,
                                  }}
                                  animate={{
                                    y: [-10, 10, -10],
                                    opacity: [0.3, 0.8, 0.3],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Clear Completed Button - Enhanced */}
                {todos.some((todo) => todo.completed) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center pt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearCompleted}
                      className="group relative overflow-hidden"
                    >
                      {/* Button glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                      
                      {/* Button content */}
                      <div className="relative px-8 py-4 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300 border border-white/20 hover:border-red-400/30 bg-white/8 backdrop-blur-xl shadow-xl">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Clear completed tasks
                        </span>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default TodoApp; 