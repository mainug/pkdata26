const express = require("express");
const app = express();
const port = 3000;

const users = [
  { id: 1, name: "Hong", age: 20 },
  { id: 2, name: "Kim", age: 21 },
  { id: 3, name: "Lee", age: 22 },
  { id: 4, name: "Park", age: 23 },
  { id: 5, name: "Choi", age: 24 },
  { id: 6, name: "Kwon", age: 25 },
  { id: 7, name: "Kim", age: 26 },
  { id: 8, name: "Lee", age: 27 },
  { id: 9, name: "Park", age: 28 },
  { id: 10, name: "Choi", age: 29 },
];

app.get("/users/:id/:age/:name", (req, res) => {
  const { id, age, name } = req.params;
  console.log(id, age, name);
  //   res.send(users);
});

app.get("/find/:id", (req, res) => {
  const { id, age, name } = req.params;
  const user = users.find((u) => u.id == id);
  //   res.json(user); // json 형식으로 보내기
  //   res.send(users); // 문자열 형식으로 보내기
  res.send(`<h2>${JSON.stringify(user)}</h2>`); // JSON 문자열 형식으로 보내기
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
