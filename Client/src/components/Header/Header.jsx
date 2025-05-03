import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="toggle-icon">{menuOpen ? '×' : '☰'}</span>
        </button>
        <div className="logo">
          <span>CodeDex</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="button-new">Шинэ</button>
        <button className="button-profile">Хэрэглэгч</button>
      </div>
    </header>
  );
};

export default Header; 