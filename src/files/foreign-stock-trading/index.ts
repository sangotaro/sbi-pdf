import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";

export type { ForeignStockTradingData } from "./types";
export const ForeignStockTrading = {
  extractFromTables,
  isTables,
};
