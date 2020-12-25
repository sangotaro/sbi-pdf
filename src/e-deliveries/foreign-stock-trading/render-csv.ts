import { ForeignStockTradingData } from "./types";

export function renderCsv(
  foreignStockTrading: ForeignStockTradingData[]
): void {
  // header
  const data = foreignStockTrading[0];
  if (data) {
    console.log([...Object.keys(data)].join(","));
  }
  // values
  foreignStockTrading.forEach((data) => {
    console.log([...Object.values(data)].join(","));
  });
}
