from gensim.models import KeyedVectors

import sys

model = KeyedVectors.load_word2vec_format('./model', binary=True)

word1 = sys.argv[1] if len(sys.argv) > 1 else None
word2 = sys.argv[2] if len(sys.argv) > 2 else None

if word1:
    print("Vector(200 dimension):")
    print(model.wv[word1])
    print()

    print("Most similar(top 10):")
    words = model.most_similar(positive=word1)
    for word in words:
        print(word)

print('----------------------------------------')

if word2:
    print("Vector(200 dimension):")
    print(model.wv[word2])
    print()

    print("Most similar(top 10):")
    words = model.most_similar(positive=word2)
    for word in words:
        print(word)

print('----------------------------------------')

if word1 and word2:
    print("Similarity(2 words):")
    similarity = model.wv.similarity(w1=word1, w2=word2)
    print(similarity)