#include <cstddef>
#include <cstdint>
#include <iostream>
#include <set>
#include <unordered_map>
#include <vector>

#include "cards.hpp"
#include "cartesian.hpp"
#include "code.hpp"
#include "verifier.hpp"

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
      for (auto i = 0; i < possible_verifier_combination.size(); i += 1) {
        auto result = all_ones_mask;
        for (auto j = 0; j < possible_verifier_combination.size(); j += 1) {
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

const auto get_all_verifiers = [](const std::vector<card_t> &game) {
  auto result = std::set<std::string>{};
  for (const auto &card : game) {
    for (const auto &verifier : card) {
      result.insert(verifier.name);
    }
  }
  return result;
};

int main() {
  const auto game = std::vector<card_t>{c2, c12, c24, c33, c35, c45};
  auto possibleCodes = std::set<std::string>{};
  auto allVerifiers = get_all_verifiers(game);
  auto possibleVerifiers = std::set<std::string>{};
  auto consumer =
      [&possibleCodes, &possibleVerifiers](
          const std::vector<verifier_t> &possible_verifier_combination) {
        if (!has_single_solution(possible_verifier_combination) ||
            has_redundant_information(possible_verifier_combination)) {
          return;
        }
        for (const auto &verifier : possible_verifier_combination) {
          possibleVerifiers.insert(verifier.name);
        }
        const auto solution = get_solution(possible_verifier_combination);
        const auto solutionIdx = find_solution_idx(solution);
        const auto solutionCode = human_codes[solutionIdx];
        possibleCodes.insert(solutionCode);
      };
  cartesianProduct(game, consumer);

  std::cout << "These are the possible codes:\n";
  for (const auto &code : possibleCodes) {
    std::cout << code << std::endl;
  }
  std::cout << "\n\n";
  std::cout << "These are the possible verifiers:\n";
  for (const auto &verifier : possibleVerifiers) {
    std::cout << verifier << std::endl;
  }
  std::cout << "\n\n";

  std::cout << "These are the possible verifiers in the game:\n";
  for (const auto &verifier : allVerifiers) {
    std::cout << verifier << ", ";
  }
  std::cout << "\n\n";

  while (true) {
    std::cout << "Enter verifier to check:\n";
    std::string verifierToCheck;
    std::cin >> verifierToCheck;
    if (verifierToCheck == "") {
      break;
    }
    if (allVerifiers.find(verifierToCheck) == allVerifiers.end()) {
      std::cout << "The verifier '" << verifierToCheck
                << "' is not in the game!\n";
    }
    auto verifierIsPossible =
        possibleVerifiers.find(verifierToCheck) != possibleVerifiers.end();
    if (verifierIsPossible) {
      std::cout << "The verifier '" << verifierToCheck
                << "' can not be discarded without more information!\n";
    } else {
      std::cout << "The verifier '" << verifierToCheck
                << "' can be discarded!\n";
    }
  }

  return 0;
}