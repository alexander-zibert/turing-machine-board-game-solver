#include "../solver.hpp"
#include "doctest.h"
#include <algorithm>

TEST_CASE("simple example without deductions should return all codes") {
  const auto codes = possible_codes_from_possible_verifiers(
      {{2}, {5}, {8}, {12}}, {{0, 1, 2}, {0, 1}, {0, 1, 2, 3}, {0, 1, 2}});
  CHECK(codes.size() == 125);
}

TEST_CASE("the card where one color has to be the smallest (card 14) should "
          "constrain the possible codes") {
  const auto codes = possible_codes_from_possible_verifiers(
      {{1}, {2}, {3}, {14}}, {{0, 1}, {0, 1, 2}, {0, 1, 2}, {0, 1, 2}});
  CHECK(codes.size() == 90);
  CHECK(std::find(codes.begin(), codes.end(), "111") == codes.end());
}

TEST_CASE("the card where the sum of all should be divisable by 3,4 or 5 (card "
          "36) should constrain the possible codes") {
  const auto codes = possible_codes_from_possible_verifiers(
      {{1}, {2}, {3}, {36}}, {{0, 1}, {0, 1, 2}, {0, 1, 2}, {0, 1, 2}});
  CHECK(codes.size() == 86);
  CHECK(std::find(codes.begin(), codes.end(), "115") == codes.end());
  CHECK(std::find(codes.begin(), codes.end(), "111") != codes.end());
}

TEST_CASE("deductions should constrain the possible codes") {
  const auto codes = possible_codes_from_possible_verifiers(
      {{2}, {5}, {8}, {12}}, {{0}, {0}, {1}, {1}});
  CHECK(codes.size() == 1);
  CHECK(codes[0] == "212");
}
