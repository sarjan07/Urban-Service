import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#2c3e50', // Dark blue background
        color: '#ecf0f1', // Light gray text
        textAlign: 'center', // Center-align the text
        padding: '10px 0', // Add some padding
        fontSize: '14px', // Set font size
        // position: 'fixed', // Fix the footer at the bottom
        left: 0,
        bottom: 0,
        width: '100%', // Full width
        borderTop: '2px solid #3498db', // Add a top border for a modern touch
      }}
    >
      <p>&copy; {new Date().getFullYear()} Urban Service | All rights reserved.</p>
    </footer>
  );
};

export default Footer;