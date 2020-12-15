import childProcess from "child_process";
import path from "path";
import { promisify } from "util";

import { ForeignStockDividend } from "./files/foreign-stock-dividend";
import type { ForeignStockDividendData } from "./files/foreign-stock-dividend";

const dirname = path.dirname(new URL(import.meta.url).pathname);
const exec = promisify(childProcess.exec);

type Result =
  | {
      type: "foreign_stock_dividend";
      data: ForeignStockDividendData[];
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
    return {
      type: "foreign_stock_dividend",
      data: await ForeignStockDividend.extractFromRawTables(tables),
    };
  }
  return { type: "unknown" };
}
