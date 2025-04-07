import React, { useState } from 'react';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ UpiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const paymentMethods = [
    { 
      id: 'googlepay', 
      name: 'Google Pay',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTkuNDYgMTYuMDFMMTAuNjQgMTYgMTUuOTQgOSAyMiA5VjdIMTUuMDRMOS41IDE0IDcgMTR2Mkw5LjQ2IDE2LjAxek0xOSAxOUg1VjVIMTlWMTl6TTUgM0MzLjkgMyAzIDMuOSAzIDV2MTRjMCAxLjEgMC45IDIgMiAyaDE0YzEuMSAwIDItMC45IDItMlY1QzIxIDMuOSAyMC4xIDMgMTkgM0g1eiIgZmlsbD0iIzQyODVGNCIvPjwvc3ZnPg=='
    },
    { 
      id: 'paytm', 
      name: 'PayTm',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTYuNTggMTIuMzhoNC4yN3YxLjI3SDYuNTh2LTEuMjd6bTcuNzItNC4xOWMtLjY1IDAtMS4zLjQzLTEuNTIgMS4wN0w5LjU3IDE4Ljg3YzAgLjA0LS4wNS4wOC0uMDkuMDhINi44OGMtLjA0IDAtLjA3LS4wNC0uMDctLjA4TDguNjYgOS43OWMuMjgtLjg2IDEuMDctMS40MiAxLjk2LTEuNDJoNi42M2MxLjA3IDAgMS45My44OCAxLjkzIDEuOTZ2OC41NGMwIC4wNC0uMDQuMDgtLjA4LjA4aC0yLjU5Yy0uMDQgMC0uMDgtLjA0LS4wOC0uMDh2LTguNTJjLjAxLS42NC0uNTEtMS4xNi0xLjEzLTEuMTZ6IiBmaWxsPSIjMDAyOTcwIi8+PC9zdmc+'
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjI0IDQuMzVjLTMuMjEgMC01LjgzIDIuNjItNS44MyA1LjgzdjYuM2MwIC40NC4zNi44LjguOEgyMS42YS44LjggMCAwIDAgLjgtLjh2LTYuM2MwLTMuMjEtMi42Mi01LjgzLTUuODMtNS44M3oiIGZpbGw9IiM1ZjI1OWYiLz48cGF0aCBkPSJNMTIuMDQgMTMuNDVjMC0xLjA3LjgtMi40Mi0uMDMtMy4xMy0xLjA3LS44OC0yLjk4LS4yNy0yLjk4IDEuMzF2My44OWgxLjU5di0zLjg5YzAtLjQ0LjUzLS42Ni44NC0uMzUuMi4yLjIuNTMuMi44di4yNWMwIC40NC4zNi44LjguOGgxLjU5Yy0uOTYgMC0xLjIxLS43Ny0yLjAxLS43eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNS43NiAxMC45di0uMjVjMC0uNDQtLjM2LS44LS44LS44aC0yLjEyYy40IDAgLjguMzYuOC44djMuODloMS41OXYtMi44N2MwLS4yOCAwLS41OC4yLS43NS4zLS4zLjg0LS4wOC44NC4zNXYzLjI3aDAuOFYxMC45YzAtLjQ0LS41My0uNjYtLjg0LS4zNS0uMi4yLS40Ny4zNS0uNDcuMzV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+'
    },
    { 
      id: 'amazonpay', 
      name: 'Amazon Pay',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLjM1IDE5LjEzYy0uMDQuMDMtLjA4LjA0LS4xNC4wMS0yLS45NS0yLjg1LTEuMzgtNC45MS0xLjM4LTIuNDIgMC00LjU3IDEuMi02LjIxIDMuMTktLjIxLjI1LS42Ny4wMi0uNDYtLjI4IDEuMTUtMS42NSAzLjQ0LTQuMDEgNy4xLTMuNjQgMS43MS4xOCAzLjM5LjI3IDUuMTUgMS41My4yMi4xNi4wNC40OC0uMTUuNjVhOTUuMDMgOTUuMDMgMCAwIDEtLjM4LjI2em0uOTItLjYxYy0uMTctLjE4LS4zOC0uMzQtLjU4LS40OXYtLjA3Yy4wNS0uMDYuMDktLjExLjEzLS4xNy40OS0uNjguNC0xLjc3LS4wOS0yLjU2LS40OC0uNzktMS4yLTEuMjktMi0xLjM3LS43OS0uMDgtMS42LjI3LTIuMDguOTYtLjQ4LjY4LS40IDEuNzcuMDkgMi41Ni4xMi4yLjMuNDEuNDUuNTItLjE1LjA4LS4yOS4xNi0uNDMuMjYtLjA5LjA2LS4xOC4xMi0uMjcuMTktLjIxLjE0LS40NC4zLS42NC40NnYtLjA1Yy0uMTItLjEzLS4yNC0uMjctLjM0LS40MS0uNTgtLjgyLS42NS0yLS4xNy0yLjkuNDktLjkgMS40MS0xLjQ3IDIuMy0xLjU2Ljg5LS4wOSAxLjgxLjMgMi4zNiAxLjA5LjU1LjggLjYzIDEuOTcuMTUgMi44Ny0uMDMuMDQtLjA1LjA5LS4wOC4xM3YuMDRaIiBmaWxsPSIjRkY5OTAwIi8+PHBhdGggZD0iTTE1Ljg3IDEyLjEyYzAgLjU0LjAxIDEuMDctLjM0IDEuNDUtLjI5LjMxLS43NS41Mi0xLjI3LjUzLTIgLjA0LTMuMTMtMS41LTMuMTMtMy40MSAwLTEuOTIgMS4xMy0zLjQ2IDMuMTMtMy40Mi41Mi4wMS45OC4yMiAxLjI3LjUzLjM0LjM4LjM0LjkxLjM0IDEuNDV2Mi44N3ptMy43NiA0LjUzYy0uMDEtLjE2LS4xMy0uMjgtMjYtLjI4LjE2Ljg2LTEuNDUtMS42My0xLjQ1LTUuOTRWMi42MmMwLS4zNC4yMi0uNTYuNTYtLjU2aDIuMDJjLjM1IDAgLjU2LjIyLjU2LjU2djcuNTljLjcxLS44NCAxLjc2LTEuMjYgMi45Mi0xLjI2IDIuOTQgMCA0LjggMi4yNCA0LjggNS4xNnMtMS44NiA1LjE2LTQuOCA1LjE2Yy0xLjE0IDAtMS45LS4zOC0yLjYyLTEuMTR2LjgzYzAgLjMzLS4yMy41NS0uNTYuNTVIOC4yOWMtLjM0IDAtLjU2LS4yMi0uNTYtLjU1di0uMjF6IiBmaWxsPSIjMTQ2RUI0Ii8+PC9zdmc+'
    },
    { 
      id: 'card', 
      name: 'Card',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwIDRINEMyLjg5IDQgMi4wMSA0Ljg5IDIuMDEgNkwyIDE4YzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjZjMC0xLjExLS44OS0yLTItMnptMCAxNEg0di02aDE2djZ6bTAtMTBINFY2aDE2djJ6IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayment || !amount || !name || !email || !phone || !upiid) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSelectedPayment('');
        setAmount('');
        setName('');
        setEmail('');
        setPhone('');
        setUpiId('');
        setSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Make a Payment</h1>
      {success ? (
        <div style={styles.successMessage}>Payment Successful! Thank you.</div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.paymentMethodsContainer}>
            <p style={styles.paymentLabel}>Select Payment Method:</p>
            <div style={styles.paymentOptions}>
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  style={selectedPayment === method.id ? styles.paymentMethodSelected : styles.paymentMethod}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <img 
                    src={method.icon} 
                    alt={method.name} 
                    style={styles.paymentIcon} 
                  />
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
            {!selectedPayment && <p style={styles.errorText}>Please select a payment method</p>}
          </div>
          <input 
            style={styles.input} 
            type="number" 
            placeholder="Amount (₹)" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
          <input 
            style={styles.input} 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            style={styles.input} 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            style={styles.input} 
            type="tel" 
            placeholder="Upi Id" 
            value={UpiId} 
            onChange={(e) => setUpiId(e.target.value)} 
            required 
          />
          <input 
            style={styles.input} 
            type="tel" 
            placeholder="Phone Number" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
          <button 
            style={loading || !selectedPayment ? styles.buttonDisabled : styles.button} 
            type="submit" 
            disabled={loading || !selectedPayment}
          >
            {loading ? 'Processing...' : `Pay ₹${amount || '0'} via ${selectedPayment ? paymentMethods.find(m => m.id === selectedPayment).name : ''}`}
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
  buttonDisabled: {
    padding: '10px',
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'not-allowed'
  },
  successMessage: {
    padding: '15px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '5px',
    fontSize: '18px'
  },
  paymentMethodsContainer: {
    marginBottom: '15px'
  },
  paymentLabel: {
    textAlign: 'left',
    margin: '5px 0',
    fontSize: '16px'
  },
  paymentOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center'
  },
  paymentMethod: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '110px'
  },
  paymentMethodSelected: {
    padding: '10px',
    border: '2px solid #007BFF',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    backgroundColor: '#e6f2ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '110px',
    fontWeight: 'bold'
  },
  paymentIcon: {
    width: '24px',
    height: '24px',
    marginBottom: '8px'
  },
  errorText: {
    color: '#dc3545',
    fontSize: '14px',
    margin: '5px 0 0 0',
    textAlign: 'left'
  }
};

export default Payment;

// import React, { useState } from 'react';

// const Payment = () => {
//   const [selectedPayment, setSelectedPayment] = useState('');
//   const [amount, setAmount] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedPayment || !amount || !name || !email || !phone) {
//       alert('Please fill in all fields');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//       setTimeout(() => {
//         setSelectedPayment('');
//         setAmount('');
//         setName('');
//         setEmail('');
//         setPhone('');
//         setSuccess(false);
//       }, 3000);
//     }, 2000);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Make a Payment</h1>
//       {success ? (
//         <div style={styles.successMessage}>Payment Successful! Thank you.</div>
//       ) : (
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input style={styles.input} type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//           <input style={styles.input} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
//           <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input style={styles.input} type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           <button style={loading ? styles.buttonDisabled : styles.button} type="submit" disabled={loading}>
//             {loading ? 'Processing...' : `pay ₹${amount}` || '0'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     backgroundColor: '#fff'
//   },
//   title: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     color: '#333'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '10px',
//     margin: '10px 0',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '16px'
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#007BFF',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     marginTop: '10px'
//   },
//   buttonDisabled: {
//     padding: '10px',
//     backgroundColor: '#aaa',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     marginTop: '10px',
//     cursor: 'not-allowed'
//   },
//   successMessage: {
//     padding: '15px',
//     backgroundColor: '#d4edda',
//     color: '#155724',
//     borderRadius: '5px',
//     fontSize: '18px'
//   }
// };

// export default Payment;