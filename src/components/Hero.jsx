import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { config } from '../config';
import { motion } from 'framer-motion';

export default function Hero() {
  const [days, setDays] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const start = new Date(config.startDate).getTime();
    const now = new Date().getTime();
    const difference = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    setDays(difference > 0 ? difference : 0);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted === false) {
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      }
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translateX(-50%) translateY(-50%)',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src={config.videoPath} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(28, 35, 41, 0.5)',
        zIndex: -1
      }} />

      {/* Audio Player */}
      <audio ref={audioRef} src={config.audioPath} loop muted={true} />
      
      <button 
        onClick={toggleMute}
        className="glass"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          padding: '0.75rem',
          borderRadius: '50%',
          border: 'none',
          color: 'var(--accent-primary)',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s ease'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Content */}
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            letterSpacing: '3px'
          }}
        >
          11 Months Down
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: 'var(--text-secondary)',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(28, 35, 41, 0.4)',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--card-border)'
          }}
        >
          <span>{days} beautiful days together</span>
          <span className="heart-icon">♥</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          color: 'var(--text-secondary)'
        }}
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </motion.div>
    </div>
  );
}
