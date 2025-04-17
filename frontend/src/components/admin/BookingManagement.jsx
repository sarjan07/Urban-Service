import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const BookingManagement = () => {
  const theme = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'view', 'edit', 'confirm', 'reject'
  const [formData, setFormData] = useState({
    status: '',
    adminNotes: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/bookings');
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setDialogType('view');
    setOpenDialog(true);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(`/api/admin/bookings/${bookingId}/status`, {
        status: newStatus,
        adminNotes: formData.adminNotes,
      });
      if (response.data.success) {
        toast.success(`Booking ${newStatus} successfully`);
        fetchBookings();
        setOpenDialog(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Booking Management
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.serviceName}</TableCell>
                    <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => handleView(booking)}
                            sx={{ color: theme.palette.info.main }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {booking.status === 'pending' && (
                          <>
                            <Tooltip title="Confirm Booking">
                              <IconButton
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setDialogType('confirm');
                                  setOpenDialog(true);
                                }}
                                sx={{ color: theme.palette.success.main }}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject Booking">
                              <IconButton
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setDialogType('reject');
                                  setOpenDialog(true);
                                }}
                                sx={{ color: theme.palette.error.main }}
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'view' && 'Booking Details'}
          {dialogType === 'confirm' && 'Confirm Booking'}
          {dialogType === 'reject' && 'Reject Booking'}
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box sx={{ mt: 2 }}>
              {dialogType === 'view' ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Customer:</strong> {selectedBooking.customerName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Service:</strong> {selectedBooking.serviceName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Date & Time:</strong> {formatDate(selectedBooking.bookingDate)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Status:</strong>{' '}
                    <Chip
                      label={selectedBooking.status}
                      color={getStatusColor(selectedBooking.status)}
                      size="small"
                    />
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Notes:</strong> {selectedBooking.notes || 'No notes provided'}
                  </Typography>
                </>
              ) : (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Admin Notes"
                  value={formData.adminNotes}
                  onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {dialogType === 'confirm' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusChange(selectedBooking._id, 'confirmed')}
            >
              Confirm Booking
            </Button>
          )}
          {dialogType === 'reject' && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusChange(selectedBooking._id, 'rejected')}
            >
              Reject Booking
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingManagement; 