// // SignIn component

// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import { Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import {
//   Link as RouterLink,
//   Routes,
//   Route,
//   useNavigate
// } from "react-router-dom";
// import SignInSignUp from '../../pages/SignInSignUp/SignInSignUp';

// interface SignInProps {
//   onClose: () => void;
// }

// const SignIn: React.FC<SignInProps> = ({ onClose }) => {
//   const navigate = useNavigate();
  
//   const handleSignUpClick = () => {
//     onClose(); // Close the second drawer
//     navigate('/signInSignUp'); // Navigate to the "/signInSignUp" route
//   };

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!formData.email || !formData.password) {
//       alert('Please provide both email and password.');
//       return;
//     }

//     onClose();
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           backgroundColor: "#0F4037",
//           padding: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
//           Sign in
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             sx={{
//               backgroundColor: "#f9f9f9",
//               borderRadius: 1,
//             }}
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             sx={{
//               backgroundColor: "#f9f9f9",
//               borderRadius: 1,
//               "&:hover": {
//                 borderColor: "#B58B5D",
//               },
//               "&:focus": {
//                 borderColor: "#B58B5D",
//               },
//             }}
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               mb: 2,
//               backgroundColor: "#BF9460",
//               "&:hover": {
//                 backgroundColor: "#B58B5D",
//               },
//             }}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item>
//               <Link
//                 href="#"
//                 variant="body2"
//                 sx={{ color: "#D9D5A7" }}
//                 onClick={handleSignUpClick}
//               >
//                 {<u>"Don't have an account? Sign Up"</u>}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default SignIn;

// // import React, { useState, useEffect } from 'react';
// // import { Session } from '@supabase/supabase-js';
// // import { supabase } from '../../supabaseClient';
// // import Auth from '../../Auth';
// // import Account from '../../Account';

// // function SignIn() {
// //   const [session, setSession] = useState<Session | null>(null);

// //   useEffect(() => {
// //     const fetchSession = async () => {
// //       const { data: sessionData, error } = await supabase.auth.getSession();
// //       if (error) {
// //         console.error('Error fetching session:', error.message);
// //       } else if (sessionData) {
// //         setSession(sessionData.session);
// //       }
// //     };

// //     fetchSession();

// //     const authListener = supabase.auth.onAuthStateChange((_event, session) => {
// //       setSession(session);
// //     });

// //     // No need to unsubscribe from authListener as it's not a subscription

// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

// //   return (
// //     <div className="container" style={{ padding: '50px 0 100px 0' }}>
// //       {!session ? <Auth /> : <Account key={session?.user?.id} session={session} />}
// //     </div>
// //   );
// // }

// // export default SignIn;


import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authenticateUser } from '../../utils/interceptors/axiosInterceptors';


interface SignInProps {
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please provide both email and password.');
      return;
    }

    try {
      const success = await authenticateUser(formData);
      if (success) {
        onClose(); 
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An error occurred during authentication.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: "#0F4037",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#D9D5A7" }}>
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
            }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
              "&:hover": {
                borderColor: "#B58B5D",
              },
              "&:focus": {
                borderColor: "#B58B5D",
              },
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#BF9460",
              "&:hover": {
                backgroundColor: "#B58B5D",
              },
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{ color: "#D9D5A7" }}
              >
                <RouterLink to="/signInSignUp" style={{ textDecoration: 'none', color: '#D9D5A7' }}>
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
