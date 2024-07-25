import React, { useState } from 'react';
import axios ,{AxiosError}from 'axios';
import Oauth from '../../component/auth/Oauth';
import { useNavigate } from 'react-router-dom';
import { signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BACKEND_URL}/api/auth/register`, 
            { email, password,username }, // Assuming you have a username in the registration form
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        );

        // If the request is successful, the response data will be the user object or a success message
        dispatch(signInSuccess(response.data));
        navigate("/login"); // Redirect to login page or wherever appropriate
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios error
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(axiosError.response.data.message || 'An error occurred during registration');
            } else if (axiosError.request) {
                // The request was made but no response was received
                setError('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('Error setting up the request');
            }
            dispatch(signInFailure(axiosError.response?.data.message || 'Registration failed'));
        } else {
            // Non-Axios error
            setError('An unknown error occurred');
            dispatch(signInFailure('An unknown error occurred'));
        }
    }
};



  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="UserName"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <Oauth/>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;