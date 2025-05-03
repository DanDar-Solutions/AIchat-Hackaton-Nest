import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: 'Интерактив хичээлүүд',
      description: 'Алхам алхмаар зааварчилгаатай HTML, CSS, ReactJS суралцах'
    },
    {
      title: 'AI туслагч',
      description: 'Хувийн AI туслагч таны ойлгоогүй зүйлүүдийг тайлбарлан, хичээл дээр зааварчилгаа өгнө'
    },
    {
      title: 'Ахиц хянах',
      description: 'Өөрийн суралцах явцаа хянаж, хэзээ ч зогссон газраасаа үргэлжлүүлэх боломжтой'
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