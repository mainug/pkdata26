// 스타일 객체 선언 (카멜 케이스 사용)
const mystyle1 = {
  width: "100px",
  height: "100px",
  backgroundColor: "rgb(124, 133, 206)",
};

function Ex16() {
  return (
    <>
      <h1>8. 스타일적용</h1>
      <div className="box1">style0</div>
      <div style={mystyle1}>style1-a</div>
      <div style={{ ...mystyle1, backgroundColor: "rgb(124, 206, 149)" }}>
        style1-b
      </div>
      <div className={mystyle2.box1}>style2</div>
      <div className={mystyle2["box1-new"]}>style2</div>
    </>
  );
}

export default Ex16;
