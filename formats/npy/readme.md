The file type npy are made using Python's np.save command or np.savez.

```python
import numpy as np

# Create some example NumPy arrays
array1 = np.array([1, 2, 3, 4, 5])
array2 = np.arange(10, 20).reshape(2, 5)
array3 = np.random.rand(3, 3)

# Specify the filename for the NPZ file
npz_filename = 'my_data.npz'

# Save the arrays to the NPZ file using keyword arguments to assign names
np.savez_compressed(npz_filename, data_array1=array1, another_array=array2, random_matrix=array3)

print(f"Arrays saved to '{npz_filename}' successfully.")
```

This plugin allows reading these files directly.  Note only double, integer, and long (8-byte int) types are supported.
