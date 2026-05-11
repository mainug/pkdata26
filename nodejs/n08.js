const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const _path = path.join(__dirname, "dist", "index2.html");

/* json 형식을 위한 해석 */
app.use(express.json());
/* post 방식을 위한 해석 */
app.use(express.urlencoded({ extended: true }));

let num = 1;

app.get("/", (req, res) => {
  res.sendFile(_path);
});

app.post("/data", (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: num++,
    name,
    age,
  };
  console.log(newUser);
  res.json(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
