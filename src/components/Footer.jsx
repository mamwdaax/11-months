import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      borderTop: '1px solid var(--card-border)',
      marginTop: '2rem'
    }}>
      <p style={{ 
        color: 'var(--text-secondary)',
        fontSize: '1.2rem',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic'
      }}>
        To many more months, adventures, and anime binges.
      </p>
      <div style={{ marginTop: '1.5rem', fontSize: '2rem' }} className="heart-icon">
        ♥
      </div>
    </footer>
  );
}
