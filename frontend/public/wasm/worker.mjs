// global WASM Module setup code
var Module = {
  preRun: [],
  postRun: [],
  ready: false,
  print(text) {
    console.log(text);
  },
  setStatus(text) {
    if (!text) return;
    console.log(text);
    if (text === "All downloads complete.") {
      this.ready = true;
    }
  },
  totalDependencies: 0,
  monitorRunDependencies(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? "" : "All downloads complete.");
  },
};
Module.setStatus("Downloading...");
globalThis.onerror = (event) => {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus("Exception thrown, see JavaScript console");
  Module.setStatus = (text) => {
    if (text) {
      console.error("[post-exception status] " + text);
    }
  };
};

importScripts("/turing-machine-board-game-solver/wasm/wasmWrapper.js");

function getPossibleCombinations({
  id,
  verifierCards,
  queries,
  mode,
  numVerifiers,
}) {
  const { memory, solve_wasm } = Module.asm;
  const numCards = verifierCards.length;
  const numQueries = queries.length;
  const inputValues = [mode, numVerifiers, ...verifierCards, numQueries];
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

  const possibleVerifiers = [];
  for (let i = 0; i < numVerifiers; i += 1) {
    const numVerifiers = output[offset];
    offset += 1;
    possibleVerifiers.push([]);
    for (let j = 0; j < numVerifiers; j += 1) {
      const verifier = output[offset];
      offset += 1;
      possibleVerifiers[i].push(verifier);
    }
  }

  const possibleLetters = [];
  for (let i = 0; i < numVerifiers; i += 1) {
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
    id,
    codes,
    possibleVerifiers,
    possibleLetters,
  };
}

function handleData(data) {
  if (data.type === "solve_wasm") {
    return getPossibleCombinations(data);
  }
  return callWasmFunction(Module.asm[data.type], Module.asm.memory, data);
}

async function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function waitForWasmModule() {
  while (!Module?.asm) {
    await delay(100);
  }
}

this.onmessage = async function onmessage(e) {
  await waitForWasmModule();
  const { data } = e;
  const result = handleData(data);
  result.id = data.id;
  console.log(result);
  this.postMessage(result);
};

function callWasmFunction(asmFunction, memory, inputData) {
  const data = JSON.stringify(inputData);
  const encoder = new TextEncoder();
  const input = new Uint8Array(memory.buffer, 0);
  const { written } = encoder.encodeInto(data, input);
  input[written] = 0;

  const output = new Uint8Array(memory.buffer, written + 1, 1000);
  const outputSize = asmFunction(input.byteOffset, output.byteOffset);

  const decoder = new TextDecoder();
  const decoded = decoder.decode(output.slice(0, outputSize));
  return JSON.parse(decoded);
}
