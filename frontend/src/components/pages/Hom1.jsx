import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import { AuthContext } from '../../App';

const Hom1 = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/services');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            borderRadius: 2,
            p: 6,
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }} >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Welcome to Urban Services
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
            }}
          >
            Your one-stop platform for all urban service needs
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{ 
              mt: 2,
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {isAuthenticated ? 'Browse Services' : 'Get Started'}
          </Button>
        </Box>

        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            Welcome back, {user?.name}! You're logged in and ready to use our services.
          </Alert>
        )}

        {/* Features Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                >
                  Easy Service Booking
                </Typography>
                <Typography color="textSecondary">
                  Browse through our wide range of services and book them with just a few clicks.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => navigate('/home/services')}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  Learn More →
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  Select Services
                </Typography>
                <Typography color="textSecondary">
                  Select your service which you have required for your daily life
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => navigate('/home/select-services')}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  Select service →
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '90%' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  Add Services
                </Typography>
                <Typography color="textSecondary">
                  Add new services for different services
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => navigate('/home/service-provider/add')}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  Add Services →
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  Select Payment
                </Typography>
                <Typography color="textSecondary">
                Make secure payments for your services with our integrated payment system.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => navigate('/home/service')}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  Select Payment →
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  Service Management
                </Typography>
                <Typography color="textSecondary">
                  Manage your services, track their status, and communicate with service providers.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => navigate('/home/service-provider/manage')}
                  sx={{ 
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  Manage Services →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action Section */}
        {/* <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 8,
            mb: 4,
            p: 6,
            background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
            borderRadius: 2,
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
            }}
          >
            Join our community of users and start enjoying our services today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{ 
              backgroundColor: 'white',
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {isAuthenticated ? 'View Services' : 'Sign Up Now'}
          </Button> 
        </Box>
          */}
      </Box>
    </Container>
  );
}

export default Hom1;