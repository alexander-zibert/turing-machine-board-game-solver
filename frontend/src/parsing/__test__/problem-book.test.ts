import { parse } from "parsing/problem-book";

test("C65 6FF P", () => {
  expect(
    parse("5,#C65 6FF P,->,5,22,24,27,33,48,O252,O536,O658,O213,O613,O289")
  ).toStrictEqual({
    code: "C656FFP",
    color: 1,
    ind: [5, 22, 24, 27, 33, 48],
    crypt: [252, 536, 658, 213, 613, 289],
    m: 0,
  });
});

test("F4D EXI", () => {
  expect(
    parse("10,#F4D EXI,->,25,23,24,16,36,4,42,14,B749,B643,B586,B325")
  ).toStrictEqual({
    code: "F4DEXI",
    color: 2,
    ind: [25, 24, 36, 42],
    fake: [23, 16, 4, 14],
    crypt: [749, 643, 586, 325],
    m: 1,
  });
});

test("I51 ZKH K", () => {
  expect(
    parse("4,#I51 ZKH K,->,N23,N24,N25,N41,N48,G681,G746,G440,G350,G771")
  ).toStrictEqual({
    code: "I51ZKHK",
    color: 0,
    ind: [23, 24, 25, 41, 48],
    crypt: [681, 746, 440, 350, 771],
    m: 2,
  });
});
