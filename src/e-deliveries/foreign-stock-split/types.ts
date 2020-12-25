// TODO: Date を使う
export type ForeignStockSplitItem = [
  {
    国内支払日: string | null;
    国内入出庫日: string;
    銘柄コード: string;
    銘柄名: string;
    現地基準日: string;
    権利の内容: string;
    取引通貨: string;
    権利対象数量: number;
    "保有数:割当数": string;
    割当数量: number;
    取引単位数: number;
  },
  {
    銘柄コード: string;
    銘柄名: string;
    入出庫区分: string;
    口座区分: string;
    権利対象数量: number;
    割当数量: number;
    入出庫数量: number;
    備考: string | null;
  }
];
