import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onToggleSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Perform basic validation
      if (!username || !password) {
        console.log('Username and password are required');
        return;
      }

      // Construct the data object to be sent to the server
      const data = {
        username: username,
        password: password,
      };

      // Make a POST request to the login endpoint on your server
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');

        // Navigate to another page, e.g., '/app'
        navigate('/musicplayer');
      } else {
        // Handle login failure, e.g., show an error message
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <p>
        Don't have an account? <span onClick={onToggleSignUp}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginPage;
