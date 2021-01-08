import fs from "fs";
import os from "os";
import { isAbsolute, join } from "path";
import { promisify } from "util";

import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import expandTilde from "expand-tilde";
import pLimit from "p-limit";

import { ForeignStockDividend } from "../e-deliveries/foreign-stock-dividend";
import { ForeignStockSplit } from "../e-deliveries/foreign-stock-split";
import { ForeignStockTrading } from "../e-deliveries/foreign-stock-trading";
import { ExtractError, extract } from "../extract";
import { groupByType } from "../group-by-type";

const readdir = promisify(fs.readdir);

export default class Main extends Command {
  static description =
    "extract table data from sbi electronic delivery document";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    json: flags.boolean({ description: "output in json format" }),
  };

  static args = [{ name: "path", default: "." }];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async run() {
    const { args, flags } = this.parse(Main);
    const path = expandTilde(args.path);
    const absolutePath = isAbsolute(path) ? path : join(process.cwd(), path);

    if (!fs.existsSync(absolutePath)) {
      this.error(`${absolutePath} does not exist`);
    }

    let files: string[] = [];
    if (fs.statSync(absolutePath).isDirectory()) {
      files = (await readdir(absolutePath))
        .map((file) => join(absolutePath, file))
        .filter((file) => fs.statSync(file).isFile() && /.*\.pdf$/.test(file));
    } else if (/.*\.pdf$/.test(path)) {
      files = [path];
    }

    if (files.length === 0) {
      this.warn("there is no pdf file");
      this.exit();
    }
    this.debug(`${files.length} pdf files found`);

    const limit = pLimit(os.cpus().length - 1);
    let dataByType;
    try {
      dataByType = groupByType(
        await Promise.all(files.map((f) => limit(() => extract(f))))
      );
    } catch (e) {
      if (e instanceof ExtractError) {
        this.error(`${e.name}: ${e.message}`);
      }
      this.exit(1);
    }

    if (flags.json) {
      cli.styledJSON(dataByType);
    } else {
      // TODO: 仮の出力
      if (dataByType.foreignStockDividend.length > 0) {
        cli.styledHeader("外国株式等配当金");
        ForeignStockDividend.renderCsv(dataByType.foreignStockDividend);
      }
      if (dataByType.foreignStockTrading.length > 0) {
        cli.styledHeader("外国株式等取引報告書");
        ForeignStockTrading.renderCsv(dataByType.foreignStockTrading);
      }
      if (dataByType.foreignStockSplit.length > 0) {
        cli.styledHeader("外国株式等 株式分割・権利売却等のご案内");
        ForeignStockSplit.renderCsv(dataByType.foreignStockSplit);
      }
    }
  }
}
