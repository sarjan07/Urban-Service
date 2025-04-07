import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
// Import chart components
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';

// Tab panel component for accessibility
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`service-provider-tabpanel-${index}`}
      aria-labelledby={`service-provider-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ServiceProvider = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalServices: 12,
    activeServices: 10,
    totalBookings: 6,
    pendingBookings: 4,
    completedBookings: 2,
    totalEarnings: 12000
  });
  // Monthly earnings data for the graph
  const [monthlyEarnings, setMonthlyEarnings] = useState([
    { name: 'Jan', earnings: 1000 },
    { name: 'Feb', earnings: 1500 },
    { name: 'Mar', earnings: 2000 },
    { name: 'Apr', earnings: 1800 },
    { name: 'May', earnings: 2200 },
    { name: 'Jun', earnings: 3500 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const currentUser = authService.getCurrentUser();
        
        // Fetch services
        const servicesResponse = await axios.get(`http://localhost:4000/services`, {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });
        
        if (!servicesResponse.ok) {
          throw new Error('Failed to get services');
        }
        
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
        
        // Fetch bookings
        const bookingsResponse = await get(`http://localhost:4000/bookings`);
        
        if (!bookingsResponse.ok) {
          throw new Error('Failed to get bookings');
        }
        
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
        
        // Calculate stats
        const activeServicesCount = servicesData.filter(service => service.status === 'active').length;
        const pendingBookingsCount = bookingsData.filter(booking => booking.status === 'pending').length;
        const completedBookingsCount = bookingsData.filter(booking => booking.status === 'completed').length;
        const totalEarnings = bookingsData
          .filter(booking => booking.status === 'completed')
          .reduce((sum, booking) => sum + parseFloat(booking.amount || 0), 0);
        
        setStats({
          totalServices: servicesData.length,
          activeServices: activeServicesCount,
          totalBookings: bookingsData.length,
          pendingBookings: pendingBookingsCount,
          completedBookings: completedBookingsCount,
          totalEarnings: totalEarnings
        });
        
        // Generate monthly earnings data
        // In a real application, you would aggregate this from actual booking data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const mockMonthlyData = months.map((month, index) => {
          // Generate some random but sensible data based on the total earnings
          const earnings = (totalEarnings / 6) * (0.7 + Math.random() * 0.6);
          return { name: month, earnings: Math.round(earnings) };
        });
        setMonthlyEarnings(mockMonthlyData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    getData();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddService = () => {
    navigate('/service-provider/services/add');
  };

  const handleEditService = (serviceId) => {
    navigate(`/services/edit`);
  };

  const handleOpenDeleteDialog = (service) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    
    try {
      const response = await axios.get(`http://localhost:4000/services`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      // Remove service from state
      setServices(services.filter(service => service.id !== serviceToDelete.id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalServices: prev.totalServices - 1,
        activeServices: serviceToDelete.status === 'active' ? prev.activeServices - 1 : prev.activeServices
      }));
      
      handleCloseDeleteDialog();
      
    } catch (err) {
      setError(err.message || 'An error occurred while deleting the service');
      handleCloseDeleteDialog();
    }
  };

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  // Prepare data for booking status pie chart
  const bookingStatusData = [
    { name: 'Completed', value: stats.completedBookings },
    { name: 'Pending', value: stats.pendingBookings },
    { name: 'Cancelled', value: stats.totalBookings - stats.completedBookings - stats.pendingBookings }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#1a73e8' }}>
        Service Provider Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Services</Typography>
              <Typography variant="h4">{stats.totalServices}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Active Services</Typography>
              <Typography variant="h4">{stats.activeServices}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fff8e1', height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Pending Bookings</Typography>
              <Typography variant="h4">{stats.pendingBookings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fce4ec', height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Earnings</Typography>
              <Typography variant="h4">₹{stats.totalEarnings.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Content */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="My Services" icon={<WorkIcon />} iconPosition="start" />
          <Tab label="Bookings" icon={<AssignmentIcon />} iconPosition="start" />
          <Tab label="Analytics" icon={<AssessmentIcon />} iconPosition="start" />
          <Tab label="Profile" icon={<PeopleIcon />} iconPosition="start" />
        </Tabs>
        
        {/* My Services Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Manage Your Services</Typography>
            <Button variant="contained"  startIcon={<AddIcon />}
              onClick={handleAddService}
              sx={{ backgroundColor: '#1a73e8', '&:hover': { backgroundColor: '#1557b0',}}}>
              Add New Service
            </Button>
          </Box>
          
          
        </TabPanel>
        
        {/* Bookings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 3 }}>Your Bookings</Typography>
          
          {bookings.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center', border: '1px dashed #ccc', borderRadius: 2 }}>
              <Typography>
                You don't have any bookings yet.
              </Typography>
            </Box>
          ) : (
            <List sx={{ bgcolor: 'background.paper' }}>
              {bookings.map((booking) => (
                <Box key={booking.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {booking.serviceName}
                          </Typography>
                          <Chip label={booking.status} size="small" color={getStatusChipColor(booking.status)} />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Customer: {booking.customerName}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Date: {new Date(booking.bookingDate).toLocaleDateString()}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Amount: ₹{parseFloat(booking.amount).toFixed(2)}
                          </Typography>
                        </>
                      }
                    />
                    <Button variant="outlined" size="small" onClick={() => navigate(`/bookings/${booking.id}`)}>
                      View Details
                    </Button>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          )}
        </TabPanel>
        
        {/* Analytics Tab - Enhanced with charts */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 3 }}>Performance Analytics</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Booking Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Total Bookings</Typography>
                      <Typography variant="h5">{stats.totalBookings}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Completed</Typography>
                      <Typography variant="h5">{stats.completedBookings}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Pending</Typography>
                      <Typography variant="h5">{stats.pendingBookings}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">Completion Rate</Typography>
                      <Typography variant="h5">
                        {stats.totalBookings ? 
                          `${((stats.completedBookings / stats.totalBookings) * 100).toFixed(1)}%` : 
                          '0%'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Earnings</Typography>
                  <Typography variant="h4" sx={{ mb: 2 }}>₹{stats.totalEarnings.toFixed(2)}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Average per booking: 
                    ₹{stats.completedBookings ? 
                       (stats.totalEarnings / stats.completedBookings).toFixed(2) : 
                       '0.00'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Booking Status Pie Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Booking Status Distribution</Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookingStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80} fill="#8884d8" dataKey="value">
                          {bookingStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Monthly Earnings Line Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Monthly Earnings Trend</Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyEarnings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                        <Line type="monotone" dataKey="earnings" stroke="#8884d8" activeDot={{ r: 8 }} name="Monthly Earnings"/>
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            
          </Grid>
        </TabPanel>
        
        {/* Profile Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 3 }}>Profile Information</Typography>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">Full Name</Typography>
                  <Typography variant="body1">{authService.getCurrentUser()?.name || 'Not Available'}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{authService.getCurrentUser()?.email || 'Not Available'}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1">{authService.getCurrentUser()?.phone || 'Not Available'}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">Location</Typography>
                  <Typography variant="body1">{authService.getCurrentUser()?.location || 'Not Available'}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">Member Since</Typography>
                  <Typography variant="body1">
                    {authService.getCurrentUser()?.createdAt ? 
                      new Date(authService.getCurrentUser().createdAt).toLocaleDateString() : 
                      'Not Available'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button variant="outlined" onClick={() => navigate('/user/profile')}>
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the service "{serviceToDelete?.title}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteService} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceProvider;




// import { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Tabs,
//   Tab,
//   Paper,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/AuthService';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import WorkIcon from '@mui/icons-material/Work';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import PeopleIcon from '@mui/icons-material/People';

// // Tab panel component for accessibility
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`service-provider-tabpanel-${index}`}
//       aria-labelledby={`service-provider-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// const ServiceProvider = () => {
//   const navigate = useNavigate();
//   const [tabValue, setTabValue] = useState(0);
//   const [services, setServices] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [stats, setStats] = useState({
//     totalServices: 12,
//     activeServices: 10,
//     totalBookings: 6,
//     pendingBookings: 4,
//     completedBookings: 2,
//     totalEarnings: 12000
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [serviceToDelete, setServiceToDelete] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setLoading(true);
//         const currentUser = authService.getCurrentUser();
        
//         // Fetch services
//         const servicesResponse = await get(`http://localhost:4000/services`, {
//           headers: {
//             'Authorization': `Bearer ${authService.getToken()}`
//           }
//         });
        
//         if (!servicesResponse.ok) {
//           throw new Error('Failed to get services');
//         }
        
//         const servicesData = await servicesResponse.json();
//         setServices(servicesData);
        
//         // Fetch bookings
//         const bookingsResponse = await get(`http://localhost:4000/bookings`);
        
//         if (!bookingsResponse.ok) {
//           throw new Error('Failed to get bookings');
//         }
        
//         const bookingsData = await bookingsResponse.json();
//         setBookings(bookingsData);
        
//         // Calculate stats
//         const activeServicesCount = servicesData.filter(service => service.status === 'active').length;
//         const pendingBookingsCount = bookingsData.filter(booking => booking.status === 'pending').length;
//         const completedBookingsCount = bookingsData.filter(booking => booking.status === 'completed').length;
//         const totalEarnings = bookingsData
//           .filter(booking => booking.status === 'completed')
//           .reduce((sum, booking) => sum + parseFloat(booking.amount || 0), 0);
        
//         setStats({
//           totalServices: servicesData.length,
//           activeServices: activeServicesCount,
//           totalBookings: bookingsData.length,
//           pendingBookings: pendingBookingsCount,
//           completedBookings: completedBookingsCount,
//           totalEarnings: totalEarnings
//         });
        
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err.message || 'An error occurred while fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     getData();
//   }, []);

//   const handleChangeTab = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleAddService = () => {
//     navigate('/service-provider/add');
//   };

//   const handleEditService = (serviceId) => {
//     navigate(`/services/edit`);
//   };

//   const handleOpenDeleteDialog = (service) => {
//     setServiceToDelete(service);
//     setDeleteDialogOpen(true);
//   };

//   const handleCloseDeleteDialog = () => {
//     setDeleteDialogOpen(false);
//     setServiceToDelete(null);
//   };

//   const handleDeleteService = async () => {
//     if (!serviceToDelete) return;
    
//     try {
//       const response = await delete(`http://localhost:4000/services`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${authService.getToken()}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to delete service');
//       }
      
//       // Remove service from state
//       setServices(services.filter(service => service.id !== serviceToDelete.id));
      
//       // Update stats
//       setStats(prev => ({
//         ...prev,
//         totalServices: prev.totalServices - 1,
//         activeServices: serviceToDelete.status === 'active' ? prev.activeServices - 1 : prev.activeServices
//       }));
      
//       handleCloseDeleteDialog();
      
//     } catch (err) {
//       setError(err.message || 'An error occurred while deleting the service');
//       handleCloseDeleteDialog();
//     }
//   };

//   const getStatusChipColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'active':
//         return 'success';
//       case 'inactive':
//         return 'error';
//       case 'pending':
//         return 'warning';
//       case 'completed':
//         return 'info';
//       default:
//         return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#1a73e8' }}>
//         Service Provider Dashboard
//       </Typography>
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}
      
//       {/* Stats Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ backgroundColor: '#e3f2fd', height: '100%' }}>
//             <CardContent>
//               <Typography variant="subtitle2" color="textSecondary">Total Services</Typography>
//               <Typography variant="h4">{stats.totalServices}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ backgroundColor: '#e8f5e9', height: '100%' }}>
//             <CardContent>
//               <Typography variant="subtitle2" color="textSecondary">Active Services</Typography>
//               <Typography variant="h4">{stats.activeServices}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ backgroundColor: '#fff8e1', height: '100%' }}>
//             <CardContent>
//               <Typography variant="subtitle2" color="textSecondary">Pending Bookings</Typography>
//               <Typography variant="h4">{stats.pendingBookings}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ backgroundColor: '#fce4ec', height: '100%' }}>
//             <CardContent>
//               <Typography variant="subtitle2" color="textSecondary">Total Earnings</Typography>
//               <Typography variant="h4">₹{stats.totalEarnings.toFixed(2)}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       {/* Main Content */}
//       <Paper sx={{ mb: 4 }}>
//         <Tabs
//           value={tabValue}
//           onChange={handleChangeTab}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//         >
//           <Tab label="My Services" icon={<WorkIcon />} iconPosition="start" />
//           <Tab label="Bookings" icon={<AssignmentIcon />} iconPosition="start" />
//           <Tab label="Analytics" icon={<AssessmentIcon />} iconPosition="start" />
//           <Tab label="Profile" icon={<PeopleIcon />} iconPosition="start" />
//         </Tabs>
        
//         {/* My Services Tab */}
//         <TabPanel value={tabValue} index={0}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//             <Typography variant="h6">Manage Your Services</Typography>
//             <Button 
//               variant="contained" 
//               startIcon={<AddIcon />}
//               onClick={handleAddService}
//               sx={{
//                 backgroundColor: '#1a73e8',
//                 '&:hover': {
//                   backgroundColor: '#1557b0',
//                 }
//               }}
//             >
//               Add New Service
//             </Button>
//           </Box>
          
          
//         </TabPanel>
        
//         {/* Bookings Tab */}
//         <TabPanel value={tabValue} index={1}>
//           <Typography variant="h6" sx={{ mb: 3 }}>Your Bookings</Typography>
          
//           {bookings.length === 0 ? (
//             <Box sx={{ 
//               p: 4, 
//               textAlign: 'center', 
//               border: '1px dashed #ccc', 
//               borderRadius: 2 
//             }}>
//               <Typography>
//                 You don't have any bookings yet.
//               </Typography>
//             </Box>
//           ) : (
//             <List sx={{ bgcolor: 'background.paper' }}>
//               {bookings.map((booking) => (
//                 <Box key={booking.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <Typography variant="subtitle1">
//                             {booking.serviceName}
//                           </Typography>
//                           <Chip 
//                             label={booking.status} 
//                             size="small" 
//                             color={getStatusChipColor(booking.status)} 
//                           />
//                         </Box>
//                       }
//                       secondary={
//                         <>
//                           <Typography
//                             component="span"
//                             variant="body2"
//                             color="textPrimary"
//                           >
//                             Customer: {booking.customerName}
//                           </Typography>
//                           <br />
//                           <Typography
//                             component="span"
//                             variant="body2"
//                             color="textSecondary"
//                           >
//                             Date: {new Date(booking.bookingDate).toLocaleDateString()}
//                           </Typography>
//                           <br />
//                           <Typography
//                             component="span"
//                             variant="body2"
//                             color="textSecondary"
//                           >
//                             Amount: ₹{parseFloat(booking.amount).toFixed(2)}
//                           </Typography>
//                         </>
//                       }
//                     />
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => navigate(`/bookings/${booking.id}`)}
//                     >
//                       View Details
//                     </Button>
//                   </ListItem>
//                   <Divider />
//                 </Box>
//               ))}
//             </List>
//           )}
//         </TabPanel>
        
//         {/* Analytics Tab */}
//         <TabPanel value={tabValue} index={2}>
//           <Typography variant="h6" sx={{ mb: 3 }}>Performance Analytics</Typography>
          
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>Booking Summary</Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="textSecondary">Total Bookings</Typography>
//                       <Typography variant="h5">{stats.totalBookings}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="textSecondary">Completed</Typography>
//                       <Typography variant="h5">{stats.completedBookings}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="textSecondary">Pending</Typography>
//                       <Typography variant="h5">{stats.pendingBookings}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="textSecondary">Completion Rate</Typography>
//                       <Typography variant="h5">
//                         {stats.totalBookings ? 
//                           `${((stats.completedBookings / stats.totalBookings) * 100).toFixed(1)}%` : 
//                           '0%'}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>Earnings</Typography>
//                   <Typography variant="h4" sx={{ mb: 2 }}>₹{stats.totalEarnings.toFixed(2)}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Average per booking: 
//                     ₹{stats.completedBookings ? 
//                        (stats.totalEarnings / stats.completedBookings).toFixed(2) : 
//                        '0.00'}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </TabPanel>
        
//         {/* Profile Tab */}
//         <TabPanel value={tabValue} index={3}>
//           <Typography variant="h6" sx={{ mb: 3 }}>Profile Information</Typography>
          
//           <Card>
//             <CardContent>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Full Name</Typography>
//                   <Typography variant="body1">{authService.getCurrentUser()?.name || 'Not Available'}</Typography>
//                 </Box>
                
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Email</Typography>
//                   <Typography variant="body1">{authService.getCurrentUser()?.email || 'Not Available'}</Typography>
//                 </Box>
                
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Phone</Typography>
//                   <Typography variant="body1">{authService.getCurrentUser()?.phone || 'Not Available'}</Typography>
//                 </Box>
                
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Location</Typography>
//                   <Typography variant="body1">{authService.getCurrentUser()?.location || 'Not Available'}</Typography>
//                 </Box>
                
//                 <Box>
//                   <Typography variant="body2" color="textSecondary">Member Since</Typography>
//                   <Typography variant="body1">
//                     {authService.getCurrentUser()?.createdAt ? 
//                       new Date(authService.getCurrentUser().createdAt).toLocaleDateString() : 
//                       'Not Available'}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//             <CardActions>
//               <Button variant="outlined" onClick={() => navigate('/user/profile')}>
//                 Edit Profile
//               </Button>
//             </CardActions>
//           </Card>
//         </TabPanel>
//       </Paper>
      
//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={handleCloseDeleteDialog}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the service "{serviceToDelete?.title}"? 
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
//           <Button onClick={handleDeleteService} color="error">Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ServiceProvider;