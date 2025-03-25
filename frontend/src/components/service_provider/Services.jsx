import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

const serviceCategories = [
  'Home Cleaning',
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Gardening',
  'Appliance Repair',
  'Moving Services',
  'Pest Control',
  'Other'
];

function Services() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    availability: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const currentUser = authService.getCurrentUser();
      const serviceData = {
        ...formData,
        userId: currentUser.id,
        userEmail: currentUser.email,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      // Make API call to save service data
      const response = await fetch('http://localhost:4000/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit service');
      }

      setSuccess('Service submitted successfully!');
      setFormData({
        title: '',
        category: '',
        description: '',
        price: '',
        location: '',
        availability: '',
        contactNumber: ''
      });

      // Navigate to manage services after short delay
      setTimeout(() => {
        navigate('/manage-services');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to submit service. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#1a73e8' }}>
        Submit a New Service
      </Typography>

      <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Service Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {serviceCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: '₹'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Availability"
                  name="availability"
                  placeholder="e.g., Mon-Fri, 9 AM - 6 PM"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    backgroundColor: '#1a73e8',
                    '&:hover': {
                      backgroundColor: '#1557b0',
                    }
                  }}
                >
                  Submit Service
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Services;