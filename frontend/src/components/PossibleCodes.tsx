import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { usePaletteMode } from "hooks/usePaletteMode";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect, useState } from "react";
import { getPossibleCodes } from "deductions";
import Collapse from "@mui/material/Collapse";

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

  const [possibleCodes, setPossibleCodes] = useState(groupByFirst([]));
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const comments = useAppSelector((state) => state.comments);
  useEffect(() => {
    getPossibleCodes(comments).then((data) =>
      setPossibleCodes(groupByFirst(data.codes))
    );
  }, [comments]);

  return (
    <>
      <Button onClick={toggleExpanded}>
        {expanded ? "Hide code list" : "Show code list"}
      </Button>
      <Collapse in={expanded}>
        <Grid container spacing={8}>
          {[1, 2, 3, 4, 5].map((number) => (
            <Grid item xs={2}>
              {possibleCodes[number].map(({ code, possible }) => (
                <div
                  key={code}
                  style={{
                    color: possible
                      ? theme.palette.text.primary
                      : theme.palette.text.disabled,
                  }}
                >
                  {code}
                </div>
              ))}
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  );
}
