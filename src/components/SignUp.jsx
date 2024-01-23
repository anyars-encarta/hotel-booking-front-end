import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { setToken } from '../redux/userAuth/authSlice';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users', {
        user: {
          username,
          email,
          password,
          passwordConfirmation,
        },
      });

      if (response.status === 201) {
        dispatch(setToken({ username, token: response.data.jti }));

        setSuccessMessage(
          `Hello "${username}", you've successfully registered. Redirecting to Home page...`,
        );
        setUsername('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(`Registration failed with status: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Registration failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Typography variant="h3" className="font-bold">
        Sign Up
      </Typography>
      {successMessage && (
        <Typography className="text-green-500">{successMessage}</Typography>
      )}
      {errorMessage && (
        <Typography className="text-red-500">{errorMessage}</Typography>
      )}
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
