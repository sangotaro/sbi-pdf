# sbi-pdf

SBI 証券の電子交付書面からデータ抽出する

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

# Usage

<!-- usage -->

```sh-session
$ npm install -g sbi-pdf
$ sbi-pdf COMMAND
running command...
$ sbi-pdf (-v|--version|version)
sbi-pdf/0.0.0 darwin-x64 node-v14.15.4
$ sbi-pdf --help [COMMAND]
USAGE
  $ sbi-pdf COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`sbi-pdf [PATH]`](#sbi-pdf-path)
- [`sbi-pdf help [COMMAND]`](#sbi-pdf-help-command)

## `sbi-pdf [PATH]`

extract table data from sbi electronic delivery document

```
USAGE
  $ sbi-pdf [PATH]

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version
  --json         output in json format
```

_See code: [src/commands/index.ts](https://github.com/sangotaro/sbi-pdf/blob/v0.0.0/src/commands/index.ts)_

## `sbi-pdf help [COMMAND]`

display help for sbi-pdf

```
USAGE
  $ sbi-pdf help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

<!-- commandsstop -->

# Requirements

- Java: [tabula-java](https://github.com/tabulapdf/tabula-java) を実行している
