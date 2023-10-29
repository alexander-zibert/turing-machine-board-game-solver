#include <cstdint>
#include <iostream>
#include <set>
#include <vector>

#include "cards.hpp"
#include "cartesian.hpp"
#include "code.hpp"
#include "solver.hpp"
#include "verifier.hpp"

struct query_t {
  code_t code;
  char verifierIdx;
  bool result;
};

const auto initialize_verifier_sets = [](const std::vector<card_t> &game,
                                         bool nightmareMode) {
  auto matchingVerifiers = std::vector<std::vector<char>>{game.size()};
  auto nightmareSet = std::vector<char>{};
  for (size_t i = 0; i < game.size(); i += 1) {
    nightmareSet.push_back('A' + i);
  }
  for (size_t i = 0; i < game.size(); i += 1) {
    if (nightmareMode) {
      matchingVerifiers[i] = nightmareSet;
    } else {
      matchingVerifiers[i].push_back('A' + i);
    }
  }
  return matchingVerifiers;
};

struct result_t {
  std::set<std::string> possibleCodes;
  std::vector<std::set<uint8_t>> possibleVerifiers;
  std::vector<std::set<char>> possibleMatches;
};

const auto solve = [](const std::vector<card_t> &game,
                      const std::vector<query_t> &queries) {
  // Step 1: Calculate all possible verifier combinations of the game that lead
  // to a unique solution with no redundant verifiers
  auto possibleCombinations = std::vector<std::vector<verifier_t>>{};
  auto consumer = [&possibleCombinations](
                      const std::vector<verifier_t> &verifierCombination) {
    if (has_single_solution(verifierCombination) &&
        !has_redundant_information(verifierCombination)) {
      possibleCombinations.push_back(verifierCombination);
    }
  };
  cartesianProduct(game, consumer);

  // Step 2: Use the queries to match verifier cards with machine slots ('A',
  // 'B', 'C', ...).

  auto solverResult = result_t{};
  solverResult.possibleMatches.resize(game.size());
  solverResult.possibleVerifiers.resize(game.size());
  for (size_t i = 0; i < possibleCombinations.size(); i += 1) {
    const auto &possibleCombination = possibleCombinations[i];
    auto possibleMatchings = initialize_verifier_sets(game, true);
    // remove all matchings which give a different result
    for (const auto &query : queries) {
      for (size_t cardIdx = 0; cardIdx < possibleCombination.size();
           cardIdx += 1) {
        const auto &verifier = possibleCombination[cardIdx];
        auto &possibleMatching = possibleMatchings[cardIdx];
        if (verifier.isValid(query.code) != query.result) {
          possibleMatching.erase(std::remove(possibleMatching.begin(),
                                             possibleMatching.end(),
                                             query.verifierIdx),
                                 possibleMatching.end());
        }
      }
    }
    // go through all remaining combinations
    auto possibleMatchingCombinations = std::vector<std::vector<char>>{};
    cartesianProduct(possibleMatchings, [&possibleMatchingCombinations](
                                            const std::vector<char> &comb) {
      // TODO: the performance can be improved if the the branch is not further
      // followed if a duplicate is encountered, however then we cannot just
      // reuse cartesianProduct
      auto uniqueSet = std::vector<bool>{};
      uniqueSet.resize(comb.size(), false);

      auto count = 0;
      for (const auto el : comb) {
        if (!uniqueSet[el - 'A']) {
          count += 1;
        }
        uniqueSet[el - 'A'] = true;
      }
      if (count != comb.size()) {
        return;
      }
      possibleMatchingCombinations.push_back(comb);
    });
    if (possibleMatchingCombinations.size() == 0) {
      continue;
    }

    // build result
    const auto solution = get_solution(possibleCombination);
    const auto solutionIdx = find_solution_idx(solution);
    const auto code = human_codes[solutionIdx];
    solverResult.possibleCodes.insert(code);

    for (const auto &possibleMatchingCombination :
         possibleMatchingCombinations) {
      for (size_t i = 0; i < possibleMatchingCombination.size(); i += 1) {
        solverResult.possibleMatches[i].insert(possibleMatchingCombination[i]);
      }
    }

    for (size_t cardIdx = 0; cardIdx < game.size(); cardIdx += 1) {
      const auto &card = game[cardIdx];
      for (size_t verifierIdx = 0; verifierIdx < card.size();
           verifierIdx += 1) {
        const auto &verifier = card[verifierIdx];
        if (verifier.name == possibleCombination[cardIdx].name) {
          solverResult.possibleVerifiers[cardIdx].insert(verifierIdx);
        }
      }
    }
  }
  return solverResult;
};

int main() {
  const auto game = std::vector<card_t>{c2, c12, c24, c33, c35, c45};
  auto result = solve(game, {{{1, 2, 3}, 'A', true},
                             {{1, 2, 3}, 'B', false},
                             {{1, 2, 3}, 'C', true}});

  std::cout << "Possible codes:\n";
  for (const auto &code : result.possibleCodes) {
    std::cout << code << std::endl;
  }
  std::cout << "\n\n";

  std::cout << "Possible verifiers:\n";
  for (const auto &card : result.possibleVerifiers) {
    for (const auto verifierIdx : card) {
      std::cout << (int)verifierIdx << ", ";
    }
    std::cout << std::endl;
  }
  std::cout << "\n\n";

  std::cout << "Possible matchings:\n";
  for (const auto &card : result.possibleMatches) {
    for (const auto matching : card) {
      std::cout << matching;
    }
    std::cout << std::endl;
  }
  return 0;
}
