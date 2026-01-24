// client/src/components/shared/ChatBot.jsx
import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! I am Synditech Intelligence. How may I help you?", sender: 'bot' }
  ])
  const [chatInput, setChatInput] = useState('')

  const handleChat = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }])
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Thank you for your message! Our team will get back to you shortly. You can also reach us at contact@synditech.com", 
          sender: 'bot' 
        }])
      }, 1000)
      setChatInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChat()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatOpen && (
        <div className="mb-4 w-80 bg-black border-2 border-orange-500 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="font-bold text-white">Synditech Intelligence</div>
                <div className="text-xs text-white/80">Online</div>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)} 
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black/50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white/10 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-orange-500/30 bg-black">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-white/10 border border-orange-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <button 
                onClick={handleChat}
                className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:scale-110 transition-transform"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>
    </div>
  )
}

export default ChatBot