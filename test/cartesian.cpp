#include "../cartesian.hpp"
#include "doctest.h"
#include <string>

TEST_CASE("testing the cartesianProduct function with ints") {
  auto result = std::vector<std::vector<int>>{};
  cartesianProduct<int>(
      {{1, 2}, {3, 4, 5}},
      [&result](const std::vector<int> &comb) { result.push_back(comb); });
  CHECK(result[0] == std::vector<int>{1, 3});
  CHECK(result[1] == std::vector<int>{1, 4});
  CHECK(result[2] == std::vector<int>{1, 5});
  CHECK(result[3] == std::vector<int>{2, 3});
  CHECK(result[4] == std::vector<int>{2, 4});
  CHECK(result[5] == std::vector<int>{2, 5});
}

TEST_CASE("testing the cartesianProduct function with strings") {
  auto result = std::vector<std::vector<std::string>>{};
  cartesianProduct<std::string>(
      {{"A", "B"}, {"C", "D"}, {"E"}},
      [&result](const std::vector<std::string> &comb) {
        result.push_back(comb);
      });
  CHECK(result[0] == std::vector<std::string>{"A", "C", "E"});
  CHECK(result[1] == std::vector<std::string>{"A", "D", "E"});
  CHECK(result[2] == std::vector<std::string>{"B", "C", "E"});
  CHECK(result[3] == std::vector<std::string>{"B", "D", "E"});
}

TEST_CASE("testing an empty list") {
  auto result = std::vector<std::vector<int>>{};
  cartesianProduct<int>({{1, 2}, {}}, [&result](const std::vector<int> &comb) {
    result.push_back(comb);
  });
  CHECK(result.size() == 0);
}