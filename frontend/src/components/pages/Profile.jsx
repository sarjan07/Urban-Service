import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Inline JSX styles
  const styles = {
    // Base styles
    container: {
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px'
    },
    
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    
    profileTitle: {
      fontSize: '28px',
      color: '#2c3e50'
    },
    
    saveButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s'
    },
    
    profileContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
    },
    
    profileSidebar: {
      flex: 1,
      minWidth: '250px'
    },
    
    profileMain: {
      flex: 2,
      minWidth: '300px'
    },
    
    profilePhoto: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '5px solid #f5f5f5',
      marginBottom: '20px'
    },
    
    photoUpload: {
      marginBottom: '30px'
    },
    
    uploadBtn: {
      display: 'inline-block',
      padding: '8px 15px',
      backgroundColor: '#e7e7e7',
      color: '#333',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      border: '1px solid #ccc'
    },
    
    photoInput: {
      display: 'none'
    },
    
    thumbnailContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px'
    },
    
    thumbnail: (isSelected) => ({
      width: '70px',
      height: '70px',
      objectFit: 'cover',
      borderRadius: '5px',
      cursor: 'pointer',
      border: isSelected ? '2px solid #3498db' : '2px solid transparent'
    }),
    
    infoSection: {
      marginBottom: '25px'
    },
    
    sectionTitle: {
      fontSize: '18px',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #eee',
      paddingBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    
    infoItem: {
      marginBottom: '15px'
    },
    
    infoLabel: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
      color: '#7f8c8d'
    },
    
    infoValue: {
      fontSize: '16px'
    },
    
    aboutTextarea: {
      width: '100%',
      height: '150px',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      resize: 'vertical',
      fontSize: '15px'
    },
    
    editButton: {
      backgroundColor: '#f39c12',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s'
    },
    
    editInput: {
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      fontSize: '15px',
      width: '100%',
      marginTop: '5px'
    },
    
    toastContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    
    toast: (type) => ({
      minWidth: '250px',
      padding: '15px 20px',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
      color: 'white'
    }),
    
    toastClose: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      marginLeft: '10px'
    },
    
    actionButtons: {
      display: 'flex',
      gap: '10px'
    },
    
    cancelButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s'
    }
  };

  // For toast animation, we need to use inline styles with keyframes
  // This would typically be handled by a CSS-in-JS library in a real app
  const slideInAnimation = {
    animation: 'slideIn 0.3s ease-out forwards'
  };

  // State for user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: 28,
    status: "Active",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    aboutMe: "I am a software developer with a passion for creating useful web applications. I enjoy hiking, reading, and spending time with my family when I'm not coding."
  });

  // State to track if editing mode is active
  const [isEditing, setIsEditing] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({ ...userData });
  
  // State for photos
  const [mainPhoto, setMainPhoto] = useState("https://via.placeholder.com/150");
  const [thumbnails, setThumbnails] = useState([]);
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // If canceling edit, reset form data
      setFormData({ ...userData });
    }
    setIsEditing(!isEditing);
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Save all profile changes
  const saveChanges = () => {
    // Save all form data to user data
    setUserData({...formData});
    
    // Exit edit mode
    setIsEditing(false);
    
    // Show success message
    showToast('Profile updated successfully!');
    
    // In a real app: Save to database
    console.log('Saving profile changes:', formData);
  };

  // Handle photo upload
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newThumbnails = [];
      
      // Create thumbnails for all uploaded images
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        newThumbnails.push({
          id: i,
          url: imageUrl,
          selected: i === 0
        });
      }
      
      setThumbnails(newThumbnails);
      setMainPhoto(newThumbnails[0].url);
      showToast('Photos uploaded successfully!');
    }
  };

  // Select a thumbnail as main photo
  const selectThumbnail = (id) => {
    const updatedThumbnails = thumbnails.map(thumb => ({
      ...thumb,
      selected: thumb.id === id
    }));
    
    const selectedThumb = updatedThumbnails.find(thumb => thumb.id === id);
    setMainPhoto(selectedThumb.url);
    setThumbnails(updatedThumbnails);
    showToast('Main photo updated!');
  };

  // Update form data when user data changes
  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <h1 style={styles.profileTitle}>My Profile</h1>
        {isEditing ? (
          <div style={styles.actionButtons}>
            <button onClick={saveChanges} style={styles.saveButton}>
              Save Changes
            </button>
            <button onClick={toggleEditMode} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={toggleEditMode} style={styles.editButton}>
            Edit Profile
          </button>
        )}
      </div>
      
      {/* Toast container */}
      <div style={styles.toastContainer}>
        {toasts.map(toast => (
          <div key={toast.id} style={{...styles.toast(toast.type), ...slideInAnimation}}>
            <span>{toast.message}</span>
            <button 
              style={styles.toastClose}
              onClick={() => setToasts(prevToasts => 
                prevToasts.filter(t => t.id !== toast.id)
              )} >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div style={styles.profileContainer}>
        <div style={styles.profileSidebar}>
          <div style={styles.photoUpload}>
            <img
              src={mainPhoto}
              alt="Profile Photo"
              style={styles.profilePhoto}
            />
            <label htmlFor="photo-input" style={styles.uploadBtn}>
              Upload Photo
            </label>
            <input 
              type="file" 
              id="photo-input" 
              accept="image/*" 
              multiple 
              onChange={handlePhotoUpload}
              style={styles.photoInput}
            />
            <div style={styles.thumbnailContainer}>
              {thumbnails.map(thumb => (
                <img
                  key={thumb.id}
                  src={thumb.url}
                  alt="Thumbnail"
                  style={styles.thumbnail(thumb.selected)}
                  onClick={() => selectThumbnail(thumb.id)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.profileMain}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>
              Personal Information
            </h2>
            
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Name</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.editInput}
                />
              ) : (
                <span style={styles.infoValue}>{userData.name}</span>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Age</span>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={styles.editInput}
                />
              ) : (
                <span style={styles.infoValue}>{userData.age}</span>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Status</span>
              {isEditing ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={styles.editInput}
                >
                  <option value="Active">Active</option>
                  <option value="Away">Away</option>
                  <option value="Offline">Offline</option>
                  <option value="Do Not Disturb">Do Not Disturb</option>
                </select>
              ) : (
                <span style={styles.infoValue}>{userData.status}</span>
              )}
            </div>
          </div>
          
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>
              Contact Information
            </h2>
            
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email ID</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.editInput}
                />
              ) : (
                <span style={styles.infoValue}>{userData.email}</span>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Phone Number</span>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.editInput}
                />
              ) : (
                <span style={styles.infoValue}>{userData.phone}</span>
              )}
            </div>
          </div>
          
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>About Me</h2>
            {isEditing ? (
              <textarea
                name="aboutMe"
                style={styles.aboutTextarea}
                placeholder="Write something about yourself..."
                value={formData.aboutMe}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.aboutMe}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;



// import { useState, useEffect } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Button,
//   Avatar,
//   Alert,
// } from '@mui/material';
// import AuthService from '../services/AuthService';
// import axios from 'axios';

// const Profile=()=> {
//   const [user, setUser] = useState();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const currentUser = AuthService.getCurrentUser();
//     setUser(currentUser);
//     setFormData({
//       firstName: currentUser?.firstName || '',
//       lastName: currentUser?.lastName || '',
//       email: currentUser?.email || '',
//       phone: currentUser?.phone || '',
//       address: currentUser?.address || ''
//     });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios(`http://localhost:4000/users`);

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const updatedUser = await response.json();
//       setUser(updatedUser);
//       setSuccess('Profile updated successfully!');
//     } catch (err) {
//       setError(err.message || 'Failed to update profile. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1a73e8' }}>
//         Profile Settings
//       </Typography>

//       <Card sx={{ mt: 4, boxShadow: '0 2px 10px rgba(0,0,0,.1)' }}>
//         <CardContent>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}

//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//             <Avatar
//               sx={{
//                 width: 80,
//                 height: 80,
//                 bgcolor: '#1a73e8',
//                 fontSize: '2rem',
//                 mr: 2
//               }}
//             >
//               {user?.email?.charAt(0).toUpperCase()}
//             </Avatar>
//             <Box>
//               <Typography variant="h6">
//                 {user?.firstName} {user?.lastName}
//               </Typography>
//               <Typography color="text.secondary">
//                 {user?.email}
//               </Typography>
//             </Box>
//           </Box>

//           <Box component="form" onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     mt: 2,
//                     backgroundColor: '#1a73e8',
//                     '&:hover': { backgroundColor: '#1557b0' }
//                   }}
//                 >
//                   Save Changes
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

// export default Profile; 