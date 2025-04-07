import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contact Us 📞
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Have questions or need support? Fill out the form below or reach us at <strong>support@urbanservice.com</strong>.
      </Typography>
      
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
        <TextField label="Your Name" variant="outlined" fullWidth required />
        <TextField label="Your Email" type="email" variant="outlined" fullWidth required />
        <TextField label="Message" multiline rows={4} variant="outlined" fullWidth required />
        <Button variant="contained" color="primary" size="large">Send Message 🚀</Button>
      </Box>
      
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        📍 Our Location
      </Typography>
      <Typography variant="body1" align="center">
        Urban Service HQ, 123 Business Road, City, Country
      </Typography>
    </Container>
  );
};

export default Contact;
