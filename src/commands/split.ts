import { cli } from "cli-ux";

import {
  ForeignStockSplit,
  ForeignStockSplitItem,
} from "./../e-deliveries/foreign-stock-split";
import { Base } from "../base";

export default class Split extends Base<ForeignStockSplitItem> {
  static description =
    "外国株式等株式分割・権利売却等のご案内から表データを抽出する";

  static flags = {
    ...Base.flags,
  };

  static args = [...Base.args];

  async extractItems(tables: unknown[]): Promise<ForeignStockSplitItem[]> {
    let items: ForeignStockSplitItem[] = [];
    if (ForeignStockSplit.isTables(tables)) {
      items = ForeignStockSplit.extractFromTables(tables);
      const expectedItems = tables.length / 2;
      cli.debug(`抽出データセット数: ${items.length} / ${tables.length / 2}`);
      if (expectedItems > items.length) {
        cli.error("抽出データセット数が不足しています");
      }
    }
    return items;
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Split);
    const files = await this.findFiles(args.path);
    const items = await this.batchExtract(files);

    if (flags.json) {
      cli.styledJSON(items);
    } else {
      cli.styledHeader("外国株式等 株式分割・権利売却等のご案内");
      ForeignStockSplit.renderCsv(items);
    }
  }
}
