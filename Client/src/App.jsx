import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Home from './components/home/Home';
import Layout from './layouts/Layout';
import LoadingScreen from './components/laoding/load';
import Bg from './background/bg';
import './index.css';
import Auth from "./components/Auth/auth.jsx";

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
      <Bg />
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
            <Route path="/login" element={<Auth/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
 