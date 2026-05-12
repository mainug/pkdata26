function Ex01() {
  // LocalStorage CRUD
  /* Create */
  const data = {
    id: 1,
    name: "홍길동",
    comment: "아버지를 아버지라 부르지 못하고",
  };

  function handleLoad() {
    const jdata = JSON.stringify(data);
    localStorage.setItem("test1", jdata);

    /* Read */
    const readData = localStorage.getItem("test1");
    const odata = JSON.parse(readData);

    return (
      <article>
        <p>{odata.id}</p>
        <p>{odata.name}</p>
        <p>{odata.comment}</p>
      </article>
    );
  }

  /* Delete */
  localStorage.removeItem("test1");

  /* Clear */
  localStorage.clear();

  return (
    <>
      <h1>Ex01. LocalStorage 연습</h1>
      <h2>데이터 쓰기/읽기</h2>

      <div>
        <button onClick={handleLoad}>로드</button>
      </div>

      <handleLoad />
    </>
  );
}

export default Ex01;
