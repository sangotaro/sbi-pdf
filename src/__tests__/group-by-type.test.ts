import assert from "assert";

import { ForeignStockDividendItem } from "../e-deliveries/foreign-stock-dividend";
import { ForeignStockTradingItem } from "../e-deliveries/foreign-stock-trading";
import { groupByType } from "../group-by-type";

const foreignStockDividendItem: ForeignStockDividendItem = [
  {
    配当金等支払日: "",
    国内支払日: "",
    現地基準日: "",
    銘柄コード: "",
    銘柄名: "",
    分配通貨: "",
    "外国源泉税率(%)": 0,
    "1単位あたり金額": 0,
    決済方法: "",
    円貨決済用レート: 0,
    口座区分: "",
    勘定設定年: "",
    備考: "",
    数量: 0,
    配当金等金額: 0,
    外国源泉徴収税額: 0,
    外国手数料: 0,
    "外国精算金額(外貨)": 0,
    "外国精算金額(円貨)": 0,
    "国内源泉徴収税額(外貨)": 0,
    "国内源泉徴収税額(円貨)": 0,
    "国内手数料(外貨)": 0,
    "国内手数料(円貨)": 0,
    "消費税(外貨)": 0,
    "消費税(円貨)": 0,
    "受取金額(外貨)": 0,
    "受取金額(円貨)": 0,
  },
  {
    申告レート基準日: "",
    申告レート: 0,
    為替レート基準日: "",
    為替レート: 0,
    "配当金等金額(円)": 0,
    "外国源泉徴収税額(円)": 0,
    "国内課税所得額(円)": 0,
    "所得税(外貨)": 0,
    "所得税(円貨)": 0,
    "地方税(外貨)": 0,
    "地方税(円貨)": 0,
    "国内源泉徴収税額(外貨)": 0,
    "国内源泉徴収税額(円貨)": 0,
  },
];

const foreignStockTradingItem: ForeignStockTradingItem = {
  国内約定年月日: "",
  現地約定年月日: "",
  国内受渡年月日: "",
  現地受渡年月日: "",
  銘柄コード: "",
  銘柄名: "",
  取引の種類: "",
  取引通貨: "",
  売買: "",
  決済方法: "",
  "自己・委託": "",
  為替レート: 0,
  市場: "",
  口座区分: "",
  約定数量: 0,
  約定価格: 0,
  約定金額: 0,
  現地手数料等: 0,
  "現地精算金額(外貨)": 0,
  "現地精算金額(円貨)": 0,
  "国内手数料(外貨)": 0,
  "国内手数料(円貨)": 0,
  "消費税(外貨)": 0,
  "消費税(円貨)": 0,
  "受渡金額(外貨)": 0,
  "受渡金額(円貨)": 0,
  備考: "",
};

describe("groupByType", () => {
  test("各データが type ごとに分類される", async () => {
    const result = groupByType([
      {
        type: "foreign_stock_dividend",
        items: [foreignStockDividendItem, foreignStockDividendItem],
      },
      { type: "unknown" },
      { type: "foreign_stock_trading", items: [foreignStockTradingItem] },
    ]);
    assert.strictEqual(result.foreignStockDividend.length, 2);
    assert.strictEqual(result.foreignStockTrading.length, 1);
  });
});
