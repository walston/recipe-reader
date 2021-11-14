const fs = require("fs/promises");
const path = require("path");
const pug = require("pug");
const { getFile, getIndex } = require("./file-access");
const parse = require("./recipe-parser");

const TEMPLATE_FOLDER = path.resolve(__dirname, "..", "template");
const OUTPUT_FOLDER = path.resolve(__dirname, "..", "dist");

async function main() {
  await resetOutputFolder();

  const template = pug.compileFile(TEMPLATE_FOLDER + "/index.pug");

  const index = await getIndex();

  index.map(async (filename) => {
    const file = await getFile(filename);
    const json = parse(file);
    const html = template({ ...json, slug: filename.replace(".recipe", "") });
    await fs.writeFile(
      path.resolve(OUTPUT_FOLDER, filename.replace(".recipe", ".html")),
      html
    );
  });
}

async function resetOutputFolder() {
  await fs
    .rmdir(OUTPUT_FOLDER)
    .catch(({ message }) =>
      message.startsWith("EACCES") ? process.exit(1) : null
    );
  await fs.mkdir(OUTPUT_FOLDER).catch(console.error);
}

main();
