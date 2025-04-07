import React from 'react';
import { Container, Typography } from '@mui/material';

const Privacy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Privacy Policy 🔒
      </Typography>
      <Typography variant="body1" paragraph>
        At Urban Service, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        1. Information We Collect 📝
      </Typography>
      <Typography variant="body1" paragraph>
        We may collect personal details such as your name, email, phone number, and payment details when you use our services.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        2. How We Use Your Information 💡
      </Typography>
      <Typography variant="body1" paragraph>
        Your data helps us provide better services, process transactions, and improve user experience on our platform.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        3. Data Protection & Security 🔐
      </Typography>
      <Typography variant="body1" paragraph>
        We implement industry-standard security measures to keep your personal information safe and prevent unauthorized access.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        4. Your Rights & Choices ⚖️
      </Typography>
      <Typography variant="body1" paragraph>
        You have the right to access, update, or delete your personal information. Contact us at privacy@urbanservice.com for any concerns.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        5. Contact Us 📩
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about our Privacy Policy, feel free to reach out at privacy@urbanservice.com.
      </Typography>
    </Container>
  );
};

export default Privacy;