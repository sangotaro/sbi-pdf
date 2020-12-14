import Ajv from "ajv";

import { purifyFloat } from "../../utils/raw-table/purify-float";
import { purifyInt } from "../../utils/raw-table/purify-int";
import { schema } from "./schema";

export type ForeignStockDividendData = [
  {
    配当金等支払日: string;
    国内支払日: string;
    現地基準日: string;
    銘柄コード: string;
    銘柄名: string;
    分配通貨: string;
    "外国源泉税率(%)": string;
    "1単位あたり金額": string;
    決済方法: string;
    円貨決済用レート: string;
    口座区分: string;
    勘定設定年: string;
    備考: string;
    数量: string;
    配当金等金額: string;
    外国源泉徴収税額: string;
    外国手数料: string;
    "外国精算金額(外貨)": string;
    "外国精算金額(円貨)": string;
    "国内源泉徴収税額(外貨)": string;
    "国内源泉徴収税額(円貨)": string;
    "国内手数料(外貨)": string;
    "国内手数料(円貨)": string;
    "消費税(外貨)": string;
    "消費税(円貨)": string;
    "受取金額(外貨)": string;
    "受取金額(円貨)": string;
  },
  {
    申告レート基準日: string;
    申告レート: string;
    為替レート基準日: string;
    為替レート: string;
    "配当金等金額(円)": string;
    "外国源泉徴収税額(円)": string;
    "国内課税所得額(円)": string;
    "所得税(外貨)": string;
    "所得税(円貨)": string;
    "地方税(外貨)": string;
    "地方税(円貨)": string;
    "国内源泉徴収税額(外貨)": string;
    "国内源泉徴収税額(円貨)": string;
  }
];

function isRawTables(tables: unknown): boolean {
  if (!Array.isArray(tables)) {
    return false;
  }
  if (tables.length % 2 !== 0) {
    return false;
  }
  const ajv = new Ajv();
  for (const [index, table] of tables.entries()) {
    const validate = ajv.compile(
      index % 2 === 0 ? schema.table0 : schema.table1
    );
    const valid = validate(table.data);
    if (!valid) {
      return false;
    }
  }
  return true;
}

// TODO: any やめる
function extract(tables: any[]): ForeignStockDividendData[] {
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

  return groups.map((group: any[]) => {
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
        "外国源泉税率(%)": purifyFloat(table1.data[3][1].text),
        "1単位あたり金額": purifyFloat(table1.data[3][2].text),
        決済方法: table1.data[3][3].text,
        円貨決済用レート: purifyFloat(table1.data[3][4].text),
        口座区分: table1.data[3][5].text,
        勘定設定年: table1.data[3][6].text,
        備考: table1.data[3][7].text,
        数量: purifyInt(table1.data[5][0].text),
        配当金等金額: purifyFloat(table1.data[5][1].text),
        外国源泉徴収税額: purifyFloat(table1.data[5][2].text),
        外国手数料: purifyFloat(table1.data[5][3].text),
        "外国精算金額(外貨)": purifyFloat(table1.data[5][5].text),
        "外国精算金額(円貨)": purifyInt(table1.data[6][1].text),
        "国内源泉徴収税額(外貨)": purifyFloat(table1.data[5][6].text),
        "国内源泉徴収税額(円貨)": purifyInt(table1.data[6][2].text),
        "国内手数料(外貨)": purifyFloat(table1.data[5][7].text),
        "国内手数料(円貨)": purifyInt(table1.data[6][3].text),
        "消費税(外貨)": purifyFloat(table1.data[5][8].text),
        "消費税(円貨)": purifyInt(table1.data[6][4].text),
        "受取金額(外貨)": purifyFloat(table1.data[5][9].text),
        "受取金額(円貨)": purifyInt(table1.data[6][5].text),
      },
      {
        申告レート基準日: table2.data[2][0].text,
        申告レート: purifyFloat(table2.data[2][1].text),
        為替レート基準日: table2.data[3][0].text,
        為替レート: purifyFloat(table2.data[3][1].text),
        "配当金等金額(円)": purifyInt(table2.data[2][2].text),
        "外国源泉徴収税額(円)": purifyInt(table2.data[2][3].text),
        "国内課税所得額(円)": purifyInt(table2.data[2][4].text),
        "所得税(外貨)": purifyFloat(table2.data[2][6].text),
        "所得税(円貨)": purifyInt(table2.data[3][3].text),
        "地方税(外貨)": purifyFloat(table2.data[2][7].text),
        "地方税(円貨)": purifyInt(table2.data[3][4].text),
        "国内源泉徴収税額(外貨)": purifyFloat(table2.data[2][8].text),
        "国内源泉徴収税額(円貨)": purifyInt(table2.data[3][5].text),
      },
    ];
  });
}

function renderCsv(foreignStockDividend: ForeignStockDividendData[]): void {
  // header
  const data = foreignStockDividend[0];
  if (data && data[0] && data[1]) {
    console.log([...Object.keys(data[0]), ...Object.keys(data[1])].join(","));
  }
  // values
  foreignStockDividend.forEach((data) => {
    console.log(
      [...Object.values(data[0]), ...Object.values(data[1])].join(",")
    );
  });
}

export const ForeignStockDividend = {
  isRawTables,
  extract,
  renderCsv,
};
