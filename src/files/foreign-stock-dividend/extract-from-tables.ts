import { purifyFloat } from "../../utils/raw-table/purify-float";
import { purifyInt } from "../../utils/raw-table/purify-int";
import { Table0, Table1 } from "./schema";
import { ForeignStockDividendData } from "./types";

function fail(message: string): never {
  throw new Error(message);
}

export function extractFromTables(
  tables: (Table0 | Table1)[]
): ForeignStockDividendData[] {
  // 2つ1組のグループにする
  const { groups } = tables.reduce<{
    groups: [Table0, Table1][];
    tmp: [] | [Table0];
  }>(
    ({ groups, tmp }, table) => {
      if (tmp.length === 0) {
        // TODO: as やめたい
        return { groups, tmp: [table as Table0] };
      } else if (tmp.length === 1) {
        // TODO: as やめたい
        return { groups: [...groups, [tmp[0], table as Table1]], tmp: [] };
      }
      return fail("Something failed");
    },
    { groups: [], tmp: [] }
  );

  return groups.map(
    (group): ForeignStockDividendData => {
      const [table0, table1] = group;
      return [
        {
          配当金等支払日: table0.data[1][0].text,
          国内支払日: table0.data[1][1].text,
          現地基準日: table0.data[1][2].text,
          銘柄コード: table0.data[1][3].text,
          銘柄名: table0.data[1][4].text,
          分配通貨: table0.data[3][0].text,
          "外国源泉税率(%)": purifyFloat(table0.data[3][1].text),
          "1単位あたり金額": purifyFloat(table0.data[3][2].text),
          決済方法: table0.data[3][3].text,
          円貨決済用レート:
            table0.data[3][4].text === ""
              ? null
              : purifyFloat(table0.data[3][4].text),
          口座区分:
            table0.data[3][5].text === "" ? null : table0.data[3][5].text,
          勘定設定年:
            table0.data[3][6].text === "" ? null : table0.data[3][6].text,
          備考: table0.data[3][7].text === "" ? null : table0.data[3][7].text,
          数量: purifyInt(table0.data[5][0].text),
          配当金等金額: purifyFloat(table0.data[5][1].text),
          外国源泉徴収税額: purifyFloat(table0.data[5][2].text),
          外国手数料: purifyFloat(table0.data[5][3].text),
          "外国精算金額(外貨)": purifyFloat(table0.data[5][5].text), // TODO: nullable ?
          "外国精算金額(円貨)":
            table0.data[6][1].text === ""
              ? null
              : purifyInt(table0.data[6][1].text),
          "国内源泉徴収税額(外貨)": purifyFloat(table0.data[5][6].text), // TODO: nullable ?
          "国内源泉徴収税額(円貨)":
            table0.data[6][2].text === ""
              ? null
              : purifyInt(table0.data[6][2].text),
          "国内手数料(外貨)": purifyFloat(table0.data[5][7].text), // TODO: nullable ?
          "国内手数料(円貨)":
            table0.data[6][3].text === ""
              ? null
              : purifyInt(table0.data[6][3].text),
          "消費税(外貨)": purifyFloat(table0.data[5][8].text), // TODO: nullable ?
          "消費税(円貨)":
            table0.data[6][4].text === ""
              ? null
              : purifyInt(table0.data[6][4].text),
          "受取金額(外貨)": purifyFloat(table0.data[5][9].text), // TODO: nullable ?
          "受取金額(円貨)":
            table0.data[6][5].text === ""
              ? null
              : purifyInt(table0.data[6][5].text),
        },
        {
          申告レート基準日: table1.data[2][0].text,
          申告レート: purifyFloat(table1.data[2][1].text),
          為替レート基準日: table1.data[3][0].text,
          為替レート: purifyFloat(table1.data[3][1].text),
          "配当金等金額(円)": purifyInt(table1.data[2][2].text),
          "外国源泉徴収税額(円)": purifyInt(table1.data[2][3].text),
          "国内課税所得額(円)": purifyInt(table1.data[2][4].text),
          "所得税(外貨)": purifyFloat(table1.data[2][6].text),
          "所得税(円貨)": purifyInt(table1.data[3][3].text),
          "地方税(外貨)": purifyFloat(table1.data[2][7].text),
          "地方税(円貨)": purifyInt(table1.data[3][4].text),
          "国内源泉徴収税額(外貨)": purifyFloat(table1.data[2][8].text), // TODO: nullable ?
          "国内源泉徴収税額(円貨)":
            table1.data[3][5].text === ""
              ? null
              : purifyInt(table1.data[3][5].text),
        },
      ];
    }
  );
}
