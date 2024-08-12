// src/api.js

export const getBanner = async () => {
    const response = await fetch('http://localhost:5000/api/banner');
    if (!response.ok) {
      throw new Error('Failed to fetch banner settings');
    }
    return response.json();
  };
  
  export const updateBanner = async (bannerData) => {
    const response = await fetch('http://localhost:5000/api/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bannerData),
    });
    if (!response.ok) {
      throw new Error('Failed to update banner settings');
    }
    return response.json();
  };
  