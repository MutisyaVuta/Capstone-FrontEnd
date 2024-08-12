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
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "500px" }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
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
      <div className="container mt-4">
        <div className="row">
          {searchResults.length > 0
            ? searchResults.map((book) => (
                <div className="col-md-3" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Author: {book.author}</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-primary btn-sm">
                          Borrow
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          Return
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : books.map((book) => (
                <div className="col-md-3" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Author: {book.author}</p>
                      <p className="card-text">
                        Location: {book.book_location}
                      </p>
                      <div className="d-flex justify-content-between">
                        <Link to="/loan">
                          <button className="btn btn-primary btn-sm">
                            Borrow
                          </button>
                        </Link>
                        <button className="btn btn-secondary btn-sm">
                          Return
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
