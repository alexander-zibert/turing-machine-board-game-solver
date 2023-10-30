// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <StrictMode>
  <App />
  // </StrictMode>
)

function main(Module: any) {
  const { memory, solve_wasm } = Module.asm;
  console.log(memory.buffer);
  const numCards = 6;
  const numQueries = 0;
  const inputValues = [numCards, 2, 12, 24, 33, 35, 45, numQueries];
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
  console.log(codes);

  const possibleVerifiers: number[][] = [];
  for (let i = 0; i < numCards; i += 1) {
    const numVerifiers = output[offset];
    offset += 1;
    possibleVerifiers.push([]);
    for (let j = 0; j < numVerifiers; j += 1) {
      const verifier = output[offset];
      offset += 1;
      possibleVerifiers[i].push(verifier);
    }
  }
  console.log(possibleVerifiers);

  const possibleLetters: number[][] = [];
  for (let i = 0; i < numCards; i += 1) {
    const numLetters = output[offset];
    offset += 1;
    possibleLetters.push([]);
    for (let j = 0; j < numLetters; j += 1) {
      const letter = output[offset];
      offset += 1;
      possibleLetters[i].push(letter);
    }
  }
  console.log(possibleLetters);
}

const Module = {
  preRun: [],
  postRun: [main],
  print: (function () {
    return function (text: string) {
      console.log(text);
    };
  })(),
  setStatus(text: string) {
    // if (!Module.setStatus.last)
    //   Module.setStatus.last = { time: Date.now(), text: "" };
    // if (text === Module.setStatus.last.text) return;
    // var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    // var now = Date.now();
    // if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
    // Module.setStatus.last.time = now;
    // Module.setStatus.last.text = text;
    console.log(text);
  },
  totalDependencies: 0,
  monitorRunDependencies(left: number) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(
      left
        ? "Preparing... (" +
            (this.totalDependencies - left) +
            "/" +
            this.totalDependencies +
            ")"
        : "All downloads complete."
    );
  },
};
Module.setStatus("Downloading...");
window.onerror = (event) => {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus("Exception thrown, see JavaScript console");
  Module.setStatus = (text) => {
    if (text) console.error("[post-exception status] " + text);
  };
};
(window as any).Module = Module;
