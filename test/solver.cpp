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
