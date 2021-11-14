class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParseError";
  }
}

/** @typedef {string} RecipeFileContents */
/** @typedef {string} RecipeObject */

/**
 * @param {RecipeFileContents} contents
 * @returns {RecipeObject} */
function parse(contents) {
  const data = { title: "", tags: [], ingredients: [], instructions: [] };
  const lines = contents.split("\n");

  const sections = new Set(["ingredients", "instructions"]);
  let currentSection = "meta";

  for (const line of lines) {
    if (!line) continue;
    sections.delete(currentSection);
    if (/^\[.+\]$/.test(line)) {
      const nextSection = line.slice(1, -1);
      if (sections.has(nextSection)) {
        currentSection = nextSection;
        continue;
      } else {
        throw new ParseError(`unknown section "${nextSection}"`);
      }
    }

    switch (currentSection) {
      case "meta":
        const [key, value] = line.split(/\s*=\s*/);
        if (key === "title") {
          data.title = value.slice(1, -1);
        } else if (key === "tags") {
          data.tags.push(...value.split(/\s*,\s*/));
        }
        break;
      case "ingredients":
        data.ingredients.push(parseIngredient(line));
        break;
      case "instructions":
        data.instructions.push(line);
        break;
    }
  }

  return data;
}

module.exports = parse;
module.exports.ParseError = ParseError;

/**
 * @param {string} line
 * @returns {{ amount: string, description: string, tag: string }}
 */
function parseIngredient(line) {
  let amount = "";
  let description = "";
  let tag = "";

  let state = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ";" || line[i] === "(") {
      state++;
      continue;
    } else if (line[i] === ")") break;

    if (state === 0) amount += line[i];
    else if (state === 1) description += line[i];
    else if (state === 2) tag += line[i];
  }

  if (!tag) tag = description;

  return {
    amount: amount.trim(),
    description: description.trim(),
    tag: tag.trim(),
  };
}
