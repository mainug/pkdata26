const app = require("express")();
const port = 3000;

app.get("/", (req, res) =>
  res.send(`<h1>Hello World!</h1><a href="/hi">Hello World!</a>`),
);

app.get("/hi", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
