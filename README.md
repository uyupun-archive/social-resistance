# SOCIAL RESISTANCE

<img src="./assets/images/logo/logo_black.png" width="200px">

**death is not a go home**

### リンク

|||
|:--|:--|
|モック(Figma)|https://www.figma.com/file/SYnE52gQISHkQLZV9NPJG1/Social-Resistance?node-id=1%3A2|
|text8コーパス(日本語版)|https://github.com/Hironsan/ja.text8|
|デプロイ環境１(独自ドメイン)|https://social-resistance.uyupun.tech|
|デプロイ環境２(Vercel)|https://social-resistance.vercel.app|

### 環境構築(フロントエンド)

```bash
# モジュールのインストール
$ yarn
# 開発用サーバーの立ち上げ
$ yarn dev
# ESLint/Prettierに怒られたとき
$ yarn run lint --fix
```

### 環境構築(Word2vec)

※ ただし学習・整形済みのWord2Vecのデータが `assets/json/word2vec.json` に既にあるのでこちらの環境構築は飛ばしても構いません。  
※ このプロセスは `assets/json/word2vec.json` を新規に作成する場合と、下記のテストを行う場合に必要です。

```bash
# Python3とPipenvがインストールされている前提です
$ cd word2vec
$ make setup
```

### Word2vecのテスト

```bash
# 単語の分散表現(200次元)、類似度が近い単語トップ10、２単語間の類似度の測定をテストできます
$ pipenv run python3 test_word2vec.py <word1> <word2>
# 単語の分散表現(2次元)をグラフに表示する
$ pipenv run python3 test_graph.py
# ベースとなる単語を原点としたときにマイナス方向にある単語をプラス方向に変換するテスト
$ pipenv run python3 test_play.py
```
