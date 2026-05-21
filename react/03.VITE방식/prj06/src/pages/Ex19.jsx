import React, { useState, useEffect } from "react";
import axios from "axios";

// -------------------------------------------------------------
// 1. Axios 기본 설정과 인스턴스 생성 데모
// -------------------------------------------------------------
// 실제 애플리케이션에서는 아래와 같이 기본 URL과 공통 헤더를 지정한 커스텀 인스턴스를 사용합니다.
const customApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer DEMO_JWT_TOKEN_ABC123"
  }
});

function Ex19() {
  // --- 상태 관리 ---
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // POST & PUT 입력을 위한 Form 상태
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [editingPostId, setEditingPostId] = useState(null); // 수정 모드 전환용 ID
  
  // Axios 요청/응답 로그 관리 (인터셉터 시뮬레이션용)
  const [logs, setLogs] = useState([]);
  
  // 마지막 API 응답 원본 JSON 데이터 저장
  const [rawResponse, setRawResponse] = useState(null);

  // 로깅 함수
  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  };

  // --- 1. GET: 게시글 리스트 조회 ---
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    setRawResponse(null);
    addLog("GET 요청 전송 시작: /posts?_limit=4");
    
    try {
      // 위에서 생성한 customApi 인스턴스를 사용해보거나 기본 axios를 사용해보며 테스트합니다.
      const response = await customApi.get("/posts?_limit=4");
      
      setPosts(response.data);
      setRawResponse(response);
      addLog(`GET 요청 성공: HTTP ${response.status} Ok (데이터 ${response.data.length}건 수신)`);
    } catch (err) {
      setError(err.message || "데이터 로드 실패");
      addLog(`GET 요청 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 첫 로드 시 데이터 조회
  useEffect(() => {
    fetchPosts();
  }, []);

  // --- 2. POST: 게시글 신규 생성 ---
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!inputTitle.trim() || !inputBody.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setRawResponse(null);
    addLog("POST 요청 전송 시작: /posts");

    try {
      const newPostData = {
        title: inputTitle,
        body: inputBody,
        userId: 1
      };
      
      const response = await customApi.post("/posts", newPostData);
      
      // JSONPlaceholder는 실제 DB에 쓰지 않지만 mock 데이터로 생성된 객체(id: 101 등)를 리턴합니다.
      // 수신된 데이터를 화면 상의 리스트 맨 위에 임시로 추가해 봅니다.
      setPosts((prev) => [response.data, ...prev]);
      setRawResponse(response);
      addLog(`POST 요청 성공: HTTP ${response.status} Created (ID: ${response.data.id} 생성)`);
      
      // 폼 비우기
      setInputTitle("");
      setInputBody("");
    } catch (err) {
      setError(err.message || "등록 실패");
      addLog(`POST 요청 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. PUT: 게시글 수정 모드 진입 & 완료 ---
  const startEdit = (post) => {
    setEditingPostId(post.id);
    setInputTitle(post.title);
    setInputBody(post.body);
    addLog(`게시글 ID: ${post.id} 수정 모드 진입`);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setInputTitle("");
    setInputBody("");
    addLog("수정 모드 취소");
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!inputTitle.trim() || !inputBody.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setRawResponse(null);
    addLog(`PUT 요청 전송 시작: /posts/${editingPostId}`);

    try {
      const updatedData = {
        id: editingPostId,
        title: inputTitle,
        body: inputBody,
        userId: 1
      };

      const response = await customApi.put(`/posts/${editingPostId}`, updatedData);

      // 리스트 상의 항목 교체
      setPosts((prev) =>
        prev.map((item) => (item.id === editingPostId ? response.data : item))
      );
      setRawResponse(response);
      addLog(`PUT 요청 성공: HTTP ${response.status} OK (ID: ${editingPostId} 수정 완료)`);

      // 폼 비우기 & 수정 모드 해제
      setEditingPostId(null);
      setInputTitle("");
      setInputBody("");
    } catch (err) {
      setError(err.message || "수정 실패");
      addLog(`PUT 요청 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- 4. DELETE: 게시글 삭제 ---
  const handleDeletePost = async (id) => {
    if (!window.confirm("정말로 이 글을 삭제하시겠습니까?")) return;

    setLoading(true);
    setError(null);
    setRawResponse(null);
    addLog(`DELETE 요청 전송 시작: /posts/${id}`);

    try {
      const response = await customApi.delete(`/posts/${id}`);
      
      // 리스트에서 해당 글 필터링 제거
      setPosts((prev) => prev.filter((item) => item.id !== id));
      setRawResponse(response);
      addLog(`DELETE 요청 성공: HTTP ${response.status} OK (ID: ${id} 삭제 완료)`);
    } catch (err) {
      setError(err.message || "삭제 실패");
      addLog(`DELETE 요청 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- 5. ERROR: 일부러 에러 유발해보기 ---
  const triggerError = async () => {
    setLoading(true);
    setError(null);
    setRawResponse(null);
    addLog("GET 에러 강제 테스트 전송 시작: /invalid-route-xyz");

    try {
      // 존재하지 않는 잘못된 엔드포인트를 호출
      await customApi.get("/invalid-route-xyz");
    } catch (err) {
      // Axios 에러 객체 디버깅 분석
      setError(err);
      setRawResponse(err.response || { message: "네트워크 응답 없음 또는 기타 오류" });
      addLog(`에러 감지 성공: HTTP ${err.response ? err.response.status : "No Response"} - ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
      {/* 1. 타이틀 */}
      <h1 style={{ color: "#0f172a", fontSize: "2.2rem", marginBottom: "8px", borderBottom: "2px solid #e2e8f0", paddingBottom: "16px" }}>
        19. Axios 활용 & 비동기 CRUD 테스트
      </h1>
      
      <p style={{ color: "#64748b", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "30px" }}>
        <strong>Axios</strong>는 브라우저와 Node.js를 위한 <strong>Promise 기반의 HTTP 클라이언트 라이브러리</strong>입니다.
        기본적인 Fetch API에 비해 JSON 자동 변환, 요청/응답 인터셉터, 시간 초과(Timeout) 설정, 요청 취소, 에러 핸들링 고도화 등
        실무에서 필수적인 편리한 기능들을 다수 지원합니다. 본 예제를 통해 직접 REST API 서버와 통신해 보며 작동 원리를 익혀 봅시다.
      </p>

      {/* 2. 대시보드 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
        
        {/* 좌측 패널: 게시글 관리 및 생성/수정 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* 입력 폼 카드 */}
          <div style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: editingPostId ? "#d97706" : "#4f46e5" }}>
              {editingPostId ? `📝 게시글 수정 (ID: ${editingPostId})` : "➕ 새 게시글 등록 (POST)"}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "18px" }}>
              {editingPostId 
                ? "선택한 게시글의 내용을 변경한 뒤 수정완료 버튼을 누르면 PUT 요청이 수행됩니다." 
                : "제목과 본문을 입력하고 등록하면 JSONPlaceholder 서버로 가상의 POST 요청이 진행됩니다."}
            </p>

            <form onSubmit={editingPostId ? handleUpdatePost : handleCreatePost}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                  제목 (Title)
                </label>
                <input 
                  type="text" 
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="게시글 제목을 입력하세요"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                  본문 내용 (Body)
                </label>
                <textarea 
                  rows="3"
                  value={inputBody}
                  onChange={(e) => setInputBody(e.target.value)}
                  placeholder="본문 내용을 입력하세요"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    resize: "none",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                {editingPostId ? (
                  <>
                    <button 
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        backgroundColor: "#d97706",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                    >
                      {loading ? "수정 중..." : "수정 완료 (PUT)"}
                    </button>
                    <button 
                      type="button"
                      onClick={cancelEdit}
                      style={{
                        backgroundColor: "#64748b",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 18px",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button 
                    type="submit"
                    disabled={loading}
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
                    {loading ? "서버 전송 중..." : "게시글 작성 완료 (POST)"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 에러 상태 & 404 강제 유발 테스트 버튼 */}
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0,0,0,0.01)"
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#ef4444" }}>🚨 Axios 예외 처리 & 디버깅</h4>
            <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "14px" }}>
              일부러 존재하지 않는 주소를 호출하여 Axios가 Catch 블록에서 에러 객체(Error Object)를 어떻게 분류하고 상태를 표출하는지 실습합니다.
            </p>
            <button 
              onClick={triggerError}
              disabled={loading}
              style={{
                backgroundColor: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "10px 16px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#fee2e2"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#fef2f2"}
            >
              404 Not Found 에러 강제 발생시키기
            </button>

            {error && (
              <div style={{
                marginTop: "14px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: "0.8rem",
                lineHeight: "1.5"
              }}>
                <strong>⚠️ 에러 메시지:</strong> {error.message || String(error)} <br />
                {error.response && (
                  <>
                    <strong>HTTP 코드:</strong> {error.response.status} {error.response.statusText} <br />
                    <strong>요청 경로:</strong> {error.config?.url}
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* 우측 패널: 게시글 리스트 출력 */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.01)",
          minHeight: "450px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, color: "#0f172a" }}>
              📰 게시글 목록 (GET)
            </h3>
            <button 
              onClick={fetchPosts}
              disabled={loading}
              style={{
                backgroundColor: "#ecfdf5",
                color: "#059669",
                border: "1px solid #a7f3d0",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#d1fae5"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#ecfdf5"}
            >
              {loading ? "통신 중..." : "목록 새로고침 🔄"}
            </button>
          </div>

          {loading && posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              📡 데이터를 동기화 중입니다...
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              보여줄 게시글이 없습니다. 새로고침을 눌러보세요.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {posts.map((post) => (
                <div key={post.id} style={{
                  padding: "14px",
                  borderRadius: "10px",
                  backgroundColor: "#f8fafc",
                  border: `1px solid ${editingPostId === post.id ? "#d97706" : "#e2e8f0"}`,
                  fontSize: "0.85rem",
                  transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <h4 style={{ margin: "0 0 6px 0", color: "#1e293b", fontWeight: "700", wordBreak: "break-all" }}>
                      #{post.id} - {post.title}
                    </h4>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      color: "#64748b", 
                      backgroundColor: "#f1f5f9", 
                      padding: "2px 6px", 
                      borderRadius: "4px",
                      whiteSpace: "nowrap"
                    }}>
                      User: {post.userId || 1}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 12px 0", color: "#475569", lineHeight: "1.5" }}>
                    {post.body}
                  </p>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button 
                      onClick={() => startEdit(post)}
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#d97706",
                        border: "1px solid #f59e0b",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      수정
                    </button>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#ef4444",
                        border: "1px solid #fca5a5",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 3. 하단부: 로그 & 응답 원본 디버그 창 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", marginTop: "24px" }}>
        
        {/* 통신 실시간 로거 */}
        <div style={{
          backgroundColor: "#1e293b",
          color: "#38bdf8",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          fontFamily: "'Courier New', Courier, monospace"
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#38bdf8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>📟 API Request/Response Logger</span>
            <button 
              onClick={() => setLogs([])}
              style={{
                backgroundColor: "#334155",
                color: "#94a3b8",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                fontSize: "0.7rem",
                cursor: "pointer"
              }}
            >
              Clear Log
            </button>
          </h4>
          <div style={{
            height: "180px",
            overflowY: "auto",
            fontSize: "0.8rem",
            lineHeight: "1.6",
            padding: "8px",
            backgroundColor: "#0f172a",
            borderRadius: "8px",
            color: "#34d399",
            border: "1px solid #334155"
          }}>
            {logs.length === 0 ? (
              <div style={{ color: "#64748b" }}>대기 중... API 요청을 시도하면 로그가 기록됩니다.</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} style={{ borderBottom: "1px solid #1e293b", padding: "4px 0", wordBreak: "break-all" }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 응답 원본 JSON 뷰어 */}
        <div style={{
          backgroundColor: "#1e293b",
          color: "#cbd5e1",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#f8fafc" }}>📄 Last Response Metadata (JSON)</h4>
          <pre style={{
            margin: 0,
            padding: "10px",
            backgroundColor: "#0f172a",
            borderRadius: "8px",
            color: "#a7f3d0",
            fontSize: "0.75rem",
            height: "180px",
            overflowY: "auto",
            lineHeight: "1.4",
            border: "1px solid #334155"
          }}>
            {rawResponse ? (
              JSON.stringify({
                status: rawResponse.status,
                statusText: rawResponse.statusText,
                headers: rawResponse.headers,
                config: {
                  url: rawResponse.config?.url,
                  method: rawResponse.config?.method,
                  headers: rawResponse.config?.headers
                },
                data: rawResponse.data
              }, null, 2)
            ) : (
              <span style={{ color: "#64748b" }}>통신 응답이 완료되면 원본 Response 객체 정보가 이곳에 파싱됩니다.</span>
            )}
          </pre>
        </div>

      </div>

      {/* 4. 이론 요약 카드 */}
      <div style={{
        marginTop: "24px",
        padding: "20px",
        backgroundColor: "#0f172a",
        color: "#cbd5e1",
        borderRadius: "14px",
        fontSize: "0.85rem",
        lineHeight: "1.7"
      }}>
        <h4 style={{ color: "#38bdf8", marginTop: 0, marginBottom: "8px" }}>🎓 Axios의 핵심 편의 기능 요약</h4>
        <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          <li>
            <strong>인스턴스화:</strong> <code>axios.create()</code>를 사용하여 공통적인 base URL, 헤더(Token 등), Timeout을 설정하여 코드 중복을 획기적으로 줄일 수 있습니다.
          </li>
          <li>
            <strong>인터셉터(Interceptors):</strong> <code>axios.interceptors.request.use()</code> 및 <code>response.use()</code>를 통해 모든 HTTP 요청 전송 전에 JWT 토큰을 자동으로 주입하거나, 에러가 왔을 때 리프레시 토큰을 통해 재인증을 수행하는 등의 전처리를 일괄적으로 처리할 수 있습니다.
          </li>
          <li>
            <strong>자동 변환:</strong> Fetch와 달리 응답받은 HTTP body 데이터를 자동으로 JSON으로 파싱해주므로 <code>res.json()</code> 호출이 불필요합니다.
          </li>
          <li>
            <strong>에러 핸들링:</strong> HTTP 상태 코드가 2xx 범위를 벗어날 경우(400, 500 등) 자동으로 Promise Reject를 발생시켜 예외 캐치 및 조건식 분기 처리가 직관적입니다.
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Ex19;
