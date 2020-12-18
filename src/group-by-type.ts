import { ExtractResult } from "./extract";
import { ForeignStockDividendData } from "./files/foreign-stock-dividend";
import { ForeignStockTradingData } from "./files/foreign-stock-trading/types";

type Result = {
  foreignStockDividend: ForeignStockDividendData[];
  foreignStockTrading: ForeignStockTradingData[];
};

export function groupByType(results: ExtractResult[]): Result {
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
