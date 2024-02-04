import type { GameSetup } from "store/slices/commentsSlice";

export type ParsedGame = {
  code: string;
} & GameSetup;

export function range(start: number, end: number): number[] {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
}

const MODE_MAP: { [key: string]: number } = {
  A: 0,
  B: 0,
  C: 0,
  D: 1,
  E: 1,
  F: 1,
  G: 2,
  H: 2,
  I: 2,
};

export function parseCode(code: string) {
  if (code.length < 2) {
    return null;
  }
  const mode = MODE_MAP[code[0]];
  if (mode === undefined) {
    return null;
  }
  const numVerifiers = Number(code[1]);
  return { mode, numVerifiers };
}

// Adapted this from: https://github.com/manurFR/turingmachine/blob/25027290422fe858d99d17801d3a644b467ce732/checkcards.py
const V = {
  purple_eq_4: [201, 798, 204, 796],
  no_one: [206, 793, 212, 790],
  two_threes: [215, 786, 217, 783],
  sum_even: [220, 781, 223, 779],
  blue_plus_purple_eq_4: [227, 776, 231, 773],
  blue_plus_yellow_lt_6: [233, 770, 237, 767],
  purple_eq_1: [244, 765, 251, 759],
  blue_eq_purple: [253, 757, 256, 754],
  one_triple: [261, 750, 264, 747],
  yellow_plus_purple_eq_6: [267, 744, 270, 742],
  two_consecutive_asc: [274, 740, 278, 738],
  descending: [280, 736, 282, 733],
  sum_is_multiple_of_4: [286, 729, 288, 725],
  yellow_lt_blue_purple: [293, 720, 296, 718],
  sum_eq_6: [302, 715, 304, 710],
  no_consecutive_asc_desc: [309, 708, 312, 704],
  blue_plus_yellow_gt_6: [315, 699, 317, 696],
  purple_lt_blue_yellow: [322, 694, 325, 690],
  yellow_gt_blue_purple: [329, 687, 331, 684],
  three_consecutive_asc: [334, 680, 337, 673],
  one_twin: [339, 669, 341, 667],
  yellow_gt_3: [346, 664, 348, 662],
  no_consecutive_asc: [350, 658, 353, 656],
  one_one: [356, 653, 358, 651],
  three_evens: [360, 649, 365, 647],
  sum_lt_6: [370, 645, 373, 641],
  no_fours: [376, 639, 378, 637],
  one_four: [381, 635, 385, 633],
  yellow_lt_3: [387, 631, 390, 629],
  yellow_plus_purple_eq_4: [392, 627, 394, 621],
  purple_lt_3: [396, 617, 401, 615],
  purple_even: [403, 613, 405, 610],
  ascending: [407, 608, 410, 605],
  blue_eq_3: [413, 599, 416, 597],
  yellow_gt_1: [419, 595, 423, 593],
  purple_gt_1: [429, 591, 432, 589],
  blue_gt_3: [434, 587, 437, 585],
  blue_lt_4: [440, 581, 442, 579],
  yellow_eq_4: [447, 577, 453, 573],
  two_ones: [455, 571, 459, 567],
  yellow_eq_3: [462, 564, 464, 562],
  purple_gt_3: [470, 558, 472, 553],
  purple_le_blue_yellow: [475, 550, 479, 547],
  yellow_even: [481, 543, 483, 540],
  no_order: [485, 536, 487, 533],
  blue_eq_1: [491, 530, 495, 527],
  no_twin: [497, 523, 499, 518],
  evens_lt_odds: [503, 515, 505, 509],
  three_consecutive_asc_desc: [507, 506, 514, 504],
  no_repeat: [516, 502, 520, 498],
  no_evens: [525, 496, 528, 492],
  yellow_odd: [532, 490, 534, 486],
  one_even: [537, 484, 541, 482],
  purple_eq_3: [546, 480, 549, 476],
  sum_is_multiple_of_5: [551, 474, 557, 471],
  two_fours: [560, 469, 563, 463],
  blue_lt_yellow: [566, 461, 568, 458],
  yellow_le_blue_purple: [572, 454, 576, 449],
  blue_odd: [578, 445, 580, 441],
  sum_is_multiple_of_3: [582, 439, 586, 435],
  yellow_eq_1: [588, 433, 590, 430],
  sum_odd: [592, 424, 594, 421],
  blue_lt_yellow_purple: [596, 418, 598, 414],
  blue_plus_purple_eq_6: [604, 412, 606, 409],
  purple_gt_blue_yellow: [609, 406, 611, 404],
  blue_lt_purple: [614, 402, 616, 399],
  two_evens: [618, 395, 625, 393],
  blue_eq_4: [628, 391, 630, 389],
  yellow_gt_purple: [632, 386, 634, 382],
  blue_le_yellow_purple: [636, 379, 638, 377],
  evens_gt_odds: [640, 374, 643, 372],
  no_three: [646, 369, 648, 362],
  blue_gt_1: [650, 359, 652, 357],
  purple_odd: [654, 355, 657, 352],
  blue_gt_yellow_purple: [661, 349, 663, 347],
  blue_ge_yellow_purple: [665, 344, 668, 340],
  yellow_lt_4: [670, 338, 677, 335],
  sum_gt_6: [681, 332, 686, 330],
  yellow_gt_4: [688, 327, 691, 324],
  blue_gt_purple: [695, 319, 697, 316],
  blue_plus_yellow_eq_4: [701, 314, 706, 311],
  blue_gt_4: [709, 308, 714, 303],
  purple_gt_4: [717, 299, 719, 294],
  blue_gt_yellow: [723, 289, 726, 287],
  blue_eq_yellow: [737, 279, 739, 277],
  one_double: [741, 273, 743, 268],
  two_consecutive_asc_desc: [746, 266, 749, 263],
  blue_plus_yellow_eq_6: [751, 257, 755, 255],
  blue_even: [758, 252, 763, 247],
  yellow_ge_blue_purple: [766, 243, 769, 236],
  yellow_eq_purple: [771, 232, 775, 228],
  blue_lt_3: [778, 224, 780, 221],
  one_three: [782, 219, 785, 216],
  purple_lt_4: [787, 213, 792, 207],
  yellow_lt_purple: [795, 205, 797, 202],
  missing: [], // no verification cards
};

export const CHECK_CARDS = (() => {
  const result: number[][] = [[], [], [], []];

  for (const values of Object.values(V)) {
    for (let i = 0; i < 4; i += 1) {
      result[i].push(values[i]);
    }
  }

  return result;
})();

const CARDS: { [k: number]: number[][] } = {
  1: [V.blue_eq_1, V.blue_gt_1],
  2: [V.blue_lt_3, V.blue_eq_3, V.blue_gt_3],
  3: [V.yellow_lt_3, V.yellow_eq_3, V.yellow_gt_3],
  4: [V.yellow_lt_4, V.yellow_eq_4, V.yellow_gt_4],
  5: [V.blue_even, V.blue_odd],
  6: [V.yellow_even, V.yellow_odd],
  7: [V.purple_even, V.purple_odd],
  8: [V.no_one, V.one_one, V.two_ones, V.missing],
  9: [V.no_three, V.one_three, V.two_threes, V.missing],
  10: [V.no_fours, V.one_four, V.two_fours, V.missing],
  11: [V.blue_lt_yellow, V.blue_eq_yellow, V.blue_gt_yellow],
  12: [V.blue_lt_purple, V.blue_eq_purple, V.blue_gt_purple],
  13: [V.yellow_lt_purple, V.yellow_eq_purple, V.yellow_gt_purple],
  14: [
    V.blue_lt_yellow_purple,
    V.yellow_lt_blue_purple,
    V.purple_lt_blue_yellow,
  ],
  15: [
    V.blue_gt_yellow_purple,
    V.yellow_gt_blue_purple,
    V.purple_gt_blue_yellow,
  ],
  16: [V.evens_gt_odds, V.evens_lt_odds],
  17: [V.no_evens, V.one_even, V.two_evens, V.three_evens],
  18: [V.sum_even, V.sum_odd],
  19: [
    V.blue_plus_yellow_lt_6,
    V.blue_plus_yellow_eq_6,
    V.blue_plus_yellow_gt_6,
  ],
  20: [V.one_triple, V.one_double, V.no_repeat],
  21: [V.no_twin, V.one_twin],
  22: [V.ascending, V.descending, V.no_order],
  23: [V.sum_lt_6, V.sum_eq_6, V.sum_gt_6],
  24: [V.three_consecutive_asc, V.two_consecutive_asc, V.no_consecutive_asc],
  25: [
    V.no_consecutive_asc_desc,
    V.two_consecutive_asc_desc,
    V.three_consecutive_asc_desc,
  ],
  26: [V.blue_lt_3, V.yellow_lt_3, V.purple_lt_3],
  27: [V.blue_lt_4, V.yellow_lt_4, V.purple_lt_4],
  28: [V.blue_eq_1, V.yellow_eq_1, V.purple_eq_1],
  29: [V.blue_eq_3, V.yellow_eq_3, V.purple_eq_3],
  30: [V.blue_eq_4, V.yellow_eq_4, V.purple_eq_4],
  31: [V.blue_gt_1, V.yellow_gt_1, V.purple_gt_1],
  32: [V.blue_gt_3, V.yellow_gt_3, V.purple_gt_3],
  33: [
    V.blue_even,
    V.blue_odd,
    V.yellow_even,
    V.yellow_odd,
    V.purple_even,
    V.purple_odd,
  ],
  34: [
    V.blue_le_yellow_purple,
    V.yellow_le_blue_purple,
    V.purple_le_blue_yellow,
  ],
  35: [V.blue_ge_yellow_purple, V.yellow_ge_blue_purple, V.missing],
  36: [V.sum_is_multiple_of_3, V.sum_is_multiple_of_4, V.sum_is_multiple_of_5],
  37: [
    V.blue_plus_yellow_eq_4,
    V.blue_plus_purple_eq_4,
    V.yellow_plus_purple_eq_4,
  ],
  38: [
    V.blue_plus_yellow_eq_6,
    V.blue_plus_purple_eq_6,
    V.yellow_plus_purple_eq_6,
  ],
  39: [
    V.blue_eq_1,
    V.blue_gt_1,
    V.yellow_eq_1,
    V.yellow_gt_1,
    V.purple_eq_1,
    V.purple_gt_1,
  ],
  40: [
    V.blue_lt_3,
    V.blue_eq_3,
    V.blue_gt_3,
    V.yellow_lt_3,
    V.yellow_eq_3,
    V.yellow_gt_3,
    V.purple_lt_3,
    V.purple_eq_3,
    V.purple_gt_3,
  ],
  41: [
    V.blue_lt_4,
    V.blue_eq_4,
    V.blue_gt_4,
    V.yellow_lt_4,
    V.yellow_eq_4,
    V.yellow_gt_4,
    V.purple_lt_4,
    V.purple_eq_4,
    V.purple_gt_4,
  ],
  42: [
    V.blue_lt_yellow_purple,
    V.blue_gt_yellow_purple,
    V.yellow_lt_blue_purple,
    V.yellow_gt_blue_purple,
    V.purple_lt_blue_yellow,
    V.purple_gt_blue_yellow,
  ],
  43: [
    V.blue_lt_yellow,
    V.blue_lt_purple,
    V.blue_eq_yellow,
    V.blue_eq_purple,
    V.blue_gt_yellow,
    V.blue_gt_purple,
  ],
  44: [
    V.blue_gt_yellow,
    V.yellow_lt_purple,
    V.blue_eq_yellow,
    V.yellow_eq_purple,
    V.blue_lt_yellow,
    V.yellow_gt_purple,
  ],
  45: [V.no_one, V.no_three, V.one_one, V.one_three, V.two_ones, V.two_threes],
  46: [
    V.no_three,
    V.no_fours,
    V.one_three,
    V.one_four,
    V.two_threes,
    V.two_fours,
  ],
  47: [V.no_one, V.no_fours, V.one_one, V.one_four, V.two_ones, V.two_fours],
  48: [
    V.blue_lt_yellow,
    V.blue_eq_yellow,
    V.blue_gt_yellow,
    V.blue_lt_purple,
    V.blue_eq_purple,
    V.blue_gt_purple,
    V.yellow_lt_purple,
    V.yellow_eq_purple,
    V.yellow_gt_purple,
  ],
};

export function getCryptCards(cardIdx: number) {
  if (!(cardIdx in CARDS)) {
    return null;
  }
  return CARDS[cardIdx].flat();
}

export function getColor(checkCard: number) {
  for (let i of range(0, 4)) {
    if (CHECK_CARDS[i].includes(checkCard)) {
      return i;
    }
  }
  return null;
}
