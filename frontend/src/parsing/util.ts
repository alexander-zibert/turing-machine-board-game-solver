import type { GameSetup } from "store/slices/commentsSlice";

export type ParsedGame = {
  code: string;
} & GameSetup;

// Adapted this from: https://github.com/manurFR/turingmachine/blob/25027290422fe858d99d17801d3a644b467ce732/checkcards.py
export const CHECK_CARDS = [
  [
    201, 206, 215, 220, 227, 233, 244, 253, 261, 267, 274, 280, 286, 293, 302,
    309, 315, 322, 329, 334, 339, 346, 350, 356, 360, 370, 376, 381, 387, 392,
    396, 403, 407, 413, 419, 429, 434, 440, 447, 455, 462, 470, 475, 481, 485,
    491, 497, 503, 507, 516, 525, 532, 537, 546, 551, 560, 566, 572, 578, 582,
    588, 592, 596, 604, 609, 614, 618, 628, 632, 636, 640, 646, 650, 654, 661,
    665, 670, 681, 688, 695, 701, 709, 717, 723, 737, 741, 746, 751, 758, 766,
    771, 778, 782, 787, 795,
  ],
  [
    205, 213, 219, 224, 232, 243, 252, 257, 266, 273, 279, 289, 299, 308, 314,
    319, 327, 332, 338, 344, 349, 355, 359, 369, 374, 379, 386, 391, 395, 402,
    406, 412, 418, 424, 433, 439, 445, 454, 461, 469, 474, 480, 484, 490, 496,
    502, 506, 515, 523, 530, 536, 543, 550, 558, 564, 571, 577, 581, 587, 591,
    595, 599, 608, 613, 617, 627, 631, 635, 639, 645, 649, 653, 658, 664, 669,
    680, 687, 694, 699, 708, 715, 720, 729, 736, 740, 744, 750, 757, 765, 770,
    776, 781, 786, 793, 798,
  ],
  [
    204, 212, 217, 223, 231, 237, 251, 256, 264, 270, 278, 282, 288, 296, 304,
    312, 317, 325, 331, 337, 341, 348, 353, 358, 365, 373, 378, 385, 390, 394,
    401, 405, 410, 416, 423, 432, 437, 442, 453, 459, 464, 472, 479, 483, 487,
    495, 499, 505, 514, 520, 528, 534, 541, 549, 557, 563, 568, 576, 580, 586,
    590, 594, 598, 606, 611, 616, 625, 630, 634, 638, 643, 648, 652, 657, 663,
    668, 677, 686, 691, 697, 706, 714, 719, 726, 739, 743, 749, 755, 763, 769,
    775, 780, 785, 792, 797,
  ],
  [
    202, 207, 216, 221, 228, 236, 247, 255, 263, 268, 277, 287, 294, 303, 311,
    316, 324, 330, 335, 340, 347, 352, 357, 362, 372, 377, 382, 389, 393, 399,
    404, 409, 414, 421, 430, 435, 441, 449, 458, 463, 471, 476, 482, 486, 492,
    498, 504, 509, 518, 527, 533, 540, 547, 553, 562, 567, 573, 579, 585, 589,
    593, 597, 605, 610, 615, 621, 629, 633, 637, 641, 647, 651, 656, 662, 667,
    673, 684, 690, 696, 704, 710, 718, 725, 733, 738, 742, 747, 754, 759, 767,
    773, 779, 783, 790, 796,
  ],
];

export function getColor(checkCard: number) {
  for (let i of range(0, 4)) {
    if (CHECK_CARDS[i].includes(checkCard)) {
      return i;
    }
  }
  return null;
}

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
