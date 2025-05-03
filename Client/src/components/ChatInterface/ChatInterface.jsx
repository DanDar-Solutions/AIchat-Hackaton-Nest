import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage/ChatMessage';
import InputArea from './InputArea/InputArea';
import Header from './Header/Header';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // This is a placeholder for the actual API call
      // In a real app, you'd connect to your backend or OpenRouter
      
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Энэ бол хариу жишээ. Бодит хариуг backend-тэй холбогдож авах хэрэгтэй.',
        };
        
        setMessages(prev => [...prev, botResponse]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <Header />
      
      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h1>Би танд юугаар туслах вэ?</h1>
            <div className="suggestion-buttons">
              <button onClick={() => handleSendMessage("HTML-н тухай зааж өгөөч")}>
                HTML-н тухай зааж өгөөч
              </button>
              <button onClick={() => handleSendMessage("CSS Flex-box тухай")}>
                CSS Flex-box тухай
              </button>
              <button onClick={() => handleSendMessage("React компонент")}>
                React компонент
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && <div className="loading-indicator">Хариулж байна...</div>}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>
      
      <InputArea onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default ChatInterface; 