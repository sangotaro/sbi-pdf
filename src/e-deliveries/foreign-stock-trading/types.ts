// TODO: Date を使う
export type ForeignStockTradingItem = {
  国内約定年月日: string;
  現地約定年月日: string;
  国内受渡年月日: string;
  現地受渡年月日: string;
  銘柄コード: string;
  銘柄名: string;
  取引の種類: string;
  取引通貨: string;
  売買: string;
  決済方法: string;
  "自己・委託": string;
  為替レート: number;
  市場: string;
  口座区分: string;
  約定数量: number;
  約定価格: number;
  約定金額: number;
  現地手数料等: number;
  "現地精算金額(外貨)": number;
  "現地精算金額(円貨)": number;
  "国内手数料(外貨)": number;
  "国内手数料(円貨)": number;
  "消費税(外貨)": number;
  "消費税(円貨)": number;
  "受渡金額(外貨)": number; // TODO: 円貨決済の場合は null になる?
  "受渡金額(円貨)": number | null;
  備考: string | null;
};
