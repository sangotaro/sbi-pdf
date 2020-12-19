import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";
import { renderCsv } from "./render-csv";

export type { ForeignStockDividendData } from "./types";
export const ForeignStockDividend = {
  isTables,
  extractFromTables,
  renderCsv,
};
