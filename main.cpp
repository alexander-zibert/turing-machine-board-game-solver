#include <cstdint>
#include <iostream>
#include <set>
#include <vector>

#include "cards.hpp"
#include "cartesian.hpp"
#include "code.hpp"
#include "solver.hpp"
#include "verifier.hpp"

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