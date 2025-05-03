import { useState } from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-content">
        <div className="avatar">
          {message.sender === 'bot' ? 'CD' : 'Та'}
        </div>
        <div className="message-text">
          {message.text}
        </div>
      </div>
      
      {message.sender === 'bot' && (
        <div className="message-actions">
          <button 
            className="copy-button" 
            onClick={copyToClipboard}
            title="Хуулж авах"
          >
            {copied ? (
              <span>✓ Хуулсан</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 