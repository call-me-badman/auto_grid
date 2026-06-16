import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import '../styles/AI.css';

const AI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      text: "Hi, I'm having trouble logging into my online banking account. Can you help?",
      avatar: 'https://i.pravatar.cc/150?u=user1'
    },
    {
      id: 2,
      type: 'ai',
      text: "Sure thing! What's your account username or email? I'll check it out.",
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai-bot'
    },
    {
      id: 3,
      type: 'user',
      text: "My username is {username}",
      avatar: 'https://i.pravatar.cc/150?u=user1'
    },
    {
      id: 4,
      type: 'ai',
      text: "It seems like there is an issue with your login. Have you tried resetting your password?",
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai-bot'
    },
    {
      id: 5,
      type: 'user',
      text: "I tried, but it isn't working.",
      avatar: 'https://i.pravatar.cc/150?u=user1'
    },
    {
      id: 6,
      type: 'ai',
      text: "I'm sorry to hear you're having issues. Let me check to see if there is something wrong in our system.",
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai-bot'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      avatar: 'https://i.pravatar.cc/150?u=user1'
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: "I'm analyzing your request. Please wait a moment...",
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai-bot'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="ai-container">
      <div className="ai-chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.type}`}>
            <img src={msg.avatar} alt={msg.type} className="avatar" />
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-row ai">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=ai-bot" alt="AI" className="avatar" />
            <div className="message-bubble typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="ai-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="ai-input"
          placeholder="Ask AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="send-btn">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AI;
