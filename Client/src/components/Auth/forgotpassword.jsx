import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Нууц үгүүд зөв оруулсан эсэхийг шалгах
    if (formData.password !== formData.confirmPassword) {
      setError('Нууц үгүүд таарахгүй байна');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password
        }),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ email: '', name: '', password: '', confirmPassword: '' });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Нууц үг сэргээхэд алдаа гарлаа');
      }
    } catch (error) {
      console.error('Нууц үг сэргээх үед алдаа гарлаа:', error);
      setError('Серверт холбогдоход алдаа гарлаа');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container} id="container">
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Нууц үгээ сэргээх</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Нууц үг амжилттай шинэчлэгдлээ!</p>}
            <div className={styles.formPass}>
              <div className={styles.formGroup}>
                <input 
                  className={styles.input} 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className={styles.label} htmlFor="email">Email</label>
              </div>
              <div className={styles.formGroup}>
                <input 
                  className={styles.input} 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
                <label className={styles.label} htmlFor="name">Нэр</label>
              </div>
              <div className={styles.formGroup}>
                <input 
                  className={styles.input} 
                  type="password" 
                  id="password" 
                  placeholder=" " 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className={styles.label} htmlFor="password">Нууц үг</label>
              </div>
              <div className={styles.formGroup}>
                <input 
                  className={styles.input} 
                  type="password" 
                  id="confirmPassword" 
                  placeholder=" " 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <label className={styles.label} htmlFor="confirmPassword">Нууц үг давтах</label>
              </div>
              <Link to="/auth" className={styles.a} id="backToLogin">Буцах</Link>
              <button className={`${styles.button} ${styles.resetButton}`}>Сэргээх холбоос илгээх</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 