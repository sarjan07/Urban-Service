import React, { useState, useEffect } from 'react';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Fetch payment history data from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const res = await get('/');
        if (!res.ok) {
          throw new Error('Failed to fetch payment history');
        }
        const data = await res.json();
        setPaymentHistory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, []);
  
  // For demo purposes, simulate payment history data
  useEffect(() => {
    // This would be replaced by the actual API call in production
    // const demoData = [
    //   { id: 'pay_123456', userId: 'user_001', paymentMethod: 'googlepay', amount: 5000, status: 'success', date: '2025-04-01T10:30:00' },
    //   { id: 'pay_123457', userId: 'user_001', paymentMethod: 'paytm', amount: 2500, status: 'success', date: '2025-03-28T14:22:00' },
    //   { id: 'pay_123458', userId: 'user_001', paymentMethod: 'card', amount: 10000, status: 'success', date: '2025-03-25T09:15:00' },
    //   { id: 'pay_123459', userId: 'user_001', paymentMethod: 'phonepe', amount: 1500, status: 'success', date: '2025-03-20T16:45:00' },
    //   { id: 'pay_123460', userId: 'user_001', paymentMethod: 'amazonpay', amount: 3250, status: 'success', date: '2025-03-15T11:10:00' },
    //   { id: 'pay_123461', userId: 'user_001', paymentMethod: 'googlepay', amount: 7500, status: 'success', date: '2025-03-10T13:30:00' },
    // ];
    
    setPaymentHistory(demoData);
    setLoading(false);
  }, []);
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Apply sorting to payment history data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...paymentHistory];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [paymentHistory, sortConfig]);
  
  // Filter payment history based on payment method
  const filteredData = React.useMemo(() => {
    return filter === 'all' 
      ? sortedData 
      : sortedData.filter(payment => payment.paymentMethod === filter);
  }, [sortedData, filter]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get payment method display name
  const getPaymentMethodName = (methodId) => {
    const methods = {
      'googlepay': 'Google Pay',
      'paytm': 'PayTm',
      'phonepe': 'PhonePe',
      'amazonpay': 'Amazon Pay',
      'card': 'Card'
    };
    return methods[methodId] || methodId;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payment History</h1>
      
      {loading ? (
        <div style={styles.loadingMessage}>Loading payment history...</div>
      ) : error ? (
        <div style={styles.errorMessage}>Error: {error}</div>
      ) : (
        <>
          <div style={styles.filterContainer}>
            <span style={styles.filterLabel}>Filter by payment method:</span>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Methods</option>
              <option value="googlepay">Google Pay</option>
              <option value="paytm">PayTm</option>
              <option value="phonepe">PhonePe</option>
              <option value="amazonpay">Amazon Pay</option>
              <option value="card">Card</option>
            </select>
          </div>
          
          {filteredData.length === 0 ? (
            <div style={styles.noDataMessage}>No payment history found</div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader} onClick={() => requestSort('id')}>
                      Transaction ID
                      {sortConfig.key === 'id' && (
                        <span style={styles.sortIndicator}>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th style={styles.tableHeader} onClick={() => requestSort('paymentMethod')}>
                      Payment Method
                      {sortConfig.key === 'paymentMethod' && (
                        <span style={styles.sortIndicator}>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th style={styles.tableHeader} onClick={() => requestSort('amount')}>
                      Amount
                      {sortConfig.key === 'amount' && (
                        <span style={styles.sortIndicator}>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th style={styles.tableHeader} onClick={() => requestSort('date')}>
                      Date & Time
                      {sortConfig.key === 'date' && (
                        <span style={styles.sortIndicator}>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((payment) => (
                    <tr key={payment.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{payment.id}</td>
                      <td style={styles.tableCell}>{getPaymentMethodName(payment.paymentMethod)}</td>
                      <td style={styles.tableCell}>₹{payment.amount.toLocaleString('en-IN')}</td>
                      <td style={styles.tableCell}>{formatDate(payment.date)}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: payment.status === 'success' ? '#d4edda' : '#f8d7da',
                          color: payment.status === 'success' ? '#155724' : '#721c24'
                        }}>
                          {payment.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div style={styles.summary}>
            <p>Total Transactions: {filteredData.length}</p>
            <p>Total Amount: ₹{filteredData.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString('en-IN')}</p>
          </div>
        </>
      )}
      
      <div style={styles.footer}>
        <button 
          style={styles.backButton}
          onClick={() => window.location.href = '/select-services/payment'}
        >
          Back to Payment Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  },
  loadingMessage: {
    padding: '15px',
    textAlign: 'center',
    color: '#666',
    fontSize: '16px'
  },
  errorMessage: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '16px'
  },
  noDataMessage: {
    padding: '15px',
    textAlign: 'center',
    color: '#666',
    fontSize: '16px'
  },
  filterContainer: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center'
  },
  filterLabel: {
    marginRight: '10px',
    fontSize: '14px'
  },
  filterSelect: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  tableHeader: {
    padding: '12px 8px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    cursor: 'pointer'
  },
  sortIndicator: {
    fontSize: '12px'
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#f9f9f9'
    }
  },
  tableCell: {
    padding: '12px 8px',
    verticalAlign: 'middle'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  summary: {
    borderTop: '1px solid #ddd',
    paddingTop: '15px',
    fontSize: '14px'
  },
  footer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default PaymentHistory;
