import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/NavBar/Navbar";
import Register from "./components/Auth/Register/Register";

function App() {
  return (
    <Router>
      <NavBar></NavBar>

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
