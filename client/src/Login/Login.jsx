import React, { useState } from "react";
import { login, setAuthToken } from "../api";
import './login.css'

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(credentials.username, credentials.password);
      setAuthToken(token); // Set token for API calls
      onLogin(); // Notify parent component about successful login
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="form">
      <div className="form-container">
      <h1 className="form-heading">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div className="form-div">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default Login;
