import { PromiseType } from "utility-types";

import { ForeignStockDividendData } from "./e-deliveries/foreign-stock-dividend";
import { ForeignStockTradingData } from "./e-deliveries/foreign-stock-trading/types";
import type { extract } from "./extract";

type Result = {
  foreignStockDividend: ForeignStockDividendData[];
  foreignStockTrading: ForeignStockTradingData[];
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
            ...result.data,
          ],
        };
      } else if (result.type === "foreign_stock_trading") {
        return {
          ...accumulator,
          foreignStockTrading: [
            ...accumulator.foreignStockTrading,
            ...result.data,
          ],
        };
      }
      return accumulator;
    },
    { foreignStockDividend: [], foreignStockTrading: [] }
  );
}
