# SOCIAL RESISTANCE

[![Actions Status: Deploy](https://github.com/uyupun/social-resistance/workflows/Deploy/badge.svg)](https://github.com/uyupun/social-resistance/actions?query=workflow%3A"Deploy")

<img src="https://mitsu.uyupun.tech/images/logo/logo_black.png" width="200px">

**death is not a go home**

### モック（Figma）

- [v1](https://www.figma.com/file/SYnE52gQISHkQLZV9NPJG1/Social-Resistance?node-id=0%3A1)
- [v2](https://www.figma.com/file/SYnE52gQISHkQLZV9NPJG1/Social-Resistance?node-id=192%3A574)
- [v3](https://www.figma.com/file/SYnE52gQISHkQLZV9NPJG1/Social-Resistance?node-id=428%3A2)

### 環境構築

```bash
# 環境構築
$ make setup
# 開発環境のサーバの起動
# localhost:3000
$ make up
# 本番環境のサーバの起動(バックグラウンド)
$ make prod-up
# 本番環境のサーバの停止
$ make prod-down
# ESLint/Prettier/stylelintに怒られたとき
$ make fix
# git commit（Commitizen）の実行
$ make c
# バンドルファイルの分析
$ make analyze
```
