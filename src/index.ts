import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

import expandTilde from "expand-tilde";
import pLimit from "p-limit";
import yargs from "yargs";

import { extract } from "./table-extractors/gaikoku-kabushiki-haito";

const readdir = promisify(fs.readdir);

(async () => {
  const argv = yargs.option("dir", {
    type: "string",
    description: "PDF のディレクトリ",
    demandOption: true,
  }).argv;

  const dir = expandTilde(argv.dir);
  const absoluteDir = path.isAbsolute(dir)
    ? dir
    : path.join(process.cwd(), dir);

  try {
    if (!fs.statSync(absoluteDir).isDirectory()) {
      throw new Error();
    }
  } catch (error) {
    console.log(`${absoluteDir} が存在しないかディレクトリではありません`);
    process.exit(1);
  }

  const files = (await readdir(absoluteDir))
    .map((file) => path.join(absoluteDir, file))
    .filter((file) => fs.statSync(file).isFile() && /.*\.pdf$/.test(file));

  if (files.length === 0) {
    console.log("PDF ファイルがありません");
    process.exit(0);
  }
  console.log("PDF: ", files);

  // render csv
  const limit = pLimit(os.cpus().length - 1);
  const results = await Promise.all(files.map((f) => limit(() => extract(f))));
  console.log("\n--- RENDER CSV ---\n");
  // headers
  if (results[0]) {
    const tables = results[0][0];
    if (tables && tables[0] && tables[1]) {
      console.log(
        [...Object.keys(tables[0]), ...Object.keys(tables[1])].join(",")
      );
    }
  }
  // values
  results.forEach((result) => {
    result.forEach((tables) => {
      console.log(
        [...Object.values(tables[0]), ...Object.values(tables[1])].join(",")
      );
    });
  });
})();
