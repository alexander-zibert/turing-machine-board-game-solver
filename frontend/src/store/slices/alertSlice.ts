import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AlertPayload = {
  message: string;
  level: AlertColor;
};

export type AlertState = AlertPayload & {
  open: boolean;
};

const initialState: AlertState = {
  open: false,
  message: "",
  level: "info",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    load: (_, action: PayloadAction<AlertState>) => action.payload,
    reset: () => initialState,
    openAlert: (state, action: PayloadAction<AlertPayload>) => {
      const { payload } = action;
      state.open = true;
      state.level = payload.level;
      state.message = payload.message;
    },
    closeAlert: (state) => {
      state.open = false;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
