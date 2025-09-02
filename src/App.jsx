import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

// Importing components for different routes
import Login from "./pages/Auth/Login"; 
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";

// Study Tracker components 
import StudySessions from "./pages/Dashboard/StudySessions";
import ProductivityLog from "./pages/Dashboard/ProductivityLog";
import StudyMap from "./pages/Dashboard/StudyMap";
import StudyRecommendations from "./pages/Dashboard/StudyRecommendations";

import UserProvider from './context/userContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/studySessions" element={<StudySessions />} />
          <Route path="/productivityLog" element={<ProductivityLog />} />
          <Route path="/studyMap" element={<StudyMap />} />
          <Route path="/studyRecommendations" element={<StudyRecommendations />} />
        </Routes>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Router>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  // Check if token exists in localStorage 
  const isAuthenticated = !!localStorage.getItem('token');

  // Redirect to dashboard if authenticated, otherwise to login 
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
