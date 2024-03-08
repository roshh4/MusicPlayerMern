import React, { useState } from 'react';

const SignUpPage = ({ onToggleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Perform signup logic
      // For simplicity, let's consider it successful if username and password are not empty
      if (username.trim() !== '' && password.trim() !== '') {
        // Construct the data object to be sent to the server
        const data = {
          username: username,
          password: password,
        };

        // Make a POST request to the signup endpoint on your server
        const response = await fetch('http://localhost:3002/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Handle successful signup, e.g., show a success message
          console.log('Sign up successful');
          onToggleLogin(); // After signing up, switch back to the login page
        } else {
          // Handle signup failure, e.g., show an error message
          console.error('Sign up failed');
        }
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      <p>
        Already have an account? <span onClick={onToggleLogin}>Login here</span>
      </p>
    </div>
  );
};

export default SignUpPage;
