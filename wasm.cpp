#include "cards.hpp"
#include "code.hpp"
#include "json.hpp"
#include "solver.hpp"
#include <cstdint>
#include <emscripten/emscripten.h>

using json = nlohmann::json;

int wasm_json(char *input, char *output, const std::function<json(json)> &foo) {
  json data = json::parse(input);

  const auto outputJson = foo(data);

  const auto result = outputJson.dump();
  strcpy(output, result.c_str());
  return result.size();
}

extern "C" EMSCRIPTEN_KEEPALIVE void solve_wasm(uint8_t *input,
                                                uint8_t *output) {
  // input parsing
  size_t offset = 0;
  auto mode = game_mode_t{input[offset]};
  offset += 1;
  auto numVerifiers = input[offset];
  offset += 1;
  auto cards = std::vector<card_t>{numVerifiers};
  for (uint8_t i = 0; i < numVerifiers; i += 1) {
    cards[i] = all_cards[input[offset]];
    offset += 1;
  }
  if (mode == game_mode_t::extreme) {
    // copy all verifiers from the other card to the verifier slot
    for (uint8_t i = 0; i < numVerifiers; i += 1) {
      const auto otherCard = all_cards[input[offset]];
      for (const auto verifier : otherCard) {
        cards[i].push_back(verifier);
      }
      offset += 1;
    }
  }

  auto numQueries = input[offset];
  offset += 1;

  auto queries = std::vector<query_t>{numQueries};
  for (size_t i = 0; i < numQueries; i += 1) {
    queries[i] = query_t{{input[offset], input[offset + 1], input[offset + 2]},
                         (char)input[offset + 3],
                         (bool)input[offset + 4]};
    offset += 5;
  }

  auto result = solve(cards, queries, mode);
  offset = 0;
  // transform result

  // 1. N_CODES,[codes]
  output[offset] = (uint8_t)result.possibleCodes.size();
  offset += 1;
  for (const auto &code : result.possibleCodes) {
    for (const auto &c : code) {
      output[offset] = c - '0';
      offset += 1;
    }
  }
  // 2. [(N_CARDS, [cards])]
  for (const auto &card : result.possibleVerifiers) {
    output[offset] = (uint8_t)card.size();
    offset += 1;
    for (const auto &verifierIdx : card) {
      output[offset] = verifierIdx;
      offset += 1;
    }
  }
  // 3. [(N_LETTERS, [letters])]
  for (const auto &possibleMatch : result.possibleMatches) {
    output[offset] = (uint8_t)possibleMatch.size();
    offset += 1;
    for (auto letter : possibleMatch) {
      output[offset] = letter;
      offset += 1;
    }
  }
}

extern "C" EMSCRIPTEN_KEEPALIVE int get_possible_codes(char *input,
                                                       char *output) {
  return wasm_json(input, output, [](const json &data) {
    std::vector<std::vector<uint8_t>> slots = data["cards"];
    std::vector<std::vector<uint8_t>> possibleVerifiers =
        data["possibleVerifiers"];

    const auto codes =
        possible_codes_from_possible_verifiers(slots, possibleVerifiers);

    auto outputJson = json();
    outputJson["codes"] = codes;

    return outputJson;
  });
}
