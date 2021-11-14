const express = require("express");
const app = express();

const { getFile, getIndex } = require("./find");
const parse = require("./parse");

app.get("/", async function (req, res) {
  try {
    const index = await getIndex();
    return res
      .status(200)
      .send(index.map((uri) => uri.replace(".recipe", ".html")));
  } catch (error) {
    return res.sendStatus(500);
  }
});

app.get("/:filename", async function (req, res) {
  try {
    const file = await getFile(req.params.filename.replace(".html", ".recipe"));
    const json = parse(file);
    res.status(200).send(json);
  } catch (error) {
    if (error instanceof parse.ParseError) return res.sendStatus(500);
    return res.sendStatus(404);
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
