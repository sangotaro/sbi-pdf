import { ForeignStockDividendData } from "./types";

export function renderCsv(
  foreignStockDividend: ForeignStockDividendData[]
): void {
  // header
  const data = foreignStockDividend[0];
  if (data && data[0] && data[1]) {
    console.log([...Object.keys(data[0]), ...Object.keys(data[1])].join(","));
  }
  // values
  foreignStockDividend.forEach((data) => {
    console.log(
      [...Object.values(data[0]), ...Object.values(data[1])].join(",")
    );
  });
}
