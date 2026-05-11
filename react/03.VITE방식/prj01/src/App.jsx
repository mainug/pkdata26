import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClickIncrease = () => {
    if (count < 20) {
      setCount(count + 1);
    }
  };

  const handleClickDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="App">
      <h1>카운터</h1>
      <p className="value">현재 값: {count}</p>
      <button onClick={handleClickIncrease}>증가 버튼</button>
      <button onClick={handleClickDecrease}>감소 버튼</button>
    </div>
  );
}

export default App;
