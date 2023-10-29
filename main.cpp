#include <cstdint>
#include <iostream>
#include <set>
#include <vector>

#include "cards.hpp"
#include "cartesian.hpp"
#include "code.hpp"
#include "solver.hpp"
#include "verifier.hpp"

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
