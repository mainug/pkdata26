import { useState } from "react";
import list from "./ex06_sample";

function Ex06() {
  const [info, setInfo] = useState("원하는 언어를 선택하세요.");

  /* obj의 모든 상태를 false */
  const obj = {};
  list.forEach((v, i) => {
    obj[v] = false;
  });

  /* 클릭한 대상을 true */
  const handleInfo = (e) => {
    const { value, checked } = e.target;

    /* 방법1-a */
    // const obj = {};
    // list.forEach((v, i) => {
    //   if (v === value) {
    //     obj[v] = true;
    //   } else {
    //     obj[v] = false;
    //   }
    // });
    // setInfo(obj);

    /* 방법1-b */
    // const obj = list.reduce((a, c) => {
    //   a[c] = c === value;
    //   return a;
    // }, {});
    // setInfo(obj);

    /* 방법2-a */
    // obj[value] = checked;
    // setInfo(obj);

    /* 방법2-b */
    setInfo(obj);
    setInfo((data) => ({ ...data, [value]: checked }));
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h1>6. 라디오 버튼</h1>
      <h2>원하는 언어를 선택하세요.</h2>
      {list.map((v, i) => {
        return (
          <div key={i}>
            <label>
              <input type="radio" name="one" value={v} onChange={handleInfo} />
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

export default Ex06;
