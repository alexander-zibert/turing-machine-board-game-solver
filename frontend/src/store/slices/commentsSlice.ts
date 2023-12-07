import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CriteriaCard,
  criteriaCardPool,
  CryptCard,
} from "hooks/useCriteriaCard";

const verifiers: Verifier[] = ["A", "B", "C", "D", "E", "F"];

const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export type Letter = {
  letter: Verifier;
  isIrrelevant: boolean;
};

type Comment = {
  verifier: Verifier;
  nightmare: boolean;
  criteriaCards: CriteriaCard[];
  letters: Letter[];
};

const createLetters = (
  numVerifiers: number,
  verifier: Verifier,
  nightmare: boolean
): Letter[] => {
  const letters = verifiers.slice(0, numVerifiers);
  return letters.map((letter: Verifier) => ({
    letter,
    isIrrelevant: nightmare ? false : verifier !== letter,
  }));
};

export type CommentsState = Comment[];
export type GameSetup = {
  ind: number[];
  crypt: number[];
  color: number;
  fake?: number[];
  m: number;
};

const initialState: CommentsState = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    load: (_, action: PayloadAction<CommentsState>) => action.payload,
    reset: () => initialState,
    setCards: (state, action: PayloadAction<GameSetup>) => {
      const { ind, crypt, color, fake, m } = action.payload;
      const nightmare = m === 2;

      const addAdditionalCardAttributes = (
        card: number,
        cryptNumber: number
      ) => {
        return {
          ...criteriaCardPool.find((cc) => cc.id === card)!,
          nightmare,
          cryptCard: { id: cryptNumber, color: color } as CryptCard,
        };
      };

      for (let i = 0; i < ind.length; i++) {
        if (fake) {
          const cards = [ind[i], fake[i]];
          const shuffledCards = shuffle(cards);

          state.push({
            verifier: verifiers[i],
            nightmare,
            criteriaCards: [
              addAdditionalCardAttributes(shuffledCards[0], crypt[i]),
              addAdditionalCardAttributes(shuffledCards[1], crypt[i]),
            ],
            letters: createLetters(ind.length, verifiers[i], nightmare),
          });
        } else {
          state.push({
            verifier: verifiers[i],
            nightmare,
            criteriaCards: [addAdditionalCardAttributes(ind[i], crypt[i])],
            letters: createLetters(ind.length, verifiers[i], nightmare),
          });
        }
      }
    },
    updateLetters: (
      state,
      action: PayloadAction<{ verifier: Verifier; letters?: Letter[] }>
    ) => {
      const { verifier, letters } = action.payload;
      if (!letters) return;
      const comment = state.find((comment) => comment.verifier === verifier);
      if (comment) {
        comment.letters = letters;
      }
    },
    updateCard: (
      state,
      action: PayloadAction<{
        verifier: Verifier;
        index: number;
        card?: CriteriaCard;
      }>
    ) => {
      const { verifier, index, card } = action.payload;

      if (!card) return;

      const comment = state.find((comment) => comment.verifier === verifier);
      if (comment) {
        comment.criteriaCards[index] = card;
      } else {
        throw new Error("There should always be a comment for each verifier!?");
        // TODO: when does this happen? hardcoding nightmare and letters is probably wrong
        // state.push({
        //   nightmare: false,
        //   criteriaCards: [card],
        //   verifier,
        //   letters: [{ letter: verifier, isIrrelevant: false }],
        // });
      }
    },
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
