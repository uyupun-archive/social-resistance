from gensim.models import KeyedVectors

import sys

wv = KeyedVectors.load_word2vec_format('./model', binary=True)
results = wv.most_similar(positive=[sys.argv[1]])
for result in results:
    print(result)