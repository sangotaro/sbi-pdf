import { cli } from "cli-ux";

import { ForeignStockDividendItem } from "./types";

export function renderCsv(
  foreignStockDividendItems: ForeignStockDividendItem[]
): void {
  // header
  // TODO: ヘッダー名に被りがある
  const item = foreignStockDividendItems[0];
  if (item && item[0] && item[1]) {
    cli.log([...Object.keys(item[0]), ...Object.keys(item[1])].join(","));
  }
  // values
  foreignStockDividendItems.forEach((item) => {
    cli.log([...Object.values(item[0]), ...Object.values(item[1])].join(","));
  });
}
