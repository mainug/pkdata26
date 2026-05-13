import { useState } from "react";

function Ex02() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light",
  );

  const toggle = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <h1> 2. Localstorage를 이용한 테마색 설정 기억하기</h1>
      <div className={theme === "light" ? "light-mode" : "dark-mode"}>
        <h2>{theme === "light" ? "☀️ 주간모드" : "🌌 야간모드"}</h2>
        <button onClick={toggle}>테마변경</button>
      </div>
    </>
  );
}

export default Ex02;
