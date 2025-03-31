import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import AuthService from '../services/AuthService';

const Home1 = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);
    };
    fetchUser();
  }, [navigate]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/user/profile');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
            Royal Project
          </Typography>
          
          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2, color: 'text.primary' }}>
              Welcome, {user?.firstName || 'User'}
            </Typography>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="primary"
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {user?.firstName?.[0] || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome to Royal Project
              </Typography>
              <Typography variant="subtitle1">
                Your one-stop solution for all your needs
              </Typography>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Services
                </Typography>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Services
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bookings
                </Typography>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Bookings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payments
                </Typography>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Payments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home1; 