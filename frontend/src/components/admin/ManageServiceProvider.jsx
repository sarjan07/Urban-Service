import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  Fade,
  Tooltip,
  TextField,
  InputAdornment,
  TablePagination,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const ManageServiceProvider = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: '',
    description: '',
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('/api/admin/service-providers', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && Array.isArray(response.data.data)) {
        setProviders(response.data.data);
      } else {
        setProviders([]);
        setError('No service providers found');
      }
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError(err.response?.data?.message || 'Failed to fetch service providers');
      toast.error(err.response?.data?.message || 'Failed to fetch service providers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (provider) => {
    if (!provider) return;
    setSelectedProvider(provider);
    setViewDialogOpen(true);
  };

  const handleEdit = (provider) => {
    if (!provider) return;
    setSelectedProvider(provider);
    setEditFormData({
      name: provider.name || '',
      email: provider.email || '',
      phone: provider.phone || '',
      address: provider.address || '',
      status: provider.status || 'active',
      description: provider.description || '',
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (provider) => {
    if (!provider) return;
    setSelectedProvider(provider);
    setDeleteDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (!selectedProvider?._id) {
      toast.error('Invalid provider selected');
      return;
    }

    try {
      const response = await axios.put(
        `/api/admin/service-providers/${selectedProvider._id}`,
        editFormData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Service provider updated successfully');
        setEditDialogOpen(false);
        fetchProviders();
      } else {
        throw new Error(response.data.message || 'Failed to update service provider');
      }
    } catch (err) {
      console.error('Error updating provider:', err);
      toast.error(err.response?.data?.message || 'Failed to update service provider');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProvider?._id) {
      toast.error('Invalid provider selected');
      return;
    }

    try {
      const response = await axios.delete(
        `/api/admin/service-providers/${selectedProvider._id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Service provider deleted successfully');
        setDeleteDialogOpen(false);
        fetchProviders();
      } else {
        throw new Error(response.data.message || 'Failed to delete service provider');
      }
    } catch (err) {
      console.error('Error deleting provider:', err);
      toast.error(err.response?.data?.message || 'Failed to delete service provider');
    }
  };

  const getStatusColor = (status) => {
    if (!status) return theme.palette.grey[500];
    
    switch (status.toLowerCase()) {
      case 'active':
        return theme.palette.success.main;
      case 'inactive':
        return theme.palette.error.main;
      case 'pending':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusChip = (status) => {
    if (!status) return null;

    let icon = null;
    switch (status.toLowerCase()) {
      case 'active':
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'inactive':
        icon = <CancelIcon fontSize="small" />;
        break;
      case 'pending':
        icon = <CircularProgress size={16} />;
        break;
      default:
        break;
    }

    return (
      <Chip
        icon={icon}
        label={status}
        size="small"
        sx={{
          bgcolor: getStatusColor(status) + '20',
          color: getStatusColor(status),
          fontWeight: 'bold',
        }}
      />
    );
  };

  const filteredProviders = providers.filter(
    (provider) =>
      provider?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => navigate('/admin/dashboard')}
            sx={{ 
              color: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.light + '20' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Manage Service Providers
            </Typography>
          </Box>
        </Box>

        {error && (
          <Fade in={true}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.primary.main + '10' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Provider</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Services</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProviders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No service providers found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProviders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((provider) => (
                    <TableRow 
                      key={provider._id}
                      hover
                      sx={{ 
                        '&:hover': { 
                          bgcolor: theme.palette.action.hover,
                          transition: 'background-color 0.2s ease',
                        } 
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            src={provider.logo || provider.image} 
                            alt={provider.name}
                            sx={{ 
                              width: 40, 
                              height: 40,
                              bgcolor: theme.palette.primary.main,
                            }}
                          >
                            {provider.name?.charAt(0)}
                          </Avatar>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {provider.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{provider.email}</TableCell>
                      <TableCell>{provider.phone}</TableCell>
                      <TableCell>{getStatusChip(provider.status)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={provider.services?.length || 0} 
                          size="small" 
                          sx={{ 
                            bgcolor: theme.palette.info.main + '20',
                            color: theme.palette.info.main,
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton 
                              onClick={() => handleView(provider)}
                              sx={{ 
                                color: theme.palette.info.main,
                                '&:hover': { backgroundColor: theme.palette.info.main + '20' }
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Provider">
                            <IconButton 
                              onClick={() => handleEdit(provider)}
                              sx={{ 
                                color: theme.palette.primary.main,
                                '&:hover': { backgroundColor: theme.palette.primary.main + '20' }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Provider">
                            <IconButton 
                              onClick={() => handleDelete(provider)}
                              sx={{ 
                                color: theme.palette.error.main,
                                '&:hover': { backgroundColor: theme.palette.error.main + '20' }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredProviders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '.MuiTablePagination-select': {
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }}
        />
      </Paper>

      {/* View Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          }
        }}
      >
        {selectedProvider && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              color: 'white',
            }}>
              <BusinessIcon />
              Service Provider Details
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={selectedProvider.logo || selectedProvider.image} 
                  alt={selectedProvider.name}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {selectedProvider.name?.charAt(0)}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {selectedProvider.name}
                </Typography>
                {getStatusChip(selectedProvider.status)}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{selectedProvider.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">{selectedProvider.phone}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                    <Typography variant="body1">{selectedProvider.address}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Services Offered</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                    {selectedProvider.services?.map((service, index) => (
                      <Chip 
                        key={index} 
                        label={service} 
                        size="small" 
                        sx={{ 
                          bgcolor: theme.palette.info.main + '20',
                          color: theme.palette.info.main,
                        }} 
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography variant="body1">{selectedProvider.description || 'No description provided'}</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => setViewDialogOpen(false)}
                variant="outlined"
                sx={{ 
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light + '10',
                  },
                }}
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setViewDialogOpen(false);
                  handleEdit(selectedProvider);
                }}
                variant="contained"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                Edit Provider
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          color: 'white',
        }}>
          <EditIcon />
          Edit Service Provider
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                required
                error={!editFormData.name}
                helperText={!editFormData.name ? "Name is required" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                required
                type="email"
                error={!editFormData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)}
                helperText={!editFormData.email ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email) ? "Invalid email format" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                required
                error={!editFormData.phone}
                helperText={!editFormData.phone ? "Phone is required" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                select
                value={editFormData.status}
                onChange={handleEditChange}
                required
                error={!editFormData.status}
                helperText={!editFormData.status ? "Status is required" : ""}
                SelectProps={{
                  native: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={editFormData.address}
                onChange={handleEditChange}
                required
                error={!editFormData.address}
                helperText={!editFormData.address ? "Address is required" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light + '10',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit}
            variant="contained"
            disabled={!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.status || !editFormData.address}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 400,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: theme.palette.error.main,
        }}>
          <DeleteIcon color="error" />
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedProvider?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ 
              borderColor: theme.palette.grey[500],
              color: theme.palette.grey[700],
              '&:hover': {
                borderColor: theme.palette.grey[700],
                backgroundColor: theme.palette.grey[100],
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageServiceProvider; 