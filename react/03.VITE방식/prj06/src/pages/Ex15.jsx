import React, { useState, useEffect } from "react";

function Ex15() {
  // 마우스의 X, Y 좌표를 저장할 상태(State)
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 마우스가 움직일 때 실행될 이벤트 핸들러
    const handleMouseMove = (e) => {
      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // 윈도우 전체에 mousemove 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove);

    // 컴포넌트가 화면에서 사라질 때(언마운트) 이벤트 리스너 제거 (메모리 누수 방지)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 켜질 때 딱 한 번만 등록되게 함

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1>15. 마우스 좌표 테스트</h1>
      <p>화면 위에서 마우스를 움직여보세요.</p>

      {/* 실시간 좌표 출력 박스 */}
      <div
        style={{
          backgroundColor: "#282c34",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          display: "inline-block",
          fontFamily: "monospace",
          fontSize: "1.2rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          X 좌표:{" "}
          <span style={{ color: "#61dafb", fontWeight: "bold" }}>
            {coords.x}px
          </span>
        </div>
        <div>
          Y 좌표:{" "}
          <span style={{ color: "#ececec", fontWeight: "bold" }}>
            {coords.y}px
          </span>
        </div>
      </div>

      {/* 마우스를 따라다니는 커스텀 원 동그라미 */}
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(255, 99, 71, 0.6)", // 반투명한 토마토 색상
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          // 마우스 포인터가 동그라미의 정중앙에 오도록 -20px씩 조절
          left: `${coords.x - 20}px`,
          top: `${coords.y - 20}px`,
          pointerEvents: "none", // 마우스 클릭 시 이 동그라미가 방해하지 않도록 설정
          transition: "transform 0.05s linear", // 부드럽게 따라오도록 약간의 효과
        }}
      />
    </div>
  );
}

export default Ex15;
