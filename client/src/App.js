import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "pages/Login";
import Home from "pages/Home";
import Profile from "pages/Profile";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile/:userId"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
