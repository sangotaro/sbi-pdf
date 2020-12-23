# sbi-pdf

[![codecov](https://codecov.io/gh/sangotaro/sbi-pdf/branch/master/graph/badge.svg?token=GMETK1D3WI)](https://codecov.io/gh/sangotaro/sbi-pdf)

SBI 証券の電子交付書面からデータ抽出する

## 対応電子交付

- 取引報告書
  - [x] 外国株式等取引報告書
  - [ ] 外貨建 MMF 取引報告書（兼）支払通知書
  - [ ] 汎用累投売買報告書
- 取引残高報告書
  - [ ] 取引残高報告書
  - [ ] 外貨建商品取引残高報告書
- 年間取引報告書
  - [ ] 特定口座年間取引報告書
- 運用報告書
- その他
  - [x] 外国株式等配当金等のご案内（兼）支払通知書
  - [ ] 外貨建 MMF 再投資のご案内（兼）支払通知書
  - [ ] 譲渡益税徴収・還付のお知らせ
  - [ ] 外国株式等株式分割・権利売却等のご案内

## Requirements

- Java: [tabula-java](https://github.com/tabulapdf/tabula-java) を実行している

## Build

```
npm i --no-save

npm run build
```

## Run

```
npx ts-node src/index --dir=[pdf-dir]

# transpile-only
npx ts-node --transpile-only src/index --dir=[pdf-dir]
```
