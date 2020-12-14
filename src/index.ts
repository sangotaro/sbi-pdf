import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

import expandTilde from "expand-tilde";
import pLimit from "p-limit";
import yargs from "yargs";

import { extract } from "./extract";
import { ForeignStockDividendData } from "./files/foreign-stock-dividend";
import { ForeignStockDividend } from "./files/foreign-stock-dividend/index";

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
  const results = await Promise.all(files.map((f) => limit(() => extract(f))));
  const groupByType = results.reduce<{
    foreignStockDividend: ForeignStockDividendData[];
  }>(
    (accumulator, result) => {
      if (result.type === "foreign_stock_dividend") {
        return {
          ...accumulator,
          foreignStockDividend: [
            ...accumulator.foreignStockDividend,
            ...result.data,
          ],
        };
      }
      return accumulator;
    },
    { foreignStockDividend: [] }
  );

  console.log("\n--- RENDER CSV ---\n");
  ForeignStockDividend.renderCsv(groupByType.foreignStockDividend);
})();
