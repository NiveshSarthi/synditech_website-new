import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white">Chat with us!</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 h-64 flex items-center justify-center text-gray-600">
              <p className="text-center">
                Chat feature coming soon!<br />
                For now, please visit our contact page.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/50 flex items-center justify-center transition-shadow focus-ring"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  )
}

export default ChatBot