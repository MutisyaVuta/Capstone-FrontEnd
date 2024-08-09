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

  //fetch all users
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

  //search
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
    <div className="container mt-5">
      <h2 className="mb-3">All Users</h2>
      <div className="input-group mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search by admission number"
          aria-label="Search"
          aria-describedby="search-btn"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="search-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
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
  );
};

export default AllUsers;
