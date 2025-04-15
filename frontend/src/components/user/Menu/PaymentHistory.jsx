import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArticleIcon from '@mui/icons-material/Article';

// Sample payment data
const samplePayments = [
  {
    id: 'PAY-2023-001',
    date: '2023-12-15',
    service: 'Plumbing Service',
    provider: 'Quick Fix Plumbers',
    amount: 120.50,
    status: 'Completed',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-78945612',
  },
  {
    id: 'PAY-2023-002',
    date: '2023-12-10',
    service: 'House Cleaning',
    provider: 'Sparkle Home Services',
    amount: 85.00,
    status: 'Completed',
    paymentMethod: 'PayPal',
    transactionId: 'TXN-65432178',
  },
  {
    id: 'PAY-2024-001',
    date: '2024-01-05',
    service: 'Electrical Repair',
    provider: 'PowerFix Electricians',
    amount: 175.25,
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN-12378945',
  },
  {
    id: 'PAY-2024-002',
    date: '2024-01-20',
    service: 'Gardening Service',
    provider: 'Green Thumb Landscaping',
    amount: 95.00,
    status: 'Completed',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-33445566',
  },
  {
    id: 'PAY-2024-003',
    date: '2024-02-03',
    service: 'Car Repair',
    provider: 'City Auto Mechanics',
    amount: 320.75,
    status: 'Failed',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-98765432',
  },
  {
    id: 'PAY-2024-004',
    date: '2024-02-28',
    service: 'Home Painting',
    provider: 'Fresh Coat Painters',
    amount: 450.00,
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN-55667788',
  },
  {
    id: 'PAY-2024-005',
    date: '2024-03-15',
    service: 'Appliance Repair',
    provider: 'Tech Fix Appliances',
    amount: 110.50,
    status: 'Pending',
    paymentMethod: 'PayPal',
    transactionId: 'TXN-22334455',
  },
  {
    id: 'PAY-2024-006',
    date: '2024-04-02',
    service: 'Pest Control',
    provider: 'Bug Busters',
    amount: 85.25,
    status: 'Completed',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-11223344',
  },
];

const PayHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4caf50';
      case 'Pending':
        return '#ff9800';
      case 'Failed':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon fontSize="small" />;
      case 'Pending':
        return <PendingIcon fontSize="small" />;
      case 'Failed':
        return <CancelIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Filter payments based on search term and filters
  const filteredPayments = samplePayments.filter((payment) => {
    const matchesSearch = 
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    
    // Simple date filter implementation
    let matchesDate = true;
    const paymentDate = new Date(payment.date);
    const currentDate = new Date();
    
    if (dateFilter === 'Last Month') {
      const lastMonth = new Date();
      lastMonth.setMonth(currentDate.getMonth() - 1);
      matchesDate = paymentDate >= lastMonth;
    } else if (dateFilter === 'Last 3 Months') {
      const lastThreeMonths = new Date();
      lastThreeMonths.setMonth(currentDate.getMonth() - 3);
      matchesDate = paymentDate >= lastThreeMonths;
    } else if (dateFilter === 'Last 6 Months') {
      const lastSixMonths = new Date();
      lastSixMonths.setMonth(currentDate.getMonth() - 6);
      matchesDate = paymentDate >= lastSixMonths;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedPayments = filteredPayments.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  // Calculate total payments
  const totalAmount = samplePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = samplePayments
    .filter(payment => payment.status === 'Completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a237e',
            position: 'relative',
            display: 'inline-block',
            pb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '4px',
              bottom: 0,
              left: 0,
              backgroundColor: '#5c6bc0',
              borderRadius: '2px'
            }
          }}
        >
          Payment History
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                backgroundColor: '#e8eaf6', 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArticleIcon sx={{ color: '#3949ab', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#283593' }}>
                  Total Transactions
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e' }}>
                {samplePayments.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#5c6bc0', mt: 1 }}>
                All-time transaction count
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                backgroundColor: '#e0f7fa', 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptLongIcon sx={{ color: '#0097a7', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#006064' }}>
                  Total Spent
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#006064' }}>
                ${totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#00acc1', mt: 1 }}>
                Combined value of all transactions
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                backgroundColor: '#e8f5e9', 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon sx={{ color: '#2e7d32', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1b5e20' }}>
                  Completed Payments
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1b5e20' }}>
                ${completedAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#43a047', mt: 1 }}>
                Successfully processed payments
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by service, provider or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#5c6bc0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3f51b5',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                IconComponent={FilterListIcon}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#5c6bc0',
                  },
                }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                label="Date Range"
                IconComponent={CalendarTodayIcon}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#5c6bc0',
                  },
                }}
              >
                <MenuItem value="All Time">All Time</MenuItem>
                <MenuItem value="Last Month">Last Month</MenuItem>
                <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
                <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Payment List */}
        <Box>
          {paginatedPayments.length > 0 ? (
            paginatedPayments.map((payment) => (
              <Paper
                key={payment.id}
                elevation={2}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Box
                  sx={{
                    borderLeft: `6px solid ${getStatusColor(payment.status)}`,
                    p: 3,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {payment.service}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(payment.status)}
                            label={payment.status}
                            size="small"
                            sx={{
                              ml: 2,
                              backgroundColor: `${getStatusColor(payment.status)}15`,
                              color: getStatusColor(payment.status),
                              fontWeight: 600,
                              borderRadius: 1,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Provider: <span style={{ fontWeight: 500 }}>{payment.provider}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: <span style={{ fontWeight: 500, color: '#1a237e' }}>{payment.id}</span>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Transaction Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Payment Method
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {payment.paymentMethod}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box
                        sx={{
                          textAlign: { xs: 'left', md: 'right' },
                          mt: { xs: 2, md: 0 },
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#1a237e',
                          }}
                        >
                          ${payment.amount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Transaction ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {payment.transactionId}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            ))
          ) : (
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No payment records found matching your criteria.
              </Typography>
            </Paper>
          )}

          {/* Pagination */}
          {filteredPayments.length > rowsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredPayments.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PayHistory;