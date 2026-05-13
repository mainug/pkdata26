import { useState } from "react";

function Ex04() {
  const [in1, setIn1] = useState(0);
  const [in2, setIn2] = useState(0);
  const handleIn1 = (e) => setIn1(e.target.value);
  const handleIn2 = (e) => setIn2(e.target.value);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>4. Input을 이용한 실시간 계산</h2>
      {/* 덧셈 */}
      <div>
        <input type="text" onChange={handleIn1} value={in1} /> +{" "}
        <input type="text" onChange={handleIn2} value={in2} /> ={" "}
        {in1 * 1 + in2 * 1}
      </div>
      {/* 뺄셈 */}
      <div>
        <input type="text" onChange={handleIn1} value={in1} /> -{" "}
        <input type="text" onChange={handleIn2} value={in2} /> ={" "}
        {in1 * 1 - in2 * 1}
      </div>
      {/* 곱셈 */}
      <div>
        <input type="text" onChange={handleIn1} value={in1} /> x{" "}
        <input type="text" onChange={handleIn2} value={in2} /> ={" "}
        {in1 * 1 * in2 * 1}
      </div>
      {/* 나눗셈 */}
      <div>
        <input type="text" onChange={handleIn1} value={in1} /> /{" "}
        <input type="text" onChange={handleIn2} value={in2} /> ={" "}
        {((in1 * 1) / in2) * 1}
      </div>
      <hr />
      {in1} + {in2} = {in1 * 1 + in2 * 1}
      <br />
      {in1} - {in2} = {in1 * 1 - in2 * 1}
      <br />
      {in1} * {in2} = {in1 * 1 * in2 * 1}
      <br />
      {in1} / {in2} = {((in1 * 1) / in2) * 1}
    </div>
  );
}

export default Ex04;
