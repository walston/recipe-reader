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

  const sections = ["meta", "ingredients", "instructions"];
  let current = 0;

  for (const line of lines) {
    if (!line) continue;
    if (/^\[.+\]$/.test(line)) {
      const section = line.slice(1, -1);
      const next = sections.indexOf(section);
      if (next > 0 && next < sections.length) {
        current = next;
        continue;
      } else {
        throw new ParseError(`unknown section "${section}"`);
      }
    }
    switch (sections[current]) {
      case "meta":
        const [key, value] = line.split();
      case "ingredients":
      case "instructions":
    }
  }

  return data;
}

module.exports = parse;
