import { cli } from "cli-ux";

import { ForeignStockTradingItem } from "./types";

export function renderCsv(
  foreignStockTradingItems: ForeignStockTradingItem[]
): void {
  // header
  const item = foreignStockTradingItems[0];
  if (item) {
    cli.log([...Object.keys(item)].join(","));
  }
  // values
  foreignStockTradingItems.forEach((item) => {
    cli.log([...Object.values(item)].join(","));
  });
}
