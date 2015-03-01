import json
import random
#from sklearn.manifold import TSNE
from tsne import bh_sne
from numpy.random import rand
from sklearn.preprocessing import MinMaxScaler, StandardScaler, Normalizer
from time import time
import numpy as np
import csv
from sklearn.metrics.pairwise import pairwise_distances
import math
import os

start_time = time()
n_samples = 20000

f = open("../data/budauth.csv", 'r')
csv_file = csv.reader(f)

isHeader = True
X_list = []
word_list = []
dot_sizes = []
for line in csv_file:
  if not isHeader:
    entries = line
    #print "length: %d" % len(entries)
    word_entry = "%s: %s ($%s,000)" % (entries[8], entries[5], entries[52])
    word_list.append(word_entry)
    stringVector = entries[12:]
    #print stringVector
    v = [float(entry.replace(',','')) for entry in stringVector]
    X_list.append(v)
    dot_size = float(entries[52].replace(',',''))
    clipped_dot_size = dot_size if dot_size > 0 else 0
    dot_sizes.append(math.sqrt(clipped_dot_size))
  else:
    print line[52]
  isHeader = False
  
dot_sizes = Normalizer().fit_transform(np.array([dot_sizes]))[0,:]*0.45

wordmap = {}
print "formatting data..."
for i in range(0, len(word_list)):
  key = word_list[i]
  dot_size = dot_sizes[i]
  wordmap[key] = {"x": 0, "y": 0, "dotSize" : dot_size}
  
f = open('budgetFadeaway_raw.json', 'w')
json.dump(wordmap, f)
f.close()

os.system("node packRectangles.js")

end_time = time()
duration = float(end_time - start_time) / 60
print "Duration: %f minutes." % duration