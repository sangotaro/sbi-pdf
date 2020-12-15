import { extractFromRawTables } from "./extract-from-raw-tables";
import { isRawTables } from "./is-raw-tables";
import { renderCsv } from "./render-csv";

export type { ForeignStockDividendData } from "./types";
export const ForeignStockDividend = {
  isRawTables,
  extractFromRawTables,
  renderCsv,
};
