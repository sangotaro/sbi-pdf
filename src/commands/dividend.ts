import { cli } from "cli-ux";

import { Base } from "../base";
import {
  ForeignStockDividend,
  ForeignStockDividendItem,
} from "../e-deliveries/foreign-stock-dividend";

export default class Dividend extends Base<ForeignStockDividendItem> {
  static description =
    "外国株式等配当金等のご案内（兼）支払通知書から表データを抽出する";

  static flags = {
    ...Base.flags,
  };

  static args = [...Base.args];

  async extractItems(tables: unknown[]): Promise<ForeignStockDividendItem[]> {
    let items: ForeignStockDividendItem[] = [];
    if (ForeignStockDividend.isTables(tables)) {
      items = ForeignStockDividend.extractFromTables(tables);
      const expectedItems = tables.length / 2;
      cli.debug(`抽出データセット数: ${items.length} / ${tables.length / 2}`);
      if (expectedItems > items.length) {
        cli.error("抽出データセット数が不足しています");
      }
    }
    return items;
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(Dividend);
    const files = await this.findFiles(args.path);
    const items = await this.batchExtract(files);

    if (flags.json) {
      cli.styledJSON(items);
    } else {
      cli.styledHeader("外国株式等配当金等のご案内（兼）支払通知書");
      ForeignStockDividend.renderCsv(items);
    }
  }
}
