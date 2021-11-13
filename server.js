const express = require("express");
const app = express();

const find = require("./find");
const parse = require("./parse");

app.get("/:filename", async function handler(req, res) {
  try {
    const file = await find(req.params.filename);
    const json = parse(file);
    res.status(200).send(json);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
