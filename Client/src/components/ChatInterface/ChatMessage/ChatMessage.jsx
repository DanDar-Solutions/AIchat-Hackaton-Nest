import { useState, useEffect } from 'react';
import './ChatMessage.css';
import CodeBlock from './CodeBlock';
import './CodeBlock.css';

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [parsedContent, setParsedContent] = useState([]);
  
  useEffect(() => {
    if (!message.text) return;
    
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let matches = [];
    let lastIndex = 0;
    let match;
    

    while ((match = codeBlockRegex.exec(message.text)) !== null) {
      if (match.index > lastIndex) {
        matches.push({
          type: 'text',
          content: message.text.substring(lastIndex, match.index)
        });
      }
      
      matches.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2],
        title: getCodeTitle(match[1], match[2])
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < message.text.length) {
      matches.push({
        type: 'text',
        content: message.text.substring(lastIndex)
      });
    }
    
    if (matches.length === 0) {
      matches.push({
        type: 'text',
        content: message.text
      });
    }
    
    setParsedContent(matches);
  }, [message.text]);
  
  const getCodeTitle = (language, code) => {
    if (language === 'html') return 'html';
    if (language === 'css') return 'css';
    if (language === 'javascript' || language === 'js') return 'javascript';
    return language || '';
  };
  
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
          {parsedContent.map((block, index) => (
            block.type === 'text' ? (
              <div key={index} className="text-block">
                {block.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < block.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            ) : (
              <CodeBlock
                key={index}
                language={block.language}
                code={block.content}
                title={block.title}
              />
            )
          ))}
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