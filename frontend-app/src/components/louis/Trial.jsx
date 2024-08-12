import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin";
import Dashboard from "../nick/Dashboard";
import Addbook from "./Addbook";
import Allusers from "./Allusers";
import Loan from "../liam/Loan";

const Trial = () => {
  return (
    <div className="container mt-5">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-book" element={<Addbook />} />
          <Route path="/all-users" element={<Allusers />} />
          <Route path="/loan" element={<Loan />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Trial;
