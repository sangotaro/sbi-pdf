import childProcess from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const exec = promisify(childProcess.exec);
const readdir = promisify(fs.readdir);

const dirname = path.dirname(new URL(import.meta.url).pathname);

// 文字列内に半角スペースが入ることがある
function purifyInt(str: string): string {
  return str.trim().replace(",", "").replace(/\s+/g, "");
}

// 文字列内に半角スペースが入ることがある
function purifyFloat(str: string): string {
  return str.trim().replace(",", "").replace(/\s+/g, "");
}

const TABLE1_HEADERS = [
  "配当金等支払日",
  "国内支払日",
  "現地基準日",
  "銘柄コード",
  "銘柄名",
  "分配通貨",
  "外国源泉税率(%)",
  "1単位あたり金額",
  "決済方法",
  "円貨決済用レート",
  "口座区分",
  "勘定設定年",
  "備考",
  "数量",
  "配当金等金額",
  "外国源泉徴収税額",
  "外国手数料",
  "外国精算金額(外貨)",
  "外国精算金額(円貨)",
  "国内源泉徴収税額(外貨)",
  "国内源泉徴収税額(円貨)",
  "国内手数料(外貨)",
  "国内手数料(円貨)",
  "消費税(外貨)",
  "消費税(円貨)",
  "受取金額(外貨)",
  "受取金額(円貨)",
];

const TABLE2_HEADERS = [
  "申告レート基準日",
  "申告レート",
  "為替レート基準日",
  "為替レート",
  "配当金等金額(円)",
  "外国源泉徴収税額(円)",
  "国内課税所得額(円)",
  "所得税(外貨)",
  "所得税(円貨)",
  "地方税(外貨)",
  "地方税(円貨)",
  "国内源泉徴収税額(外貨)",
  "国内源泉徴収税額(円貨)",
];

async function extractTableData(pdfFile: string) {
  const jar = path.join(
    dirname,
    "../lib/tabula-1.0.3-jar-with-dependencies.jar"
  );
  const { stdout } = await exec(
    `java -jar ${jar} -g -l -f JSON -p all ${pdfFile}`
  );
  const tables = JSON.parse(stdout);

  console.log(`PDF (${pdfFile}) 内のテーブル数: ${tables.length}`);
  if (tables.length % 2 !== 0) {
    console.error("テーブル数は偶数を想定しています");
    process.exit(1);
  }

  // TODO: バリデーション

  // 2つ1組のグループにする
  const groups = (tables as any[]).reduce((result, table: any) => {
    const lastIndex = result.length - 1;
    if (!result[lastIndex] || result[lastIndex].length === 0) {
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

(async () => {
  const dir = process.argv[2]; // TODO: yargs

  // TODO: validate dir

  const absoluteDir = path.isAbsolute(dir)
    ? dir
    : path.join(process.cwd(), dir);
  const files = (await readdir(absoluteDir))
    .map((file) => path.join(absoluteDir, file))
    .filter((file) => fs.statSync(file).isFile() && /.*\.pdf$/.test(file));

  console.log("PDF: ", files);

  // render csv
  const results = await Promise.all(files.map((f) => extractTableData(f)));
  console.log("\n--- RENDER CSV ---\n");
  console.log([...TABLE1_HEADERS, ...TABLE2_HEADERS].join(","));
  results.forEach((groups) => {
    groups.forEach((group: any[]) => {
      const [table1, table2] = group;
      console.log(
        [
          ...TABLE1_HEADERS.map((h) => table1[h]),
          ...TABLE2_HEADERS.map((h) => table2[h]),
        ].join(",")
      );
    });
  });
})();
