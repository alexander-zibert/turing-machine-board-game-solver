#pragma once

#include <array>
#include <bitset>
#include <cstdint>
#include <functional>
#include <string>

template <uint8_t min_number, uint8_t max_number, uint8_t num_verifiers>
constexpr uint64_t num_codes() {
  static_assert(min_number < max_number,
                "The min_number has to be less than the max_number");
  static_assert(min_number >= 0, "The min_number has to be >= 0");
  static_assert(max_number <= 9, "The max_number has to be <= 9");
  static_assert(num_verifiers == 3,
                "The number of verifiers has to be 3 as of now.");

  uint64_t result = 1;
  for (uint8_t i = 0; i < num_verifiers; i += 1) {
    result *= (max_number - min_number) + 1;
  }
  return result;
}

// N cannot be changed easily as of now
constexpr uint8_t N = 3;
constexpr uint8_t MIN_NUMBER = 1;
constexpr uint8_t MAX_NUMBER = 5;
constexpr uint64_t NUM_CODES = num_codes<MIN_NUMBER, MAX_NUMBER, N>();

using code_t = std::array<uint8_t, N>;
using verifier_factory = std::function<bool(const code_t &)>;
using code_mask_t = std::bitset<NUM_CODES>;

const code_mask_t all_ones_mask = []() { return code_mask_t{}.set(); }();
const code_mask_t all_zeros_mask = code_mask_t{};

constexpr auto iterate_codes = [](const auto &consumer) {
  auto i = 0;
  for (uint8_t b = MIN_NUMBER; b <= MAX_NUMBER; b += 1) {
    for (uint8_t y = MIN_NUMBER; y <= MAX_NUMBER; y += 1) {
      for (uint8_t p = MIN_NUMBER; p <= MAX_NUMBER; p += 1) {
        consumer(i, code_t{b, y, p});
        i += 1;
      }
    }
  }
};

const auto create_verifier = [](const verifier_factory &is_valid) {
  auto result = code_mask_t{};
  iterate_codes([&result, &is_valid](int codeIdx, const code_t &code) {
    result.set(codeIdx, is_valid(code));
  });
  return result;
};

const std::vector<std::string> human_codes = []() {
  auto result = std::vector<std::string>{};
  iterate_codes([&result](int codeIdx, const code_t &code) {
    result.emplace_back(std::to_string(code[0]) + std::to_string(code[1]) +
                        std::to_string(code[2]));
  });
  return result;
}();

const std::vector<code_t> code_map = []() {
  auto result = std::vector<code_t>{};
  iterate_codes([&result](int codeIdx, const code_t &code) {
    result.emplace_back(code);
  });
  return result;
}();

const auto get_codes_from_mask = [](const code_mask_t &mask) {
  auto result = std::vector<std::string>{};
  iterate_codes([&result, &mask](int codeIdx, const code_t &code) {
    if (mask[codeIdx]) {
      result.emplace_back(std::to_string(code[0]) + std::to_string(code[1]) +
                          std::to_string(code[2]));
    }
  });
  return result;
};
