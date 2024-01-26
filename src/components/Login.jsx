import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { setToken } from '../redux/userAuth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    navigate('/sign-up');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        user: {
          username,
          email,
          password,
        },
      });

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setToken({ user: data, token: response.headers.authorization }));
        setSuccessMessage('Success! Redirecting to the home page...');
        setUsername(username);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(`Sign-in failed with status: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Sign-in failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Typography variant="h3" className="font-bold">
        Login
      </Typography>
      {successMessage && <Typography className="text-green-500">{successMessage}</Typography>}
      {errorMessage && <Typography className="text-red-500">{errorMessage}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Login;
