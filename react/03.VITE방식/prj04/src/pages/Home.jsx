import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page-bg">
      <div className="home-container">
        <header className="home-hero">
          <h1 className="hero-title">My React Learning Hub</h1>
          <p className="hero-subtitle">
            리액트의 기초부터 심화 예제까지, <br />
            차근차근 기록하고 연습하는 개인 프로젝트 저장소입니다.
          </p>
        </header>

        <section className="home-content">
          <div className="intro-card">
            <h3>🚀 프로젝트 목적</h3>
            <p>
              다양한 React Hook과 기능을 실습하며 나만의 컴포넌트 라이브러리를
              구축합니다.
            </p>
          </div>

          <div className="intro-card">
            <h3>📂 연습 내용</h3>
            <ul>
              <li>LocalStorage를 활용한 데이터 관리 (Ex01)</li>
              <li>컴포넌트 상태(State) 및 이벤트 핸들링</li>
              <li>React Router를 이용한 페이지 전환</li>
              <li>재사용 가능한 UI 컴포넌트 설계</li>
            </ul>
          </div>

          <div className="intro-card highlight">
            <h3>💡 사용 방법</h3>
            <p>
              상단의 드롭다운 메뉴를 클릭하여 각 연습 예제 페이지로 바로 이동할
              수 있습니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
