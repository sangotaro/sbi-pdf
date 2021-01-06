import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";

import { Command, flags } from "@oclif/command";
import expandTilde from "expand-tilde";
import pLimit from "p-limit";

import { ForeignStockDividend } from "./e-deliveries/foreign-stock-dividend";
import { ForeignStockSplit } from "./e-deliveries/foreign-stock-split";
import { ForeignStockTrading } from "./e-deliveries/foreign-stock-trading";
import { ExtractError, extract } from "./extract";
import { groupByType } from "./group-by-type";

const readdir = promisify(fs.readdir);

class Main extends Command {
  static description = "sbi pdf command";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    dir: flags.string({
      char: "d",
      description: "directory containing pdf files",
      required: true,
    }),
  };

  static args = [];

  static usage = "spi-pdf --dir=[DIR]";

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async run() {
    const { flags } = this.parse(Main);
    const dir = expandTilde(flags.dir);
    const absoluteDir = path.isAbsolute(dir)
      ? dir
      : path.join(process.cwd(), dir);

    try {
      if (!fs.statSync(absoluteDir).isDirectory()) {
        throw new Error();
      }
    } catch (error) {
      this.error(`${absoluteDir} does not exist or is not a directory`);
    }

    const files = (await readdir(absoluteDir))
      .map((file) => path.join(absoluteDir, file))
      .filter((file) => fs.statSync(file).isFile() && /.*\.pdf$/.test(file));

    if (files.length === 0) {
      process.stderr.write("there is no pdf file\n");
      this.exit();
    }
    process.stderr.write(`${files.length} pdf files found\n`);

    const limit = pLimit(os.cpus().length - 1);
    let dataByType;
    try {
      dataByType = groupByType(
        await Promise.all(files.map((f) => limit(() => extract(f))))
      );
    } catch (e) {
      if (e instanceof ExtractError) {
        this.error(e.message);
      }
      this.exit(1);
    }

    // TODO: 仮の出力
    if (dataByType.foreignStockDividend.length > 0) {
      console.log("\n外国株式等配当金\n");
      ForeignStockDividend.renderCsv(dataByType.foreignStockDividend);
    }
    if (dataByType.foreignStockTrading.length > 0) {
      console.log("\n外国株式等取引報告書\n");
      ForeignStockTrading.renderCsv(dataByType.foreignStockTrading);
    }
    if (dataByType.foreignStockSplit.length > 0) {
      console.log("\n外国株式等 株式分割・権利売却等のご案内\n");
      ForeignStockSplit.renderCsv(dataByType.foreignStockSplit);
    }
  }
}

export = Main;
