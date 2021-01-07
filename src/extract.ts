import { cli } from "cli-ux";

import {
  ForeignStockDividend,
  ForeignStockDividendItem,
} from "./e-deliveries/foreign-stock-dividend";
import {
  ForeignStockSplit,
  ForeignStockSplitItem,
} from "./e-deliveries/foreign-stock-split";
import {
  ForeignStockTrading,
  ForeignStockTradingItem,
} from "./e-deliveries/foreign-stock-trading";
import { tabula } from "./tabula";
import { BaseError } from "./utils/error";

export class ExtractError extends BaseError {}

type Result =
  | {
      type: "foreign_stock_dividend";
      items: ForeignStockDividendItem[];
    }
  | {
      type: "foreign_stock_trading";
      items: ForeignStockTradingItem[];
    }
  | {
      type: "foreign_stock_split";
      items: ForeignStockSplitItem[];
    }
  | {
      type: "unknown";
    };

export async function extract(pdfFile: string): Promise<Result> {
  let result;
  try {
    result = await tabula(`-g -l -f JSON -p all ${pdfFile}`);
  } catch (e) {
    throw new ExtractError(`tabula failed`);
  }
  const tables = JSON.parse(result);
  cli.debug(`PDF (${pdfFile}) 内のテーブル数: ${tables.length}`);

  if (ForeignStockDividend.isTables(tables)) {
    const items = await ForeignStockDividend.extractFromTables(tables);
    cli.debug(
      `=> ForeignStockDividend 抽出データセット数: ${items.length} / ${
        tables.length / 2
      }`
    );
    if (items.length > tables.length) {
      throw new ExtractError(
        `ForeignStockDividend: 抽出データセット数が不足しています`
      );
    }
    return {
      type: "foreign_stock_dividend",
      items,
    };
  } else if (ForeignStockTrading.isTables(tables)) {
    const items = await ForeignStockTrading.extractFromTables(tables);
    cli.debug(
      `=> ForeignStockTrading 抽出データセット数: ${items.length} / ${tables.length}`
    );
    if (items.length > tables.length) {
      throw new ExtractError(
        `ForeignStockTrading: 抽出データセット数が不足しています`
      );
    }
    return {
      type: "foreign_stock_trading",
      items,
    };
  } else if (ForeignStockSplit.isTables(tables)) {
    const items = await ForeignStockSplit.extractFromTables(tables);
    cli.debug(
      `=> ForeignStockSplit 抽出データセット数: ${items.length} / ${
        tables.length / 2
      }`
    );
    if (items.length > tables.length) {
      throw new ExtractError(
        `ForeignStockSplit: 抽出データセット数が不足しています`
      );
    }
    return {
      type: "foreign_stock_split",
      items,
    };
  }
  cli.debug("=> 不明なファイル");
  return { type: "unknown" };
}
