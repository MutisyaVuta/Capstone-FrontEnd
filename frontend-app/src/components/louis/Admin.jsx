import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please check the backend.");
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8080/search_book", {
        title: searchTerm,
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error searching books:", error);
      setError("Failed to search books. Please check the backend.");
    }
  };

  const handleEdit = (book) => {
    setEditing(true);
    setCurrentBook(book);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/book/${currentBook.id}`,
        {
          title: currentBook.title,
          author: currentBook.author,
          copy_numbers: currentBook.copy_numbers,
          book_location: currentBook.book_location,
        }
      );
      setEditing(false);
      console.log(response.data.message);
      const updatedBooks = books.map((book) =>
        book.id === currentBook.id ? currentBook : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book:", error);
      setError("Failed to update book. Please check the backend.");
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/delete_book/${bookId}`
      );
      console.log(response.data.message);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please check the backend.");
    }
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
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <div className="row">
          <div className="col-md-12 text-right">
            <h4>Welcome Admin!</h4>
          </div>
        </div>
      </header>
      <div
        className="container mt-4"
        style={{
          backgroundColor: "#cccccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Search by title"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm mt-2">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 text-right">
            <Link to="/add-book" className="btn btn-primary btn-sm mr-2">
              Add Books
            </Link>
            <Link to="/all-users" className="btn btn-secondary btn-sm">
              All Users
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Location</th>
                  <th scope="col">Copies</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <th scope="row">{book.id}</th>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.book_location}</td>
                    <td>{book.copy_numbers}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editing && (
          <div className="row mt-4">
            <div className="col-md-12">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook.title}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook.author}
                    onChange={(e) =>
                      setCurrentBook({ ...currentBook, author: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Number of Copies</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentBook.copy_numbers}
                    onChange={(e) =>
                      setCurrentBook({
                        ...currentBook,
                        copy_numbers: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBook.book_location}
                    onChange={(e) =>
                      setCurrentBook({
                        ...currentBook,
                        book_location: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-success btn-sm mr-2">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <footer
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          marginTop: "20px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; {new Date().getFullYear()} Library Management System</p>
              <p>123 Library St, Booktown, BK 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: contact@librarysystem.com</p>
            </div>
            <div className="col-md-6 text-right">
              <a href="/privacy-policy" className="btn btn-link">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="btn btn-link ml-2">
                Terms of Service
              </a>
              <a href="/about-us" className="btn btn-link ml-2">
                About Us
              </a>
              <a href="/contact-us" className="btn btn-link ml-2">
                Contact Us
              </a>
              <div className="mt-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link ml-2"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link ml-2"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
