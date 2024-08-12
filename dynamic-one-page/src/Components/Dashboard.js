import React, { useEffect, useState } from 'react';
import { getBanner, updateBanner } from '../api'; // Import API functions
import './Dashboard.css';

function Dashboard({ 
  bannerVisible, 
  setBannerVisible, 
  bannerText, 
  setBannerText, 
  bannerTimer, 
  setBannerTimer, 
  bannerLink, 
  setBannerLink 
}) {
  const [textInput, setTextInput] = useState(bannerText || ''); // Initialize with default value
  const [linkInput, setLinkInput] = useState(bannerLink || ''); // Initialize with default value
  const [timerInput, setTimerInput] = useState(bannerTimer || 0); // Initialize with default value

  useEffect(() => {
    // Fetch the initial banner settings from the backend
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setTextInput(data.text || ''); // Default to empty string if undefined
        setLinkInput(data.link || ''); // Default to empty string if undefined
        setTimerInput(data.timer || 0); // Default to 0 if undefined
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  const handleSave = async () => {
    try {
      await updateBanner({ text: textInput, link: linkInput, timer: Number(timerInput) });
      setBannerText(textInput);
      setBannerLink(linkInput);
      setBannerTimer(Number(timerInput));
      alert('Banner updated successfully');
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Internal Dashboard</h2>
      <div className="control">
        <label>
          <input
            type="checkbox"
            checked={bannerVisible}
            onChange={() => setBannerVisible(!bannerVisible)}
          />
          Banner Visible
        </label>
      </div>
      <div className="control">
        <label>
          Banner Text:
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </label>
      </div>
      <div className="control">
        <label>
          Banner Link:
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        </label>
      </div>
      <div className="control">
        <label>
          Timer (seconds):
          <input
            type="number"
            value={timerInput}
            onChange={(e) => setTimerInput(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default Dashboard;
