all:
	clang++ -std=c++2b -O2 -Wall main.cpp
doctest:
	clang++ -std=c++2b -O2 -Wall test/*.cpp -o test.out
wasm:
	em++ wasm.cpp -O2 -s WASM=1 -o frontend/public/wasm/wasmWrapper.js
