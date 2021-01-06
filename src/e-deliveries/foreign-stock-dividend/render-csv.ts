import { ForeignStockDividendItem } from "./types";

export function renderCsv(
  foreignStockDividendItems: ForeignStockDividendItem[]
): void {
  // header
  // TODO: ヘッダー名に被りがある
  const item = foreignStockDividendItems[0];
  if (item && item[0] && item[1]) {
    process.stdout.write(
      [...Object.keys(item[0]), ...Object.keys(item[1])].join(",") + "\n"
    );
  }
  // values
  foreignStockDividendItems.forEach((item) => {
    process.stdout.write(
      [...Object.values(item[0]), ...Object.values(item[1])].join(",")
    );
  });
}
