import { parseCode, getColor, type ParsedGame } from "./util";

export function parse(text: string): ParsedGame | null {
  const problem = text.split("#")[1];
  if (!problem) {
    return null;
  }
  const hashEnd = problem.indexOf(",");
  const code = problem.slice(0, hashEnd).replace(/\s+/g, "");
  const parsedCode = parseCode(code);
  if (parsedCode === null) {
    return null;
  }
  const { mode, numVerifiers } = parsedCode;
  const cardText = problem.split("->,")[1];
  if (!cardText) {
    return null;
  }
  const cards = cardText.split(",");
  if (mode === 0) {
    // CLASSIC
    const ind = [];
    for (let i = 0; i < numVerifiers; i += 1) {
      ind.push(Number(cards[i]));
    }
    const crypt = [];
    for (let i = numVerifiers; i < numVerifiers * 2; i += 1) {
      crypt.push(Number(cards[i].slice(1)));
    }
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    return { ind, m: mode, crypt, code, color };
  } else if (mode === 1) {
    // EXTREME
    const ind = [];
    const fake = [];
    for (let i = 0; i < numVerifiers * 2; i += 2) {
      ind.push(Number(cards[i]));
      fake.push(Number(cards[i + 1]));
    }
    const crypt = [];
    for (let i = numVerifiers * 2; i < numVerifiers * 3; i += 1) {
      crypt.push(Number(cards[i].slice(1)));
    }
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    return { ind, fake, m: mode, crypt, code, color };
  } else if (mode === 2) {
    // NIGHTMARE
    const ind = [];
    for (let i = 0; i < numVerifiers; i += 1) {
      ind.push(Number(cards[i].slice(1)));
    }
    const crypt = [];
    for (let i = numVerifiers; i < numVerifiers * 2; i += 1) {
      crypt.push(Number(cards[i].slice(1)));
    }
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    return { ind, m: mode, crypt, code, color };
  } else {
    return null;
  }
}
