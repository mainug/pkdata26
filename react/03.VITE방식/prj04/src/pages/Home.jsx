import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  // 리액트의 상태(State) 활용 예시
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const [typedPart, setTypedPart] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    // 2초 뒤에 다시 'Copy' 아이콘으로 복구
    setTimeout(() => setCopied(false), 2000);
  };

  const installCommand = "npm create vite@latest"; // 여기에 넣고 싶은 명령어를 적으세요
  const targetText = "<LikeButton video={video} />"; // 타이핑 효과를 줄 부분

  useEffect(() => {
    let index = 0;
    setTypedPart(""); // 시작 전 초기화

    const typingInterval = setInterval(() => {
      if (index < targetText.length) {
        // 함수형 업데이트를 사용하여 이전 상태를 안전하게 참조합니다.
        setTypedPart((prev) => targetText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // 특정 부분만 치는 것이므로 속도를 조금 늦춰도 좋습니다.

    return () => clearInterval(typingInterval); // 클린업
  }, []);

  return (
    <div className="home-page-bg">
      <div className="home-container">
        <header className="home-hero">
          <h1 className="hero-title">My React Learning Hub</h1>
          <p className="hero-subtitle">
            리액트의 기초부터 심화 예제까지, <br />
            차근차근 기록하고 연습하는 개인 프로젝트 저장소입니다.
          </p>

          {/* CLI 설치 섹션 */}
          <div className="cli-container">
            <div className="cli-terminal">
              <span className="cli-prompt">$</span>
              <code className="cli-command">{installCommand}</code>
              <button className="cli-copy-btn" onClick={handleCopy}>
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>

          <div className="code-window">
            <div className="code-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <pre className="code-content">
              <code>
                {`function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      `}
                {/* 이 부분만 타이핑 효과가 적용됩니다 */}
                <span style={{ color: "#98c379" }}>{typedPart}</span>
                <span className="cursor">|</span>
                {`
    </div>
  );
}`}
              </code>
            </pre>
          </div>

          <p className="hero-subtitle">
            <strong>React</strong>로 할 수 있는 간단한 시연입니다. <br />
            데이터가 변하면 화면이 즉시 응답합니다.
          </p>

          {/* 리액트 임팩트 존 (Interactive Zone) */}
          <div className="react-impact-zone">
            <div className="interactive-item">
              <p>실시간 상태 변경 (State)</p>
              <div className="counter-box">
                <button onClick={() => setCount(count - 1)}>-</button>
                <span className="count-display">{count}</span>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            </div>

            <div className="interactive-item">
              <p>실시간 데이터 바인딩</p>
              <input
                type="text"
                placeholder="이름을 입력해보세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
              />
              <p className="name-display">
                {name
                  ? `반가워요, ${name}님!`
                  : "당신의 이름을 기다리고 있어요."}
              </p>
            </div>
          </div>
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
              <li>LocalStorage를 활용한 데이터 관리</li>
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
