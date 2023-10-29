#pragma once

#include "verifier.hpp"
#include <vector>

const auto get_solution =
    [](const std::vector<verifier_t> &possible_verifier_combination) {
      auto result = all_ones_mask;
      for (const auto &verifier : possible_verifier_combination) {
        result &= verifier.code_mask;
      }
      return result;
    };

const auto has_single_solution =
    [](const std::vector<verifier_t> &possible_verifier_combination) {
      return get_solution(possible_verifier_combination).count() == 1;
    };

// if leaving any one verifier out still leads to a unique solution, at least
// one verifier has to be redundant
const auto has_redundant_information =
    [](const std::vector<verifier_t> &possible_verifier_combination) {
      for (size_t i = 0; i < possible_verifier_combination.size(); i += 1) {
        auto result = all_ones_mask;
        for (size_t j = 0; j < possible_verifier_combination.size(); j += 1) {
          if (i == j) {
            continue;
          }
          result &= possible_verifier_combination[j].code_mask;
        }
        if (result.count() == 1) {
          return true;
        }
      }
      return false;
    };

const auto find_solution_idx = [](const code_mask_t &mask) {
  for (size_t i = 0; i < mask.size(); i += 1) {
    if (mask[i]) {
      return i;
    }
  }
  return mask.size() + 1;
};