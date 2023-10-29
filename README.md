# Turing Machine Solver

This is a solver for the board game:

- [Online App](https://turingmachine.info/)
- [Play online on Board Game Arena](https://en.boardgamearena.com/gamepanel?game=turingmachine)
- [Board Game Geek Entry](https://boardgamegeek.com/boardgame/356123/turing-machine)

## Building

Just run `make` in the root directory. Then you can run the binary `./a.out`.

## Tests

Run `make doctest` in the root directory. Then you can run the binary `./test.out`.

## Progress

- [x] Initial deductions before the game
- [x] Basic CLI usage
- [x] Deductions based on machine answers
- [ ] Implement all cards and verifiers
- [ ] Algorithm documentation
- [ ] Use the [Turing Machine Interactive Sheet](https://github.com/zyle87/turing-machine-interactive-sheet) as frontend with this solver as WASM module
