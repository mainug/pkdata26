import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const showNavbar = location.pathname !== "/";

  const handleSelectChange = (e) => {
    if (e.target.value) {
      navigate(e.target.value); // 선택한 value("/ex01" 등)로 이동
    }
  };

  return (
    <>
      <div className="app-container">
        {showNavbar && (
          <nav className="dark-nav">
            <Link to="/" className="nav-logo">
              ← Home
            </Link>

            <div className="nav-dropdown-wrapper">
              <select
                className="nav-select"
                onChange={handleSelectChange}
                value={location.pathname} // 현재 페이지에 맞춰 드롭다운 값 동기화
              >
                <option value="" disabled>
                  연습 예제 선택
                </option>
                <option value="/ex01">Ex01. LocalStorage</option>
                <option value="/ex02">Ex02. 예제</option>
                <option value="/ex03">Ex03. 예제</option>
                <option value="/ex04">Ex04. 예제</option>
                <option value="/ex05">Ex05. 예제</option>
                <option value="/ex06">Ex06. 예제</option>
                <option value="/ex07">Ex07. 예제</option>
                <option value="/ex08">Ex08. 예제</option>
                <option value="/ex09">Ex09. 예제</option>
                <option value="/ex10">Ex10. 예제</option>
              </select>
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
