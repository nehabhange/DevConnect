import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Landing />} />{" "}
        <Route exact path="/register" element={<Register/>} />{" "}
        <Route exact path="/login" element={<Login/>} />
        </Routes> <Footer />
      </div>{" "}
    </Router>
  );
}

export default App;
