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
];

function Card({ title, desc, children }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <small>{children}</small>
    </article>
  );
}

function App() {
  return (
    <main className="page">
      <h1>컴포넌트와 Props</h1>
      <div className="box">
        {lessons.slice(0).map((lessons) => (
          <Card title={lessons.title} desc={lessons.desc}>
            실습{lessons.id}
          </Card>
        ))}
      </div>
    </main>
  );
}

export default App;
