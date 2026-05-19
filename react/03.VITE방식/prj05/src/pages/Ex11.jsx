import { useState, useEffect } from "react";

function Child({ ver }) {
  console.log(`1. 자식컴포넌트 함수 실행 ver${ver}`);

  const mystyle = {
    border: "2px solid #333",
    padding: "1rem",
    margin: "10px",
  };

  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  // useEffect(() => {}, []); // 한번만 실행
  let tt = 1;
  useEffect(() => {
    console.log("2. 마운트 또는 업데이트: useEffect 실행됨");

    const timer = setInterval(() => {
      console.log(`ver.${ver}: 1초마다실행 ${tt++}`);
    }, 1000);

    return () => {
      console.log("3. 클린업: 언마운트 또는 업데이트 직전에 청소");
      clearInterval(timer);
      console.log("타이머정리");
    };
  }, [count]);

  return (
    <div style={mystyle}>
      <h2>자식컴포넌트</h2>
      <p>카운트 : {count}</p>
      <button onClick={handleCount}>+1 증가</button>
    </div>
  );

  return (
    <div style={mystyle}>
      <h2>자식컴포넌트 ver{ver}</h2>
      <p>카운트 : {count}</p>
      <button onClick={handleCount}>+1 증가</button>
    </div>
  );
}

function Ex11() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h1>11. 컴포넌트 자식 테스트</h1>
      <button onClick={() => setShow(!show)}>
        {show ? "자식 컴포넌트 숨기기" : "자식 컴포넌트 보이기"}
      </button>
      {show && <Child ver={1} />}
      <div style={{ display: show ? "block" : "none" }}>
        <Child ver={2} />
      </div>
    </div>
  );
}

export default Ex11;
