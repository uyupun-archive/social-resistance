# PCA(主成分分析)
# 200次元のベクトルを2次元に圧縮する

from gensim.models import word2vec
from sklearn.decomposition import PCA

import os
import pathlib
import json
import re

# ゴミデータの除去
def isGarbageWord(word):
    # 半角数字の除去
    if re.compile('[0-9]+').fullmatch(word):
        return True
    # 全角数字の除去
    if re.compile('[０-９]+').fullmatch(word):
        return True
    # ひらがなのみで構成される単語の除去
    if re.compile('[\u3041-\u309F]+').fullmatch(word) and len(word):
        return True
    # 全角カタカナ１文字の除去
    if re.compile('[\u30A1-\u30FF]+').fullmatch(word) and len(word):
        return True
    # 半角カタカナのみで構成される単語の除去
    if re.compile('[\uFF66-\uFF9F]+').fullmatch(word):
        return True
    # 半角記号
    if re.compile('[\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+').match(word):
        return True
    # 全角記号
    if re.compile('[\u3000-\u303F\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFF9E-\uFFEE]+').match(word):
        return True
    return False

model = word2vec.Word2Vec.load('./model')
words = model.wv.index2word

# PCAするための前準備
vectors =[]
names = []
for word in words:
    if not isGarbageWord(word):
        vectors.append(model[word])
        names.append(word)

# PCA
pca = PCA(n_components=2)
pca.fit(vectors)
vectors = pca.transform(vectors)

# JSONに書き込める形式に変換
i = 0
json_data = []
while i < len(vectors):
    json_data.append({ 'word': names[i], 'move': { 'x': vectors[i][0], 'y': vectors[i][1] }})
    i += 1

# JSONファイルに書き込み
file_path = pathlib.Path(os.getcwd() + '/word2vec.json')
if not file_path.exists():
    file_path.touch()
json_file = open(file_path, 'w')
json.dump(json_data, json_file, indent=2, ensure_ascii=False)
