import { useState, useEffect, useRef } from "react";

function Ex12() {
  const [count, setCount] = useState(0);
  // 채팅방 예시를 위한 상태 추가
  const [messages, setMessages] = useState([
    "안녕하세요! 채팅방에 입장하셨습니다.",
    "useRef로 스크롤 제어를 해볼까요?",
  ]);

  // 1. DOM 접근용 레프
  const inputRef = useRef(null);
  // 2. 렌더링 유발 없는 변수 저장용 레프
  const renderCountRef = useRef(1);
  // 3. 타이머 저장용 레프
  const timerRef = useRef(null);

  // 4. 채팅창 스크롤 조작용 레프 (추가)
  const chatEndRef = useRef(null);

  // 컴포넌트가 렌더링될 때마다 카운트 확인
  useEffect(() => {
    console.log(`현재까지 총 렌더링 횟수: ${renderCountRef.current++}번`);
  });

  // [추가] 메시지 배열이 변경될 때마다 자동으로 최하단으로 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1번 활용: 버튼 누르면 입력창으로 포커스 이동
  const handleFocus = () => {
    inputRef.current.focus();
  };

  // 3번 활용: 타이머 시작 및 종료
  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // 4번 활용: 최하단으로 스크롤 내리는 함수 (추가)
  const scrollToBottom = () => {
    // behavior: "smooth"를 주면 부드럽게 스크롤됩니다.
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 가짜 메시지 추가 함수 (추가)
  const handleSendMessage = () => {
    setMessages((prev) => [...prev, "새로운 메시지가 도착했습니다! 💬"]);
  };

  // 언마운트 시 클린업
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>12. useRef 자주 쓰는 4가지 패턴</h1>

      {/* 패턴 1: DOM 포커스 조작 */}
      <section
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h3>1. DOM 요소 접근 (Focus)</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="여기에 포커스가 잡힙니다"
        />
        <button onClick={handleFocus}>입력창으로 커서 이동</button>
      </section>

      {/* 패턴 2 & 3: 컴포넌트 변수 보관 및 타이머 관리 */}
      <section
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h3>2 & 3. 변수 보관 및 타이머 제어</h3>
        <p>타이머 카운트: {count}</p>
        <button onClick={startTimer}>타이머 시작</button>
        <button onClick={stopTimer}>타이머 정지</button>
      </section>

      {/* 패턴 4: 채팅창 스크롤 제어 (추가) */}
      <section
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h3>4. 채팅창 최하단 스크롤 제어</h3>

        {/* 고정된 높이를 가지고 스크롤이 생기는 채팅창 박스 */}
        <div
          style={{
            height: "150px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                padding: "6px",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              {msg}
            </div>
          ))}
          {/* 여기가 채팅창의 가장 마지막 지점입니다. 여기에 ref를 걸어줍니다. */}
          <div ref={chatEndRef} />
        </div>

        <button onClick={handleSendMessage} style={{ marginRight: "5px" }}>
          메시지 보내기
        </button>
        <button onClick={scrollToBottom}>맨 아래로 스크롤</button>
      </section>
    </div>
  );
}

export default Ex12;
