import IconButton from "@mui/material/IconButton";
import ContentIcon from "@mui/icons-material/ContentPasteRounded";
import Box from "@mui/material/Box";
import EraseIcon from "@mui/icons-material/AutoFixHighRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { usePaletteMode } from "hooks/usePaletteMode";
import { useCanBeSaved } from "hooks/useCanBeSaved";
import { useAppDispatch } from "hooks/useAppDispatch";
import { registrationActions } from "store/slices/registrationSlice";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect, useState } from "react";
import { getPossibleCodes } from "deductions";

function groupByFirst(codes: string[]) {
  const result: { [key: number]: { code: string; possible: boolean }[] } = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  for (let b = 1; b <= 5; b += 1) {
    for (let y = 1; y <= 5; y += 1) {
      for (let p = 1; p <= 5; p += 1) {
        const code = `${b}${y}${p}`;
        result[b].push({ code, possible: codes.includes(code) });
      }
    }
  }
  return result;
}

export function PossibleCodes() {
  const { theme } = usePaletteMode();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const [possibleCodes, setPossibleCodes] = useState(groupByFirst([]));

  useEffect(() => {
    getPossibleCodes(state).then((data) =>
      setPossibleCodes(groupByFirst(data.codes))
    );
  }, [state]);

  return (
    <Grid container spacing={8}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Grid item xs={2}>
          {possibleCodes[number].map(({ code, possible }) => (
            <div key={code} style={{ color: possible ? "black" : "lightgrey" }}>
              {code}
            </div>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
