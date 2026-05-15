import React from "react";
import { useState } from "react";
import passStyle from "./Ex09.module.css";

const students = [
  { id: 1, name: "김한솔", score: 88 },
  { id: 2, name: "이민수", score: 92 },
  { id: 3, name: "박지영", score: 75 },
  { id: 4, name: "정민재", score: 42 },
  { id: 5, name: "최하은", score: 96 },
  { id: 6, name: "강민지", score: 78 },
  { id: 7, name: "윤준호", score: 91 },
  { id: 8, name: "김태영", score: 82 },
  { id: 9, name: "박준우", score: 59 },
  { id: 10, name: "이서연", score: 73 },
];

const Inp = () => <h2>축하드립니다!</h2>;

function Ex09() {
  const [onlyPassed, setOnlyPassed] = useState(false);
  const passStudent = onlyPassed
    ? students.filter((s) => s.score >= 60)
    : students;

  return (
    <>
      <h1>9. 조건부 렌더링과 리스트</h1>
      <input
        type="checkbox"
        checked={onlyPassed}
        onChange={(e) => setOnlyPassed(e.target.checked)}
      />
      <label htmlFor="" className="toggle">
        합격자만 보기
      </label>
      <div>{onlyPassed && <Inp />}</div>
      <ul style={{ listStyle: "none", display: "inline" }}>
        {passStudent.map((v) => (
          <li key={v.id}>
            이름: {v.name} | 점수:{" "}
            <strong className={v.score >= 60 ? passStyle.pass : passStyle.fail}>
              {v.score}
            </strong>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Ex09;
