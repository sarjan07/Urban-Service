import { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  useTheme,
} from '@mui/material';
import { AuthContext } from '../../App';
// import AuthService from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Signup=()=> {
  const [formData, setFormData] = useState(
    {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
    });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const {register,handleSubmit}=useForm();
  const theme = useTheme();

  const postData = async () => {

  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Name are required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const submitHandler = async (data) => {
    console.log("Data to be send to backend is : ",data)
    setLoading(true);

    try {   
      const res = await axios.post("https://localhost:4000/user")
      
      console.log("Response Data : ",res.data)

      if(res?.status===201){
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      toast.error(err.message || 'An error occurred during registration', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '70%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 3,
            }}
          >
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  name="name"
                  autoComplete="given-name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                {...register("password")}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default Signup;