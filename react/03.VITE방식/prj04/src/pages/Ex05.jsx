import { useState } from "react";

function Ex05() {
  const [sel, setSel] = useState("051");
  const handleSel = (e) => setSel(e.target.value);

  const city = ["서울", "부산", "광주", "대구", "대전", "제주"];
  const cnum = ["02", "051", "062", "053", "042", "064"];

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h1>5. 셀렉터와 연동</h1>
      <h2>{sel}</h2>
      <select onChange={handleSel} value={sel}>
        {city.map((v, i) => {
          return (
            <option key={i} value={cnum[i]}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Ex05;
