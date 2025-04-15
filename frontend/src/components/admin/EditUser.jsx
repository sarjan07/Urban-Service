import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/users");
      setUsers(res.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      await axios.delete(`/deleteuserbyuserid/${userid}`);
      
      // Update local state by filtering out the deleted user
      // setUsers(users.filter(user => user._id !== userToDelete._id));
      
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbar({
        open: true,
        message: 'Failed to delete user. Please try again.',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({...snackbar, open: false});
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center'
        }}
      >
        <PersonIcon sx={{ mr: 1, fontSize: '1.8rem' }} />
        Manage Users
      </Typography>
      
      {users.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, mt: 2, textAlign: 'center' }}>
          <Typography variant="body1">No users found in the system.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell component="th" scope="row" sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user._id}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(user)}
                      size="small"
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm User Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user "{userToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleDeleteCancel} 
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditUser;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const EditUser = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getUserData();
//     deleteUser();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const res = await axios.get("/users");
//       setUsers(res.data.data);
//       console.log("Fetched users:", res.data.data); // ✅ will show data
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       const res = await axios.delete(`/deleteuserbyuserid/${userId}`);
//       console.log("Data deleted successfully");
//     } catch (error){
//       console.log("Error, Somthing went wrong!!!!", error);
//     }
//   }

//   return (
//     <div>
//       <table className="table">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Activity</th>
//             {/* <th>Status</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user) => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               {/* <td>{user.status}</td> */}
//               <td> <button type="button" class="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button> </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EditUser;



// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export const EditUser = () => {
//   const [message, setmessage] = useState("");
//   const [users, setusers] = useState([]);

//   const getAllUser = async () => {
//     const res = await axios.get("http://localhost:4000/users");
//     setmessage(res.data.message);
//     setusers(res.data.data);
//   };
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/users")
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setusers(response.data);
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>User List</h1>
//       <button onClick={getAllUser}>Get Users</button>
//       <p>{message}</p>

//       <table class="table">
//         <thead class="thead-dark">
//           <tr>
//             <th>#</th>
//             <th>user id</th>
//             <th>Name</th>
//             <th>email</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {users?.map?.(user => (
//   <div key={user.id}>{user.name}</div>
// ))} */}
//           {users?.map?.((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
