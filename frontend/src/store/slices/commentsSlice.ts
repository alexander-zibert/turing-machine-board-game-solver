import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CriteriaCard, criteriaCardPool } from "hooks/useCriteriaCard";

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

const initialState: CommentsState = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    load: (_, action: PayloadAction<CommentsState>) => action.payload,
    reset: () => initialState,
    setCards: (
      state,
      action: PayloadAction<{
        fake?: number[];
        ind: number[];
        m?: number;
        language: string;
      }>
    ) => {
      const { fake, ind, m, language } = action.payload;
      const nightmare = m === 2;

      for (let i = 0; i < ind.length; i++) {
        if (fake) {
          const cards = [ind[i], fake[i]];
          const shuffledCards = shuffle(cards);

          state.push({
            verifier: verifiers[i],
            nightmare,
            criteriaCards: [
              {
                ...criteriaCardPool.find((cc) => cc.id === shuffledCards[0])!,
                language,
              },
              {
                ...criteriaCardPool.find((cc) => cc.id === shuffledCards[1])!,
                language,
              },
            ],
            letters: createLetters(ind.length, verifiers[i], nightmare),
          });
        } else {
          const card = ind.sort((n1, n2) => n1 - n2)[i];

          state.push({
            verifier: verifiers[i],
            nightmare,
            criteriaCards: [
              {
                ...criteriaCardPool.find((cc) => cc.id === card)!,
                nightmare,
                language,
              },
            ],
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
