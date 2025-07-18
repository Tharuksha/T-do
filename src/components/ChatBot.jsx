import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, PaperAirplaneIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": window.location.href,
    "X-Title": "Task Flow AI Assistant",
  },
  dangerouslyAllowBrowser: true
});

// System message to guide AI responses
const SYSTEM_MESSAGE = {
  role: "system",
  content: `You are Task Flow's AI assistant, specifically designed to help users with the Task Flow application and task management.

  Key Features to Support:
  - Task Creation & Organization: Help users create, organize, and manage their tasks effectively
  - Priority Management: Guide users on setting task priorities (high, medium, low)
  - Due Dates: Assist with deadline management and time-sensitive tasks
  - Task Filtering: Help users understand how to filter and find their tasks
  - Progress Tracking: Guide users on monitoring their task completion rates and productivity
  - Task Stats: Explain the statistics and metrics shown in the dashboard
  
  Response Guidelines:
  - Keep responses focused on Task Flow features and task management
  - Provide specific, actionable advice using Task Flow's features
  - Use a professional but friendly tone
  - Reference the app's UI elements when relevant (e.g., "Click the + button to add a task")
  - For questions about features not in Task Flow, suggest workarounds using existing features
  - Keep responses concise and practical
  - Use emojis occasionally to maintain the app's modern feel
  
  When users ask about:
  - General productivity: Relate answers back to Task Flow's features
  - Technical issues: Provide basic troubleshooting steps
  - Missing features: Suggest alternatives using existing functionality
  - Unrelated topics: Politely redirect to task management topics`
};

// Quick suggestion messages tailored to Task Flow
const SUGGESTIONS = [
  { text: "How do I add a new task?", icon: "➕" },
  { text: "How do task priorities work?", icon: "🎯" },
  { text: "How to use task filters?", icon: "🔍" },
  { text: "Explain the task statistics", icon: "📊" },
  { text: "Tips for using Task Flow effectively", icon: "💡" }
];

const CLEAR_TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatContainerRef = useRef(null);
  const clearTimeoutRef = useRef(null);

  // Add new function to scroll to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      
      chatContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll effect to use the new function
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        scrollToBottom();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Handle chat cleanup when closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      // Set a timeout to clear messages
      clearTimeoutRef.current = setTimeout(() => {
        setMessages([]);
        setShowSuggestions(true);
      }, CLEAR_TIMEOUT);
    }

    // Clear the timeout if chat is reopened or component unmounts
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
    };
  }, [isOpen, messages.length]);

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: messageText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_MESSAGE.content}
            Additional formatting guidelines:
            - Do not use markdown syntax (* or ** for emphasis)
            - Use plain text formatting
            - You can use emojis directly
            - Separate sections with line breaks
            - Use simple bullet points with emojis instead of markdown`
          },
          ...messages,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      // Clean up markdown characters from the response
      let cleanedContent = completion.choices[0].message.content
        .replace(/\*\*/g, '')  // Remove bold markdown
        .replace(/\*/g, '')    // Remove italic markdown
        .replace(/\_/g, '')    // Remove underscore emphasis
        .replace(/`/g, '')     // Remove code blocks
        .trim();

      const assistantMessage = {
        role: 'assistant',
        content: cleanedContent
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion.text);
  };

  return (
    <>
      {/* Chat Toggle Button - Improved mobile positioning */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 group"
      >
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25"
          >
            <ChatBubbleLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-50"
          />
        </div>
      </motion.button>

      {/* Chat Interface - Improved mobile layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed sm:bottom-24 bottom-0 right-0 sm:right-8 z-50 w-full sm:w-96 max-h-[100vh] sm:max-h-[600px] flex flex-col"
          >
            <div className="relative flex-1 h-full sm:h-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 sm:rounded-2xl blur-xl" />

              {/* Chat container */}
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/20 sm:rounded-2xl shadow-2xl flex flex-col h-[100dvh] sm:h-[600px]">
                {/* Header */}
                <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">Task Assistant</h3>
                      <p className="text-[10px] sm:text-xs text-white/60">Ask me about productivity!</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseChat}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Messages Container - Improved scrolling */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                  style={{
                    height: 'auto',
                    minHeight: '200px',
                    maxHeight: 'calc(100dvh - 130px)',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/10 rounded-xl p-5 text-white/90"
                    >
                      <p className="text-[0.925rem] font-medium mb-3 tracking-wide">
                        👋 Hi! I'm your Task Flow assistant. I can help you with:
                      </p>
                      <ul className="text-[0.875rem] space-y-2 text-white/70 tracking-wide">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          Creating and organizing tasks
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          Setting priorities and deadlines
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          Understanding task statistics
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          Using Task Flow features effectively
                        </li>
                      </ul>
                    </motion.div>
                  )}

                  {/* Chat Messages */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-xl ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white ml-4'
                            : 'bg-white/10 text-white/90'
                        }`}
                      >
                        <p className={`leading-relaxed tracking-wide ${
                          message.role === 'user' 
                            ? 'text-sm font-medium'
                            : 'text-[0.925rem] font-normal'
                        }`}>
                          {message.content.split('\n').map((line, i) => (
                            <span key={i} className="block mb-2 last:mb-0">
                              {line}
                            </span>
                          ))}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 rounded-xl p-4 space-x-1">
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-block w-2 h-2 bg-white/60 rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                          className="inline-block w-2 h-2 bg-white/60 rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                          className="inline-block w-2 h-2 bg-white/60 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Suggestions */}
                  {showSuggestions && messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 space-y-2"
                    >
                      <p className="text-xs text-white/60 mb-2">Quick Questions:</p>
                      {SUGGESTIONS.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-lg">{suggestion.icon}</span>
                          <span className="flex-1">{suggestion.text}</span>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <PaperAirplaneIcon className="w-4 h-4 transform -rotate-360" />
                          </motion.div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Input - Fixed at bottom */}
                <form onSubmit={handleFormSubmit} className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/95 shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about task management..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5 transform -rotate-360" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 