import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

import expandTilde from "expand-tilde";
import pLimit from "p-limit";
import yargs from "yargs";

import { ExtractError, extract } from "./extract";
import { ForeignStockDividend } from "./files/foreign-stock-dividend";
import { ForeignStockTrading } from "./files/foreign-stock-trading/index";
import { groupByType } from "./group-by-type";

const readdir = promisify(fs.readdir);

(async () => {
  // TODO: yargs hideBin
  const argv = yargs(process.argv).option("dir", {
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

  const limit = pLimit(os.cpus().length - 1);
  let dataByType;
  try {
    dataByType = groupByType(
      await Promise.all(files.map((f) => limit(() => extract(f))))
    );
  } catch (e) {
    if (e instanceof ExtractError) {
      console.error(`[error] ${e.message}`);
    }
    process.exit(1);
  }

  console.log("\n--- RENDER CSV ---\n");
  if (dataByType.foreignStockDividend.length > 0) {
    console.log("\n外国株式等配当金\n");
    ForeignStockDividend.renderCsv(dataByType.foreignStockDividend);
  }
  if (dataByType.foreignStockTrading.length > 0) {
    console.log("\n外国株式等取引報告書\n");
    ForeignStockTrading.renderCsv(dataByType.foreignStockTrading);
  }
})();
