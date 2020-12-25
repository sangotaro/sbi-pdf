import { purifyFloat } from "../../utils/raw-table/purify-float";
import { purifyInt } from "../../utils/raw-table/purify-int";
import { Table } from "./schema";
import { ForeignStockTradingItem } from "./types";

export function extractFromTables(tables: Table[]): ForeignStockTradingItem[] {
  return tables.map((table) => ({
    国内約定年月日: table.data[2][0].text,
    現地約定年月日: table.data[3][0].text,
    国内受渡年月日: table.data[2][1].text,
    現地受渡年月日: table.data[3][1].text,
    銘柄コード: table.data[2][2].text,
    銘柄名: table.data[3][2].text,
    取引の種類: table.data[2][3].text,
    取引通貨: table.data[3][3].text,
    売買: table.data[2][4].text,
    決済方法: table.data[3][4].text,
    "自己・委託": table.data[2][5].text,
    為替レート: purifyFloat(table.data[3][5].text),
    市場: table.data[2][6].text,
    口座区分: table.data[3][6].text,
    約定数量: purifyInt(table.data[6][0].text),
    約定価格: purifyFloat(table.data[6][1].text),
    約定金額: purifyFloat(table.data[6][2].text),
    現地手数料等: purifyFloat(table.data[6][3].text),
    "現地精算金額(外貨)": purifyFloat(table.data[6][5].text),
    "現地精算金額(円貨)": purifyInt(table.data[7][1].text),
    "国内手数料(外貨)": purifyFloat(table.data[6][6].text),
    "国内手数料(円貨)": purifyInt(table.data[7][2].text),
    "消費税(外貨)": purifyFloat(table.data[6][7].text),
    "消費税(円貨)": purifyInt(table.data[7][3].text),
    "受渡金額(外貨)": purifyFloat(table.data[6][8].text), // TODO: nullable ?
    "受渡金額(円貨)":
      table.data[7][4].text === "" ? null : purifyInt(table.data[7][4].text),
    備考: table.data[6][9].text === "" ? null : table.data[6][9].text,
  }));
}
