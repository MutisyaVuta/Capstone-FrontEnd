import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "./Admin";
import Dashboard from "../nick/Dashboard";
import Addbook from "./Addbook";
import Allusers from "./Allusers";
import Sign from "./Sign";

const Trial = () => {
  return (
    <div className="container mt-5">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-book" element={<Addbook />} />
          <Route path="/all-users" element={<Allusers />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Trial;
