import React, { useState } from 'react';
import LoginPage from './LogInPage';
import SignUpPage from './SignUpPage';

const Authentication = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToggle = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleAuthentication = () => {
    
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isLoginPage ? (
        <LoginPage onToggleSignUp={handleToggle} onAuthenticate={handleAuthentication} />
      ) : (
        <SignUpPage onToggleLogin={handleToggle} onAuthenticate={handleAuthentication} />
      )}
    </div>
  );
};

export default Authentication;
