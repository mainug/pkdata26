import React, { useState, useMemo, useRef } from "react";

// ==========================================
// 1. 대용량 모의 데이터 생성기 (Self-contained Mock Data Generator)
// ==========================================

// 취업률 통계 데이터 생성 (8,000건)
const generateEmploymentData = () => {
  const departments = [
    "컴퓨터공학과", "소프트웨어학과", "정보통신공학과", 
    "인공지능학과", "데이터사이언스학과", "전자공학과", 
    "기계공학과", "화학공학과", "신소재공학과", "경영학과"
  ];
  const universities = ["서울대", "한국대", "대한대", "미래대", "중앙대", "아시아대", "글로벌대", "테크대"];
  
  const data = [];
  for (let i = 1; i <= 8000; i++) {
    const dept = departments[i % departments.length];
    const univ = universities[i % universities.length];
    const graduates = 40 + (i % 61); // 40 ~ 100명
    const employed = Math.round(graduates * (0.5 + (i % 41) / 100)); // 50% ~ 90% 취업
    const rate = Math.round((employed / graduates) * 100);
    
    data.push({
      id: i,
      name: `${univ} ${dept} (${i}회 졸업생)`,
      category: dept,
      graduates,
      employed,
      value: rate, // 공통 분석 대상 값 (취업률 %)
      unit: "%"
    });
  }
  return data;
};

// 쇼핑몰 결제 내역 데이터 생성 (8,000건)
const generateShoppingData = () => {
  const products = [
    "무선 게이밍 마우스", "기계식 키보드 V2", "4K 울트라모니터 32형", 
    "노이즈캔슬링 헤드폰", "고속 3in1 무선충전기", "USB-C 8포트 멀티허브", 
    "스마트워치 Active", "알루미늄 태블릿 거치대", "RGB 게이밍 장패드", "외장 SSD 2TB"
  ];
  const categories = ["입력기기", "입력기기", "디스플레이", "음향기기", "모바일액세서리", "PC주변기기", "웨어러블", "모바일액세서리", "PC주변기기", "저장장치"];
  
  const data = [];
  for (let i = 1; i <= 8000; i++) {
    const idx = i % products.length;
    const prodName = products[idx];
    const cat = categories[idx];
    const price = 15000 + (idx * 20000) + (i % 99) * 200; // 15,000 ~ 215,000원 상당
    const quantity = 1 + (i % 5);
    const amount = price * quantity;
    
    data.push({
      id: i,
      name: `${prodName} (주문번호 #${102400 + i})`,
      category: cat,
      graduates: quantity, // 수량
      employed: price, // 단가
      value: amount, // 공통 분석 대상 값 (총 결제액)
      unit: "원"
    });
  }
  return data;
};

// ==========================================
// 2. 무거운 분석 연산 함수 (Heavy Analysis Task)
// ==========================================
const runHeavyAnalysis = (data, query) => {
  const startTime = performance.now();
  
  // (1) 실시간 문자열 매칭 필터링
  const filtered = data.filter((item) => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  
  // (2) 인위적 연산 과부하 생성 (Heavy Computation)
  // useMemo의 체감 효과를 주기 위해 수만 번의 수학 연산 및 정렬 루프 수행
  let dummyVal = 0;
  for (let i = 0; i < 50; i++) {
    filtered.forEach((item) => {
      dummyVal += Math.sqrt(item.id) * Math.sin(dummyVal || 1);
    });
  }
  
  // (3) 실시간 수리적 통계 계산
  const totalCount = filtered.length;
  let sumValue = 0;
  let maxValue = 0;
  
  filtered.forEach((item) => {
    sumValue += item.value;
    if (item.value > maxValue) maxValue = item.value;
  });
  
  const average = totalCount > 0 ? Math.round(sumValue / totalCount) : 0;
  const duration = performance.now() - startTime;
  
  return {
    filteredList: filtered.slice(0, 80), // 성능을 위해 화면 돔(DOM) 렌더링은 상위 80개로 제한
    totalCount,
    average,
    maxValue,
    duration,
    dummyVal
  };
};

// ==========================================
// 3. 메인 컴포넌트 (Ex16)
// ==========================================
function Ex16() {
  const [dataList, setDataList] = useState([]); // 가져온 로우 데이터 리스트
  const [datasetType, setDatasetType] = useState(""); // 현재 임포트된 데이터 정보
  const [search, setSearch] = useState(""); // 실시간 필터 검색어
  const [count, setCount] = useState(0); // 관련 없는 UI 상태값
  const [useOptimization, setUseOptimization] = useState(true); // useMemo 최적화 활성화 여부
  
  // 연산이 실행된 누적 횟수를 추적하는 ref
  const calcExecCount = useRef(0);

  // 데이터셋 가져오기 핸들러
  const handleImport = (type) => {
    setSearch("");
    if (type === "employment") {
      setDataList(generateEmploymentData());
      setDatasetType("전국 대학교 학과별 취업 현황 (8,000건)");
    } else if (type === "shopping") {
      setDataList(generateShoppingData());
      setDatasetType("온라인 쇼핑몰 주문 거래 내역 (8,000건)");
    }
    calcExecCount.current = 0; // 데이터 교체 시 연산 카운트 리셋
  };

  // 데이터 비우기 핸들러
  const handleClear = () => {
    setDataList([]);
    setDatasetType("");
    setSearch("");
    calcExecCount.current = 0;
  };

  // [핵심] useMemo를 활용한 메모이제이션 연산 영역
  const memoizedResult = useMemo(() => {
    if (dataList.length === 0) return null;
    if (!useOptimization) return null; // 최적화 모드가 꺼져있을 땐 useMemo를 거치지 않고 패스
    
    calcExecCount.current += 1;
    return runHeavyAnalysis(dataList, search);
  }, [dataList, search, useOptimization]);

  // 최적화 스위치가 꺼져있으면 렌더링이 일어날 때마다 무조건 분석 연산을 재실행
  let currentResult = null;
  if (dataList.length > 0) {
    if (useOptimization) {
      currentResult = memoizedResult;
    } else {
      calcExecCount.current += 1;
      currentResult = runHeavyAnalysis(dataList, search);
    }
  }

  return (
    <div style={{
      maxWidth: "950px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#f8fafc",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
      {/* 제목 및 학습가이드 */}
      <h1 style={{ color: "#0f172a", fontSize: "2.2rem", marginBottom: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "16px" }}>
        16. 대용량 데이터 임포트 후 실시간 연산 최적화 (useMemo)
      </h1>
      
      <p style={{ color: "#64748b", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "25px" }}>
        본 예제는 외부 데이터셋을 가상으로 <strong>임포트(Import)</strong>한 뒤, 검색 입력에 맞춰 평균값 및 최대값을 
        <strong>실시간으로 통계 연산</strong>하는 대시보드입니다. 
        <code>useMemo</code>의 유무에 따른 프레임 드랍(Lag)과 실시간 연산 처리 시간의 극적인 성능 변화를 체감해보세요!
      </p>

      {/* 데이터 임포트 컨트롤러 카드 */}
      <div style={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 6px rgba(0,0,0,0.01)",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#1e293b", fontSize: "1.1rem" }}>
          📥 1단계: 외부 대용량 데이터셋 임포트하기
        </h3>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <button 
            onClick={() => handleImport("employment")}
            style={{
              backgroundColor: "#2563eb",
              color: "#white",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
          >
            🎓 대학 취업률 데이터 가져오기 (8,000건)
          </button>
          
          <button 
            onClick={() => handleImport("shopping")}
            style={{
              backgroundColor: "#0d9488",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0f766e"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#0d9488"}
          >
            🛒 쇼핑몰 매출 내역 데이터 가져오기 (8,000건)
          </button>

          {dataList.length > 0 && (
            <button 
              onClick={handleClear}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 18px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
            >
              데이터 비우기 ❌
            </button>
          )}

          <span style={{ fontSize: "0.9rem", color: "#64748b", marginLeft: "10px" }}>
            {datasetType ? `📂 활성 데이터: ${datasetType}` : "⚠️ 임포트된 데이터가 없습니다. 버튼을 눌러주세요."}
          </span>
        </div>
      </div>

      {dataList.length > 0 && (
        <>
          {/* 최적화 스위치 및 실시간 모니터링 섹션 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "24px",
            marginBottom: "24px"
          }}>
            
            {/* 2단계: 실시간 연산 & 최적화 스위치 설정 */}
            <div style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
            }}>
              <h3 style={{ margin: "0 0 16px 0", color: "#1e293b", fontSize: "1.1rem" }}>
                🔍 2단계: 실시간 검색 및 최적화 설정
              </h3>

              {/* 최적화 체크박스 */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: useOptimization ? "#e0f2fe" : "#fee2e2",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "16px",
                transition: "all 0.3s"
              }}>
                <input 
                  type="checkbox" 
                  id="opt-toggle"
                  checked={useOptimization}
                  onChange={(e) => {
                    setUseOptimization(e.target.checked);
                    calcExecCount.current = 0; // 스위치 토글 시 카운트 리셋
                  }}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <label htmlFor="opt-toggle" style={{ 
                  fontWeight: "bold", 
                  color: useOptimization ? "#0369a1" : "#b91c1c",
                  cursor: "pointer",
                  fontSize: "0.95rem"
                }}>
                  {useOptimization ? "✅ useMemo 최적화 활성화 (권장)" : "❌ useMemo 최적화 비활성화 (렌더링 부하 유발)"}
                </label>
              </div>

              {/* 실시간 검색 인풋 */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                  데이터 필터 검색 (검색어 입력 시 실시간 연산 수행)
                </label>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="예: 서울대, 키보드 등 입력..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.95rem",
                    outline: "none"
                  }}
                />
              </div>

              {/* 무관계 상태 업데이트 테스트 버튼 */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                  연산과 상관없는 독립 상태 업데이트 버튼
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button 
                    onClick={() => setCount(c => c + 1)}
                    style={{
                      backgroundColor: "#4f46e5",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 16px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    +1 카운트 증가
                  </button>
                  <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#1e293b" }}>
                    현재 카운트: {count}
                  </span>
                </div>
              </div>
            </div>

            {/* 실시간 연산 성능 지표 대시보드 */}
            <div style={{
              backgroundColor: "#0f172a",
              color: "#f8fafc",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <h3 style={{ margin: "0 0 16px 0", color: "#38bdf8", fontSize: "1.1rem" }}>
                📊 실시간 연산 지표 리포트
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1e293b", paddingBottom: "6px" }}>
                  <span>연산 처리 시간 (정밀):</span>
                  <strong style={{ color: currentResult?.duration > 15 ? "#f43f5e" : "#10b981" }}>
                    {currentResult ? currentResult.duration.toFixed(2) : "0.00"} ms
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1e293b", paddingBottom: "6px" }}>
                  <span>누적 통계 연산 횟수:</span>
                  <strong style={{ color: "#fbbf24", fontSize: "1.05rem" }}>
                    {calcExecCount.current}회
                  </strong>
                </div>

                {/* 실험 방법 설명 */}
                <div style={{ 
                  marginTop: "10px", 
                  fontSize: "0.8rem", 
                  color: "#94a3b8", 
                  lineHeight: "1.5",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  padding: "10px",
                  borderRadius: "6px" 
                }}>
                  <strong>💡 성능 실험 팁:</strong> <br />
                  1. 최적화를 <strong>비활성화</strong>하고 <strong>+1 카운트 증가</strong> 버튼을 광클해보세요. 
                  동작마다 연산 횟수가 증가하며 마우스 클릭 및 버튼 반응 속도에 눈에 띄는 렉(Lag)이 발생합니다. <br />
                  2. 최적화를 <strong>활성화</strong>하면 카운터 버튼을 광클하더라도 연산 횟수가 멈춰있고 클릭 반응이 무척 부드럽습니다.
                </div>
              </div>
            </div>

          </div>

          {/* 3단계: 연산 결과 보고서 및 데이터 출력 테이블 */}
          {currentResult && (
            <div style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
            }}>
              <h3 style={{ margin: "0 0 16px 0", color: "#1e293b", fontSize: "1.1rem" }}>
                📈 3단계: 실시간 분석 연산 통계 요약 (필터 매칭된 데이터 집계)
              </h3>
              
              {/* 요약 박스 그리드 */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "20px"
              }}>
                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "bold" }}>검색 필터된 항목 개수</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b", marginTop: "4px" }}>
                    {currentResult.totalCount.toLocaleString()}건
                  </div>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "bold" }}>필터 그룹 통계 평균</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb", marginTop: "4px" }}>
                    {currentResult.average.toLocaleString()} {dataList[0]?.unit}
                  </div>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "bold" }}>필터 그룹 내 최댓값</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0d9488", marginTop: "4px" }}>
                    {currentResult.maxValue.toLocaleString()} {dataList[0]?.unit}
                  </div>
                </div>
              </div>

              {/* 검색 결과 테이블 미리보기 */}
              <h4 style={{ margin: "20px 0 10px 0", color: "#334155" }}>
                📋 연산 매칭 데이터 리스트 (상위 80개만 출력)
              </h4>
              
              <div style={{
                maxHeight: "250px",
                overflowY: "auto",
                border: "1px solid #cbd5e1",
                borderRadius: "8px"
              }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                  textAlign: "left"
                }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f1f5f9", position: "sticky", top: 0, borderBottom: "1px solid #cbd5e1" }}>
                      <th style={{ padding: "10px 14px", fontWeight: "600" }}>ID</th>
                      <th style={{ padding: "10px 14px", fontWeight: "600" }}>항목 명칭</th>
                      <th style={{ padding: "10px 14px", fontWeight: "600" }}>구분</th>
                      <th style={{ padding: "10px 14px", fontWeight: "600", textAlign: "right" }}>집계 대상 수치</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResult.filteredList.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "8px 14px", color: "#64748b" }}>{item.id}</td>
                        <td style={{ padding: "8px 14px", fontWeight: "bold", color: "#1e293b" }}>{item.name}</td>
                        <td style={{ padding: "8px 14px", color: "#475569" }}>{item.category}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right", fontWeight: "bold", color: "#2563eb" }}>
                          {item.value.toLocaleString()}{item.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Ex16;
