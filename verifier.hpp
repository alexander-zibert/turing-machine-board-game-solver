#pragma once

#include <array>
#include <bitset>
#include <cmath>
#include <cstdint>
#include <functional>
#include <iostream>
#include <string>

#include "code.hpp"

const auto all_true = [](const code_t &code) { return true; };

struct verifier_t {
  verifier_t() : verifier_t{"all_true", all_true} {}

  verifier_t(std::string name, verifier_factory isValid)
      : name(name), code_mask{create_verifier(isValid)}, isValid{isValid} {}

  std::string name;
  code_mask_t code_mask;
  verifier_factory isValid;
};
