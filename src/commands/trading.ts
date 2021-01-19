import { cli } from "cli-ux";

import {
  ForeignStockTrading,
  ForeignStockTradingItem,
} from "./../e-deliveries/foreign-stock-trading";
import { Base } from "../base";

export default class Trading extends Base<ForeignStockTradingItem> {
  static description = "外国株式等取引報告書から表データを抽出する";

  static flags = {
    ...Base.flags,
  };

  static args = [...Base.args];

  async extractItems(tables: unknown[]): Promise<ForeignStockTradingItem[]> {
    let items: ForeignStockTradingItem[] = [];
    if (ForeignStockTrading.isTables(tables)) {
      items = ForeignStockTrading.extractFromTables(tables);
      cli.debug(`抽出データセット数: ${items.length} / ${tables.length}`);
      if (tables.length > items.length) {
        cli.error("抽出データセット数が不足しています");
      }
    }
    return items;
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Trading);
    const files = await this.findFiles(args.path);
    const items = await this.batchExtract(files);

    if (flags.json) {
      cli.styledJSON(items);
    } else {
      cli.styledHeader("外国株式等取引報告書");
      ForeignStockTrading.renderCsv(items);
    }
  }
}
