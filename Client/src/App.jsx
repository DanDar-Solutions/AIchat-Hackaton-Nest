import { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface/ChatInterface';
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
        <Layout>
          <ChatInterface />
        </Layout>
      )}
    </>

  );
}

export default App;
 