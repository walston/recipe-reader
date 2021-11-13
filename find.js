const fs = require("fs").promises;
const path = require("path");

/**
 * @param {string} filename
 * @returns {RecipeFileContents} */
async function find(filename) {
  const pathTo = path.resolve(__dirname, "recipes", filename + ".recipe");
  const buff = await fs.readFile(pathTo);
  return await buff.toString();
}

module.exports = find;
