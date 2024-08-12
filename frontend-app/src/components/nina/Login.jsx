import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { email, password };
      console.log("Sending login request with:", JSON.stringify(payload, null, 2));

      const response = await axios.post("http://localhost:8080/login", payload);

      console.log("Login response:", JSON.stringify(response.data, null, 2));

      if (response.data.message === "Login success") {
        alert("Login successful!");
        // Handle successful login, e.g., store token and redirect
        localStorage.setItem('token', response.data.token); // Save token if needed
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data) {
        // Display error message from backend if available
        setError(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
