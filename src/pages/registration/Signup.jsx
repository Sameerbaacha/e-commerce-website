import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Container, Box, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Mycontext } from '../../context/data/Mycontext';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

const SignupPage = () => {
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const { loading, setloading } = useContext(Mycontext);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const signup = async (e) => {
    e.preventDefault();
    setloading(true);
    if (name === '' || email === '' || password === '') {
      setloading(false);
      return toast.error('All fields are required');
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success('Signup Successful');

      window.location.href = '/login'; // Navigate to the login page
      
      setname('');
      setemail('');
      setpassword('');
    } catch (error) {
      console.log(error.message);
      toast.error('Signup Failed');
    } finally {
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
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            value={name}
            onChange={(e) => setname(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            InputProps={{
              sx: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
            }}
          />
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
            autoComplete="new-password"
            InputProps={{
              sx: { backgroundColor: '#f5f5f5', borderRadius: '8px' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={signup}
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
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {"Already have an account? "}
            <Link href="#" onClick={handleLoginClick} sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
