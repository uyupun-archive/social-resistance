import os
import pathlib
import json
import matplotlib.pyplot as plt
import japanize_matplotlib

file_path = pathlib.Path(os.getcwd() + '/word2vec.json')
json_file = open(file_path, 'r')
json_data = json.load(json_file)

# word1 = json_data[100]

i = 0
while i < 100:
    plt.plot(json_data[i]['x'], json_data[i]['y'], ms=5.0, zorder=2, marker='x', color='r')
    plt.annotate(json_data[i]['word'], (json_data[i]['x'], json_data[i]['y']), size=7)
    i += 1

plt.show()