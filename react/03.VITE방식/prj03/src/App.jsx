import { useState } from "react";
import "./App.css";

const lessons = [
  { id: 1, title: "Component", desc: "UI를 작은 함수 단위로 나눕니다." },
  { id: 2, title: "Props", desc: "부모가 자식에게 데이터를 전달합니다." },
  {
    id: 3,
    title: "Children",
    desc: "태그 사이의 내용을 컴포넌트에 전달합니다.",
  },
  { id: 4, title: "Map 함수", desc: "랜더링을 위해 배열을 재구성 합니다." },
];

const button = ["웃음", "슬픔", "재밌음", "잠옴", "멍함"];

function Card({ title, desc, children }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <small>{children}</small>
    </article>
  );
}

function Emotion({ emotion }) {
  return (
    <article>
      <button className="emotion">{emotion}</button>
    </article>
  );
}

function App() {
  return (
    <main className="page">
      <h1>컴포넌트와 Props</h1>
      <div className="box">
        {lessons.map((v) => (
          <Card key={v.id} title={v.title} desc={v.desc}>
            실습{v.id}
          </Card>
        ))}
      </div>
      <div className="box">
        {button.map((v, i) => (
          <Emotion key={i} emotion={v}></Emotion>
        ))}
      </div>
    </main>
  );
}

export default App;
