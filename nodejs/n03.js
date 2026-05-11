const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const _path = path.join(__dirname, "dist");

app.use(express.static(_path)); // 정적 서비스로 index.html 파일 서빙

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
