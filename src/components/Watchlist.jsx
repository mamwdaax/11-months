import React from 'react';
import { motion } from 'framer-motion';

export default function Watchlist({ items, onRemove }) {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          color: 'var(--accent-primary)',
          marginBottom: '1rem' 
        }}>
          Jaan's Watchlist
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Shows you've saved to watch together!
        </p>
      </motion.div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {items.map((anime, index) => (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass"
            style={{
              width: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <div style={{ height: '280px', width: '100%', overflow: 'hidden' }}>
              <img 
                src={anime.image} 
                alt={anime.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{anime.title}</h3>
              <button
                onClick={() => onRemove(anime.id)}
                style={{
                  marginTop: 'auto',
                  padding: '0.5rem',
                  background: 'rgba(255, 50, 50, 0.2)',
                  border: '1px solid rgba(255, 50, 50, 0.4)',
                  color: '#ffaaaa',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 50, 50, 0.4)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 50, 50, 0.2)'}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
