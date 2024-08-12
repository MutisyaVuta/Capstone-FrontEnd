
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/nina/Signup';
import Login from './components/nina/Login';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Welcome! <a href="/login">Login</a> or <a href="/signup">Sign Up</a></div>} />
        </Routes>
      </div> 
    </Router>

  )
  }
export default App;