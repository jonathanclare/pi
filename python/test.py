
# Sanity Check
print('--- System Paths ---')
import sys
print('\n'.join(sys.path))

a, b = 0, 1
while b < 1000:
     print(b, end=',')
     a, b = b, a+b
