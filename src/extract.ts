import childProcess from "child_process";
import path from "path";
import { promisify } from "util";

import {
  ForeignStockDividend,
  ForeignStockDividendData,
} from "./files/foreign-stock-dividend";
import {
  ForeignStockTransaction,
  ForeignStockTransactionData,
} from "./files/foreign-stock-transaction";

const dirname = __dirname;
const exec = promisify(childProcess.exec);

type Result =
  | {
      type: "foreign_stock_dividend";
      data: ForeignStockDividendData[];
    }
  | {
      type: "foreign_stock_transaction";
      data: ForeignStockTransactionData[];
    }
  | {
      type: "unknown";
    };

export async function extract(pdfFile: string): Promise<Result> {
  const jar = path.join(
    dirname,
    "../lib/tabula-1.0.4-jar-with-dependencies.jar"
  );
  const { stdout } = await exec(
    `java -jar ${jar} -g -l -f JSON -p all ${pdfFile}`
  );
  const tables = JSON.parse(stdout);
  console.log(`PDF (${pdfFile}) 内のテーブル数: ${tables.length}`);

  // TODO: ファイルに対して想定しているデータ数が抽出できているか確認する

  if (ForeignStockDividend.isRawTables(tables)) {
    const data = await ForeignStockDividend.extractFromRawTables(tables);
    console.log(
      `=> ForeignStockDividend 抽出データセット数: ${data.length} / ${
        tables.length / 2
      }`
    );
    return {
      type: "foreign_stock_dividend",
      data,
    };
  } else if (ForeignStockTransaction.isTables(tables)) {
    const data = await ForeignStockTransaction.extractFromTables(tables);
    console.log(
      `=> ForeignStockTransaction 抽出データセット数: ${data.length} / ${tables.length}`
    );
    console.log(data);
    return {
      type: "foreign_stock_transaction",
      data,
    };
  }
  console.warn("=> 不明なファイル");
  return { type: "unknown" };
}
