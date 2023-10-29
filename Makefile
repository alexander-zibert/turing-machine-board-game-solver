all:
	clang++ -std=c++2b -O2 -Wall main.cpp
doctest:
	clang++ -std=c++2b -O2 -Wall test/*.cpp -o test.out
