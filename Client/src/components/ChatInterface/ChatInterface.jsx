import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage/ChatMessage';
import InputArea from './InputArea/InputArea';
import Header from './Header/Header';
import './ChatInterface.css';

// Define a larger set of suggested topics
const ALL_TOPICS = [
  { id: 1, text: "HTML-н тухай зааж өгөөч" },
  { id: 2, text: "CSS Flex-box тухай" },
  { id: 3, text: "React компонент" },
  { id: 4, text: "JavaScript функцуудын тухай" },
  { id: 5, text: "CSS Grid системийн тухай" },
  { id: 6, text: "React hooks ашиглах жишээ" },
  { id: 7, text: "HTML формын элементүүд" },
  { id: 8, text: "CSS animation жишээнүүд" },
  { id: 9, text: "JavaScript DOM манипуляци" },
  { id: 10, text: "React компонентын lifecycle" },
  { id: 11, text: "NodeJS үндэс" },
  { id: 12, text: "REST API тухай ойлголт" }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const messagesEndRef = useRef(null);
  const loadingTimerRef = useRef(null);

  // Get random suggested topics
  const getRandomTopics = (count = 3) => {
    // Shuffle the topics array and take the first 'count' items
    return [...ALL_TOPICS]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  // Initialize with random topics
  useEffect(() => {
    setSuggestedTopics(getRandomTopics());
  }, []);

  // Refresh suggested topics
  const refreshTopics = () => {
    setSuggestedTopics(getRandomTopics());
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Timer for long-running requests
  useEffect(() => {
    if (loading) {
      setLoadingTime(0);
      loadingTimerRef.current = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(loadingTimerRef.current);
      setLoadingTime(0);
    }

    return () => clearInterval(loadingTimerRef.current);
  }, [loading]);

  // Function to clear the chat
  const clearChat = () => {
    setMessages([]);
    setLoading(false);
    clearInterval(loadingTimerRef.current);
    setLoadingTime(0);
    // Refresh topics when starting a new chat
    refreshTopics();
  };

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
      // Make an API call to our backend with OpenRouter
      const response = await fetch('http://localhost:8000/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.response || 'Хариу өгөх үед алдаа гарлаа. Дахин оролдоно уу.',
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Уучлаарай, алдаа гарлаа. Дахин оролдоно уу.',
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <Header onNewChat={clearChat} />
      
      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h1>Би танд юугаар туслах вэ?</h1>
            <div className="suggestion-buttons">
              {suggestedTopics.map(topic => (
                <button 
                  key={topic.id} 
                  onClick={() => handleSendMessage(topic.text)}
                >
                  {topic.text}
                </button>
              ))}
            </div>
            <div className="refresh-topics">
              <button onClick={refreshTopics} className="refresh-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                Бусад санаанууд
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="loading-indicator">
                <div>Хариулж байна{'.'.repeat(loadingTime % 4)}</div>
                {loadingTime > 10 && (
                  <div className="loading-help-text">
                    Анх удаа ашиглаж байгаа бол хэдэн хором хүлээгээрэй (AI загвар татаж байна)...
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>
      
      <InputArea onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default ChatInterface; 