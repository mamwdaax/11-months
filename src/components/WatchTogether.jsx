import React from 'react';
import { motion } from 'framer-motion';
import animeData from '../anime_data.json';

export default function WatchTogether({ watchlist = [], onAdd }) {
  const animeList = animeData.toWatch || [];

  return (
    <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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
          Watch Together
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          A curated list of adventures we should embark on next. Grab the popcorn!
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {animeList.map((anime, index) => {
          const isInWatchlist = watchlist.some(item => item.id === anime.id);
          return (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.5s ease, box-shadow 0.5s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px 0 rgba(0, 0, 0, 0.2)';
            }}
          >
            <div style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
              <img 
                src={anime.image} 
                alt={anime.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 1s ease'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{anime.title}</h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.9rem', 
                marginBottom: '1rem',
                flex: 1
              }}>
                {anime.synopsis}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {anime.genres.slice(0, 3).map(genre => (
                  <span 
                    key={genre}
                    style={{
                      background: 'var(--accent-glow)',
                      color: 'var(--accent-primary)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => onAdd(anime)}
                disabled={isInWatchlist}
                style={{
                  marginTop: 'auto',
                  padding: '0.75rem',
                  background: isInWatchlist ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                  color: isInWatchlist ? 'var(--text-secondary)' : '#1c2329',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: isInWatchlist ? 'default' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => !isInWatchlist && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={e => !isInWatchlist && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isInWatchlist ? 'Added' : 'Add to Watchlist'}
              </button>
            </div>
          </motion.div>
        );
      })}
      </div>
    </section>
  );
}
