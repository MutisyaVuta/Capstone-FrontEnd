import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { email, password };
      console.log(
        "Sending login request with:",
        JSON.stringify(payload, null, 2)
      );

      const response = await axios.post("http://127.0.0.1:8080/login", payload);

      console.log("Login response:", JSON.stringify(response.data, null, 2));

      if (response.data.token) {
        alert("Login successful!");
        // Store token locally
        localStorage.setItem("token", response.data.token);
        //successful login
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data) {
        // Display error message from backend if available
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "sage",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        margin: "0",
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: "#cccccc",
          padding: "40px 20px",
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body">
            <h2 className="text-center mb-4">Login Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
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
              <div className="form-group mb-3">
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
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
