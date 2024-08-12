import React, { useState } from "react";
import axios from "axios";

const Sign = () => {
  const [name, setName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        name,
        email,
        admn_no: admissionNumber,
        password,
      });
      if (response.data.message === "Sign up success") {
        alert("Sign up successful!");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Admission number already in use")) {
          setError(
            "Admission number is already in use. Please try a different one."
          );
        } else if (errorMessage.includes("Email already in use")) {
          setError("Email is already in use. Please try a different one.");
        } else {
          setError("An error occurred. Please try again.");
        }
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
        padding: "0",
        margin: "0",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#cccccc",
          padding: "40px 20px",
          borderRadius: "10px",
          maxWidth: "600px",
          marginTop: "40px",
        }}
      >
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body">
            <h2 className="text-center mb-4">Sign Up Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="admissionNumber">Admission Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="admissionNumber"
                  placeholder="Enter your admission number"
                  value={admissionNumber}
                  onChange={(event) => setAdmissionNumber(event.target.value)}
                />
              </div>
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
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
