f = open("corpus")

words = f.read().split()
print(len(words))
print(len(set(words)))