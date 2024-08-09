import React, { useState } from "react";
import axios from "axios";

const Addbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copyNumbers, setCopyNumbers] = useState("");
  const [bookLocation, setBookLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default form behavoir
    try {
      const response = await axios.post("http://127.0.0.1:8080/book", {
        title,
        author,
        copy_numbers: copyNumbers,
        book_location: bookLocation,
      });
      console.log(response.data);
      // Set success message
      setSuccess(response.data.message);
    } catch (error) {
      console.error(error);
      // Set error message
      setError(error.message);
    }
  };

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-center">Add Book</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Author"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="copy_numbers">Copy Numbers</label>
          <input
            type="number"
            className="form-control"
            id="copy_numbers"
            value={copyNumbers}
            onChange={(event) => setCopyNumbers(event.target.value)}
            placeholder="Copy Numbers"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="book_location">Book Location</label>
          <input
            type="text"
            className="form-control"
            id="book_location"
            value={bookLocation}
            onChange={(event) => setBookLocation(event.target.value)}
            placeholder="Book Location"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Addbook;
