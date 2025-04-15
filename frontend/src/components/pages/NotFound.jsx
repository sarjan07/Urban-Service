import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8
    }}>
      <Paper elevation={10} sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 4,
        background: '#ffffff',
        position: 'relative'
      }}>
        {/* Top decorative bar */}
        <Box sx={{
          height: '8px',
          width: '100%',
          background: 'linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)',
          backgroundSize: '600% 600%',
          animation: 'gradientAnimation 10s ease infinite',
          '@keyframes gradientAnimation': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }} />

        <Grid container>
          {/* Left side - Illustration area */}
          <Grid item xs={12} md={5} sx={{
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{
              width: '100%',
              height: '100%', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              {/* Abstract shapes in background */}
              <Box sx={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(244, 67, 54, 0.1)',
                top: '-50px',
                left: '-50px',
                zIndex: 1
              }} />
              <Box sx={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'rgba(33, 150, 243, 0.1)',
                bottom: '-30px',
                right: '-30px',
                zIndex: 1
              }} />
              
              {/* 404 Text */}
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '4rem', sm: '6rem', md: '7rem' }, 
                fontWeight: 900, 
                color: '#2196f3',
                textShadow: '4px 4px 0px rgba(33, 150, 243, 0.2)',
                position: 'relative',
                zIndex: 2,
                letterSpacing: '-3px',
                mb: 2
              }}>
                404
              </Typography>
              
              {/* Error icon */}
              <ErrorOutlineIcon sx={{ 
                fontSize: { xs: '3rem', sm: '4rem' }, 
                color: '#ff5722',
                mb: 2,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' }
                }
              }} />
            </Box>
          </Grid>

          {/* Right side - Content area */}
          <Grid item xs={12} md={7} sx={{
            p: { xs: 3, sm: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: '#1e293b',
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}>
              Oops! You've ventured too far
            </Typography>
            
            <Typography variant="body1" sx={{ 
              color: '#475569',
              mb: 1,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.6
            }}>
              The page you're looking for doesn't exist or has been moved.
            </Typography>
            
            <Box sx={{
              p: 2,
              bgcolor: 'rgba(255, 152, 0, 0.05)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
              borderRadius: 2,
              mt: 2,
              mb: 3
            }}>
              <Typography variant="body1" sx={{ color: '#ff9800', fontWeight: 500 }}>
                Possible reasons:
              </Typography>
              <ul style={{ 
                paddingLeft: '20px',
                margin: '8px 0 0',
                color: '#64748b'
              }}>
                <li>The URL might be misspelled</li>
                <li>The page may have been moved or deleted</li>
                <li>You might not have permission to view this page</li>
              </ul>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2
            }}>
              <Button 
                variant="contained" 
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 600,
                  backgroundColor: '#2196f3',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Back to Home
              </Button>
              
              <Button 
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: '#64748b',
                  color: '#64748b',
                  '&:hover': {
                    borderColor: '#475569',
                    backgroundColor: 'rgba(100, 116, 139, 0.04)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Go Back
              </Button>
              
              <Button 
                variant="text"
                startIcon={<HelpOutlineIcon />}
                onClick={() => navigate('/contact')}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 600,
                  color: '#64748b',
                  '&:hover': {
                    backgroundColor: 'rgba(100, 116, 139, 0.04)',
                  }
                }}
              >
                Get Help
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom URL display */}
        <Box sx={{
          p: 2,
          borderTop: '1px solid #e2e8f0',
          bgcolor: '#f8fafc',
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
            URL: <span style={{ color: '#ef4444' }}>{window.location.href}</span>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;


// import { useNavigate } from 'react-router-dom';
// import { Container, Typography, Box, Button } from '@mui/material';

// const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
//       <div style={{backgroundColor:"lightblue",border:"2px solid red",padding:"30px", height:"350px"}}>
//         <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', color: 'error.main' }}>
//           404
//         </Typography>
//         <Typography variant="h4" sx={{ mt: 2, fontWeight: 'medium' }}>
//           Oops! You are at the wrong URL.
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
//           Please check your URL or go back to the homepage.
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1rem' }} 
//           onClick={() => navigate('/')}
//         >
//           Go to Homepage
//         </Button>
        
//       </div>
//     </Container>
//   );
// };

// export default NotFound;