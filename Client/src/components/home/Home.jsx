import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: 'Интерактив хичээлүүд',
      description: 'Алхам алхмаар зааварчилгаатай HTML, CSS, ReactJS суралцах',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 4L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'AI туслагч',
      description: 'Хувийн AI туслагч таны ойлгоогүй зүйлүүдийг тайлбарлан, хичээл дээр зааварчилгаа өгнө',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Ахиц хянах',
      description: 'Өөрийн суралцах явцаа хянаж, хэзээ ч зогссон газраасаа үргэлжлүүлэх боломжтой',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Хялбараар суралцах зам</h1>
          <p>HTML, CSS, ReactJS, NodeJS зэрэг програмчлалын хэлүүдийг AI туслагчтайгаар алхам алхмаар суралцах</p>
          <div className="hero-buttons">
            <Link to="/chat" className="btn btn-primary">Эхлэх</Link>
            <Link to="/login" className="btn btn-secondary">Нэвтрэх</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="code-window">
            <div className="code-header">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="code-title">example.html</div>
            </div>
            <pre className="code-content">
              <code>{`<div class="container">
  <h1>Hello World</h1>
  <p>Welcome to CodeDex!</p>
  <button class="btn">Start Learning</button>
</div>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Бидний давуу талууд</h2>
        <div className="features-container">
          <div className="features-nav">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-nav-item ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
              </div>
            ))}
          </div>
          <div className="feature-display">
            <h3>{features[activeFeature].title}</h3>
            <p>{features[activeFeature].description}</p>
            <div className="feature-image">
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Өнөөдөр кодчлол сурч эхэлцгээе</h2>
        <p>Нэг ч төгрөг төлөлгүйгээр эхлээд, хүссэн үедээ үргэлжлүүлэх боломжтой</p>
        <Link to="/signup" className="btn btn-primary">Үнэгүй бүртгүүлэх</Link>
      </section>
    </div>
  );
};

export default Home; 