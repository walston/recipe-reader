const fs = require("fs/promises");
const path = require("path");
const pug = require("pug");
const { getFile, getIndex } = require("./file-access");
const parse = require("./recipe-parser");

const TEMPLATE_FOLDER = path.resolve(__dirname, "..", "template");
const OUTPUT_FOLDER = path.resolve(__dirname, "..", "dist");

const __DEV__ = process.env.prod !== "";

async function main() {
  await resetOutputFolder();

  const template = pug.compileFile(TEMPLATE_FOLDER + "/index.pug", {
    pretty: __DEV__,
  });

  const index = await getIndex();

  index.map(async (filename) => {
    const slug = filename.replace(".recipe", "");
    const file = await getFile(filename);
    const json = parse(file);
    console.log(json);
    const html = template({ ...json, slug });
    await fs.writeFile(
      path.resolve(OUTPUT_FOLDER, filename.replace(".recipe", ".html")),
      html
    );
  });
}

async function resetOutputFolder() {
  await fs
    .rm(OUTPUT_FOLDER, { recursive: true, force: true })
    .catch(err("fs.rm"));
  await fs.mkdir(OUTPUT_FOLDER).catch(err("fs.mkdir"));
}

main();

function err(prefix) {
  return function console_error() {
    return console.error(prefix + "\n", ...arguments);
  };
}
