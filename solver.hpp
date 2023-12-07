#pragma once

#include <cstdint>
#include <set>
#include <vector>

#include "cards.hpp"
#include "cartesian.hpp"
#include "code.hpp"
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

struct query_t {
  code_t code;
  char verifierIdx;
  bool result;
};

struct result_t {
  std::set<std::string> possibleCodes;
  std::vector<std::set<uint8_t>> possibleVerifiers;
  std::vector<std::set<char>> possibleMatches;
};

enum struct game_mode_t : uint8_t { classic = 0, extreme = 1, nightmare = 2 };

const auto solve = [](const std::vector<card_t> &game,
                      const std::vector<query_t> &queries, game_mode_t mode) {
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
    auto possibleMatchings =
        initialize_verifier_sets(game, mode == game_mode_t::nightmare);
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

const auto possible_codes_from_possible_verifiers =
    [](const std::vector<std::vector<uint8_t>> &slots,
       const std::vector<std::vector<uint8_t>> &possibleVerifiers) {
      auto cards = std::vector<card_t>{slots.size()};
      for (auto i = 0; i < slots.size(); i += 1) {
        const auto slot = slots[i];
        for (const auto card : slot) {
          for (const auto &verifier : all_cards[card]) {
            cards[i].push_back(verifier);
          }
        }
      }

      auto res = all_ones_mask;
      for (auto i = 0; i < cards.size(); i += 1) {
        const auto &card = cards[i];

        auto temp = all_zeros_mask;
        for (const auto &possibleVerifier : possibleVerifiers[i]) {
          temp |= card[possibleVerifier].code_mask;
        }

        res &= temp;
      }
      const auto codes = get_codes_from_mask(res);
      return codes;
    };
