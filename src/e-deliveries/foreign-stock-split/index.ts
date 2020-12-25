import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";
import { renderCsv } from "./render-csv";

export type { ForeignStockSplitItem } from "./types";
export const ForeignStockSplit = {
  extractFromTables,
  isTables,
  renderCsv,
};
