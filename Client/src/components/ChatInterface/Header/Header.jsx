import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span>CodeDex</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="button-new">Шинэ</button>
      </div>
    </header>
  );
};

export default Header; 