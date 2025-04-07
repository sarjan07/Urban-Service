import React from 'react';
import { Container, Typography } from '@mui/material';

const Term = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Terms & Conditions 📜
      </Typography>
      
      <Typography variant="body1" paragraph>
        Welcome to <strong>Urban Service</strong>. By accessing our platform, you agree to comply with our terms and conditions. Please read them carefully before using our services.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        1. User Responsibilities 👥
      </Typography>
      <Typography variant="body1" paragraph>
        Users must provide accurate information, respect service providers, and adhere to all applicable laws while using our platform.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        2. Booking & Payments 💳
      </Typography>
      <Typography variant="body1" paragraph>
        All service bookings must be made through our official platform. Payments are securely processed, and users agree to our refund policies.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        3. Service Provider Policies 🛠️
      </Typography>
      <Typography variant="body1" paragraph>
        Service providers must adhere to ethical standards, provide high-quality service, and comply with Urban Service’s guidelines.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        4. Liability Disclaimer ⚠️
      </Typography>
      <Typography variant="body1" paragraph>
        Urban Service is not liable for any disputes, damages, or losses arising from services provided by third-party professionals.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        5. Modifications to Terms 🔄
      </Typography>
      <Typography variant="body1" paragraph>
        We reserve the right to update these terms at any time. Continued use of our platform signifies acceptance of the updated terms.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        6. Contact Us 📩
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about our Terms & Conditions, contact us at <strong>legal@urbanservice.com</strong>.
      </Typography>
    </Container>
  );
};

export default Term;