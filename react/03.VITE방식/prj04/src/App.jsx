import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Ex01 from "./pages/Ex01";
import Ex02 from "./pages/Ex02";
import Ex03 from "./pages/Ex03";
import Ex04 from "./pages/Ex04";
import Ex05 from "./pages/Ex05";
import Ex06 from "./pages/Ex06";
import Ex07 from "./pages/Ex07";
import Ex08 from "./pages/Ex08";
import Ex09 from "./pages/Ex09";
import Ex10 from "./pages/Ex10";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      <div className="app-container">
        {showNavbar && (
          <nav className="dark-nav">
            <Link to="/" className="nav-logo">
              ← Home
            </Link>
            <div className="nav-links">
              <Link to="/ex01">Ex01</Link>
              <Link to="/ex02">Ex02</Link>
              <Link to="/ex03">Ex03</Link>
              <Link to="/ex04">Ex04</Link>
              <Link to="/ex05">Ex05</Link>
              <Link to="/ex06">Ex06</Link>
              <Link to="/ex07">Ex07</Link>
              <Link to="/ex08">Ex08</Link>
              <Link to="/ex09">Ex09</Link>
              <Link to="/ex10">Ex10</Link>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ex01" element={<Ex01 />}></Route>
          <Route path="/ex02" element={<Ex02 />}></Route>
          <Route path="/ex03" element={<Ex03 />}></Route>
          <Route path="/ex04" element={<Ex04 />}></Route>
          <Route path="/ex05" element={<Ex05 />}></Route>
          <Route path="/ex06" element={<Ex06 />}></Route>
          <Route path="/ex07" element={<Ex07 />}></Route>
          <Route path="/ex08" element={<Ex08 />}></Route>
          <Route path="/ex09" element={<Ex09 />}></Route>
          <Route path="/ex10" element={<Ex10 />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
