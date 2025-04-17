import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  useTheme,
  InputAdornment,
  Autocomplete,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

const AddBooking = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    categoryId: '',
    subCategoryId: '',
    serviceId: '',
    bookingDate: '',
    bookingTime: '',
    notes: '',
    price: 0,
  });

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/allcategory');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchServices = async () => {
    try {
        const response = await axios.get('/services');
      if (response.data.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`/category/${categoryId}/subcategories`);
      if (response.data.success) {
        setSubCategories(response.data.subCategories);
      }
    } catch (error) {
      toast.error('Failed to fetch subcategories');
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFormData({
      ...formData,
      categoryId,
      subCategoryId: '',
      serviceId: '',
    });
    if (categoryId) {
      fetchSubCategories(categoryId);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (event) => {
    const subCategoryId = event.target.value;
    setFormData({
      ...formData,
      subCategoryId,
      serviceId: '',
    });
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    const selectedService = services.find(service => service._id === serviceId);
    setFormData({
      ...formData,
      serviceId,
      price: selectedService ? selectedService.price : 0,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      bookingDate: date ? date.toISOString().split('T')[0] : '',
    });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      bookingTime: time ? time.toLocaleTimeString('en-US', { hour12: false }) : '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/admin/bookings', formData);
      if (response.data.success) {
        toast.success('Booking created successfully');
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          categoryId: '',
          subCategoryId: '',
          serviceId: '',
          bookingDate: '',
          bookingTime: '',
          notes: '',
          price: 0,
        });
        setSelectedDate(null);
        setSelectedTime(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <AddIcon sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Create New Booking
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Customer Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Service Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Service Selection
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.categoryId}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={!formData.categoryId}>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  value={formData.subCategoryId}
                  onChange={handleSubCategoryChange}
                  label="Sub Category"
                >
                  <MenuItem value="">
                    <em>Select a sub category</em>
                  </MenuItem>
                  {subCategories.map((subCategory) => (
                    <MenuItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required disabled={!formData.subCategoryId}>
                <InputLabel>Service</InputLabel>
                <Select
                  value={formData.serviceId}
                  onChange={handleServiceChange}
                  label="Service"
                >
                  <MenuItem value="">
                    <em>Select a service</em>
                  </MenuItem>
                  {services
                    .filter(service => service.subCategoryId === formData.subCategoryId)
                    .map((service) => (
                      <MenuItem key={service._id} value={service._id}>
                        {service.name} - ${service.price}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                value={formData.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Booking Schedule */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Booking Schedule
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Booking Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Booking Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFormData({
                      customerName: '',
                      customerEmail: '',
                      customerPhone: '',
                      categoryId: '',
                      subCategoryId: '',
                      serviceId: '',
                      bookingDate: '',
                      bookingTime: '',
                      notes: '',
                      price: 0,
                    });
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                >
                  Create Booking
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBooking; 