import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Loan() {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [userId, setUserId] = useState(1); // Replace with actual user ID as needed
  const [loanId, setLoanId] = useState(null);
  const [fines, setFines] = useState(null);
  const [error, setError] = useState("");

  // Fetch book details
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

  // Check if a loan exists for the specific book
  useEffect(() => {
    async function getLoanIdForBook() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8080/loans/book/${bookId}`
        );
        setLoanId(res.data.loan_id);
        setFines(res.data.fines); // Update fines if available
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

  // Create a loan for the specific book
  async function createLoan() {
    try {
      const res = await axios.post("http://127.0.0.1:8080/loans", {
        user_id: userId,
        book_id: bookId,
      });

      // Update loanId with the ID returned from the server
      setLoanId(res.data.loan_id);
      setFines(null); // Clear fines since this is a new loan
      alert(
        "📖 We're excited to help you discover new reads, your loan is valid for a week"
      );
      console.log("Created Loan ID:", res.data.loan_id);
    } catch (error) {
      console.error("Error creating loan:", error);
      setError("Error creating loan. Please try again.");
    }
  }

  // Return the book and delete the loan record
  async function returnBook() {
    if (!loanId) {
      setError("Loan ID is not set. Please create a loan first.");
      return;
    }

    try {
      // Make the request to return the book
      const returnResponse = await axios.post(
        `http://127.0.0.1:8080/loans/${loanId}/return`
      );
      // Update fines after return
      setFines(returnResponse.data.fines);

      // Delete the loan record from the database
      await axios.delete(`http://127.0.0.1:8080/delete_loan/${loanId}`);

      alert(
        "Thank you for returning your book! 📚 We hope you enjoyed Booknest's vast catalog"
      );
      setLoanId(null); // Clear loanId after return
      setFines(null); // Clear fines after return
      console.log("Returned Book. Fines:", returnResponse.data.fines);
    } catch (err) {
      console.error("Error returning book:", err);
      setError("Error returning book. Please try again.");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <header
        style={{
          backgroundColor: "white",
          padding: "1em",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "1em",
        }}
      >
        <h2
          className="text-center mb-0"
          style={{ fontSize: "1.5em", fontWeight: "bold" }}
        >
          Loan Book
        </h2>
      </header>
      <div
        className="container mt-4"
        style={{
          backgroundColor: "#F9F9F9",
          padding: "1.5em",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px", // Decreased width
          minHeight: "400px", // Increased height
          margin: "0 auto",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            padding: "1.5em",
            marginBottom: "1em",
          }}
        >
          <div
            className="card-body"
            style={{
              backgroundColor: "#FFD7BE",
              padding: "1.5em",
              borderRadius: "15px",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            {error && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ marginBottom: "1em" }}
              >
                {error}
              </div>
            )}
            <h2
              className="card-title"
              style={{ fontSize: "1.5em", fontWeight: "bold" }}
            >
              {book.title}
            </h2>
            <p
              className="card-text"
              style={{ fontSize: "1em", marginBottom: "0.5em" }}
            >
              <strong>Author:</strong> {book.author}
            </p>
            <p
              className="card-text"
              style={{ fontSize: "1em", marginBottom: "0.5em" }}
            >
              <strong>Location:</strong> {book.book_location}
            </p>
            <p
              className="card-text"
              style={{ fontSize: "1em", marginBottom: "1em" }}
            >
              <strong>Fines:</strong>{" "}
              {fines !== null ? `₹${fines}` : "No fines"}
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary btn-lg"
                onClick={createLoan}
                style={{
                  borderRadius: "10px",
                  fontWeight: "bold",
                  padding: "0.5em 1em",
                }}
                disabled={!!loanId} // Disable if loan already exists
              >
                Loan
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={returnBook}
                style={{
                  borderRadius: "10px",
                  fontWeight: "bold",
                  padding: "0.5em 1em",
                }}
                disabled={!loanId} // Disable if no loan exists
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
