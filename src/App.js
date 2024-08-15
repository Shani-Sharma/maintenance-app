// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Details from './Details';
import PaymentPage from './PaymentPage'; // Import PaymentPage component

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the login page or redirect to details if already logged in */}
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/details" /> : <Login onLogin={handleLogin} />}
          />
          {/* Route for the details page */}
          <Route
            path="/details"
            element={loggedIn ? <Details /> : <Navigate to="/" />}
          />
          {/* Route for the payment page */}
          <Route
            path="/payment"
            element={loggedIn ? <PaymentPage /> : <Navigate to="/" />}
          />
          {/* Redirect to home if no match found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
