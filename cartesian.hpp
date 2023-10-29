#pragma once

#include <vector>

template <typename T, typename Consumer>
void cartesianProduct(const std::vector<std::vector<T>> &arrays,
                      Consumer consumer) {
  std::vector<int> currentIdx(arrays.size(), 0);
  std::vector<T> current(arrays.size());

  while (true) {
    // consume the current combination
    for (size_t i = 0; i < arrays.size(); ++i) {
      current[i] = arrays[i][currentIdx[i]];
    }
    consumer(current);

    // Increment the rightmost index, size_t will overflow below 0
    size_t index = arrays.size() - 1;
    while (index < arrays.size()) {
      currentIdx[index]++;

      if (currentIdx[index] < arrays[index].size()) {
        break;
      } else {
        currentIdx[index] = 0;
        index--;
      }
    }

    // If the leftmost index reaches its maximum, we are done
    if (index >= arrays.size()) {
      break;
    }
  }
}