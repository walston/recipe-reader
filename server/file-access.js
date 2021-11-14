const fs = require("fs/promises");
const path = require("path");

const RECIPE_FOLDER = path.resolve(__dirname, "..", "recipes");

/**
 * @param {string} filename
 * @returns {RecipeFileContents} */
async function getFile(filename) {
  const pathTo = path.resolve(RECIPE_FOLDER, filename);
  const buff = await fs.readFile(pathTo);
  return await buff.toString();
}

async function getIndex() {
  const index = await fs.readdir(RECIPE_FOLDER);
  return index;
}

module.exports = {
  getFile,
  getIndex,
};
