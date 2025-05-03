import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onNewChat }) => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    if (typeof onNewChat === 'function') {
      onNewChat();
    } else {
      navigate('/chat', { replace: true });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span>CodeDex</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="button-new" onClick={handleNewChat}>Шинэ чат</button>
      </div>
    </header>
  );
};

export default Header; 