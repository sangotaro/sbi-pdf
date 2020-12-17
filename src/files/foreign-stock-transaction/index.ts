import { extractFromTables } from "./extract-from-tables";
import { isTables } from "./is-tables";

export type { ForeignStockTransactionData } from "./types";
export const ForeignStockTransaction = {
  extractFromTables,
  isTables,
};
