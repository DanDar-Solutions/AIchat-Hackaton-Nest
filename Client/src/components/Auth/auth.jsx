import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import Header from "../Header/Header.jsx";


function Auth(){
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData({ ...signupData, [id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Хэрэглэгчийн мэдээллийг хадгалах (жишээ нь localStorage-д)
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/home');
      } else {
        // Алдааны мессежийг харуулах
        alert('Нэвтрэхэд алдаа гарлаа. И-мэйл эсвэл нууц үгээ шалгана уу.');
      }
    } catch (error) {
      console.error('Нэвтрэх үед алдаа гарлаа:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      
      if (response.ok) {
        alert('Бүртгэл амжилттай үүслээ. Одоо нэвтэрч болно.');
        setIsRightPanelActive(false);
      } else {
        const errorData = await response.json();
        alert(`Бүртгүүлэхэд алдаа гарлаа: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Бүртгүүлэх үед алдаа гарлаа:', error);
    }
  };

  return (<>
    <Header/>
    <div className={styles.body}>
      <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`} id="container">
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={handleSignup}>
            <h1 className={styles.h1}>Бүртгэл үүсгэх</h1>
            <span className={styles.span}>эсвэл бүртгүүлэхдээ email ашиглана уу</span>
            <div className={styles.formGroup}>
              <input className={styles.input} type="text" id="name" placeholder=" " required 
                value={signupData.name} onChange={handleSignupChange} />
              <label className={styles.label} htmlFor="name">Нэр</label>
            </div>
            
            <div className={styles.formGroup}>
              <input className={styles.input} type="email" id="email" placeholder=" " required 
                value={signupData.email} onChange={handleSignupChange} />
              <label className={styles.label} htmlFor="email">Email</label>
            </div>
            
            <div className={styles.formGroup}>
              <input className={styles.input} type="password" id="password" placeholder=" " required 
                value={signupData.password} onChange={handleSignupChange} />
              <label className={styles.label} htmlFor="password">Нууц үг</label>
            </div>
            <button className={styles.button} type="submit">Бүртгүүлэх</button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={handleLogin}>
            <h1 className={styles.h1}>Нэвтрэх</h1>
            <span className={styles.span}>эсвэл бүртгэлээ ашиглана уу</span>
            
            <div className={styles.formGroup}>
              <input className={styles.input} type="email" id="email" placeholder=" " required 
                value={loginData.email} onChange={handleLoginChange} />
              <label className={styles.label} htmlFor="email">Email</label>
            </div>

            <div className={styles.formGroup}>
              <input className={styles.input} type="password" id="password" placeholder=" " required 
                value={loginData.password} onChange={handleLoginChange} />
              <label className={styles.label} htmlFor="password">Нууц үг</label>
            </div>

            <Link to="/foget" className={styles.a}>Нууц үгээ мартсан уу?</Link>

            <button className={styles.button} type="submit">Нэвтрэх</button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.h1}>Эргээд тавтай морил!</h1>
              <p className={styles.p}>Бидэнтэй холбоотой байхын тулд хувийн мэдээллээр нэвтэрнэ үү</p>
              <button className={`${styles.button} ${styles.buttonGhost}`} id="signIn" onClick={handleSignInClick}>Нэвтрэх</button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}>Сайн уу, Найз!</h1>
              <p className={styles.p}>Хувийн мэдээллээ оруулаад бидэнтэй хамт аялалаа эхлүүлээрэй</p>
              <button className={`${styles.button} ${styles.buttonGhost}`} id="signUp" onClick={handleSignUpClick}>Бүртгүүлэх</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Auth; 