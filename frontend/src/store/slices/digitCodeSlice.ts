import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DigitCodeState = {
  shape: Shape;
  digit: Digit;
  state: "correct" | "incorrect";
}[];

const initialState: DigitCodeState = [];

export const digitCodeSlice = createSlice({
  name: "digitCode",
  initialState,
  reducers: {
    load: (_, action: PayloadAction<DigitCodeState>) => action.payload,
    reset: () => initialState,
    toggleDigitState: (
      state,
      action: PayloadAction<{ shape: Shape; digit: Digit }>
    ) => {
      const { shape, digit } = action.payload;

      const index = state.findIndex(
        (entry) => entry.shape === shape && entry.digit === digit
      );

      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push({ shape, digit, state: "incorrect" });
      }
    },
    setDigitState: (
      state,
      action: PayloadAction<{ shape: Shape; digit: Digit; isValid: boolean }>
    ) => {
      const { shape, digit, isValid } = action.payload;
      const index = state.findIndex(
        (entry) => entry.shape === shape && entry.digit === digit
      );

      if (index >= 0) {
        state.splice(index, 1);
      }

      if (!isValid) {
         state.push({ shape, digit, state: "incorrect" });
      }
    },
  },
});

export const digitCodeActions = digitCodeSlice.actions;

export default digitCodeSlice.reducer;
