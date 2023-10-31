#pragma once

#include <cstdint>
#include <vector>

#include "verifier.hpp"

using card_t = std::vector<verifier_t>;

// card 1
const auto blue_equal_to_one = verifier_t{
    "blue_equal_to_one", [](const code_t &code) { return code[0] == 1; }};
const auto blue_greater_one = verifier_t{
    "blue_greater_one", [](const code_t &code) { return code[0] > 1; }};
const auto c1 = card_t{blue_equal_to_one, blue_greater_one};

// card 2
const auto blue_less_than_three = verifier_t{
    "blue_less_than_three", [](const code_t &code) { return code[0] < 3; }};
const auto blue_equal_to_three = verifier_t{
    "blue_equal_to_three", [](const code_t &code) { return code[0] == 3; }};
const auto blue_greater_than_three = verifier_t{
    "blue_greater_than_three", [](const code_t &code) { return code[0] > 3; }};
const auto c2 =
    card_t{blue_less_than_three, blue_equal_to_three, blue_greater_than_three};

// card 3
const auto yellow_less_than_three = verifier_t{
    "yellow_less_than_three", [](const code_t &code) { return code[1] < 3; }};
const auto yellow_equal_to_three = verifier_t{
    "yellow_equal_to_three", [](const code_t &code) { return code[1] == 3; }};
const auto yellow_greater_than_three =
    verifier_t{"yellow_greater_than_three",
               [](const code_t &code) { return code[1] > 3; }};
const auto c3 = card_t{yellow_less_than_three, yellow_equal_to_three,
                       yellow_greater_than_three};

// card 4
const auto yellow_less_than_four = verifier_t{
    "yellow_less_than_four", [](const code_t &code) { return code[1] < 4; }};
const auto yellow_equal_to_four = verifier_t{
    "yellow_equal_to_four", [](const code_t &code) { return code[1] == 4; }};
const auto yellow_greater_than_four = verifier_t{
    "yellow_greater_than_four", [](const code_t &code) { return code[1] > 4; }};
const auto c4 = card_t{yellow_less_than_four, yellow_equal_to_four,
                       yellow_greater_than_four};

// card 5
const auto blue_is_even = verifier_t{
    "blue_is_even", [](const code_t &code) { return code[0] % 2 == 0; }};
const auto blue_is_odd = verifier_t{
    "blue_is_odd", [](const code_t &code) { return code[0] % 2 != 0; }};
const auto c5 = card_t{blue_is_even, blue_is_odd};

// card 6
const auto yellow_is_even = verifier_t{
    "yellow_is_even", [](const code_t &code) { return code[1] % 2 == 0; }};
const auto yellow_is_odd = verifier_t{
    "yellow_is_odd", [](const code_t &code) { return code[1] % 2 != 0; }};
const auto c6 = card_t{yellow_is_even, yellow_is_odd};

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

// card 9
const auto zero_threes = verifier_t{"zero_threes", [](const code_t &code) {
                                      return count_number(code, 3) == 0;
                                    }};
const auto one_three = verifier_t{
    "one_three", [](const code_t &code) { return count_number(code, 3) == 1; }};
const auto two_threes = verifier_t{"two_threes", [](const code_t &code) {
                                     return count_number(code, 3) == 2;
                                   }};
const auto three_threes = verifier_t{"three_threes", [](const code_t &code) {
                                       return count_number(code, 3) == 3;
                                     }};
const auto c9 = card_t{zero_threes, one_three, two_threes, three_threes};

// card 10
const auto zero_fours = verifier_t{"zero_fours", [](const code_t &code) {
                                     return count_number(code, 4) == 0;
                                   }};
const auto one_four = verifier_t{
    "one_four", [](const code_t &code) { return count_number(code, 4) == 1; }};
const auto two_fours = verifier_t{
    "two_fours", [](const code_t &code) { return count_number(code, 4) == 2; }};
const auto three_fours = verifier_t{"three_fours", [](const code_t &code) {
                                      return count_number(code, 4) == 3;
                                    }};
const auto c10 = card_t{zero_fours, one_four, two_fours, three_fours};

// card 11
const auto blue_less_than_yellow =
    verifier_t{"blue_less_than_yellow",
               [](const code_t &code) { return code[0] < code[1]; }};
const auto blue_equal_to_yellow =
    verifier_t{"blue_equal_to_yellow",
               [](const code_t &code) { return code[0] == code[1]; }};
const auto blue_greater_than_yellow =
    verifier_t{"blue_greater_than_yellow",
               [](const code_t &code) { return code[0] > code[1]; }};
const auto c11 = card_t{blue_less_than_yellow, blue_equal_to_yellow,
                        blue_greater_than_yellow};

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

// card 13
const auto yellow_less_than_purple =
    verifier_t{"yellow_less_than_purple",
               [](const code_t &code) { return code[1] < code[2]; }};
const auto yellow_equal_to_purple =
    verifier_t{"yellow_equal_to_purple",
               [](const code_t &code) { return code[1] == code[2]; }};
const auto yellow_greater_than_purple =
    verifier_t{"yellow_greater_than_purple",
               [](const code_t &code) { return code[1] > code[2]; }};
const auto c13 = card_t{yellow_less_than_purple, yellow_equal_to_purple,
                        yellow_greater_than_purple};

// card 14
const auto blue_smallest =
    verifier_t{"blue_smallest", [](const code_t &code) {
                 return code[0] < code[1] && code[0] < code[2];
               }};
const auto yellow_smallest =
    verifier_t{"yellow_smallest", [](const code_t &code) {
                 return code[1] < code[0] && code[1] < code[2];
               }};
const auto purple_smallest =
    verifier_t{"purple_smallest", [](const code_t &code) {
                 return code[2] < code[0] && code[2] < code[1];
               }};
const auto c14 = card_t{blue_smallest, yellow_smallest, purple_smallest};

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
const auto count_even = [](const code_t &code) {
  auto numEven = 0;
  for (auto elem : code) {
    if (elem % 2 == 0) {
      numEven += 1;
    }
  }
  return numEven;
};
const auto even_greater_odd =
    verifier_t{"even_greater_odd",
               [](const code_t &code) { return count_even(code) >= 2; }};
const auto odd_greater_even =
    verifier_t{"odd_greater_even", [](const code_t &code) {
                 return [](const code_t &code) { return count_even(code) < 2; };
               }};
const auto c16 = card_t{even_greater_odd, odd_greater_even};

// card 17
const auto zero_even = verifier_t{
    "zero_even", [](const code_t &code) { return count_even(code) == 0; }};
const auto one_even = verifier_t{
    "one_even", [](const code_t &code) { return count_even(code) == 1; }};
const auto two_even = verifier_t{
    "two_even", [](const code_t &code) { return count_even(code) == 2; }};
const auto three_even = verifier_t{
    "three_even", [](const code_t &code) { return count_even(code) == 3; }};
const auto c17 = card_t{zero_even, one_even, two_even, three_even};

// card 18
const auto sum = [](const code_t &code) {
  auto res = 0;
  for (const auto el : code) {
    res += el;
  }
  return res;
};
const auto sum_even = verifier_t{
    "sum_even", [](const code_t &code) { return sum(code) % 2 == 0; }};
const auto sum_odd = verifier_t{
    "sum_odd", [](const code_t &code) { return sum(code) % 2 != 0; }};
const auto c18 = card_t{sum_even, sum_odd};

// card 19
const auto blue_plus_yellow_less_than_six =
    verifier_t{"blue_plus_yellow_less_than_six",
               [](const code_t &code) { return code[0] + code[1] < 6; }};
const auto blue_plus_yellow_equal_to_six =
    verifier_t{"blue_plus_yellow_equal_to_six",
               [](const code_t &code) { return code[0] + code[1] == 6; }};
const auto blue_plus_yellow_greater_than_six =
    verifier_t{"blue_plus_yellow_greater_than_six",
               [](const code_t &code) { return code[0] + code[1] > 6; }};
const auto c19 =
    card_t{blue_plus_yellow_less_than_six, blue_plus_yellow_equal_to_six,
           blue_plus_yellow_greater_than_six};

// card 20
const auto triple_digit =
    verifier_t{"triple_digit", [](const code_t &code) {
                 return code[0] == code[1] && code[1] == code[2];
               }};
const auto double_digit = verifier_t{"double_digit", [](const code_t &code) {
                                       return (code[0] == code[1]) ^
                                              (code[0] == code[2]) ^
                                              (code[1] == code[2]);
                                     }};
const auto no_repetition = verifier_t{"no_repetition", [](const code_t &code) {
                                        return (code[0] != code[1]) &&
                                               (code[0] != code[2]) &&
                                               (code[1] != code[2]);
                                      }};
const auto c20 = card_t{triple_digit, double_digit, no_repetition};

// card 21
const auto no_pairs = verifier_t{
    "no_pairs", [](const code_t &code) { return !double_digit.isValid(code); }};
const auto c21 = card_t{no_pairs, double_digit};

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

// card 25
const auto no_consecutive_asc_desc =
    verifier_t{"no_consecutive_asc_desc", [](const code_t &code) {
                 return (code[1] != code[0] + 1) && (code[2] != code[1] + 1) &&
                        (code[1] != code[0] - 1) && (code[2] != code[1] - 1);
               }};
const auto two_consecutive_asc_desc =
    verifier_t{"two_consecutive_asc_desc", [](const code_t &code) {
                 return ((code[1] == code[0] + 1) ^ (code[2] == code[1] + 1)) ||
                        ((code[1] == code[0] - 1) ^ (code[2] == code[1] - 1));
               }};
const auto three_consecutive_asc_desc = verifier_t{
    "three_consecutive_asc_desc", [](const code_t &code) {
      return ((code[1] == code[0] + 1) && (code[2] == code[1] + 1)) ||
             ((code[1] == code[0] - 1) && (code[2] == code[1] - 1));
    }};
const auto c25 = card_t{no_consecutive_asc_desc, two_consecutive_asc_desc,
                        three_consecutive_asc_desc};

// card 26
const auto purple_less_than_three = verifier_t{
    "purple_less_than_three", [](const code_t &code) { return code[2] < 3; }};
const auto c26 = card_t{blue_less_than_three, yellow_less_than_three,
                        purple_less_than_three};

// card 27
const auto blue_less_than_four = verifier_t{
    "blue_less_than_four", [](const code_t &code) { return code[0] < 4; }};
const auto purple_less_than_four = verifier_t{
    "purple_less_than_four", [](const code_t &code) { return code[2] < 4; }};
const auto c27 =
    card_t{blue_less_than_four, yellow_less_than_four, purple_less_than_four};

// card 28
const auto yellow_equal_to_one = verifier_t{
    "yellow_equal_to_one", [](const code_t &code) { return code[1] == 1; }};
const auto purple_equal_to_one = verifier_t{
    "purple_equal_to_one", [](const code_t &code) { return code[2] == 1; }};
const auto c28 =
    card_t{blue_equal_to_one, yellow_equal_to_one, purple_equal_to_one};

// card 29
const auto purple_is_three = verifier_t{
    "purple_is_three", [](const code_t &code) { return code[2] == 3; }};
const auto c29 =
    card_t{blue_equal_to_three, yellow_equal_to_three, purple_is_three};

// card 30
const auto blue_equal_to_four = verifier_t{
    "blue_equal_to_four", [](const code_t &code) { return code[0] == 4; }};
const auto purple_equal_to_four = verifier_t{
    "purple_equal_to_four", [](const code_t &code) { return code[2] == 4; }};
const auto c30 =
    card_t{blue_equal_to_four, yellow_equal_to_four, purple_equal_to_four};

// card 31
const auto yellow_greater_one = verifier_t{
    "yellow_greater_one", [](const code_t &code) { return code[1] > 1; }};
const auto purple_greater_one = verifier_t{
    "purple_greater_one", [](const code_t &code) { return code[2] > 1; }};
const auto c31 =
    card_t{blue_greater_one, yellow_greater_one, purple_greater_one};

// card 32
const auto purple_greater_than_three =
    verifier_t{"purple_greater_than_three",
               [](const code_t &code) { return code[2] > 3; }};
const auto c32 = card_t{blue_greater_than_three, yellow_greater_than_three,
                        purple_greater_than_three};

// card 33
const auto c33 = card_t{
    blue_is_even,  blue_is_odd,    yellow_is_even,
    yellow_is_odd, purple_is_even, purple_is_odd,
};

// card 34
const auto blue_smallest_or_equal =
    verifier_t{"blue_smallest_or_equal", [](const code_t &code) {
                 return code[0] <= code[1] && code[0] <= code[2];
               }};
const auto yellow_smallest_or_equal =
    verifier_t{"yellow_smallest_or_equal", [](const code_t &code) {
                 return code[1] <= code[0] && code[1] <= code[2];
               }};
const auto purple_smallest_or_equal =
    verifier_t{"purple_smallest_or_equal", [](const code_t &code) {
                 return code[2] <= code[0] && code[2] <= code[1];
               }};
const auto c34 = card_t{blue_smallest_or_equal, yellow_smallest_or_equal,
                        purple_smallest_or_equal};

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

// card 36
const auto sum_multiple_of_three =
    verifier_t{"sum_multiple_of_three",
               [](const code_t &code) { return sum(code) % 3 == 0; }};
const auto sum_multiple_of_four =
    verifier_t{"sum_multiple_of_four",
               [](const code_t &code) { return sum(code) % 4 == 0; }};
const auto sum_multiple_of_five =
    verifier_t{"sum_multiple_of_five",
               [](const code_t &code) { return sum(code) % 5 == 0; }};
const auto c36 =
    card_t{sum_multiple_of_three, sum_multiple_of_four, sum_multiple_of_five};

// card 37
const auto blue_plus_yellow_equal_to_four =
    verifier_t{"blue_plus_yellow_equal_to_four",
               [](const code_t &code) { return code[0] + code[1] == 4; }};
const auto blue_plus_purple_equal_to_four =
    verifier_t{"blue_plus_purple_equal_to_four",
               [](const code_t &code) { return code[0] + code[2] == 4; }};
const auto yellow_plus_purple_equal_to_four =
    verifier_t{"yellow_plus_purple_equal_to_four",
               [](const code_t &code) { return code[1] + code[2] == 4; }};
const auto c37 =
    card_t{blue_plus_yellow_equal_to_four, blue_plus_yellow_equal_to_four,
           yellow_plus_purple_equal_to_four};

// card 38
const auto blue_plus_purple_equal_to_six =
    verifier_t{"blue_plus_purple_equal_to_six",
               [](const code_t &code) { return code[0] + code[2] == 6; }};
const auto yellow_plus_purple_equal_to_six =
    verifier_t{"yellow_plus_purple_equal_to_six",
               [](const code_t &code) { return code[1] + code[2] == 6; }};
const auto c38 =
    card_t{blue_plus_yellow_equal_to_six, blue_plus_yellow_equal_to_six,
           yellow_plus_purple_equal_to_six};

// card 39
const auto c39 = card_t{
    blue_equal_to_one,  blue_greater_one,    yellow_equal_to_one,
    yellow_greater_one, purple_equal_to_one, purple_greater_one,
};

// card 40
const auto purple_equal_to_three = verifier_t{
    "purple_equal_to_three", [](const code_t &code) { return code[2] == 3; }};
const auto c40 = card_t{
    blue_less_than_three,   blue_equal_to_three,   blue_greater_than_three,
    yellow_less_than_three, yellow_equal_to_three, yellow_greater_than_three,
    purple_less_than_three, purple_equal_to_three, purple_greater_than_three};

// card 41
const auto blue_greater_than_four = verifier_t{
    "blue_greater_than_four", [](const code_t &code) { return code[0] > 4; }};
const auto purple_greater_than_four = verifier_t{
    "purple_greater_than_four", [](const code_t &code) { return code[2] > 4; }};
const auto c41 = card_t{
    blue_less_than_four,   blue_equal_to_four,   blue_greater_than_four,
    yellow_less_than_four, yellow_equal_to_four, yellow_greater_than_four,
    purple_less_than_four, purple_equal_to_four, purple_greater_than_four};

// card 42
const auto c42 = card_t{blue_smallest,  blue_largest,    yellow_smallest,
                        yellow_largest, purple_smallest, purple_largest};

// card 43
const auto c43 = card_t{blue_less_than_yellow,    blue_less_than_purple,
                        blue_equal_to_yellow,     blue_equal_to_purple,
                        blue_greater_than_yellow, blue_greater_than_purple};

// card 44
const auto c44 = card_t{blue_greater_than_yellow, yellow_less_than_purple,
                        blue_equal_to_yellow,     yellow_equal_to_purple,
                        blue_less_than_yellow,    yellow_greater_than_purple};

// card 45
const auto c45 =
    card_t{zero_ones, one_one, two_ones, zero_threes, one_three, two_threes};

// card 46
const auto c46 =
    card_t{zero_threes, zero_fours, one_three, one_four, two_threes, two_fours};

// card 47
const auto c47 =
    card_t{zero_ones, zero_fours, one_one, one_four, two_ones, two_fours};

// card 48
const auto c48 = card_t{blue_less_than_yellow,     blue_equal_to_yellow,
                        blue_greater_than_yellow,  blue_less_than_purple,
                        blue_equal_to_purple,      blue_greater_than_purple,
                        yellow_less_than_purple,   yellow_equal_to_purple,
                        yellow_greater_than_purple};

const auto all_cards =
    std::vector{{},  c1,  c2,  c3,  c4,  c5,  c6,  c7,  c8,  c9,  c10, c11, c12,
                c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25,
                c26, c27, c28, c29, c30, c31, c32, c33, c34, c35, c36, c37, c38,
                c39, c40, c41, c42, c43, c44, c45, c46, c47, c48};
