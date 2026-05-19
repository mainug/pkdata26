import { useState } from "react";
// 1. 일반 임포트 대신 styles 객체로 가져옵니다.
import styles from "./Ex10.module.css";

function Ex10() {
  const [inData, setIndata] = useState("");
  const [arr, setArr] = useState([]);

  const handleInput = (e) => setIndata(e.target.value);

  const handleAdd = () => {
    if (inData.trim() === "") return;
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
    /* 2. 최상위 div를 모듈 클래스로 감싸서 스타일 오염을 철저히 격리합니다 */
    <div className={styles.ex10Container}>
      {/* 3. 내부 요소들의 클래스명도 styles 객체를 활용하도록 매핑합니다 */}
      <h1 className={styles.todoTitle}>10. ToDoList 만들기</h1>

      <label htmlFor="inin" className={styles.todoLabel}>
        배열요소입력 :{" "}
      </label>
      <input
        type="text"
        id="inin"
        onChange={handleInput}
        value={inData}
        onKeyDown={handleAddEnter}
        placeholder="할 일을 입력하세요..."
        className={styles.todoInput}
      />
      <button onClick={handleAdd} className={styles.addBtn}>
        추가
      </button>
      <button
        onClick={handleDel}
        disabled={arr.length <= 0}
        className={styles.delBtn}
      >
        모두삭제
      </button>

      <hr className={styles.todoHr} />
      <div className={styles.previewText}>실시간 입력: {inData}</div>
      <hr className={styles.todoHr} />

      <div className={styles.todoListContainer}>
        {arr.map((v, i) => (
          <div
            key={i}
            /* 템플릿 리터럴을 활용해 조건부 클래스도 모듈 방식으로 결합합니다 */
            className={`${styles.todoItem} ${v.completed ? styles.completed : ""}`}
          >
            <input
              type="checkbox"
              checked={v.completed}
              onChange={() => toggleComplete(i)}
              className={styles.todoCheckbox}
            />
            <span className={styles.todoIndex}>{i}</span>
            <span className={styles.todoText}>
              {v.completed ? <del>{v.text}</del> : v.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ex10;
