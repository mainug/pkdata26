import { useState, useEffect } from "react";

function Ex03() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light",
  );

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  const toggle = () => {
    setTheme((what) => (what === "light" ? "dark" : "light"));
  };

  return (
    <>
      <h1> 3. useEffect 활용하기 </h1>
      <div className={theme === "light" ? "light-mode" : "dark-mode"}>
        <h2>{theme === "light" ? "☀️ 주간모드" : "🌌 야간모드"}</h2>
        <button onClick={toggle}>테마변경</button>
      </div>
    </>
  );
}

export default Ex03;
