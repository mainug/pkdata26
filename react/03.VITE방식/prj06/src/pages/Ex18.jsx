import React, { useState, useEffect } from "react";

// ==========================================
// 1. 커스텀 훅 (Custom Hooks) 정의부
// ==========================================

// (1) useInput 커스텀 훅
// input 태그의 value 설정, onChange 이벤트 감지, 입력 필드 클리어 기능을 단 한 줄로 추상화해줍니다.
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChange, reset };
}

// (2) useFetch 커스텀 훅
// 임의의 HTTP API를 호출하여 데이터, 로딩 중 상태, 에러 발생 상태를 관리하며 
// 원할 때 새로 수집(refetch)할 수 있는 로직을 캡슐화합니다.
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // 수동 새로고침용 트리거 증가 함수
  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트되었을 때 상태를 업뎃하여 메모리 릭이 발생하는 것 방지
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("네트워크 연결 실패 혹은 존재하지 않는 리소스 경로입니다.");
        }
        return res.json();
      })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, refetchTrigger]); // url 혹은 리페치 트리거 변경 시 재호출

  return { data, loading, error, refetch };
}

// ==========================================
// 2. 메인 컴포넌트 정의부
// ==========================================
function Ex18() {
  // useInput 커스텀 훅을 활용한 회원가입 폼 관리
  const username = useInput("");
  const email = useInput("");
  const [registeredUser, setRegisteredUser] = useState(null);

  // useFetch 커스텀 훅을 활용한 비동기 임의 사원 목록 로드
  const { data: users, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/users?_limit=4"
  );

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.value || !email.value) {
      alert("이름과 이메일을 모두 올바르게 입력해주세요!");
      return;
    }
    setRegisteredUser({
      name: username.value,
      email: email.value
    });
    
    // 커스텀 훅에서 제공하는 reset 함수 호출로 입력폼 비우기
    username.reset();
    email.reset();
  };

  return (
    <div style={{
      maxWidth: "850px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#f8fafc",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
      {/* 타이틀 */}
      <h1 style={{ color: "#0f172a", fontSize: "2.2rem", marginBottom: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "16px" }}>
        18. 커스텀 훅 (Custom Hooks) 설계와 활용
      </h1>
      
      <p style={{ color: "#64748b", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "30px" }}>
        커스텀 훅은 컴포넌트 내부에서 비대해지는 상태 관리 로직이나 부작용(Side Effect) 관리 코드를 
        <strong>독립적인 하나의 JS 함수로 추출</strong>하여 타 컴포넌트에서도 원클릭으로 재활용 가능하도록 감싸는 기술입니다.
        직접 훅을 작성하며 리액트 고수 수준의 모듈화에 대해 학습해 봅시다.
      </p>

      {/* 데모 영역 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "24px" }}>
        
        {/* 1. useInput 활용 폼 영역 */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#4f46e5" }}>
            🔑 useInput 커스텀 훅 활용
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px" }}>
            단 한 줄의 선언만으로 input 태그의 데이터 제어 흐름(Value, OnChange, Reset)을 컴포넌트 외부로 캡슐화합니다.
          </p>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                성명 (이름)
              </label>
              <input 
                type="text" 
                value={username.value}
                onChange={username.onChange}
                placeholder="예: 홍길동"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                이메일 주소
              </label>
              <input 
                type="email" 
                value={email.value}
                onChange={email.onChange}
                placeholder="hong@gmail.com"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button 
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
            >
              간편 멤버 등록
            </button>
          </form>

          {registeredUser && (
            <div style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "8px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              fontSize: "0.85rem",
              lineHeight: "1.6"
            }}>
              <strong>✅ 등록 기록 (Local State)</strong> <br />
              • 이름: {registeredUser.name} <br />
              • 메일: {registeredUser.email}
            </div>
          )}
        </div>

        {/* 2. useFetch 활용 API 영역 */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ margin: 0, color: "#0891b2" }}>
              🌐 useFetch 커스텀 훅 활용
            </h3>
            <button 
              onClick={refetch}
              disabled={loading}
              style={{
                backgroundColor: "#f1f5f9",
                color: "#475569",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "5px 12px",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#e2e8f0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f1f5f9"}
            >
              {loading ? "불러오는 중..." : "새로고침 🔄"}
            </button>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px" }}>
            비동기 통신 로딩, 예외(Error) 핸들링, 리패치 명령을 내재화하여 다수의 API 통신에서 재활용합니다.
          </p>

          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", fontSize: "0.9rem" }}>
              📡 서버와 동기화 중...
            </div>
          )}

          {error && (
            <div style={{
              padding: "14px",
              borderRadius: "8px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              fontSize: "0.85rem"
            }}>
              🚨 오류 보고: {error}
            </div>
          )}

          {!loading && !error && users && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {users.map((user) => (
                <div key={user.id} style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#1e293b" }}>{user.name}</div>
                    <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "2px" }}>📧 {user.email}</div>
                  </div>
                  <span style={{ 
                    fontSize: "0.75rem", 
                    color: "#0891b2", 
                    backgroundColor: "#ecfeff", 
                    padding: "2px 8px", 
                    borderRadius: "10px",
                    fontWeight: "600"
                  }}>
                    {user.company.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 학습 요약 박스 */}
      <div style={{
        marginTop: "24px",
        padding: "18px",
        backgroundColor: "#1e293b",
        color: "#cbd5e1",
        borderRadius: "12px",
        fontSize: "0.85rem",
        lineHeight: "1.6"
      }}>
        <h4 style={{ color: "#38bdf8", marginTop: 0, marginBottom: "8px" }}>🎓 커스텀 훅 개발 핵심 규칙</h4>
        <ol style={{ paddingLeft: "20px", margin: 0 }}>
          <li>훅의 이름은 항상 소문자 <code>use</code>로 시작해 리액트 엔진이 훅의 수명 주기를 파악할 수 있도록 해야 합니다.</li>
          <li>기본 Hook(useState, useEffect 등)의 제약조건과 같이, 조건문이나 반복문 내부에서는 훅을 선언할 수 없습니다.</li>
          <li>컴포넌트마다 커스텀 훅의 상태(State) 공간은 각각 격리되어 실행되므로 독립적으로 동작합니다.</li>
        </ol>
      </div>
    </div>
  );
}

export default Ex18;
