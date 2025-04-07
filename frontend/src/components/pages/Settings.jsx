import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Divider,
  Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AuthService from '../services/AuthService';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    profileVisibility: 'public'
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await axxios.post(`http://localhost:4000/users`);

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update settings. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1a73e8' }}>
        Account Settings
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1, color: '#5f6368' }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={() => handleToggle('emailNotifications')}
                        color="primary"
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={() => handleToggle('smsNotifications')}
                        color="primary"
                      />
                    }
                    label="SMS Notifications"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1, color: '#5f6368' }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={() => handleToggle('twoFactorAuth')}
                        color="primary"
                      />
                    }
                    label="Two-Factor Authentication"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VisibilityIcon sx={{ mr: 1, color: '#5f6368' }} />
                <Typography variant="h6">Privacy</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.profileVisibility === 'public'}
                        onChange={() => setSettings(prev => ({
                          ...prev,
                          profileVisibility: prev.profileVisibility === 'public' ? 'private' : 'public'
                        }))}
                        color="primary"
                      />
                    }
                    label="Public Profile"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              mt: 2,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1557b0' }
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Settings; 