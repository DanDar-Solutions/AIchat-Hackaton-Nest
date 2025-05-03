import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}>
          <span>home</span>
        </Link>
        
        <Link to="/chat" className={`nav-button ${location.pathname === '/chat' ? 'active' : ''}`}>
          <span>chat</span>
        </Link>
      </div>
      
      <div className="header-right">
        <Link to="/signup" className="nav-button signup-btn">Бүртгүүлэх</Link>
      </div>
    </div>
  );
};

export default Header; 