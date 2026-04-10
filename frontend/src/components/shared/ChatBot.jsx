import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { intents, defaultResponse, welcomeMessage } from '../../utils/faqs'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: welcomeMessage, isUser: false }])
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const findAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase().trim()
    
    if (!lowerInput) return defaultResponse

    let bestIntent = null
    let bestScore = 0

    for (const [intentName, intent] of Object.entries(intents)) {
      let score = 0

      for (const keyword of intent.keywords) {
        const kwLower = keyword.toLowerCase()
        
        if (lowerInput === kwLower) {
          score += kwLower.length * 3
        } else if (lowerInput.startsWith(kwLower + ' ') || lowerInput.startsWith(kwLower + '?') || lowerInput.startsWith(kwLower + '!')) {
          score += kwLower.length * 2
        } else if (lowerInput.includes(' ' + kwLower + ' ') || lowerInput.includes(' ' + kwLower + '?') || lowerInput.includes(' ' + kwLower + '!')) {
          score += kwLower.length * 1.5
        } else if (lowerInput.includes(kwLower)) {
          score += kwLower.length * 0.5
        }
      }

      if (score > bestScore) {
        bestScore = score
        bestIntent = intent
      }
    }

    if (bestScore > 0) {
      return bestIntent.response
    }
    
    return defaultResponse
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const userMessage = inputValue.trim()
    setMessages(prev => [...prev, { text: userMessage, isUser: true }])
    setInputValue('')
    
    setTimeout(() => {
      const botAnswer = findAnswer(userMessage)
      setMessages(prev => [...prev, { text: botAnswer, isUser: false }])
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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

            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.isUser
                        ? 'bg-green-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
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