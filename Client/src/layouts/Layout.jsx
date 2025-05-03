import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { toggleTheme } from '../background/bg';
import './Layout.css';
import lightIcon from '../svg/light.svg';
import darkIcon from '../svg/dark.svg';
import '../svg/icons.css';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    document.addEventListener('themeChanged', handleThemeChange);
    
    return () => {
      document.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);
  
  return (
    <div className="layout">
      
      <Header />
      
      <div className="main-card card">
        {children}
      </div>
      
      <div className="bottom-controls">
        <div className="bottom-left">
          <button 
            className="icon-button"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? 
              <img src={darkIcon} alt="Dark mode" width="20" height="20" /> : 
              <img src={lightIcon} alt="Light mode" width="20" height="20" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout; 