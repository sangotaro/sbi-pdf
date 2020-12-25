import { PromiseType } from "utility-types";

import { ForeignStockDividendItem } from "./e-deliveries/foreign-stock-dividend";
import { ForeignStockTradingItem } from "./e-deliveries/foreign-stock-trading/types";
import type { extract } from "./extract";

type Result = {
  foreignStockDividend: ForeignStockDividendItem[];
  foreignStockTrading: ForeignStockTradingItem[];
};

export function groupByType(
  results: PromiseType<ReturnType<typeof extract>>[]
): Result {
  return results.reduce<Result>(
    (accumulator, result) => {
      if (result.type === "foreign_stock_dividend") {
        return {
          ...accumulator,
          foreignStockDividend: [
            ...accumulator.foreignStockDividend,
            ...result.items,
          ],
        };
      } else if (result.type === "foreign_stock_trading") {
        return {
          ...accumulator,
          foreignStockTrading: [
            ...accumulator.foreignStockTrading,
            ...result.items,
          ],
        };
      }
      return accumulator;
    },
    { foreignStockDividend: [], foreignStockTrading: [] }
  );
}
