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
