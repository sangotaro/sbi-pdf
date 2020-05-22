# sbi-pdf

SBI証券の電子交付書面からデータ抽出する

## 対応電子交付

- 取引報告書
  - [ ] 外国株式等取引報告書
- 取引残高報告書
  - [ ] 取引残高報告書
  - [ ] 外貨建商品取引残高報告書
- 年間取引報告書
  - [ ] 特定口座年間取引報告書
- 運用報告書
- その他
  - [x] 外国株式等配当金等のご案内（兼）支払通知書
  - [ ] 外貨建ＭＭＦ再投資のご案内（兼）支払通知書
  - [ ] 譲渡益税徴収・還付のお知らせ

## Requirements

- Java: [tabula-java](https://github.com/tabulapdf/tabula-java) を実行している

## Run

```
npm i --no-save

# Node.js v14
node --experimental-specifier-resolution=node --loader ts-node/esm.mjs src/index.ts --dir=[pdf-dir]
```


