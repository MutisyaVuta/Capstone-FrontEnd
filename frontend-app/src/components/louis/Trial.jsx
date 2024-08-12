//displays all the three admin pages
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin";
import Allusers from "./Allusers";
import Addbook from "./Addbook";

const Trial = () => {
  return (
    <div className="container mt-5">
      <Router>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/add-book" element={<Addbook />} />
          <Route path="/all-users" element={<Allusers />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Trial;
