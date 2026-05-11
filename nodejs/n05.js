const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const { inid } = req.query;
  console.log(inid);

  const arr = ["Life is Egg", "Life is Pretty", "Sakura", "Very easy"];

  const list = `
  <a href="/?inid=0">삶이란...|</a>
  <a href="/?inid=1">세상은...|</a>
  <a href="/?inid=2">캠퍼스는...|</a>
  <a href="/?inid=3">Get방식</a>
  <hr>
  <h1>${arr[inid] ?? "값을 고르세요"}</h1>
  `;

  res.send(list);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
