import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import getToken from "../nina/Token";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication status
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // State for modal visibility
  const [code, setCode] = useState(""); // State for code input
  const [codeError, setCodeError] = useState(""); // State for code error message
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
    //retrieving the books
    axios
      .get("http://127.0.0.1:8080/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const token = getToken();
    if (!token) return; // Do nothing if not authenticated

    axios
      .post("http://127.0.0.1:8080/search_book", { title: searchTerm })
      .then((response) => {
        setSearchResults(response.data.books);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    const token = getToken();
    if (!token) return; // No token, do nothing

    axios
      .post(
        "http://127.0.0.1:8080/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        setIsAuthenticated(false); // Update authentication status
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openCodeModal = () => {
    setIsCodeModalOpen(true);
  };

  const closeCodeModal = () => {
    setIsCodeModalOpen(false);
    setCode("");
    setCodeError("");
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    if (code === "moringa") {
      navigate("/admin");
      closeCodeModal();
    } else {
      setCodeError("Invalid code. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

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
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light">
          <a
            className="navbar-brand"
            href="#"
            style={{ fontSize: "1.75rem", fontWeight: "bold" }}
          >
            BookNest
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="form-inline my-2 my-lg-0 mx-auto"
              onSubmit={handleSearch}
              style={{
                maxWidth: "600px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              }}
            >
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search by title"
                aria-label="Search"
                style={{
                  borderRadius: "5px",
                  flex: "1",
                  marginRight: "10px",
                  border: "1px solid #ced4da",
                }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                className="btn btn-outline-dark"
                type="submit"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#ffffff",
                  color: "#333",
                }}
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/sign-up" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={openCodeModal}>
                      Admin
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
      <div
        style={{
          backgroundColor: "#cccccc",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <div className="row">
          {(searchResults.length > 0 ? searchResults : books).map((book) => (
            <div className="col-md-3 mb-4" key={book.id}>
              <div
                className="card"
                style={{
                  backgroundColor: "#cccccc",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  {book.book_location && (
                    <p className="card-text">Location: {book.book_location}</p>
                  )}
                  {isAuthenticated ? (
                    <div className="d-flex justify-content-center">
                      <Link to={`/loan/${book.id}`}>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#20c997", // Soft teal color
                            color: "white",
                            padding: "12px 24px",
                            fontSize: "18px",
                            borderRadius: "5px",
                            border: "none",
                          }}
                        >
                          Borrow
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <p>Please log in to borrow books.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer
        style={{
          padding: "30px",
          borderRadius: "0 0 10px 10px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <p>&copy; 2024 BookNest. All rights reserved.</p>
        <p>
          Contact us:
          <br />
          Email: <a href="mailto:contact@booknest.com">contact@booknest.com</a>
          <br />
          Phone: <a href="tel:+254789786432">+254789786432</a>
        </p>
        <p>
          Follow us:
          <br />
          <a
            href="https://facebook.com/booknest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>{" "}
          |
          <a
            href="https://twitter.com/booknest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          |
          <a
            href="https://instagram.com/booknest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </p>
        <p>
          Interesting links:
          <br />
          <a
            href="https://www.librarything.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LibraryThing
          </a>
          <br />
          <a
            href="https://www.goodreads.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Goodreads
          </a>
        </p>
      </footer>

      {/* Code Verification Modal */}
      {isCodeModalOpen && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "1000",
          }}
        >
          <div
            className="modal-dialog"
            style={{
              margin: "100px auto",
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Admin Code</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={closeCodeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCodeSubmit}>
                  <div className="form-group">
                    <label htmlFor="admin-code">Code:</label>
                    <input
                      type="password"
                      id="admin-code"
                      className="form-control"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                    {codeError && (
                      <div className="text-danger">{codeError}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//
export default Dashboard;
