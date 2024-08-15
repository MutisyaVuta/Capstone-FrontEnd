import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Loan() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [userId, setUserId] = useState(1);
  const [loanId, setLoanId] = useState(null);
  const [fines, setFines] = useState(null);
  const [error, setError] = useState("");

  //fetching book details
  useEffect(() => {
    console.log(`Fetching book with ID ${bookId}`);
    axios
      .get(`http://127.0.0.1:8080/books/${bookId}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setBook(response.data.book);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setError("Error fetching book. Please try again.");
      });
  }, [bookId]);
  //cheking if a loan exists for that specific book
  useEffect(() => {
    async function getLoanIdForBook() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8080/loans/book/${bookId}`
        );
        setLoanId(res.data.loan_id);
        console.log("Fetched Loan ID:", res.data.loan_id);
      } catch (error) {
        console.error("Error fetching loan ID:", error);
        setError("Error fetching loan ID. Please try again.");
      }
    }

    if (bookId) {
      getLoanIdForBook();
    }
  }, [bookId]);
  //creating a loan for that specific book
  async function createLoan() {
    try {
      const res = await axios.post("http://127.0.0.1:8080/loans", {
        user_id: userId,
        book_id: bookId,
      });

      // Update loanId with the ID returned from the server
      setLoanId(res.data.loan_id);
      alert(
        "📖 We're excited to help you discover new reads,ur loan is valid for a week"
      );
      console.log("Created Loan ID:", res.data.loan_id);
    } catch (error) {
      console.error("Error creating loan:", error);
      setError("Error creating loan. Please try again.");
    }
  }
  //returning the book
  async function returnBook() {
    if (!loanId) {
      setError("Loan ID is not set. Please create a loan first.");
      return;
    }

    try {
      const res = await axios.post(
        `http://127.0.0.1:8080/loans/${loanId}/return`
      );
      setFines(res.data.fines);
      alert(
        "Thank you for returning your book! 📚 We hope you enjoyed Booknest's vast catalog"
      );
      console.log("Returned Book. Fines:", res.data.fines);
    } catch (err) {
      console.error("Error returning book:", err);
      setError("Error returning book. Please try again.");
    }
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
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-0">Loan Book</h2>
      </header>
      <div
        className="container mt-4"
        style={{
          backgroundColor: "#cccccc",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="card-body"
            style={{
              backgroundColor: "#FFD7BE",
              padding: "20px",
            }}
          >
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <h2 className="card-title">{book.title}</h2>
            <p className="card-text">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {book.book_location}
            </p>
            <p className="card-text">
              <strong>Fines:</strong> {fines ? `₹${fines}` : "No fines"}
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary btn-lg"
                onClick={createLoan}
                style={{ borderRadius: "5px", fontWeight: "bold" }}
              >
                Loan
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={returnBook} // Trigger return book on button click
                style={{ borderRadius: "5px", fontWeight: "bold" }}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loan;
