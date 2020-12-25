import { ForeignStockSplitItem } from "./types";

export function renderCsv(items: ForeignStockSplitItem[]): void {
  // header
  // TODO: ヘッダー名に被りがある
  const item = items[0];
  if (item && item[0] && item[1]) {
    console.log([...Object.keys(item[0]), ...Object.keys(item[1])].join(","));
  }
  // values
  items.forEach((item) => {
    console.log(
      [...Object.values(item[0]), ...Object.values(item[1])].join(",")
    );
  });
}
