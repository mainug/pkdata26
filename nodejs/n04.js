const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const _path = path.join(__dirname, "dist");

app.use(express.static(_path));
// app.get("/", (req, res) => {
//   const name = `홍길동`;
//   const age = 22;

//   const list = `<!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     <h1>안녕하세요</h1>
//     <h2>${name}님</h2>
//     <h3>${age}살</h3>
//   </body>
// </html>
// `;
//   res.send(list);
// });

app.get("/data", (req, res) => {
  const { name, age } = req.query;
  res.send(`${name}님 ${age}살`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
