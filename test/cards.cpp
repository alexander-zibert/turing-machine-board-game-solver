#include "../cards.hpp"
#include "doctest.h"
#include <string>

TEST_CASE("c2") {
  CHECK(blue_less_than_three.isValid({1, 2, 3}) == true);
  CHECK(blue_less_than_three.isValid({3, 2, 3}) == false);
  CHECK(blue_less_than_three.isValid({4, 2, 3}) == false);

  CHECK(blue_equal_to_three.isValid({1, 2, 3}) == false);
  CHECK(blue_equal_to_three.isValid({3, 2, 3}) == true);
  CHECK(blue_equal_to_three.isValid({4, 2, 3}) == false);

  CHECK(blue_greater_than_three.isValid({1, 2, 3}) == false);
  CHECK(blue_greater_than_three.isValid({3, 2, 3}) == false);
  CHECK(blue_greater_than_three.isValid({4, 2, 3}) == true);
}

TEST_CASE("c16") {
  CHECK(even_greater_odd.isValid({2, 2, 2}) == true);
  CHECK(even_greater_odd.isValid({2, 1, 2}) == true);
  CHECK(even_greater_odd.isValid({2, 1, 3}) == false);
  CHECK(even_greater_odd.isValid({5, 1, 3}) == false);

  CHECK(odd_greater_even.isValid({2, 2, 2}) == false);
  CHECK(odd_greater_even.isValid({2, 1, 2}) == false);
  CHECK(odd_greater_even.isValid({2, 1, 3}) == true);
  CHECK(odd_greater_even.isValid({5, 1, 3}) == true);
}

TEST_CASE("c23") {
  CHECK(sum_less_than_six.isValid({1, 2, 2}) == true);
  CHECK(sum_less_than_six.isValid({2, 2, 2}) == false);
  CHECK(sum_less_than_six.isValid({2, 2, 3}) == false);

  CHECK(sum_equal_to_six.isValid({1, 2, 2}) == false);
  CHECK(sum_equal_to_six.isValid({2, 2, 2}) == true);
  CHECK(sum_equal_to_six.isValid({2, 2, 3}) == false);

  CHECK(sum_greater_than_six.isValid({1, 2, 2}) == false);
  CHECK(sum_greater_than_six.isValid({2, 2, 2}) == false);
  CHECK(sum_greater_than_six.isValid({2, 2, 3}) == true);
}

TEST_CASE("c24") {
  CHECK(three_consecutive_asc.isValid({1, 2, 3}) == true);
  CHECK(three_consecutive_asc.isValid({1, 2, 4}) == false);
  CHECK(three_consecutive_asc.isValid({1, 3, 5}) == false);
  CHECK(three_consecutive_asc.isValid({5, 3, 4}) == false);
  CHECK(three_consecutive_asc.isValid({3, 2, 1}) == false);

  CHECK(two_consecutive_asc.isValid({1, 2, 3}) == false);
  CHECK(two_consecutive_asc.isValid({1, 2, 4}) == true);
  CHECK(two_consecutive_asc.isValid({1, 3, 5}) == false);
  CHECK(two_consecutive_asc.isValid({5, 3, 4}) == true);
  CHECK(two_consecutive_asc.isValid({3, 2, 1}) == false);

  CHECK(no_consecutive_asc.isValid({1, 2, 3}) == false);
  CHECK(no_consecutive_asc.isValid({1, 2, 4}) == false);
  CHECK(no_consecutive_asc.isValid({1, 3, 5}) == true);
  CHECK(no_consecutive_asc.isValid({5, 3, 4}) == false);
  CHECK(no_consecutive_asc.isValid({3, 2, 1}) == true);
}