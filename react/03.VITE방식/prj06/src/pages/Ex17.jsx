import React, { createContext, useContext, useState } from "react";

// 1. Context API 선언
// 테마(Theme)와 로그인 정보(User)를 위한 독립적인 Context 생성
const ThemeContext = createContext();
const UserContext = createContext();

// --- 2. 하위 컴포넌트 설계 (Props Drilling 없이 Context 사용) ---

// Header 컴포넌트
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderRadius: "12px",
    backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
    color: theme === "dark" ? "#f8fafc" : "#0f172a",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    transition: "all 0.3s ease",
    marginBottom: "24px"
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "1.6rem" }}>🎓</span>
        <h3 style={{ margin: 0, fontWeight: "800", letterSpacing: "-0.5px" }}>강의실 대시보드</h3>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.9rem" }}>
              👤 <strong>{user.nickname}</strong>님 ({user.role})
            </span>
            <button 
              onClick={logout}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <span style={{ fontSize: "0.9rem", color: "#64748b" }}>로그인이 필요합니다.</span>
        )}
        
        {/* 테마 스위처 */}
        <button 
          onClick={toggleTheme}
          style={{
            backgroundColor: theme === "dark" ? "#e2e8f0" : "#0f172a",
            color: theme === "dark" ? "#0f172a" : "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 14px",
            fontSize: "0.85rem",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s"
          }}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
};

// Sidebar 컴포넌트
const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const sidebarStyle = {
    flex: "1 1 200px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
    color: theme === "dark" ? "#e2e8f0" : "#334155",
    border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
    transition: "all 0.3s ease"
  };

  return (
    <aside style={sidebarStyle}>
      <h4 style={{ 
        marginTop: 0, 
        borderBottom: `2px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`, 
        paddingBottom: "10px",
        color: theme === "dark" ? "#38bdf8" : "#4f46e5"
      }}>
        📋 교육용 사이드바
      </h4>
      <ul style={{ 
        listStyle: "none", 
        padding: 0, 
        margin: "15px 0 0 0", 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px",
        fontSize: "0.9rem" 
      }}>
        <li style={{ cursor: "pointer", fontWeight: "600" }}>🏠 대시보드 홈</li>
        <li style={{ cursor: "pointer" }}>📖 온라인 수강</li>
        <li style={{ cursor: "pointer" }}>📝 과제 및 성적</li>
        <li style={{ cursor: "pointer" }}>⚙️ 계정 설정</li>
      </ul>
      
      {user && (
        <div style={{
          marginTop: "30px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: theme === "dark" ? "#334155" : "#ede9fe",
          color: theme === "dark" ? "#f1f5f9" : "#4f46e5",
          fontSize: "0.8rem",
          lineHeight: "1.5"
        }}>
          <strong>권한:</strong> {user.role} <br />
          <strong>학번:</strong> {user.studentId}
        </div>
      )}
    </aside>
  );
};

// MainContent 컴포넌트
const MainContent = () => {
  const { theme } = useContext(ThemeContext);
  const { user, login, updateNickname } = useContext(UserContext);
  const [nameInput, setNameInput] = useState("");

  const mainStyle = {
    flex: "3 1 450px",
    padding: "24px",
    borderRadius: "12px",
    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
    color: theme === "dark" ? "#cbd5e1" : "#1e293b",
    border: `1px solid ${theme === "dark" ? "#1e293b" : "#e2e8f0"}`,
    transition: "all 0.3s ease"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() === "") return;
    updateNickname(nameInput);
    setNameInput("");
  };

  return (
    <main style={mainStyle}>
      <h2 style={{ marginTop: 0, color: theme === "dark" ? "#ffffff" : "#0f172a" }}>
        💻 메인 학습 공간
      </h2>
      <p style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
        이 컴포넌트에는 어떠한 Props도 들어오지 않았습니다. 
        <code>useContext</code> 훅을 통해 직접 Provider에 접근하여 테마 색상과 회원 정보를 반영하고 변경하고 있습니다. 
        이로써 리액트의 가장 번거로운 구조인 <strong>Prop Drilling(프롭 드릴링)</strong> 문제를 우아하게 해결할 수 있습니다.
      </p>

      {user ? (
        <div style={{
          backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
        }}>
          <h4 style={{ marginTop: 0, color: theme === "dark" ? "#38bdf8" : "#4f46e5" }}>
            🔒 사용자 설정 관리 (전역 상태 연동)
          </h4>
          <p style={{ fontSize: "0.9rem" }}>
            현재 닉네임: <strong style={{ fontSize: "1.1rem" }}>{user.nickname}</strong> <br />
            학번/사번: <strong>{user.studentId}</strong>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input 
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="새 닉네임을 입력하세요"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: `1px solid ${theme === "dark" ? "#475569" : "#cbd5e1"}`,
                backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
                color: theme === "dark" ? "#ffffff" : "#000000",
                outline: "none"
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "10px 18px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              닉네임 반영
            </button>
          </form>
        </div>
      ) : (
        <div style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #f59e0b",
          color: "#78350f",
          padding: "24px",
          borderRadius: "8px",
          textAlign: "center",
          marginTop: "24px"
        }}>
          <p style={{ margin: "0 0 16px 0", fontWeight: "600" }}>
            현재 로그아웃 상태입니다. 대시보드를 테스트하려면 아래 데모 계정으로 로그인해보세요.
          </p>
          <button 
            onClick={() => login("홍길동", "202600101", "학생(Student)")}
            style={{
              backgroundColor: "#d97706",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            데모 아이디로 로그인
          </button>
        </div>
      )}
    </main>
  );
};

// Footer 컴포넌트
const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerStyle = {
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
    color: theme === "dark" ? "#94a3b8" : "#64748b",
    fontSize: "0.8rem",
    textAlign: "center",
    marginTop: "24px",
    transition: "all 0.3s ease"
  };

  return (
    <footer style={footerStyle}>
      © 2026 React Context API Lecture Page. Designed for Academy Coding Course.
    </footer>
  );
};

// Dashboard 컨테이너 (컴포넌트를 감싸서 레이아웃 구성)
const Dashboard = () => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "24px"
    }}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

// --- 3. 최상위 부모 컴포넌트 (Provider로 Context를 제공하는 껍데기) ---
function Ex17() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    nickname: "학생대표",
    studentId: "20261199",
    role: "수강생"
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const login = (nickname, studentId, role) => {
    setUser({ nickname, studentId, role });
  };

  const logout = () => {
    setUser(null);
  };

  const updateNickname = (newNickname) => {
    setUser((prev) => (prev ? { ...prev, nickname: newNickname } : null));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, login, logout, updateNickname }}>
        <div style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "20px",
          backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          fontFamily: "'Noto Sans KR', sans-serif",
          transition: "all 0.3s ease"
        }}>
          <h1 style={{ 
            color: theme === "dark" ? "#f8fafc" : "#0f172a", 
            fontSize: "2.2rem", 
            marginBottom: "8px", 
            borderBottom: `2px solid ${theme === "dark" ? "#1e293b" : "#e2e8f0"}`, 
            paddingBottom: "16px" 
          }}>
            17. Context API (전역 상태 관리 & useContext)
          </h1>
          
          <p style={{ 
            color: theme === "dark" ? "#94a3b8" : "#64748b", 
            lineHeight: "1.7", 
            fontSize: "0.95rem",
            marginBottom: "30px" 
          }}>
            리액트 애플리케이션에서 컴포넌트의 위계가 깊어질 때, 상태(State)를 여러 단계 아래로 내리는 과정을 
            <strong>Prop Drilling</strong>이라고 합니다. <code>useContext</code> 훅을 사용하면 중간 경로의 컴포넌트들을 
            거치지 않고도 전역 컨텍스트 범위 내의 모든 하위 컴포넌트에서 필요한 데이터를 다이렉트로 구독해 올 수 있습니다.
          </p>

          {/* 전역 상태 공급망(Providers) 아래 위치한 실제 대시보드 컴포넌트 묶음 */}
          <Header />
          <Dashboard />
          <Footer />
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default Ex17;
