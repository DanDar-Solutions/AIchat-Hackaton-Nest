import React from 'react';
import styles from "./Loading.module.css";

const load = ["Сайн уу","Hello", "안녕하세요", "Hola", "Cześć", "Ciao", "Привет", "你好", "สวัสดี"];

const LoadingScreen = () => {
  const [currentLoadName, setCurrentLoadName] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < load.length) {
        setCurrentLoadName(index);
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 222);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles["loading-screen"]} role="status" aria-label="Loading">
      {load[currentLoadName]}
    </div>
  );
};

export default LoadingScreen;
