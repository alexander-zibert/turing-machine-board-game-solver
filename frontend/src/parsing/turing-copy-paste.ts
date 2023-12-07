import { range, getColor, parseCode, type ParsedGame } from "./util";

function getCode(parts: string[]) {
  let start = 0;
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i].startsWith("#")) {
      start = i;
    } else if (parts[i].toLowerCase().includes("share")) {
      return parts.slice(start, i);
    }
  }
  return null;
}

function classicRegex(verifier: number) {
  return String.fromCharCode(65 + verifier) + "(\\d{1,2})(\\d{3})";
}

function parseClassicMatch(match: string[]) {
  const ind = [];
  const crypt = [];
  for (let i = 0; i < match.length; i += 1) {
    if (i % 2 === 0) {
      ind.push(Number(match[i]));
    } else {
      crypt.push(Number(match[i]));
    }
  }
  return { ind, crypt };
}

// a 1721 499 b 2214 296 c 2319 237 d 210 378 e 1815 594 B
function extremeRegex(verifier: number) {
  return (
    String.fromCharCode(65 + verifier) +
    "((\\d)(\\d)|(\\d)(\\d{2})|(\\d{2})(\\d{2}))(\\d{3})(?![0-9])"
  );
}

function parseExtremeMatch(match: string[]) {
  const ind: number[] = [];
  const fake: number[] = [];
  const crypt: number[] = [];
  const validMatches = match.filter((el) => el !== undefined);
  for (let i = 0; i < validMatches.length; i += 1) {
    if (i % 4 === 1) {
      ind.push(Number(validMatches[i]));
    } else if (i % 4 === 2) {
      fake.push(Number(validMatches[i]));
    } else if (i % 4 === 3) {
      crypt.push(Number(validMatches[i]));
    }
  }
  return { ind, fake, crypt };
}

function nightmareCryptRegex(verifier: number) {
  return String.fromCharCode(65 + verifier) + "(\\d{3})";
}

function parseNightmareInd(text: string, numVerifiers: number) {
  const indText = text.match(
    new RegExp(`\\d{${numVerifiers},${numVerifiers * 2}}`)
  );
  if (!indText) {
    return null;
  }
  const indTextMatch = indText[0];
  const numSingleDigit = numVerifiers * 2 - indTextMatch.length;
  const ind: number[] = [];
  let currentChar = 0;
  for (; currentChar < numSingleDigit; currentChar += 1) {
    ind.push(Number(indTextMatch.slice(currentChar, currentChar + 1)));
  }
  for (; currentChar < indTextMatch.length; currentChar += 2) {
    ind.push(Number(indTextMatch.slice(currentChar, currentChar + 2)));
  }
  return ind;
}

export function parse(text: string): ParsedGame | null {
  const parts = text.replaceAll(/\s+/g, " ").trim().split(" ");
  const codeParts = getCode(parts);
  if (codeParts === null) {
    return null;
  }
  const code = codeParts.join("").slice(1).toUpperCase();
  const parsedCode = parseCode(code);
  if (parsedCode === null) {
    return null;
  }
  const { mode, numVerifiers } = parsedCode;

  const textWithoutSpaces = text.replaceAll(/\s+/g, "").toUpperCase();
  if (mode === 0) {
    // CLASSIC
    const match = textWithoutSpaces.match(
      new RegExp(range(0, numVerifiers).map(classicRegex).join(""))
    );
    if (!match) {
      return null;
    }
    const { ind, crypt } = parseClassicMatch(match.slice(1));
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    return { ind, crypt, color, m: mode, code };
  } else if (mode === 1) {
    // EXTREME
    const match = textWithoutSpaces.match(
      new RegExp(range(0, numVerifiers).map(extremeRegex).join(""))
    );
    if (!match) {
      return null;
    }
    const { ind, fake, crypt } = parseExtremeMatch(match.slice(1));
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    return { ind, fake, crypt, color, m: mode, code };
  } else if (mode === 2) {
    // NIGHTMARE
    const cryptMatch = textWithoutSpaces.match(
      new RegExp(range(0, numVerifiers).map(nightmareCryptRegex).join(""))
    );
    if (!cryptMatch) {
      return null;
    }
    const crypt = cryptMatch.slice(1).map(Number);
    const color = getColor(crypt[0]);
    if (color === null) {
      return null;
    }
    const ind = parseNightmareInd(textWithoutSpaces, numVerifiers);
    if (ind === null) {
      return null;
    }
    return { ind, color, m: mode, crypt, code };
  } else {
    return null;
  }
}
