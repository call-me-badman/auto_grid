import React, { useState, useEffect } from 'react';
import { Phone, Paperclip, Circle, Users, Search, MoreVertical, Send } from 'lucide-react';
import { useAuth, WORKER_PERSONAS } from '../../contexts/ThemeContext';
import '../styles/Chat.css';

const Chat = () => {
  const { user, isAdmin } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  // Initialize conversations list for Admin
  const conversations = WORKER_PERSONAS.map(w => ({
    id: w.id,
    name: w.name,
    avatar: w.initials,
    zone: w.zone,
    online: true,
    lastMessage: 'All systems nominal in my zone.',
    time: '5 min ago'
  }));

  useEffect(() => {
    if (isAdmin) {
      // Set first worker as default chat for Admin
      setSelectedChat(conversations[0]);
    } else {
      // Worker only has one chat target: The Admin
      setSelectedChat({
        id: 'admin',
        name: 'Administrator',
        avatar: 'AD',
        online: true,
        role: 'System Administrator'
      });
    }

    // Initial dummy messages
    setMessages([
      { id: 1, sender: 'System', content: 'Connection secured. Encryption active.', time: '09:00 AM', type: 'system' },
      { id: 2, sender: isAdmin ? 'Jean Pierre' : 'Administrator', content: isAdmin ? 'Voltage stable at 220V, sir.' : `Persona ${user?.name}, check transformer B2.`, time: '09:05 AM', type: 'received' },
      { id: 3, sender: 'You', content: isAdmin ? 'Great. Check transformer B2 next.' : 'On it. Voltage stable at 220V.', time: '09:10 AM', type: 'sent' },
    ]);
  }, [isAdmin, user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      content: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulated reply
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: selectedChat.name,
        content: 'Acknowledged. Updating status log.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'received'
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="chat-container fadein">
      {isAdmin && (
        <div className="chat-sidebar">
          <div className="chat-header">
            <h3>Field Team</h3>
            <button className="new-chat-btn" title="New broadcast">
              <Users size={16} />
            </button>
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search workers..." />
          </div>

          <div className="conversations-list">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedChat?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conv)}
              >
                <div className="conversation-avatar">
                  {conv.avatar}
                  {conv.online && <Circle size={10} fill="var(--green)" color="var(--green)" className="online-indicator" />}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h4 className="conversation-name">{conv.name}</h4>
                    <span className="conversation-time">{conv.time}</span>
                  </div>
                  <p className="last-message">Zone: {conv.zone}</p>
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
                  {selectedChat.avatar}
                  <Circle size={12} fill="var(--green)" color="var(--green)" className="online-indicator" />
                </div>
                <div>
                  <h4 className="chat-name">{selectedChat.name}</h4>
                  <p className="chat-status">{isAdmin ? `Field Worker · ${selectedChat.zone}` : 'System Administrator'}</p>
                </div>
              </div>
              <div className="chat-actions">
                <button className="action-btn" title="Voice Call"><Phone size={18} /></button>
                <button className="action-btn" title="Attach Logs"><Paperclip size={18} /></button>
                <button className="action-btn"><MoreVertical size={18} /></button>
              </div>
            </div>

            <div className="messages-container">
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    {msg.type === 'received' && (
                      <div className="message-avatar-mini">{selectedChat.avatar}</div>
                    )}
                    <div className="message-content">
                      <div className="message-bubble">{msg.content}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="chat-input"
                placeholder={isAdmin ? `Message ${selectedChat.name}...` : 'Message Control Center...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={18} />
                <span>SEND</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
