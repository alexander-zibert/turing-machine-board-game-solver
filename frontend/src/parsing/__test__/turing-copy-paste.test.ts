import { parse } from "parsing/turing-copy-paste";

test("A518FRM", () => {
  expect(
    parse(
      `op #A51 8FR M Share Get Criteria and Verification cards in the box. A 1 652 B 7 405 C 12 616 D 15 331 E 16 505 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [1, 7, 12, 15, 16],
    crypt: [652, 405, 616, 331, 505],
    color: 2,
    m: 0,
    code: "A518FRM",
  });
});

test("A4BL4O", () => {
  expect(
    parse(
      `op #A4B L4O Share Get Criteria and Verification cards in the box. A 5 578 B 10 376 C 11 566 D 17 618 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [5, 10, 11, 17],
    crypt: [578, 376, 566, 618],
    color: 0,
    m: 0,
    code: "A4BL4O",
  });
});

test("A4BL4O lowercase", () => {
  expect(
    parse(
      `op #A4B L4O Share Get Criteria and Verification cards in the box. A 5 578 B 10 376 C 11 566 D 17 618 Back to Homepage`.toLowerCase()
    )
  ).toStrictEqual({
    ind: [5, 10, 11, 17],
    crypt: [578, 376, 566, 618],
    color: 0,
    m: 0,
    code: "A4BL4O",
  });
});

test("A4BL4O uppercase", () => {
  expect(
    parse(
      `op #A4B L4O Share Get Criteria and Verification cards in the box. A 5 578 B 10 376 C 11 566 D 17 618 Back to Homepage`.toUpperCase()
    )
  ).toStrictEqual({
    ind: [5, 10, 11, 17],
    crypt: [578, 376, 566, 618],
    color: 0,
    m: 0,
    code: "A4BL4O",
  });
});

test("C65 6FF P", () => {
  expect(
    parse(
      `op #C65 6FF P Share Get Criteria and Verification cards in the box. A 5 252 B 22 536 C 24 658 D 27 213 E 33 613 F 48 289 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [5, 22, 24, 27, 33, 48],
    crypt: [252, 536, 658, 213, 613, 289],
    color: 1,
    m: 0,
    code: "C656FFP",
  });
});

test("E52 NBU A", () => {
  expect(
    parse(
      `rulebook page 3 #E52 NBU A Share  Get Criteria and Verification cards in the box. a 1721 499 b 2214 296 c 2319 237 d 210 378 e 1815 594 Back t`
    )
  ).toStrictEqual({
    ind: [17, 22, 23, 2, 18],
    fake: [21, 14, 19, 10, 15],
    crypt: [499, 296, 237, 378, 594],
    color: 2,
    m: 1,
    code: "E52NBUA",
  });
});

//

test("H5K M7S", () => {
  expect(
    parse(
      `Nightmare Mode: see rulebook page 3 #H5K M7S Share Get Criteria and Verification cards in the box. 212171922 A 485 B 537 C 315 D 413 E 614 Back to Homepage`
    )
  ).toStrictEqual({
    ind: [2, 12, 17, 19, 22],
    crypt: [485, 537, 315, 413, 614],
    color: 0,
    m: 2,
    code: "H5KM7S",
  });
});
