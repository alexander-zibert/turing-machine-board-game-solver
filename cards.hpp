#pragma once

#include <cstdint>
#include <vector>

#include "verifier.hpp"

using card_t = std::vector<verifier_t>;

// card 2
const auto blue_less_than_three = verifier_t{
    "blue_less_than_three", [](const code_t &code) { return code[0] < 3; }};
const auto blue_equal_to_three = verifier_t{
    "blue_equal_to_three", [](const code_t &code) { return code[0] == 3; }};
const auto blue_greater_than_three = verifier_t{
    "blue_greater_than_three", [](const code_t &code) { return code[0] > 3; }};
const auto c2 =
    card_t{blue_less_than_three, blue_equal_to_three, blue_greater_than_three};

// card 4
const auto yellow_less_than_four = verifier_t{
    "yellow_less_than_four", [](const code_t &code) { return code[1] < 4; }};
const auto yellow_equal_to_four = verifier_t{
    "yellow_equal_to_four", [](const code_t &code) { return code[1] == 4; }};
const auto yellow_greater_than_four = verifier_t{
    "yellow_greater_than_four", [](const code_t &code) { return code[1] > 4; }};
const auto c4 = card_t{yellow_less_than_four, yellow_equal_to_four,
                       yellow_greater_than_four};

// card 7
const auto purple_is_even = verifier_t{
    "purple_is_even", [](const code_t &code) { return code[2] % 2 == 0; }};
const auto purple_is_odd = verifier_t{
    "purple_is_odd", [](const code_t &code) { return code[2] % 2 != 0; }};
const auto c7 = card_t{purple_is_even, purple_is_odd};

// card 8
const auto count_number = [](const code_t &code, uint8_t number) {
  auto result = 0;
  for (const auto el : code) {
    if (el == number) {
      result += 1;
    }
  }
  return result;
};

const auto zero_ones = verifier_t{
    "zero_ones", [](const code_t &code) { return count_number(code, 1) == 0; }};
const auto one_one = verifier_t{
    "one_one", [](const code_t &code) { return count_number(code, 1) == 1; }};
const auto two_ones = verifier_t{
    "two_ones", [](const code_t &code) { return count_number(code, 1) == 2; }};
const auto three_ones = verifier_t{"three_ones", [](const code_t &code) {
                                     return count_number(code, 1) == 3;
                                   }};
const auto c8 = card_t{zero_ones, one_one, two_ones, three_ones};

// card 12
const auto blue_less_than_purple =
    verifier_t{"blue_less_than_purple",
               [](const code_t &code) { return code[0] < code[2]; }};
const auto blue_equal_to_purple =
    verifier_t{"blue_equal_to_purple",
               [](const code_t &code) { return code[0] == code[2]; }};
const auto blue_greater_than_purple =
    verifier_t{"blue_greater_than_purple",
               [](const code_t &code) { return code[0] > code[2]; }};
const auto c12 = card_t{blue_less_than_purple, blue_equal_to_purple,
                        blue_greater_than_purple};

// card 15
const auto blue_largest =
    verifier_t{"blue_largest", [](const code_t &code) {
                 return code[0] > code[1] && code[0] > code[2];
               }};
const auto yellow_largest =
    verifier_t{"yellow_largest", [](const code_t &code) {
                 return code[1] > code[0] && code[1] > code[2];
               }};
const auto purple_largest =
    verifier_t{"purple_largest", [](const code_t &code) {
                 return code[2] > code[0] && code[2] > code[1];
               }};
const auto c15 = card_t{blue_largest, yellow_largest, purple_largest};

// card 16
const auto even_greater_odd_verifier_factory = [](const code_t &code) {
  auto numEven = 0;
  for (auto elem : code) {
    if (elem % 2 == 0) {
      numEven += 1;
    }
  }
  return numEven >= std::ceil(code.size() / 2.0);
};
const auto even_greater_odd =
    verifier_t{"even_greater_odd", even_greater_odd_verifier_factory};
const auto odd_greater_even =
    verifier_t{"odd_greater_even", [](const code_t &code) {
                 return !even_greater_odd_verifier_factory(code);
               }};
const auto c16 = card_t{even_greater_odd, odd_greater_even};

// card 22
const auto three_asc =
    verifier_t{"three_asc", [](const code_t &code) {
                 return code[0] < code[1] && code[1] < code[2];
               }};
const auto three_desc =
    verifier_t{"three_desc", [](const code_t &code) {
                 return code[0] > code[1] && code[1] > code[2];
               }};
const auto no_three_asc_desc =
    verifier_t{"no_three_asc_desc", [](const code_t &code) {
                 return !three_asc.isValid(code) && !three_desc.isValid(code);
               }};
const auto c22 = card_t{three_asc, three_desc, no_three_asc_desc};

// card 23
const auto sum = [](const code_t &code) {
  auto res = 0;
  for (const auto el : code) {
    res += el;
  }
  return res;
};

const auto sum_less_than_six = verifier_t{
    "sum_less_than_six", [](const code_t &code) { return sum(code) < 6; }};
const auto sum_equal_to_six = verifier_t{
    "sum_equal_to_six", [](const code_t &code) { return sum(code) == 6; }};
const auto sum_greater_than_six = verifier_t{
    "sum_greater_than_six", [](const code_t &code) { return sum(code) > 6; }};
const auto c23 =
    card_t{sum_less_than_six, sum_equal_to_six, sum_greater_than_six};

// card 24
const auto three_consecutive_asc =
    verifier_t{"three_consecutive_asc", [](const code_t &code) {
                 return (code[1] == code[0] + 1) && (code[2] == code[1] + 1);
               }};
const auto two_consecutive_asc =
    verifier_t{"two_consecutive_asc", [](const code_t &code) {
                 return (code[1] == code[0] + 1) ^ (code[2] == code[1] + 1);
               }};
const auto no_consecutive_asc =
    verifier_t{"no_consecutive_asc", [](const code_t &code) {
                 return (code[1] != code[0] + 1) && (code[2] != code[1] + 1);
               }};
const auto c24 =
    card_t{three_consecutive_asc, two_consecutive_asc, no_consecutive_asc};

// card 33
const auto blue_is_even = verifier_t{
    "blue_is_even", [](const code_t &code) { return code[0] % 2 == 0; }};
const auto blue_is_odd = verifier_t{
    "blue_is_odd", [](const code_t &code) { return code[0] % 2 != 0; }};
const auto yellow_is_even = verifier_t{
    "yellow_is_even", [](const code_t &code) { return code[1] % 2 == 0; }};
const auto yellow_is_odd = verifier_t{
    "yellow_is_odd", [](const code_t &code) { return code[1] % 2 != 0; }};
const auto c33 = card_t{
    blue_is_even,  blue_is_odd,    yellow_is_even,
    yellow_is_odd, purple_is_even, purple_is_odd,
};

// card 35
const auto blue_largest_or_equal =
    verifier_t{"blue_largest_or_equal", [](const code_t &code) {
                 return code[0] >= code[1] && code[0] >= code[2];
               }};
const auto yellow_largest_or_equal =
    verifier_t{"yellow_largest_or_equal", [](const code_t &code) {
                 return code[1] >= code[0] && code[1] >= code[2];
               }};
const auto purple_largest_or_equal =
    verifier_t{"purple_largest_or_equal", [](const code_t &code) {
                 return code[2] >= code[0] && code[2] >= code[1];
               }};
const auto c35 = card_t{blue_largest_or_equal, yellow_largest_or_equal,
                        purple_largest_or_equal};

// card 45
const auto zero_threes = verifier_t{"zero_threes", [](const code_t &code) {
                                      return count_number(code, 3) == 0;
                                    }};
const auto one_three = verifier_t{
    "one_three", [](const code_t &code) { return count_number(code, 3) == 1; }};
const auto two_threes = verifier_t{"two_threes", [](const code_t &code) {
                                     return count_number(code, 3) == 2;
                                   }};
const auto c45 =
    card_t{zero_ones, one_one, two_ones, zero_threes, one_three, two_threes};

// card 48
const auto blue_less_than_yellow =
    verifier_t{"blue_less_than_yellow",
               [](const code_t &code) { return code[0] < code[1]; }};
const auto blue_equal_to_yellow =
    verifier_t{"blue_equal_to_yellow",
               [](const code_t &code) { return code[0] == code[1]; }};
const auto blue_greater_than_yellow =
    verifier_t{"blue_greater_than_yellow",
               [](const code_t &code) { return code[0] > code[1]; }};

const auto yellow_less_than_purple =
    verifier_t{"yellow_less_than_purple",
               [](const code_t &code) { return code[1] < code[2]; }};
const auto yellow_equal_to_purple =
    verifier_t{"yellow_equal_to_purple",
               [](const code_t &code) { return code[1] == code[2]; }};
const auto yellow_greater_than_purple =
    verifier_t{"yellow_greater_than_purple",
               [](const code_t &code) { return code[1] > code[2]; }};

const auto c48 = card_t{blue_less_than_yellow,     blue_equal_to_yellow,
                        blue_greater_than_yellow,  blue_less_than_purple,
                        blue_equal_to_purple,      blue_greater_than_purple,
                        yellow_less_than_purple,   yellow_equal_to_purple,
                        yellow_greater_than_purple};

// card XX
const auto v = verifier_t{"", [](const code_t &code) { return true; }};

const auto all_cards = []() {
  auto result = std::vector<card_t>{49};
  result[2] = c2;
  result[7] = c7;
  result[8] = c8;
  result[12] = c12;
  result[15] = c15;
  result[16] = c16;
  result[22] = c22;
  result[23] = c23;
  result[24] = c24;
  result[33] = c33;
  result[35] = c35;
  result[45] = c45;
  result[48] = c48;
  return result;
}();
