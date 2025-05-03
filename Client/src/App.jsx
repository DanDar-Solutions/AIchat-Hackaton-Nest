import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Home from './components/home/Home';
import Layout from './layouts/Layout';
import LoadingScreen from './components/laoding/load';
import './index.css';

function App() {
  const [contentLoaded, setContentLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 2100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <LoadingScreen />
      
      {contentLoaded && (
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout>
                  <Home />
                </Layout>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <Layout>
                  <ChatInterface />
                </Layout>
              } 
            />
            <Route path="/login" element={<Navigate to="/login_signup/index.html" />} />
            <Route path="/signup" element={<Navigate to="/login_signup/index.html" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
 