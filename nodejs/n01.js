const { createServer } = require("http");
const port = 3000;

const server = createServer((req, res) => {
  res.end(`<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>하이퍼링크</title>
  </head>
  <body>
    <h1>하이퍼링크</h1>
    <hr />
    <a href="index.html">홈으로</a><br />
    <a href="http://mydb.iptime.org:3300/">노트서버</a><br />
    <a href="https://www.naver.com/">네이버</a><br />
    <a href="https://www.daum.net/">다음</a>
  </body>
</html>
`);
});

server.listen(port, () => {
  console.log("world");
});
