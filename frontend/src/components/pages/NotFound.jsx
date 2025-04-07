import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{
        p: 5,
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(135deg,rgb(109, 114, 255),rgb(244, 94, 53))',
        color: 'red'
      }}>
        <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', color: 'rgb(197, 53, 53)', textShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)' }}>
          🚧 404 🚧
        </Typography>
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 'medium', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>
          Oops! 😲 You are at the wrong URL.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: '#f5f5f5', textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)' }}>
          🔍 Please check your URL or go back to the homepage.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1rem', borderRadius: '12px', boxShadow: '3px 3px 15px rgba(0, 0, 0, 0.3)' }} 
          onClick={() => navigate('/')}
        >
          🏠 Go to Homepage
        </Button>
        
      </Box>
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