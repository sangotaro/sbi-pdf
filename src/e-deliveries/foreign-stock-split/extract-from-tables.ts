import { purifyInt } from "../../utils/raw-table/purify-int";
import { Table0, Table1 } from "./schema";
import { ForeignStockSplitItem } from "./types";

function fail(message: string): never {
  throw new Error(message);
}

export function extractFromTables(
  tables: (Table0 | Table1)[]
): ForeignStockSplitItem[] {
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
    (group): ForeignStockSplitItem => {
      const [table0, table1] = group;
      return [
        {
          国内支払日:
            table0.data[1][0].text === "" ? null : table0.data[1][0].text,
          国内入出庫日: table0.data[1][1].text,
          銘柄コード: table0.data[1][2].text,
          銘柄名: table0.data[1][3].text,
          現地基準日: table0.data[3][0].text,
          権利の内容: table0.data[3][1].text,
          取引通貨: table0.data[3][2].text,
          権利対象数量: purifyInt(table0.data[3][3].text),
          "保有数:割当数": table0.data[3][4].text,
          割当数量: purifyInt(table0.data[3][5].text),
          取引単位数: purifyInt(table0.data[3][6].text),
        },
        {
          銘柄コード: table1.data[2][0].text,
          銘柄名: table1.data[2][1].text,
          入出庫区分: table1.data[2][2].text,
          口座区分: table1.data[2][3].text,
          権利対象数量: purifyInt(table1.data[2][4].text),
          割当数量: purifyInt(table1.data[2][5].text),
          入出庫数量: purifyInt(table1.data[2][6].text),
          備考: table1.data[2][7].text,
        },
      ];
    }
  );
}
