import { ForeignStockTradingItem } from "./types";

export function renderCsv(
  foreignStockTradingItems: ForeignStockTradingItem[]
): void {
  // header
  const item = foreignStockTradingItems[0];
  if (item) {
    process.stdout.write([...Object.keys(item)].join(",") + "\n");
  }
  // values
  foreignStockTradingItems.forEach((item) => {
    process.stdout.write([...Object.values(item)].join(","));
  });
}
