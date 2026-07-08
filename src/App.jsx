import React from 'react'
import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Message from './components/Message'
import WatchTogether from './components/WatchTogether'
import Watchlist from './components/Watchlist'
import Rankings from './components/Rankings'
import Footer from './components/Footer'
import './index.css'

import { config } from './config'

function App() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('jaan_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jaan_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddToWatchlist = (anime) => {
    if (!watchlist.find(item => item.id === anime.id)) {
      setWatchlist([...watchlist, anime]);
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (!config.backgroundImages || config.backgroundImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % config.backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Calming Crossfade Background */}
      <div className="animated-bg">
        {config.backgroundImages && config.backgroundImages.map((img, idx) => (
          <div 
            key={idx}
            className={`bg-layer ${idx === currentBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Soft Slate Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(28, 35, 41, 0.4)'
        }}></div>
      </div>

      <Hero />
      <Message />
      <WatchTogether watchlist={watchlist} onAdd={handleAddToWatchlist} />
      <Watchlist items={watchlist} onRemove={handleRemoveFromWatchlist} />
      <Rankings />
      <Footer />
    </div>
  )
}

export default App
