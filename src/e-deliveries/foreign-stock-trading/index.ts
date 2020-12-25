import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";
import { renderCsv } from "./render-csv";

export type { ForeignStockTradingItem } from "./types";
export const ForeignStockTrading = {
  extractFromTables,
  isTables,
  renderCsv,
};
