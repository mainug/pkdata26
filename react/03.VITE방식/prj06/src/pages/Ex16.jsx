import React, { useState, useMemo, useCallback, useRef } from "react";

// 1. React.memo를 이용한 자식 컴포넌트 최적화
// props(item, onDelete)가 변경되지 않는 한, 부모가 렌더링되어도 재렌더링을 차단합니다.
const ItemComponent = React.memo(({ item, onDelete }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log(`[ItemComponent Render] ${item.name} renderCount:`, renderCount.current);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 18px",
      margin: "8px 0",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      transition: "all 0.2s"
    }}>
      <div>
        <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "1rem" }}>{item.name}</span>
        <span style={{ 
          marginLeft: "12px", 
          fontSize: "0.8rem", 
          color: "#4f46e5", 
          backgroundColor: "#ede9fe", 
          padding: "3px 10px", 
          borderRadius: "12px",
          fontWeight: "600"
        }}>
          중요도: {item.score}점
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "0.75rem", color: "#94a3b8", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
          개별 렌더링 횟수: {renderCount.current}회
        </span>
        <button 
          onClick={() => onDelete(item.id)}
          style={{
            backgroundColor: "#fee2e2",
            color: "#ef4444",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "0.85rem",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fecaca";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#fee2e2";
            e.target.style.transform = "scale(1)";
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
});

// 이름 표기를 위해 명시적으로 displayName을 달아줍니다.
ItemComponent.displayName = "ItemComponent";

// 2. 부모 컴포넌트
function Ex16() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  
  // 과목/할일 데이터 상태 관리
  const [items, setItems] = useState([
    { id: 1, name: "HTML & CSS 마스터", score: 95 },
    { id: 2, name: "JavaScript 핵심 ES6+", score: 88 },
    { id: 3, name: "React 상태 관리 & Props", score: 92 },
    { id: 4, name: "Vite 리액트 개발 환경 구축", score: 79 },
    { id: 5, name: "React Router 가상 라우팅", score: 85 },
    { id: 6, name: "Redux Toolkit 전역 상태", score: 70 },
  ]);

  // useMemo 연산 실행 횟수를 추적하기 위한 ref
  const calcCountRef = useRef(0);
  
  // [useMemo] 검색 필터링 및 정렬 수행
  // 의존성 배열인 [items, search]가 변할 때만 연산이 재실행되고,
  // 상관없는 state(예: count)가 변경되어 부모가 재렌더링될 때는 이전 값을 그대로 캐싱하여 반환합니다.
  const filteredAndSortedItems = useMemo(() => {
    calcCountRef.current += 1;
    console.log(`[useMemo 연산] 필터링/정렬 실행됨. 누적 연산 횟수: ${calcCountRef.current}`);
    
    // CPU 연산 과부하를 가상으로 시뮬레이션하기 위한 루프 (Heavy Calculation)
    let temp = 0;
    for (let i = 0; i < 5000000; i++) {
      temp += Math.sin(i);
    }
    
    return items
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.score - a.score);
  }, [items, search]);

  // [useCallback] 삭제 핸들러 함수 캐싱
  // 의존성 배열이 빈 배열([])이므로 최초 1회만 함수가 선언 및 캐싱됩니다.
  // 이로 인해 자식 컴포넌트에 매번 새로운 함수 레퍼런스가 전달되는 것을 막아 
  // React.memo가 불필요한 자식 컴포넌트 재렌더링을 차단할 수 있게 합니다.
  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#f8fafc",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
      {/* 타이틀 및 설명 */}
      <h1 style={{ color: "#0f172a", fontSize: "2.2rem", marginBottom: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "16px" }}>
        16. 렌더링 최적화 2탄 (useMemo & useCallback)
      </h1>
      <p style={{ color: "#64748b", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "30px" }}>
        이 페이지는 컴포넌트의 렌더링 성능 최적화를 돕는 두 핵심 Hook인 <code>useMemo</code>와 <code>useCallback</code>, 
        그리고 <code>React.memo</code>가 어떻게 협력하는지 교육용 지표와 함께 실시간으로 보여줍니다. 
        <strong>F12 개발자 도구의 콘솔 창</strong>을 열어 렌더링 로그를 함께 확인해보세요!
      </p>

      {/* 실시간 렌더링 성능 비교 카드 영역 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "24px",
        marginBottom: "30px"
      }}>
        {/* 컨트롤 패널 */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
          border: "1px solid #e2e8f0"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
            🛠️ 컨트롤 패널
          </h3>
          
          {/* 검색 입력 */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>
              과목 검색 (이때만 useMemo 연산 동작)
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색어를 입력해보세요 (예: React)"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
              onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
            />
          </div>

          {/* 관련 없는 상태 변경 버튼 */}
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>
              최적화 확인용 무관계 상태 토글
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button 
                onClick={() => setCount((c) => c + 1)}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
                onMouseDown={(e) => e.target.style.transform = "scale(0.97)"}
                onMouseUp={(e) => e.target.style.transform = "scale(1)"}
              >
                +1 부모 상태 변경
              </button>
              <span style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a" }}>
                {count}
              </span>
            </div>
          </div>
        </div>

        {/* 최적화 성능 통계 보드 */}
        <div style={{
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          padding: "24px",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          border: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <h3 style={{ margin: "0 0 16px 0", color: "#38bdf8", borderBottom: "1px solid #1e293b", paddingBottom: "8px" }}>
            📊 실시간 연산 성능 지표
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              borderBottom: "1px solid #1e293b", 
              paddingBottom: "8px" 
            }}>
              <span style={{ fontSize: "0.9rem" }}>과부하 필터링/정렬 연산 실행 수:</span>
              <span style={{
                color: "#fbbf24",
                fontWeight: "800",
                fontSize: "1.3rem",
                backgroundColor: "rgba(251, 191, 36, 0.15)",
                padding: "4px 12px",
                borderRadius: "8px"
              }}>
                {calcCountRef.current}회
              </span>
            </div>
            
            <p style={{ margin: "0", fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.6" }}>
              💡 <strong>+1 부모 상태 변경</strong> 버튼을 연속으로 눌러보세요. 부모 컴포넌트는 재렌더링되지만, 
              <code>useMemo</code> 덕분에 과부하 연산 실행 수가 증가하지 않습니다!
            </p>
            
            <p style={{ margin: "0", fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.6" }}>
              💡 또한, 삭제 함수가 <code>useCallback</code>으로 캐싱되어 있고 자식이 <code>React.memo</code>로 설계되었기 때문에, 
              부모 상태가 변하더라도 <strong>자식 컴포넌트의 개별 렌더링 횟수는 전혀 올라가지 않습니다.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div style={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0"
      }}>
        <h3 style={{ margin: "0 0 18px 0", color: "#1e293b", display: "flex", justifyContent: "space-between" }}>
          <span>📚 과목 목록 (정렬: 중요도순)</span>
          <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "normal" }}>
            총 {filteredAndSortedItems.length}개 과목 검색됨
          </span>
        </h3>

        {filteredAndSortedItems.length > 0 ? (
          <div>
            {filteredAndSortedItems.map((item) => (
              <ItemComponent 
                key={item.id} 
                item={item} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", fontSize: "0.95rem" }}>
            검색 결과와 일치하는 과목이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default Ex16;
