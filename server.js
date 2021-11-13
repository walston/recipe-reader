const fs = require("fs").promises;
const path = require("path");

const express = require("express");

const app = express();

/**
 * @param {string} filename
 * @returns {string} */
async function find(filename) {
  const pathTo = path.resolve(__dirname, "recipes", filename + ".recipe");
  return await (await fs.readFile(pathTo)).toString();
}

app.get("/:filename", async function handler(req, res) {
  try {
    const file = await find(req.params.filename);
    res.status(200).send(file);
  } catch (error) {
    res.send(404);
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
