import os from "os";

import { flags } from "@oclif/command";
import { cli } from "cli-ux";
import pLimit from "p-limit";

import { Base } from "../base";
import { ForeignStockDividend } from "../e-deliveries/foreign-stock-dividend";
import { ForeignStockSplit } from "../e-deliveries/foreign-stock-split";
import { ForeignStockTrading } from "../e-deliveries/foreign-stock-trading";
import { ExtractError, extract } from "../extract";
import { groupByType } from "../group-by-type";

export default class Main extends Base<unknown> {
  static description =
    "extract table data from sbi electronic delivery document";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    json: flags.boolean({ description: "output in json format" }),
  };

  static args = [{ name: "path", default: "." }];

  // dummy method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async extractItems(tables: unknown[]): Promise<unknown[]> {
    return [];
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Main);
    const files = await this.findFiles(args.path);
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
