import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";
import { renderCsv } from "./render-csv";

export type { ForeignStockTradingData } from "./types";
export const ForeignStockTrading = {
  extractFromTables,
  isTables,
  renderCsv,
};
