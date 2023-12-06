import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { usePaletteMode } from "hooks/usePaletteMode";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect, useState } from "react";
import { getPossibleCodes } from "deductions";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MagnifyIcon from "@mui/icons-material/ManageSearchRounded";

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
  const [hide, setHide] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function toggleHidden() {
    setHide(!hide);
  }

  const comments = useAppSelector((state) => state.comments);
  useEffect(() => {
    getPossibleCodes(comments).then((data) =>
      setPossibleCodes(groupByFirst(data.codes))
    );
  }, [comments]);

  return (
    <Paper
      component="section"
      id="possible-codes-section"
      sx={{ width: 320, margin: theme.spacing(0, "auto", 2) }}
    >
      <Box p={2} mt={2}>
        <Box display="flex" justifyContent={"space-between"} zIndex={1}>
          <Button onClick={toggleExpanded}>
            {expanded ? "Hide code list" : "Show code list"}
          </Button>
          {expanded &&
            <IconButton onClick={toggleHidden} disabled={!expanded}>
              <Tooltip id="button-report" title={hide ? "Show impossible numbers" : "Hide impossible numbers"}>
                <MagnifyIcon/>
              </Tooltip>
            </IconButton>
          }
        </Box>
        <Collapse in={expanded}>
          <Grid container spacing={8}>
            {[1, 2, 3, 4, 5].map((number) => (
              <Grid item xs={2} key={number}>
                {possibleCodes[number].map(({code, possible}) => (
                  <Grid item xs={2}
                        hidden={!possible && hide}
                        key={code}
                        style={{
                          color: possible
                            ? theme.palette.text.primary
                            : theme.palette.text.disabled,
                        }}
                  >
                    {code}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Box>
    </Paper>
  );
}
