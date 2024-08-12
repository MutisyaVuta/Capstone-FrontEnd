import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function Loan() {
  const [bookId] = useState(11);
  const [userId] = useState(1);
  const [loanId, setLoanId] = useState(null);
  const [location, setLocation] = useState('');
  const [fines, setFines] = useState(null);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const createLoan = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8080/loans', {
        book_id: bookId,
        user_id: userId,
      });

      setLoanId(res.data.loan_id);
      console.log('Updated Loan ID:', res.data.loan_id);
    } catch (error) {
      console.error('Error creating loan:', error);
      setError('Failed to create loan. Please try again.');
    }
  };

  const returnBook = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:8080/loans/${loanId}/return`);
      setFines(res.data.fines);
    } catch (err) {
      console.error('Error returning the book:', err);
      setError('Error returning the book. Please try again.');
    }
  };

  useEffect(() => {
    if (loanId !== null) {
      console.log('Loan ID updated:', loanId);
    }
  }, [loanId]);

  return (
    <div className="book-card">
      <div className="book-image">
        <img src="https://example.com/haunting-of-elmwood-manor.jpg" alt="The Haunting of Elmwood Manor" />
      </div>
      <div className="book-details">
        <p><strong>TITLE: </strong>{title}</p>
        <p><strong>AUTHOR: </strong>{author}</p>
        <p><strong>LOCATION: </strong>{location}</p>
        <p><strong>FINES: </strong>{fines}</p>
      </div>
      <div className="book-actions">
        <button className="loan-button" onClick={createLoan}>LOAN</button>
        <button className="return-button" onClick={returnBook}>RETURN</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Loan;
