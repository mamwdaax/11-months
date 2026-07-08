import React from 'react';
import { motion } from 'framer-motion';

export default function Message() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 1
    }}>
      <motion.div 
        className="glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        style={{
          maxWidth: '800px',
          padding: '3rem',
          borderRadius: '24px',
          textAlign: 'center',
          lineHeight: '2.2',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'var(--text-primary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--accent-primary)'
        }}>
          Happy 11th Monthiversary, my beloved.
        </h2>
        
        <p style={{ marginBottom: '1.5rem', fontWeight: 300 }}>
          With July comes the final month for the first of many anniversaries to come. 
          Though we have a considerable distance between the two of us, I have found you 
          extremely close to my heart.
        </p>
        
        <p style={{ marginBottom: '1.5rem', fontWeight: 300 }}>
          And though the challenges in front of us have been great and the difficulties 
          of a long distance relationship is not hidden from any, the two of us have found 
          ways to bond over various things, and it is my utmost belief that the art the 
          two of us consume together shapes our thoughts and relationships.
        </p>
        
        <p style={{ fontWeight: 300 }}>
          One of the forms of art that you have newly started to explore alongside me is anime 
          and cinema, hence why today I present you this website which is a short attempt 
          at allowing us to recollect those animes which we have watched, and think of 
          what more we can enjoy together.
        </p>
      </motion.div>
    </section>
  );
}
