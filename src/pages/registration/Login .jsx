import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Container, Box, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Mycontext } from '../../context/data/Mycontext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Login = () => {
  const handleSignupClick = () => {
    // Navigate to signup page
    window.location.href = '/signup';
  };

  const { loading, setloading } = useContext(Mycontext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const Login = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setloading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Check if user is an admin
      const isAdmin = user.email === 'sameerkhan@gmail.com';

      // Store user and admin status in localStorage
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin }));

      toast.success('Signin Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate('/'); // Navigate to home or any other page after login
      setloading(false);
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to Login');
      setloading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', padding: '40px', mt: 8 }}>
      {loading && <Loader />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={Login} sx={{ mt: 3 }}>
          <TextField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              sx: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
            }}
          />
          <TextField
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              sx: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: '#1976d2',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#125ea1',
              },
            }}
          >
            Sign In
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {"Don't have an account? "}
            <Link href="#" onClick={handleSignupClick} sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
