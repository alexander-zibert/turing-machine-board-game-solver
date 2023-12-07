#include "../solver.hpp"
#include "doctest.h"
#include <cstdint>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

TEST_CASE("test generated problems") {
  std::ifstream file("test/problems.txt");
  std::string line;

  while (std::getline(file, line)) {
    std::stringstream lineStream(line);
    std::string cell;

    std::getline(lineStream, cell, ',');
    const auto hashCode = cell;

    std::getline(lineStream, cell, ',');
    const auto mode = game_mode_t{(uint8_t)std::stoul(cell)};

    std::getline(lineStream, cell, ',');
    const auto numVerifier = (uint8_t)std::stoul(cell);

    auto game = std::vector<card_t>{numVerifier};
    for (uint8_t i = 0; i < numVerifier; i += 1) {
      std::getline(lineStream, cell, ',');
      game[i] = all_cards[std::stoul(cell)];
    }
    if (mode == game_mode_t::extreme) {
      for (uint8_t i = 0; i < numVerifier; i += 1) {
        std::getline(lineStream, cell, ',');
        for (const auto &verifier : all_cards[std::stoul(cell)]) {
          game[i].push_back(verifier);
        }
      }
    }
    std::getline(lineStream, cell, ',');
    const auto result = solve(game, {}, mode);
    const auto solutionFound =
        result.possibleCodes.find(cell) != result.possibleCodes.end();
    if (!solutionFound) {
      std::cout << line << std::endl;
    }
    CHECK(solutionFound == true);
  }

  file.close();
}

TEST_CASE("test B65 FWE R") {
  auto game = std::vector<card_t>{};
  for (const auto card : {7, 10, 14, 18, 19, 22}) {
    game.push_back(all_cards[card]);
  }
  const auto result = solve(game, {
    query_t{{2, 4, 3}, 'C', false},
    query_t{{2, 4, 3}, 'D', false},
    query_t{{2, 4, 3}, 'E', false},
    query_t{{1, 4, 5}, 'B', false},
    query_t{{1, 4, 5}, 'E', false},
    query_t{{1, 4, 5}, 'F', false},
    query_t{{5, 3, 1}, 'A', true},
    query_t{{5, 3, 1}, 'C', true},
    query_t{{5, 3, 1}, 'F', false},
    }, game_mode_t::classic);
  CHECK(result.possibleCodes.size() == 1);
  CHECK(result.possibleCodes.find("251") != result.possibleCodes.end());
}
