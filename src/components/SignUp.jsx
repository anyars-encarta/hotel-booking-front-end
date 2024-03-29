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

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://hotel-booking-5vj9.onrender.com/api/users', {
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
          `Hello "${username}", you've successfully registered. Please login to continue.`,
        );
        setUsername('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login');
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
    <div className="form-parent">
      <div className="flex flex-col gap-8 justify-center items-center login">
        <Typography variant="h5" className="font-bold">
          Sign Up
          <hr className="border border-danger border-1 opacity-50 mt-2" />
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

        <div className="buttons">
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button variant="contained" color="info" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
