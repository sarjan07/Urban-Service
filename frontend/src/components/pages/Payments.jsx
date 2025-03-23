import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  TextField,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

function Payments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      const response = await fetch(`http://localhost:3000/api/payments/user/${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }

      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError('Failed to load payments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (serviceId) => {
    try {
      const response = await fetch('http://localhost:3000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify({
          serviceId,
          amount: parseFloat(amount),
          userId: authService.getCurrentUser().id,
          paymentDate: new Date().toISOString(),
          status: 'completed'
        })
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      // Refresh payments list
      fetchPayments();
      setAmount('');
      setSelectedService(null);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: '#2e7d32', bgcolor: '#e8f5e9' };
      case 'pending':
        return { color: '#ed6c02', bgcolor: '#fff3e0' };
      case 'failed':
        return { color: '#d32f2f', bgcolor: '#fdecea' };
      default:
        return { color: '#1a73e8', bgcolor: '#e8f0fe' };
    }
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
        Payments History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* New Payment Form */}
      <Card sx={{ mb: 4, boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Make a Payment
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount (₹)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: '₹'
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  onClick={() => handlePayment(selectedService)}
                  disabled={!amount || !selectedService}
                  sx={{
                    height: '100%',
                    backgroundColor: '#1a73e8',
                    '&:hover': { backgroundColor: '#1557b0' }
                  }}
                >
                  Process Payment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Payments History Table */}
      {payments.length === 0 ? (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No payment history available
          </Typography>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => {
                const statusColor = getStatusColor(payment.status);
                return (
                  <TableRow key={payment._id}>
                    <TableCell>{payment._id}</TableCell>
                    <TableCell>{payment.serviceTitle}</TableCell>
                    <TableCell>₹{payment.amount}</TableCell>
                    <TableCell>
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        size="small"
                        sx={{
                          color: statusColor.color,
                          bgcolor: statusColor.bgcolor
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Payments;