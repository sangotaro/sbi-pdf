import { ForeignStockTradingItem } from "./types";

export function renderCsv(
  foreignStockTradingItems: ForeignStockTradingItem[]
): void {
  // header
  const item = foreignStockTradingItems[0];
  if (item) {
    console.log([...Object.keys(item)].join(","));
  }
  // values
  foreignStockTradingItems.forEach((item) => {
    console.log([...Object.values(item)].join(","));
  });
}
