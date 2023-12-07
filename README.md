# Turing Machine Solver

This is a solver for the board game "Turing Machine".

Credits/links:

- [Frontend Code forked from zyle87](https://github.com/zyle87/turing-machine-interactive-sheet)
- [Online App](https://turingmachine.info/)
- [Play online on Board Game Arena](https://en.boardgamearena.com/gamepanel?game=turingmachine)
- [Board Game Geek Entry](https://boardgamegeek.com/boardgame/356123/turing-machine)

## Building

### CLI Build

Just run `make` in the root directory. Then you can run the binary `./a.out`.

### WASM Build

The WASM build requires a working [emscripten toolchain](https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended).

Afterwards, you can run `make wasm` to build.

### Frontend

Run `npm install` in the `frontend` directory. Then, you can run `npm run start` to build and serve the frontend on your local machine.

## Tests

Run `make doctest` in the root directory. Then you can run the binary `./test.out`.

## Progress

- [x] Initial deductions before the game
- [x] Basic CLI usage
- [x] Deductions based on machine answers
- [x] Implement all cards and verifiers
- [x] Use the [Turing Machine Interactive Sheet](https://github.com/zyle87/turing-machine-interactive-sheet) as frontend with this solver as WASM module
- [x] Implement letter checkboxes in the frontend
- [x] Implement classic and extreme mode
- [x] Check letter combinations
- [x] Use web workers to not block the main thread
- [x] Deploy on github pages
- [x] Implement comment list of all possible codes in the frontend
- [x] Check comment list of all possible codes
- [x] Verify queries (warn if no code is possible)
- [x] Add tests based on [known puzzles + solutions](https://boardgamegeek.com/filepage/251409/book-8500-problems-offline-or-analog-use)
- [ ] Implement puzzle generation
- [ ] Use service workers for an offline experience
- [ ] Algorithm documentation
