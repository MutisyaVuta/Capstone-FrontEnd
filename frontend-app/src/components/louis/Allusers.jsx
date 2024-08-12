import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // axios instance
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8080",
  });

  // Fetch all users
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      setAllUsers(response.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/search-users", {
        admn_no: searchTerm,
      });
      setSearchResults(response.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "sage",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <header
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-0">All Users</h2>
      </header>
      <div
        className="container mt-5"
        style={{
          backgroundColor: "#cccccc",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        <div className="input-group mb-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search by admission number"
            aria-label="Search"
            aria-describedby="search-btn"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{
              borderRadius: "5px 0 0 5px",
              borderColor: "#ced4da",
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="search-btn"
            onClick={handleSearch}
            disabled={loading}
            style={{
              borderRadius: "0 5px 5px 0",
              backgroundColor: "#007bff",
              color: "white",
              borderColor: "#007bff",
              fontWeight: "bold",
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Admin No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : allUsers).map(
              (user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.admn_no}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
