import { useState, useEffect } from 'react';
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
  FormHelperText,
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

const Services = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    state: '',
    city: '',
    area: '',
    availability: '',
    contactNumber: ''
  });
  
  const [errors, setErrors] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    state: '',
    city: '',
    area: '',
    availability: '',
    contactNumber: ''
  });
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({});

  // Fetch states from API on component mount
  // useEffect(() => {
  //   const getStates = async () => {
  //     try {
  //       const response = await get('http://localhost:4000/state'
  //       //    {
  //       //   headers: {
  //       //     'Authorization': `Bearer ${authService.getToken()}`
  //       //   }
  //       // }
  //     );
        
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch states');
  //       }
        
  //       const data = await response.json();
  //       setStates(data);
  //     } catch (err) {
  //       console.error('Error fetching states:', err);
  //     }
  //   };
    
  //   getStates();
  // }, []);

  // Fetch cities when state is selected
  const getState = async () => {
    const res = await axios.get("https:localhost:4000/states");
    console.log("state object", res.data);
    setStates(res.data.data);

    // const res1 = await axios.get("/allcategory");
    // console.log("category object", res1.data.data);
    // setcategorys(res1.data.data);
    
    // const res2 = await axios.get("/allsubcategory");
    // console.log("subcategory object",res2.data.data)
    // setcategorys(res2.data.data)
  };
  
  // const getcategory = async()=>{

  // };

  const getCityByStateId = async (id) => {
    console.log(id);
    const res = await axios.get("https:localhost:4000/getcitybystate/" + id);
    console.log("city data: ", res.data.data);
    setCities(res.data.data);
  };

  useEffect(() => {
    getState();
  }, []);

  // Fetch areas when city is selected
  useEffect(() => {
    const fetchAreas = async () => {
      if (!formData.city) {
        setAreas([]);
        return;
      }
      
      try {
        const response = await get(`http://localhost:4000//areas?state=${formData.state}&city=${formData.city}`, {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        }
      );
        
        if (!response.ok) {
          throw new Error('Failed to fetch areas');
        }
        
        const data = await response.json();
        setAreas(data);
      } catch (err) {
        console.error('Error fetching areas:', err);
      }
    };
    
    fetchAreas();
  }, [formData.city, formData.state]);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim() ? '' : 'Service title is required';
      case 'category':
        return value ? '' : 'Category is required';
      case 'description':
        return value.trim() ? '' : 'Description is required';
      case 'price':
        return value && !isNaN(value) && parseFloat(value) > 0 
          ? '' 
          : 'Valid price is required';
      case 'location':
        return value.trim() ? '' : 'Location is required';
      case 'state':
        return value ? '' : 'State is required';
      case 'city':
        return value ? '' : 'City is required';
      case 'area':
        return value ? '' : 'Area is required';
      case 'availability':
        return value.trim() ? '' : 'Availability is required';
      case 'contactNumber':
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) 
          ? '' 
          : 'Valid 10-digit phone number is required';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on change
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const errorMessage = validateField(key, formData[key]);
      newErrors[key] = errorMessage;
      if (errorMessage) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    // Mark all fields as touched if form is invalid
    if (!isValid) {
      const newTouched = {};
      Object.keys(formData).forEach(key => {
        newTouched[key] = true;
      });
      setTouched(newTouched);
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      setError('Please correct all errors before submitting');
      return;
    }

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
      const response = await get('http://localhost:4000/services', {
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
        state: '',
        city: '',
        area: '',
        availability: '',
        contactNumber: ''
      });
      
      setTouched({});

      // Navigate to manage services after short delay
      setTimeout(() => {
        navigate('/service-provider/manage');
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
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                />
                {touched.title && errors.title && (
                  <FormHelperText error>{errors.title}</FormHelperText>
                )}
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
                  onBlur={handleBlur}
                  error={touched.category && Boolean(errors.category)}
                >
                  {serviceCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                {touched.category && errors.category && (
                  <FormHelperText error>{errors.category}</FormHelperText>
                )}
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
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                />
                {touched.description && errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
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
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  InputProps={{
                    startAdornment: '₹'
                  }}
                />
                {touched.price && errors.price && (
                  <FormHelperText error>{errors.price}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                >
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
                {touched.state && errors.state && (
                  <FormHelperText error>{errors.state}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  disabled={!formData.state}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
                {touched.city && errors.city && (
                  <FormHelperText error>{errors.city}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.area && Boolean(errors.area)}
                  disabled={!formData.city}
                >
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.name}>
                      {area.name}
                    </MenuItem>
                  ))}
                </TextField>
                {touched.area && errors.area && (
                  <FormHelperText error>{errors.area}</FormHelperText>
                )}
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Specific Location"
                  name="location"
                  placeholder="Building/Landmark"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location && Boolean(errors.location)}
                />
                {touched.location && errors.location && (
                  <FormHelperText error>{errors.location}</FormHelperText>
                )}
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
                  onBlur={handleBlur}
                  error={touched.availability && Boolean(errors.availability)}
                />
                {touched.availability && errors.availability && (
                  <FormHelperText error>{errors.availability}</FormHelperText>
                )}
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactNumber && Boolean(errors.contactNumber)}
                />
                {touched.contactNumber && errors.contactNumber && (
                  <FormHelperText error>{errors.contactNumber}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large"
                  sx={{
                    mt: 2,
                    backgroundColor: '#1a73e8',
                    '&:hover': {
                      backgroundColor: '#1557b0',
                    }
                  }}>
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