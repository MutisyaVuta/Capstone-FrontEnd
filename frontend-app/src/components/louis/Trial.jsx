// Appp.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin";
import Allusers from "./Allusers";
import Addbook from "./Addbook";

const Trial = () => {
  return (
    <Router>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12 text-right">
            <h4>Welcome Admin</h4>
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
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/add-book" element={<Addbook />} />
          <Route path="/all-users" element={<Allusers />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Trial;
