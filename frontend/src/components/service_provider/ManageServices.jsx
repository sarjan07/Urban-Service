import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    availability: '',
    contactNumber: ''
  });

  useEffect(() => {
    fetchUserServices();
  }, []);

  const fetchUserServices = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      const response = await fetch(`http://localhost:3000/api/services/user/${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditFormData({
      title: service.title,
      category: service.category,
      description: service.description,
      price: service.price,
      location: service.location,
      availability: service.availability,
      contactNumber: service.contactNumber
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/services/${selectedService._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      // Update the services list with the edited service
      setServices(services.map(service => 
        service._id === selectedService._id ? { ...service, ...editFormData } : service
      ));

      setEditDialogOpen(false);
      setSelectedService(null);
    } catch (err) {
      setError('Failed to update service. Please try again.');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete service');
        }

        // Remove the deleted service from the list
        setServices(services.filter(service => service._id !== serviceId));
      } catch (err) {
        setError('Failed to delete service. Please try again.');
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1a73e8' }}>
        Manage Your Services
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {services.length === 0 ? (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You haven't submitted any services yet.
          </Typography>
          <Button
            variant="contained"
            href="/services"
            sx={{
              mt: 2,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' }
            }}
          >
            Submit a Service
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} md={6} key={service._id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {service.title}
                    </Typography>
                    <Box>
                      <IconButton 
                        onClick={() => handleEditClick(service)}
                        size="small"
                        sx={{ color: '#1a73e8' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteService(service._id)}
                        size="small"
                        sx={{ color: '#d32f2f' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Chip 
                    label={service.category}
                    size="small"
                    sx={{ mb: 2, backgroundColor: '#e8f0fe', color: '#1a73e8' }}
                  />

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Price: ₹{service.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Location: {service.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Availability: {service.availability}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Service Title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
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
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={editFormData.price}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Availability"
                  name="availability"
                  value={editFormData.availability}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={editFormData.contactNumber}
                  onChange={handleEditChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleEditSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageServices; 