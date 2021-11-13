const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();

/** @typedef {string} RecipeFileContents */
/** @typedef {string} RecipeObject */

/**
 * @param {string} filename
 * @returns {RecipeFileContents} */
async function find(filename) {
  const pathTo = path.resolve(__dirname, "recipes", filename + ".recipe");
  const buff = await fs.readFile(pathTo);
  return await buff.toString();
}

/**
 * @param {RecipeFileContents} contents
 * @returns {RecipeObject} */
function parse(contents) {
  const data = { title: "", tags: [], ingredients: [], instructions: [] };
  const lines = contents.split("\n");
  for (const line of lines) {
  }

  return data;
}

app.get("/:filename", async function handler(req, res) {
  try {
    const file = await find(req.params.filename);
    const json = parse(file);
    res.status(200).send(json);
  } catch (error) {
    res.send(404);
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
