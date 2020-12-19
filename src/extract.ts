import childProcess from "child_process";
import path from "path";
import { promisify } from "util";

import {
  ForeignStockDividend,
  ForeignStockDividendData,
} from "./files/foreign-stock-dividend";
import {
  ForeignStockTrading,
  ForeignStockTradingData,
} from "./files/foreign-stock-trading";
import { BaseError } from "./utils/error";

const dirname = __dirname;
const exec = promisify(childProcess.exec);

export class ExtractError extends BaseError {}

export type ExtractResult =
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

export async function extract(pdfFile: string): Promise<ExtractResult> {
  const jar = path.join(
    dirname,
    "../lib/tabula-1.0.4-jar-with-dependencies.jar"
  );
  const { stdout } = await exec(
    `java -jar ${jar} -g -l -f JSON -p all ${pdfFile}`
  );
  const tables = JSON.parse(stdout);
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
