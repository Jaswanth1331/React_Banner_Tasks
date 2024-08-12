import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [bannerText, setBannerText] = useState('Loading...');
  const [bannerTimer, setBannerTimer] = useState(10);
  const [bannerLink, setBannerLink] = useState('#');
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(bannerTimer);
  const [animateExit, setAnimateExit] = useState(false);

  // Fetch banner data from backend
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/banner');
        const data = await response.json();
        setBannerText(data.text);
        setBannerLink(data.link);
        setBannerTimer(data.timer);
        setTimeLeft(data.timer);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setAnimateExit(true);
      setTimeout(() => {
        setShowBanner(false);
        setAnimateExit(false);
      }, 500);
    }

    const timer = setInterval(() => {
      if (showBanner) {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showBanner]);

  useEffect(() => {
    if (showBanner) {
      setTimeLeft(bannerTimer);
    }
  }, [bannerTimer, showBanner]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      {showBanner && (
        <div className={`banner ${animateExit ? 'exit' : ''}`}>
          <button className="close-button" onClick={() => {
            setAnimateExit(true);
            setTimeout(() => {
              setShowBanner(false);
              setAnimateExit(false);
            }, 500);
          }}>
            &times;
          </button>
          <h1>{bannerText}</h1>
          <p>Banner will disappear in {timeLeft} seconds</p>
          <a href={bannerLink} className="banner-link">Learn More</a>
        </div>
      )}
      <main className={showBanner ? "blurred" : ""}>
        <h2>Content of the Website</h2>
        <p>This is a simple one-page website built with React.</p>
        <Dashboard 
          bannerVisible={showBanner} 
          setBannerVisible={setShowBanner} 
          bannerText={bannerText} 
          setBannerText={setBannerText} 
          bannerTimer={bannerTimer} 
          setBannerTimer={setBannerTimer} 
          bannerLink={bannerLink} 
          setBannerLink={setBannerLink} 
        />
      </main>
    </div>
  );
}

export default App;
