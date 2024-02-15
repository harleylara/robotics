import numpy as np
import matplotlib.pyplot as plt

N = 30

x = np.linspace(0,1, num=N)
ground_truth = np.sin(2*np.pi*x)
t = np.sin(2*np.pi*x) + np.random.normal(scale=0.2, size=N)

# this variables are just for ploting
# the function with better resolution

plt.scatter(x, t, label="synthetic data")
plt.scatter(x, ground_truth, label="ground truth")
plt.plot(x, ground_truth, color="gray", linestyle='dashed')
plt.legend()
plt.show()
