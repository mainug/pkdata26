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
  const navigate = useNavigate();

  // 1. 사용할 예제 번호들을 배열로 만듭니다. (나중에 추가될 때 여기 숫자만 넣으세요)
  const exNumbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ];

  // 2. 컴포넌트들을 객체로 묶어두면 매핑하기 편합니다.
  const components = {
    "01": <Ex01 />,
    "02": <Ex02 />,
    "03": <Ex03 />,
    "04": <Ex04 />,
    "05": <Ex05 />,
    "06": <Ex06 />,
    "07": <Ex07 />,
    "08": <Ex08 />,
    "09": <Ex09 />,
    10: <Ex10 />,
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
            onChange={(e) => navigate(e.target.value)}
            value={location.pathname}
          >
            {/* 3. 배열을 돌면서 드롭다운 옵션을 자동 생성합니다 */}
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
        {/* 4. 배열을 돌면서 라우트(Route)를 자동 생성합니다 */}
        {exNumbers.map((num) => (
          <Route key={num} path={`/ex${num}`} element={components[num]} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
