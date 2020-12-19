import { purifyFloatString } from "../../utils/raw-table/purify-float";
import { purifyIntString } from "../../utils/raw-table/purify-int";
import { ForeignStockDividendData } from "./types";

// TODO: any やめる
export function extractFromTables(tables: any[]): ForeignStockDividendData[] {
  // 2つ1組のグループにする
  const groups = (tables as any[]).reduce((result, table: any) => {
    const lastIndex = result.length - 1;
    if (!result[lastIndex] || result[lastIndex].length === 2) {
      result.push([table]);
    } else {
      result[lastIndex].push(table);
    }
    return result;
  }, [] as any[][]);

  return groups.map(
    (group: any[]): ForeignStockDividendData => {
      const [table1, table2] = group;

      // TODO: ドル前提になってる
      return [
        {
          配当金等支払日: table1.data[1][0].text,
          国内支払日: table1.data[1][1].text,
          現地基準日: table1.data[1][2].text,
          銘柄コード: table1.data[1][3].text,
          銘柄名: table1.data[1][4].text,
          分配通貨: table1.data[3][0].text,
          "外国源泉税率(%)": purifyFloatString(table1.data[3][1].text),
          "1単位あたり金額": purifyFloatString(table1.data[3][2].text),
          決済方法: table1.data[3][3].text,
          円貨決済用レート: purifyFloatString(table1.data[3][4].text), // TODO: nullable ?
          口座区分: table1.data[3][5].text,
          勘定設定年: table1.data[3][6].text,
          備考: table1.data[3][7].text, // TODO: nullable ?
          数量: purifyIntString(table1.data[5][0].text),
          配当金等金額: purifyFloatString(table1.data[5][1].text),
          外国源泉徴収税額: purifyFloatString(table1.data[5][2].text),
          外国手数料: purifyFloatString(table1.data[5][3].text),
          "外国精算金額(外貨)": purifyFloatString(table1.data[5][5].text), // TODO: nullable ?
          "外国精算金額(円貨)": purifyIntString(table1.data[6][1].text), // TODO: nullable ?
          "国内源泉徴収税額(外貨)": purifyFloatString(table1.data[5][6].text), // TODO: nullable ?
          "国内源泉徴収税額(円貨)": purifyIntString(table1.data[6][2].text), // TODO: nullable ?
          "国内手数料(外貨)": purifyFloatString(table1.data[5][7].text), // TODO: nullable ?
          "国内手数料(円貨)": purifyIntString(table1.data[6][3].text), // TODO: nullable ?
          "消費税(外貨)": purifyFloatString(table1.data[5][8].text), // TODO: nullable ?
          "消費税(円貨)": purifyIntString(table1.data[6][4].text), // TODO: nullable ?
          "受取金額(外貨)": purifyFloatString(table1.data[5][9].text), // TODO: nullable ?
          "受取金額(円貨)": purifyIntString(table1.data[6][5].text), // TODO: nullable ?
        },
        {
          申告レート基準日: table2.data[2][0].text,
          申告レート: purifyFloatString(table2.data[2][1].text),
          為替レート基準日: table2.data[3][0].text,
          為替レート: purifyFloatString(table2.data[3][1].text),
          "配当金等金額(円)": purifyIntString(table2.data[2][2].text),
          "外国源泉徴収税額(円)": purifyIntString(table2.data[2][3].text),
          "国内課税所得額(円)": purifyIntString(table2.data[2][4].text),
          "所得税(外貨)": purifyFloatString(table2.data[2][6].text),
          "所得税(円貨)": purifyIntString(table2.data[3][3].text),
          "地方税(外貨)": purifyFloatString(table2.data[2][7].text),
          "地方税(円貨)": purifyIntString(table2.data[3][4].text),
          "国内源泉徴収税額(外貨)": purifyFloatString(table2.data[2][8].text), // TODO: nullable ?
          "国内源泉徴収税額(円貨)": purifyIntString(table2.data[3][5].text), // TODO: nullable
        },
      ];
    }
  );
}