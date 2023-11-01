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

Next, you need to serve these files. You can run `python -m http.server 9000` in the root directory to serve the files with a simple python http server.
Then, the frontend is accessible under `http://localhost:9000/frontend/`. As of now there only is some output in the JS console.

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
- [ ] Use web workers to not block the main thread
- [ ] Deploy on github pages
- [ ] Implement comment list of all possible codes in the frontend
- [ ] Check comment list of all possible codes
- [ ] Verify queries (warn if no code is possible)
- [ ] Add tests based on [known puzzles + solutions](https://boardgamegeek.com/filepage/251409/book-8500-problems-offline-or-analog-use)
- [ ] Implement puzzle generation
- [ ] Use service workers for an offline experience
- [ ] Algorithm documentation
