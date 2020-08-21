# Social Resistance

**STAY HOME**

### ドキュメント

|||
|:--|:--|
|モック(Figma)|https://www.figma.com/file/SYnE52gQISHkQLZV9NPJG1/Social-Resistance?node-id=1%3A2|
|text8コーパス(日本語版)|https://github.com/Hironsan/ja.text8|

### 環境構築(フロントエンド)

```bash
$ yarn
$ yarn dev
```

### 環境構築(Word2vec)

```bash
# Python3とPipenvがインストールされている前提です
$ cd word2vec
$ make setup
```

### Word2vecのテスト

単語の分散表現(200次元)、類似度が近い単語トップ10、２単語間の類似度の測定をテストできます。

```bash
$ pipenv run python3 test.py <word1> <word2>
```