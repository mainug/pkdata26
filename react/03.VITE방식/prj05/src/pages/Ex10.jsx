import { useState } from "react";
import "./Ex10.css";

function Ex10() {
  const [inData, setIndata] = useState("");
  const [arr, setArr] = useState([]);

  const handleInput = (e) => setIndata(e.target.value);

  const handleAdd = () => {
    if (inData.trim() === "") return; // 빈 값 추가 방지
    // 텍스트 대신 객체 형태로 저장하여 상태 관리
    setArr([...arr, { text: inData, completed: false }]);
    setIndata("");
  };

  const handleAddEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleDel = () => {
    setArr([]);
  };

  const toggleComplete = (i) => {
    const newArr = [...arr];
    newArr[i].completed = !newArr[i].completed;
    setArr(newArr);
  };

  return (
    <div className="todo-page">
      <h1>10. ToDoList 만들기</h1>
      <label htmlFor="inin">배열요소입력 : </label>
      <input
        type="text"
        id="inin"
        onChange={handleInput}
        value={inData}
        onKeyDown={handleAddEnter}
        placeholder="할 일을 입력하세요..."
      />
      <button onClick={handleAdd}>추가</button>
      <button onClick={handleDel} disabled={arr.length <= 0}>
        모두삭제
      </button>

      <hr />
      <div>실시간 입력: {inData}</div>
      <hr />

      <div className="todo-list-container">
        {arr.map((v, i) => (
          <div
            key={i}
            className={`todo-item ${v.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={v.completed}
              onChange={() => toggleComplete(i)}
            />
            <span className="todo-index">{i}</span>
            <span className="todo-text">
              {v.completed ? <del>{v.text}</del> : v.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ex10;
