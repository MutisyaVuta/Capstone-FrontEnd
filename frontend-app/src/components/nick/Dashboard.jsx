import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/books")
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8080/search_book", { title: searchTerm })
      .then((response) => {
        setSearchResults(response.data.books);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          borderRadius: "10px 10px 0 0",
          width: "100%",
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
            >
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "600px" }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item ml-auto">
                <Link to="/Sign" className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ccc",
          margin: "0",
          padding: "0",
        }}
      />
      <div
        className="container mt-4"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
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
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <p>&copy; 2024 BookNest. All rights reserved.</p>

        <p>
          Contact us:
          <br />
          Email: <a href="mailto:contact@booknest.com">contact@booknest.com</a>
          <br />
          Phone: <a href="tel:+1234567890">+123-456-7890</a>
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
    </div>
  );
};

export default Dashboard;
