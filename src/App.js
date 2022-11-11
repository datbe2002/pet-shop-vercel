import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import Router from "./components/Router/routers";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="App">
        <Router></Router>
      </div>
    </>
  );
}

export default App;
