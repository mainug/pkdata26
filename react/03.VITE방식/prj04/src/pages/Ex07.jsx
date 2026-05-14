import { useState } from "react";
import list from "./ex06_sample";

function Ex07() {
  const obj = {};
  list.forEach((v, i) => {
    obj[v] = false;
  });

  const [info, setInfo] = useState(obj);

  /* 클릭한 대상을 true */
  const handleInfo = (e) => {
    const { value, checked } = e.target;

    setInfo((data) => ({ ...data, [value]: checked }));
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h1>7. 체크박스 버튼</h1>
      <h2>원하는 언어를 선택하세요.</h2>
      {list.map((v, i) => {
        return (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                name="one"
                value={v}
                onChange={handleInfo}
              />
              {v}
            </label>
            <br />
          </div>
        );
      })}
      <h3>{JSON.stringify(info)}</h3>
    </div>
  );
}

export default Ex07;
