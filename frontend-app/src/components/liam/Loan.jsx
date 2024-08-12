import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './style.css';

function Loan() {
  const [bookId] = useState(11);
  const [userId, setUserId] = useState(1);
  const [loanId, setLoanId] = useState(null);
  const [location, setLocation] = useState('');
  const [fines, setFines] = useState(null);
 const [error, setError] = useState('');


  async function createLoan() {
    try {
      const res = await axios.post('http://127.0.0.1:8080/loans', {
        book_id: bookId,
        user_id: userId,
      });

      setLoanId(res.data.loan_id);
      console.log('Updated Loan ID:', loanId);
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  }
  
  async function returnBook(){
    try{
     const res = await axios.post(`http://127.0.0.1:8080/loans/${loanId}/return`);
      setFines(res.data.fines);
    
    } catch (err) {
      setError('Error returning the book. Please try again.');
      console.error('Error:', err);
    }
  }


   useEffect(() => {
    if (loanId !== null) {
      console.log('Updated Loan ID:', loanId);
    }
  }, [loanId]);

  return (
    <div className="book-card">
      <div className="book-image">
        <img src="https://example.com/haunting-of-elmwood-manor.jpg" alt="The Haunting of Elmwood Manor" />
      </div>
      <div className="book-details">
        <p><strong>TITLE :</strong> The Haunting of Elmwood Manor</p>
        <p><strong>AUTHOR :</strong> Pamela McCord</p>
        <p><strong>LOCATION :</strong> {location}</p>
        <p><strong></strong>fines:{fines}</p>
      </div>
      <div className="book-actions">
        <button className="loan-button" onClick={createLoan}>LOAN</button>
        <button className="return-button"  onClick={returnBook}>RETURN</button>
      </div>
    </div>
  );
}

export default Loan;
