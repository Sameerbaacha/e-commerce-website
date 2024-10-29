import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Container, Box, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Mycontext } from '../../context/data/Mycontext';
import { toast } from 'react-toastify';
import { auth, fireDB, googleProvider } from '../../firebase/FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loadCart } from '../../redux/cartSlice';

const SignupPage = () => {
  const { loading, setloading } = useContext(Mycontext);
  // console.log(loading)
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

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

      dispatch(loginSuccess({ email: user.email, isAdmin: false }));
      toast.success('Signup Successful');
      navigate('/login'); // Use navigate to redirect

      setname('');
      setemail('');
      setpassword('');
    } catch (error) {
      // console.log(error.message);
      toast.error('Signup Failed');
    } finally {
      setloading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setloading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Define the admin condition based on the email
      const isAdmin = user.email === 'sameeris6512@gmail.com';

      // Dispatch login success and navigate
      dispatch(loginSuccess({ uid: user.uid, email: user.email, isAdmin }));
      toast.success('Google Signin Successfull', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });;

      // Optionally, load user-specific cart or data if required
      dispatch(loadCart(user.uid));

      navigate('/'); // Navigate to the desired route after successful login
    } catch (error) {
      // console.log('Error Code:', error.code);
      // console.log('Error Message:', error.message);
      toast.error(`Google Sign-In Failed`);
    } finally {
      setloading(false);
    }
  };

  return (
    <Container component="main" maxWidth='xs' sx={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', padding: '30px', mt: 2 }}>
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
          <div
            onClick={signInWithGoogle} // Add the onClick handler
            style={{
              backgroundColor: 'whitesmoke',
              marginTop: '3px',
              marginBottom: '2px',
              padding: '10px',
              borderRadius: '50px',
              justifyContent: 'center',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              color: 'black',
              cursor: 'pointer'
            }}
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Icon"
              style={{ width: '32px', height: '28px', marginRight: '8px' }}
            />
            <span>Sign in with Google</span>
          </div>



          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {"Already have an account? "}
            <Link href="#" onClick={() => navigate('/login')} sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
