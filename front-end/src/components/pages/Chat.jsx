import React, { useState, useEffect, useRef } from 'react';
import { Phone, Paperclip, Circle, Users, Search, MoreVertical, Send, Shield, Info } from 'lucide-react';
import { useAuth, WORKER_PERSONAS } from '../../contexts/ThemeContext';
import '../styles/Chat.css';

const Chat = () => {
  const { user, isAdmin } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('auto_grid_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initialMessages = [];
      setMessages(initialMessages);
      localStorage.setItem('auto_grid_messages', JSON.stringify(initialMessages));
    }

    const handleStorageChange = (e) => {
      if (e.key === 'auto_grid_messages') {
        setMessages(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem('auto_grid_messages', JSON.stringify(newMessages));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const conversations = WORKER_PERSONAS.map((w) => ({
    id: w.id,
    name: w.name,
    avatar: w.initials,
    zone: w.zone,
    online: true,
    lastMessage: 'All systems nominal in my zone.',
    time: '5 min ago',
    role: w.role
  }));

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isAdmin) {
      if (!selectedChat) {
        setSelectedChat(conversations[0]);
      }
    } else {
      setSelectedChat({
        id: 'admin',
        name: 'Control Center',
        online: false,
        role: 'System Administrator'
      });
    }
  }, [isAdmin]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: isAdmin ? 'Control Center' : user?.name,
      senderId: isAdmin ? 'admin' : user?.id,
      receiverId: selectedChat.id,
      content: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };

    const updatedMessages = [...messages, newMsg];
    saveMessages(updatedMessages);
    setInputText('');

    if (!isAdmin && inputText.toLowerCase().includes('status')) {
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          sender: 'Control Center',
          senderId: 'admin',
          receiverId: user?.id,
          content: 'Current system status: ALL ZONES OPERATIONAL.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'received'
        };
        saveMessages([...updatedMessages, reply]);
      }, 1500);
    }
  };

  const currentChatMessages = messages.filter((msg) => {
    if (msg.type === 'system') return true;
    if (isAdmin) {
      return (msg.senderId === 'admin' && msg.receiverId === selectedChat?.id) ||
        (msg.senderId === selectedChat?.id && msg.receiverId === 'admin');
    }

    return (msg.senderId === user?.id && msg.receiverId === 'admin') ||
      (msg.senderId === 'admin' && msg.receiverId === user?.id);
  }).map((msg) => ({
    ...msg,
    type: msg.type === 'system'
      ? 'system'
      : msg.senderId === (isAdmin ? 'admin' : user?.id)
        ? 'sent'
        : 'received'
  }));

  return (
    <div className={`chat-container fadein ${!isAdmin ? 'worker-chat-view' : ''}`}>
      {isAdmin && (
        <div className="chat-sidebar">
          <div className="chat-header">
            <h3>GRID COMMUNICATIONS</h3>
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search field team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="conversations-list">
            <div className="active-users-label">
              <Circle size={8} fill="var(--green)" color="var(--green)" />
              ACTIVE PERSONNEL
            </div>
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedChat?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conv)}
              >
                <div className="conversation-avatar">
                  {conv.avatar}
                  {conv.online && <div className="online-indicator" />}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header-mini">
                    <h4 className="conversation-name">{conv.name}</h4>
                    <span className="conversation-zone">{conv.zone}</span>
                  </div>
                  <p className="last-message">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="chat-main">
        {selectedChat && (
          <>
            <div className="chat-header-main">
              <div className="chat-info">
                <div className="chat-avatar">
                  {!isAdmin && <Shield size={20} className="admin-shield" />}
                  {selectedChat.avatar}
                  <div className="online-indicator" />
                </div>
                <div className="chat-details">
                  <h4 className="chat-name">{selectedChat.name}</h4>
                  {!isAdmin && <span className="direct-line-badge">DIRECT LINE</span>}
                </div>
              </div>
            </div>

            <div className="messages-container">
              <div className="messages-list">
                {currentChatMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    <div className="message-meta">
                      {msg.senderId === (isAdmin ? 'admin' : user?.id) ? 'You' : msg.sender} · {msg.time}
                    </div>
                    <div className="message-bubble">{msg.content}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="message-input-container">
              <form className="input-wrapper" onSubmit={handleSendMessage}>
                <div className="input-actions">
                  <button type="button" className="icon-btn" title="Attach file">
                    <Paperclip size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  className="message-input"
                  placeholder={isAdmin ? `Secure message to ${selectedChat.name}...` : 'Send updates, issues and casual messages to the Admin...'}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!inputText.trim()}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
