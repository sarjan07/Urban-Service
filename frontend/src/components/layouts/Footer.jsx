import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#2c3e50', // Dark blue background
        color: '#ecf0f1', // Light gray text
        textAlign: 'center', // Center-align the text
        padding: '20px 0', // Add some padding
        fontSize: '14px', // Set font size        
        width: '100%', // Full width
        borderTop: '2px solid #3498db', // Add a top border for a modern touch
        overflowY: 'auto', // Make it scrollable if content overflows,
        marginTop: '40px'
      }}
    >
      <p>&copy; {new Date().getFullYear()} Urban Service | All rights reserved.</p>
      <div>
        <a href="/about" style={{ color: '#3498db', margin: '0 10px', textDecoration: 'none' }}>About Us</a>
        <a href="/contact" style={{ color: '#3498db', margin: '0 10px', textDecoration: 'none' }}>Contact</a>
        <a href="/privacy" style={{ color: '#3498db', margin: '0 10px', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/terms" style={{ color: '#3498db', margin: '0 10px', textDecoration: 'none' }}>Terms of Service</a>
        <a href="/faq" style={{ color: '#3498db', margin: '0 10px', textDecoration: 'none' }}>FAQ</a>
      </div>
      <div style={{ marginTop: '10px' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>🌐 Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>🐦 Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>📸 Instagram</a>
        <a href="https://linkedin.com/in/sarjanpatel07" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>💼 LinkedIn</a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>▶️ YouTube</a>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#bdc3c7' }}>
        <p>🌍 Serving customers worldwide | 📞 Customer Support: +1-800-123-4567 | ✉️ Email: support@urbanservice.com</p>
        <p>Designed with ❤️ by Sarjan Patel</p>
      </div>
    </footer>
  );
};

export default Footer;