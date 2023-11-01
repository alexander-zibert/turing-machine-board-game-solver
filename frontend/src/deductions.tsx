import { RootState } from "store";

export type Query = {
  code: number[];
  verifierIdx: number;
  result: boolean;
};

function getPossibleCombinations(verifierCards: number[], queries: Query[]) {
  const { memory, solve_wasm } = (window as any).Module.asm;
  const numCards = verifierCards.length;
  const numQueries = queries.length;
  const inputValues = [verifierCards.length, ...verifierCards, numQueries];
  for (const query of queries) {
    inputValues.push(query.code[0]);
    inputValues.push(query.code[1]);
    inputValues.push(query.code[2]);
    inputValues.push(query.verifierIdx);
    inputValues.push(query.result ? 1 : 0);
  }
  let offset = 0;
  const input = new Uint8Array(memory.buffer, offset, inputValues.length);
  input.set(inputValues);
  offset += input.byteLength;

  const output = new Uint8Array(memory.buffer, offset, 1000);
  offset += output.byteLength;

  const start = new Date();
  solve_wasm(input.byteOffset, output.byteOffset);
  console.log("Solving took", new Date().valueOf() - start.valueOf(), "ms");
  offset = 0;
  const numCodes = output[offset];
  offset += 1;
  const codes = [];
  for (let i = 0; i < numCodes; i += 1) {
    codes.push(
      String(output[offset]) + output[offset + 1] + output[offset + 2]
    );
    offset += 3;
  }

  const possibleVerifiers: number[][] = [];
  for (let i = 0; i < numCards; i += 1) {
    const numVerifiers = output[offset];
    offset += 1;
    possibleVerifiers.push([]);
    for (let j = 0; j < numVerifiers; j += 1) {
      const verifier = output[offset];
      offset += 1;
      // the verifiers are 1-indexed in the frontend
      possibleVerifiers[i].push(verifier + 1);
    }
  }

  const possibleLetters: string[][] = [];
  for (let i = 0; i < numCards; i += 1) {
    const numLetters = output[offset];
    offset += 1;
    possibleLetters.push([]);
    for (let j = 0; j < numLetters; j += 1) {
      const letter = output[offset];
      offset += 1;
      possibleLetters[i].push(String.fromCharCode(letter));
    }
  }

  return {
    codes,
    possibleVerifiers,
    possibleLetters,
  };
}

function checkDigits(state: RootState, possibleCodes: string[]) {
  const digits = { triangle: new Set(), square: new Set(), circle: new Set() };
  for (const code of possibleCodes) {
    digits.triangle.add(Number(code[0]));
    digits.square.add(Number(code[1]));
    digits.circle.add(Number(code[2]));
  }
  for (const { shape, digit } of state.digitCode) {
    if (digits[shape].has(digit)) {
      return false;
    }
  }

  return true;
}

function checkVerifiers(state: RootState, possibleVerifiers: number[][]) {
  for (let i = 0; i < state.comments.length; i += 1) {
    const card = state.comments[i].criteriaCards[0];
    for (const criteria of card.irrelevantCriteria) {
      if (possibleVerifiers[i].includes(criteria)) {
        return false;
      }
    }
  }
  return true;
}

function checkLetters(state: RootState, possibleLetters: string[][]) {
  if (!state.comments[0].nightmare) {
    return true;
  }
  for (let i = 0; i < state.comments.length; i += 1) {
    const letters = state.comments[i].letters;
    for (const letter of letters) {
      if (letter.isIrrelevant && possibleLetters[i].includes(letter.letter)) {
        return false;
      }
    }
  }
  return true;
}

export function checkDeductions(state: RootState) {
  const cards = state.comments.map(({ criteriaCards }) => {
    return criteriaCards[0].id;
  });
  const queries: Query[] = [];
  for (const round of state.rounds) {
    const code: number[] = [];
    for (const { digit } of round.code) {
      if (!(digit !== null && digit >= 1 && digit <= 5)) {
        continue;
      }
      code.push(digit);
    }
    if (code.length !== 3) {
      continue;
    }
    for (const query of round.queries) {
      if (query.state === "unknown") {
        continue;
      }
      queries.push({
        code,
        verifierIdx: query.verifier.charCodeAt(0),
        result: query.state === "solved",
      });
    }
  }
  const result = getPossibleCombinations(cards, queries);
  console.log(result);
  console.log(state);
  if (
    !(
      checkVerifiers(state, result.possibleVerifiers) &&
      checkDigits(state, result.codes) &&
      checkLetters(state, result.possibleLetters)
    )
  ) {
    alert("You have made an invalid deduction!");
  } else {
    alert("All deductions are valid!");
  }
}
