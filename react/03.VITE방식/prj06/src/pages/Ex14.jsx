import React, { useState, memo } from "react";

// 1. 최적화 테스트용 자식 컴포넌트 (React.memo 사용)
const ShowState = memo(({ num, text }) => {
  // 무거운 연산 시뮬레이션
  const heavyCalc = () => {
    console.warn("🔥 [자식] 과도한 연산 실행중...");
    let x = 0;
    for (let i = 0; i < 50 * 1000 * 1000; i++) {
      x += i;
    }
    return x;
  };

  const result = heavyCalc();

  return (
    <div
      style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}
    >
      <h3>[자식 컴포넌트]</h3>
      <p>숫자 연산 결과: {result}</p>
      <p>전달받은 텍스트: {text}</p>
    </div>
  );
});

// 2. 부모 컴포넌트
function Ex14() {
  const [num, setNum] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>14. 렌더링 최적화 테스트</h1>

      <div>
        <h2>숫자 변경 (연산 유발)</h2>
        <button onClick={() => setNum(num + 1)}>+ 증가</button>
        <button onClick={() => setNum(num - 1)}>- 감소</button>
      </div>

      <hr />

      <div>
        <h2>글자 변경 (최적화 확인)</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="글자를 입력해보세요"
        />
      </div>

      {/* 테스트 방법:
        1. '+/-' 버튼을 누르면 num이 변하면서 ShowState가 재렌더링됨 (연산 발생)
        2. input에 글자를 입력하면 text만 변함. 
           이때 ShowState는 React.memo 덕분에 재렌더링되지 않음 (연산 발생 안 함!)
      */}
      <ShowState num={num} text={text} />
    </div>
  );
}

export default Ex14;
