import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addbook from "./Addbook";
import Das from "./Das";
import AllUsers from "./Allusers";
import Admin from "./Admin";
const Appp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Allusers" element={<AllUsers />} />
        <Route path="/Addbook" element={<Addbook />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default Appp;
