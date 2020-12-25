// TODO: Date を使う
export type ForeignStockDividendItem = [
  {
    配当金等支払日: string;
    国内支払日: string;
    現地基準日: string;
    銘柄コード: string;
    銘柄名: string;
    分配通貨: string;
    "外国源泉税率(%)": number;
    "1単位あたり金額": number;
    決済方法: string;
    円貨決済用レート: number | null;
    口座区分: string | null;
    勘定設定年: string | null;
    備考: string | null;
    数量: number;
    配当金等金額: number;
    外国源泉徴収税額: number;
    外国手数料: number;
    "外国精算金額(外貨)": number;
    "外国精算金額(円貨)": number | null;
    "国内源泉徴収税額(外貨)": number;
    "国内源泉徴収税額(円貨)": number | null;
    "国内手数料(外貨)": number;
    "国内手数料(円貨)": number | null;
    "消費税(外貨)": number;
    "消費税(円貨)": number | null;
    "受取金額(外貨)": number;
    "受取金額(円貨)": number | null;
  },
  {
    申告レート基準日: string;
    申告レート: number;
    為替レート基準日: string;
    為替レート: number;
    "配当金等金額(円)": number;
    "外国源泉徴収税額(円)": number;
    "国内課税所得額(円)": number;
    "所得税(外貨)": number;
    "所得税(円貨)": number;
    "地方税(外貨)": number;
    "地方税(円貨)": number;
    "国内源泉徴収税額(外貨)": number;
    "国内源泉徴収税額(円貨)": number | null;
  }
];
