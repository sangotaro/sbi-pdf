# sbi-pdf

========

SBI 証券の電子交付書面からデータ抽出する

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mynewcli.svg)](https://npmjs.org/package/mynewcli)
[![Downloads/week](https://img.shields.io/npm/dw/mynewcli.svg)](https://npmjs.org/package/mynewcli)
[![License](https://img.shields.io/npm/l/mynewcli.svg)](https://github.com/sangotaro/mynewcli/blob/master/package.json)

[![codecov](https://codecov.io/gh/sangotaro/sbi-pdf/branch/master/graph/badge.svg?token=GMETK1D3WI)](https://codecov.io/gh/sangotaro/sbi-pdf)

## 対応書面

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
  - [x] 外国株式等株式分割・権利売却等のご案内（※株式分割のみ確認）

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

<!-- usagestop -->

# Commands

<!-- commands -->

<!-- commandsstop -->

# Development

## Requirements

- Java: [tabula-java](https://github.com/tabulapdf/tabula-java) を実行している

## Build

```
npm i --no-save
npm run build
```

## Run

```
./bin/run --dir=[pdf-dir]
```
