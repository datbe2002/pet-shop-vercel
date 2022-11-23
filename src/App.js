import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/Navbar";
import Router from "./components/Router/routers";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="App">
        <Router></Router>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
