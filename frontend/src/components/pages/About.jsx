import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Us 🌍
      </Typography>
      
      <Typography variant="body1" paragraph>
        Welcome to <strong>Urban Service</strong>, your one-stop platform for local services. Our mission is to connect customers with skilled professionals to make everyday tasks easier and hassle-free.
      </Typography>
      
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h5" gutterBottom>💡 Why Choose Us?</Typography>
        <Typography variant="body1">✔ Reliable and verified professionals</Typography>
        <Typography variant="body1">✔ Easy booking and secure payments</Typography>
        <Typography variant="body1">✔ 24/7 customer support</Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>🚀 Our Journey</Typography>
        <Typography variant="body1">
          Founded in [Year], Urban Service started with a vision to revolutionize the local service industry. Today, we proudly serve thousands of customers across multiple cities.
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>📞 Get in Touch</Typography>
        <Typography variant="body1">Have questions? Reach us at <strong>support@urbanservice.com</strong></Typography>
      </Box>
    </Container>
  );
};

export default About;
