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

start_time = time()
n_samples = 20000
#wordlist = ["word-%d" % i for i in range(n_samples)]
#print "creating random samples..."
#X_raw = rand(n_samples,250)

f = open("../data/budauth.csv", 'r')
csv_file = csv.reader(f)

isHeader = True
X_list = []
word_list = []
dot_sizes = []
for line in csv_file:
  if not isHeader:
    #entries = line.strip().split(',')
    entries = line
    #print "length: %d" % len(entries)
    word_entry = "%s ($%s,000)" % (entries[5], entries[52])
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
"""
X_raw = pairwise_distances(StandardScaler().fit_transform(np.array(X_list[:n_samples])), metric='correlation')

print "transforming data to two dimensions..."
X_2d = bh_sne(X_raw)
X_scaled = MinMaxScaler().fit_transform(X_2d)
#X_scaled = X_2d
"""

wordmap = {}
print "formatting data..."
for i in range(0, len(word_list)):
  #x = X_scaled[i][0]
  #y = X_scaled[i][1]
  key = word_list[i]
  dot_size = dot_sizes[i]
  wordmap[key] = {"x": 0, "y": 0, "dotSize" : dot_size}
  
f = open('wordGalaxy_raw.json', 'w')
json.dump(wordmap, f)
f.close()

end_time = time()
duration = float(end_time - start_time) / 60
print "Duration: %f minutes." % duration