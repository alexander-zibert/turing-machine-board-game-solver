import {
  range,
  getColor,
  parseCode,
  type ParsedGame,
  getCryptCards,
} from "./util";

function getCode(text: string) {
  let start = null;
  let currentPart = "";
  let result = "";
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "#") {
      start = i;
      continue;
    }
    if (start === null) {
      continue;
    }
    if (text[i] === " ") {
      if (currentPart.length > 0 && currentPart.length <= 3) {
        result += currentPart;
        currentPart = "";
        continue;
      } else {
        return result || null;
      }
    }
    if (text[i].match(/[A-Z0-9]/)) {
      currentPart += text[i];
    } else {
      return result || null;
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

// fallback parsing if the criteria cards are sorted in descending order and it is a three digit number
function extremeRegex2(verifier: number) {
  return (
    String.fromCharCode(65 + verifier) + "((\\d{2})(\\d))(\\d{3})(?![0-9])"
  );
}

function parseExtremeCardMatch(match: string[] | null) {
  if (!match) {
    return null;
  }
  const validMatches: string[] = match.filter((el) => el !== undefined);
  const numbers = validMatches.slice(2).map(Number);
  if (!isValidExtremeCard(numbers)) {
    return null;
  }
  return numbers.map(Number);
}

function isValidExtremeCard(match: number[]) {
  const [ind, fake, crypt] = match;
  const indCryptCards = getCryptCards(ind);
  if (indCryptCards === null) {
    return false;
  }
  const fakeCryptCards = getCryptCards(fake);
  if (fakeCryptCards === null) {
    return false;
  }
  return indCryptCards.includes(crypt) || fakeCryptCards.includes(crypt);
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
  const code = getCode(text);
  if (code === null) {
    return null;
  }
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
    const ind = [];
    const fake = [];
    const crypt = [];
    for (let i = 0; i < numVerifiers; i += 1) {
      const match = textWithoutSpaces.match(new RegExp(extremeRegex(i)));
      let parsedMatch = parseExtremeCardMatch(match);
      if (!parsedMatch) {
        const match2 = textWithoutSpaces.match(new RegExp(extremeRegex2(i)));
        parsedMatch = parseExtremeCardMatch(match2);
      }
      if (!parsedMatch) {
        return null;
      }

      ind.push(parsedMatch[0]);
      fake.push(parsedMatch[1]);
      crypt.push(parsedMatch[2]);
    }

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
