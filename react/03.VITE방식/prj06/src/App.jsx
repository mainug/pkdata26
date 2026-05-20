import { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Ex13 from "./pages/Ex13";
import Ex14 from "./pages/Ex14";
import Ex15 from "./pages/Ex15";
import Ex16 from "./pages/Ex16";
import Ex17 from "./pages/Ex17";
import Ex18 from "./pages/Ex18";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 각 드롭다운의 선택 상태를 관리합니다.
  const [selected, setSelected] = useState("");

  // 사용할 예제 번호들을 배열로 만듭니다. (나중에 추가될 때 여기 숫자만 넣으세요)
  const exNumbers = ["13", "14", "15", "16", "17", "18"];

  // 컴포넌트들을 객체로 묶어두면 매핑하기 편합니다.
  const components = {
    13: <Ex13 />,
    14: <Ex14 />,
    15: <Ex15 />,
    16: <Ex16 />,
    17: <Ex17 />,
    18: <Ex18 />,
  };

  // ✅ 1. 경로가 바뀔 때마다 드롭다운 값을 동기화합니다.
  useEffect(() => {
    if (location.pathname === "/") {
      setSelected(""); // 홈 경로면 드롭다운을 초기값(disabled된 옵션)으로 설정
    } else {
      setSelected(location.pathname); // 그 외 경로는 해당 경로값으로 설정
    }
  }, [location.pathname]);

  // ✅ 2. 드롭다운 선택 시 페이지 이동을 처리하는 핸들러입니다.
  const handleSelect = (e) => {
    const target = e.target.value;
    setSelected(target);
    navigate(target);
  };

  return (
    <div className="app-container">
      <nav className="dark-nav">
        <Link to="/" className="nav-logo">
          ← Home
        </Link>

        <div className="nav-dropdown-wrapper">
          <select
            className="nav-select"
            onChange={handleSelect}
            value={selected}
          >
            <option value="" disabled>
              Ex13 ~
            </option>
            {/* 배열을 돌면서 드롭다운 옵션을 자동 생성합니다 */}
            {exNumbers.map((num) => (
              <option key={num} value={`/ex${num}`}>
                Ex{num} 연습
              </option>
            ))}
          </select>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* 배열을 돌면서 라우트(Route)를 자동 생성합니다 */}
        {exNumbers.map((num) => (
          <Route key={num} path={`/ex${num}`} element={components[num]} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
