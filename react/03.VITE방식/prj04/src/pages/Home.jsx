import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  // 카드에 들어갈 데이터를 배열로 정리합니다.
  const ex = [
    { id: 1, title: "Ex01 페이지", desc: "첫 번째 예제", path: "/ex01" },
    { id: 2, title: "Ex02 페이지", desc: "두 번째 예제", path: "/ex02" },
    { id: 3, title: "Ex03 페이지", desc: "세 번째 예제", path: "/ex03" },
    { id: 4, title: "Ex04 페이지", desc: "네 번째 예제", path: "/ex04" },
    { id: 5, title: "Ex05 페이지", desc: "다섯 번째 예제", path: "/ex05" },
    { id: 6, title: "Ex06 페이지", desc: "여섯 번째 예제", path: "/ex06" },
    { id: 7, title: "Ex07 페이지", desc: "일곱 번째 예제", path: "/ex07" },
    { id: 8, title: "Ex08 페이지", desc: "여덟 번째 예제", path: "/ex08" },
    { id: 9, title: "Ex09 페이지", desc: "아홉 번째 예제", path: "/ex09" },
    {
      id: 10,
      title: "Ex10 페이지",
      desc: "열 번째 예제",
      path: "/ex10",
    },
  ];

  return (
    <div className="home-page-bg">
      <div className="home-container">
        <header className="home-header">
          <h1>My React Project</h1>
          <p>React 예제를 모아놓은 대시보드입니다.</p>
        </header>

        <section className="home-content">
          {/* map을 사용해 반복되는 코드를 줄입니다. */}
          {ex.map((v) => (
            <Link to={v.path} key={v.id} className="card-wrapper">
              <div className="card">
                <div className="card-num">Ex{v.id}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
