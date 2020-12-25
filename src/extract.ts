import {
  ForeignStockDividend,
  ForeignStockDividendData,
} from "./e-deliveries/foreign-stock-dividend";
import {
  ForeignStockTrading,
  ForeignStockTradingData,
} from "./e-deliveries/foreign-stock-trading";
import { tabula } from "./tabula";
import { BaseError } from "./utils/error";

export class ExtractError extends BaseError {}

type Result =
  | {
      type: "foreign_stock_dividend";
      data: ForeignStockDividendData[];
    }
  | {
      type: "foreign_stock_trading";
      data: ForeignStockTradingData[];
    }
  | {
      type: "unknown";
    };

export async function extract(pdfFile: string): Promise<Result> {
  let result;
  try {
    result = await tabula(`-g -l -f JSON -p all ${pdfFile}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  const tables = JSON.parse(result);
  console.log(`PDF (${pdfFile}) 内のテーブル数: ${tables.length}`);

  if (ForeignStockDividend.isTables(tables)) {
    const data = await ForeignStockDividend.extractFromTables(tables);
    console.log(
      `=> ForeignStockDividend 抽出データセット数: ${data.length} / ${
        tables.length / 2
      }`
    );
    if (data.length > tables.length) {
      throw new ExtractError(
        `ForeignStockDividend: 抽出データセット数が不足しています`
      );
    }
    return {
      type: "foreign_stock_dividend",
      data,
    };
  } else if (ForeignStockTrading.isTables(tables)) {
    const data = await ForeignStockTrading.extractFromTables(tables);
    console.log(
      `=> ForeignStockTrading 抽出データセット数: ${data.length} / ${tables.length}`
    );
    if (data.length > tables.length) {
      throw new ExtractError(
        `ForeignStockTrading: 抽出データセット数が不足しています`
      );
    }
    return {
      type: "foreign_stock_trading",
      data,
    };
  }
  console.warn("=> 不明なファイル");
  return { type: "unknown" };
}
